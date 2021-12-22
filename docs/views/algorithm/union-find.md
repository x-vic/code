---
title: 并查集
---

## 并查集的实现

```js
class UnineFind {
  constructor(size) {
    this.set = Array(size).fill(null).map((_, i) => i)
  }

  // 返回根节点的编号（启用根结点压缩）
  get(x) {
    return this.set[x] = (this.set[x] === x ? x : this.get(this.set[x]))
  }

  // a 的根节点的的值 = b 的根节点的编号
  merge(a, b) {
    this.set[this.get(a)] = this.get(b)
  }
}
```

## 基础应用

1. [#547. 省份数量](https://leetcode-cn.com/problems/number-of-provinces/)

```js
function findCircleNum(isConnected) {
  const len = isConnected.length
  const u = new UnineFind(len)
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (isConnected[i][j]) u.merge(i, j)
    }
  }
  let ans = 0
  for (let i = 0; i < len; i++) {
    if (u.get(i) === i) ans += 1
  }
  return ans
}
```

2. [#200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

递归回溯解法
```js
function numIslands(grid) {
  const c = grid.length, r = grid[0].length
  // 记录是否已经被访问
  const visited = Array(c).fill(null).map(() => Array(r).fill(false))
  let ans = 0
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  const subFunc = (i, j) => {
    // 越界、已经被访问、不属于它的领域
    if (i < 0 || i >= c || j < 0 || j >= r) return false
    if (visited[i][j]) return false
    if (grid[i][j] === '0') return false

    // 能够走到这一步就说明发现新的岛屿了，接下来就是把边上的岛屿染上颜色
    visited[i][j] = true
    for (let m = 0; m < directions.length; m++) {
      subFunc(i + directions[m][0], j + directions[m][1])
    }
    return true
  }

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      if (subFunc(i, j)) ans++
    }
  }

  return ans
}
```

并查集解法
```js
function numIslands(grid) {
  const col = grid.length, row = grid[0].length

  // 将二维网格进行编号，从 1 开始，拉成一维的
  const u = new UnineFind(col * row)

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (grid[i][j] === '0') continue
      // 判断 上、左 方向是否为 1
      if (i > 0 && grid[i - 1][j] === '1') u.merge(getIndex(i, j, row), getIndex(i - 1, j, row))
      if (j > 0 && grid[i][j - 1] === '1') u.merge(getIndex(i, j, row), getIndex(i, j - 1, row))
    }
  }

  let ans = 0
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (grid[i][j] === '1' && u.get(getIndex(i, j, row)) === getIndex(i, j, row)) ans++
    }
  }

  return ans
}

function getIndex(i, j, row) {
  return i * row + j
}
```

3. [#990. 等式方程的可满足性](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/)

```js
// 相等关系本身可以理解为一种连通关系
function equationsPossible(equations) {
  const u = new UnineFind(26)
  // 遍历这些等式，找到相等关系，并将之连通
  for (let i = 0; i < equations.length; i++) {
    const item = equations[i]
    if (item[1] === '=') {
      u.merge(item[0].charCodeAt() - 97, item[3].charCodeAt() - 97)
    }
  }
  // 找到不等关系，如果两者已经连通，那么返回 false
  for (let i = 0; i < equations.length; i++) {
    const item = equations[i]
    if (item[1] === '!') {
      if (u.get(item[0].charCodeAt() - 97) === u.get(item[3].charCodeAt() - 97)) return false
    }
  }
  return true
}
```


## 进阶

1. [#684. 冗余连接](https://leetcode-cn.com/problems/redundant-connection/)

```js
function findRedundantConnection(edges) {
  const len = edges.length
  const u = new UnineFind(len + 1)

  // 遍历数组
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i]
    // 之前没有连接
    if (u.get(a) !== u.get(b)) {
      u.merge(a, b)
    } else {
      return [a, b]
    }
  }
}
```

2. [#1319. 连通网络的操作次数](https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/)

本质上就是判断机房中有多少个机器集合
```js
function makeConnected(n, connections) {
  let rest = 0 // 机房中有多少多余的线缆
  let setNum = 0 // 机房中一共有多少集合
  const uf = new UnineFind(n)
  for (let [s, e] of connections) {
    if (uf.get(s) !== uf.get(e)) {
      uf.merge(s, e)
    } else { // 已经连通过，有多余线缆
      rest++
    }
  }
  // 计算有多少个集合
  for (let i = 0; i < n; i++) {
    if (uf.get(i) === i) setNum++
  }
  if (setNum - 1 > rest) return -1
  return setNum - 1
}
```

3. [#128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

应题目要求，需要统计每个集合的元素数量，所以需要对我们实现的并查集进行功能增强  
```js {5-6,16-17}
// 带统计元素个数的并查集实现
class UnineFind {
  constructor(size) {
    this.boss = Array(size).fill(null).map((_, i) => i)
    // 开始每个集合中都只有它自己
    this.count = Array(size).fill(null).map((_, i) => 1)
  }

  // 返回根节点的编号
  get(x) {
    return this.boss[x] = (this.boss[x] === x ? x : this.get(this.boss[x]))
  }

  // a 的根节点的的值 = b 的根节点的编号
  merge(a, b) {
    if (this.get(a) === this.get(b)) return
    this.count[this.get(b)] += this.count[this.get(a)]
    this.boss[this.get(a)] = this.get(b)
  }
}
```

题解：我们将相邻的关系当成是一种连通关系
```js
function longestConsecutive(nums) {
  const len = nums.length
  const u = new UnineFind(len)
  // 存储已经访问过的元素，以及其下标
  const visited = {}

  for (let i = 0; i < len; i++) {
    const item = nums[i]
    if (visited[item] != null) continue
    // 连接前一个
    if (visited[item - 1] != null) {
      u.merge(i, visited[item - 1])
    }
    // 连接后一个
    if (visited[item + 1] != null) {
      u.merge(i, visited[item + 1])
    }
    visited[item] = i
  }

  let ans = 0
  for (let i = 0; i < len; i++) {
    ans = Math.max(ans, u.count[i])
  }
  
  return ans
}
```

4. [#947. 移除最多的同行或同列石头](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/)

将同行或同列的元素连通起来，当作一个集合。
```js
function removeStones(stones) {
  const len = stones.length
  const u = new UnineFind(len)
  // x、y 方向缓存数据
  const visitedX = {}, visitedY = {}
  for (let i = 0; i < len; i++) {
    const [x, y] = stones[i]
    // 连接 x 方向
    if (visitedX[x] != null) {
      u.merge(i, visitedX[x])
    }
    // 连接 y 方向
    if (visitedY[y] != null) {
      u.merge(i, visitedY[y])
    }
    visitedX[x] = i
    visitedY[y] = i
  }

  let ans = 0
  for (let i = 0; i < len; i++) {
    if (u.get(i) === i) ans += 1
  }
  // 元素数量 - 集合数量
  return len - ans
}
```

5. [#1202. 交换字符串中的元素](https://leetcode-cn.com/problems/smallest-string-with-swaps/)

```js
// 这里还要用到堆这个数据结构，这里省略
function smallestStringWithSwaps(s, pairs) {
  const len = s.length
  const uf = new UnineFind(len)
  const heaps = Array(len).fill(null).map(() => new Heap(undefined, (a, b) => b.charCodeAt() - a.charCodeAt()))
  // 建立连通关系
  for (let [s, e] of pairs) {
    uf.merge(s, e)
  }
  // 将同一个集合中的元素放到其父节点对应的堆当中去
  for (let i = 0; i < len; i++) {
    heaps[uf.get(i)].push(s[i])
  }
  // 分组排序，每次从父节点的堆中取出堆顶元素
  let ans = ''
  for (let i = 0; i < len; i++) {
    ans += heaps[uf.get(i)].pop()
  }
  return ans
}
```

6. [#721. 账户合并](https://leetcode-cn.com/problems/accounts-merge/)

```js
function accountsMerge(accounts) {
  const len = accounts.length
  const uf = new UnineFind(len)
  // 已经访问过的账户，内部存储索引
  const emailToIdx = Object.create(null)
  // 对账户进行分类
  for (let i = 0; i < accounts.length; i++) {
    // 遍历，看邮箱是不是之前出现过
    for (let j = 0; j < accounts[i].length; j++) {
      if (j === 0) continue
      // 如果邮箱已经出现过，就进行连通
      if (emailToIdx[accounts[i][j]] != null) {
        uf.merge(i, emailToIdx[accounts[i][j]])
      } else {
        // 记录当前邮箱所在的索引
        emailToIdx[accounts[i][j]] = i
      }
    }
  }
  const ans = []
  for (let i = 0; i < accounts.length; i++) {
    // 找爸爸的索引
    const rootIndex = uf.get(i)
    if (!ans[rootIndex]) {
      const [name, ...emails] = accounts[i]
      ans[rootIndex] = [name, ...[...new Set(emails)].sort()]
    } else {
      const [name, ...oldEmails] = ans[rootIndex]
      const [, ...newEmails] = accounts[i]
      const emails = [...new Set([...oldEmails, ...newEmails])]
      emails.sort()
      ans[rootIndex] = [name, ...emails]
    }
  }
  return ans.filter(item => item)
}
```


## 附加

1. [#765. 情侣牵手](https://leetcode-cn.com/problems/couples-holding-hands/)

```js
```

2. [#685. 冗余连接 II](https://leetcode-cn.com/problems/redundant-connection-ii/)

```js
```