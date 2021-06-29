---
title: 深搜与广搜
---

## 基础应用

1. [993. 二叉树的堂兄弟节点](https://leetcode-cn.com/problems/cousins-in-binary-tree/)

深搜解法
```js
function isCousins(root, x, y) {
  const [xLevel, xFather] = findLevelAndFather(root, x)
  const [yLevel, yFather] = findLevelAndFather(root, y)
  // 层级相同，并且父亲不同就是堂兄弟
  if (xLevel === yLevel && xFather !== yFather) return true
  return false
}

// 寻找目标元素的层级以及它的父亲
function findLevelAndFather(node, val, level = 0, father = null) {
  if (node == null) return [-1, node]
  if (node.val === val) return [level, father]
  const leftRes = findLevelAndFather(node.left, val, level + 1, node)
  const rightRes = findLevelAndFather(node.right, val, level + 1, node)
  if (leftRes[0] != -1) return leftRes
  return rightRes
}
```

广搜解法
```js
function isCousins(root, x, y) {
  const [xLevel, xFather] = findLevelAndFather(root, x)
  const [yLevel, yFather] = findLevelAndFather(root, y)
  // 层级相同，并且父亲不同就是堂兄弟
  if (xLevel === yLevel && xFather !== yFather) return true
  return false
}

// 广度优先搜索实现（状态存入层级信息）
function findLevelAndFather(node, val) {
  if (node == null) return [-1, node]
  const queue = [[null, node, 0]]
  while (queue.length) {
    const [father, item, level] = queue.shift()
    if (item == null) continue
    if (item.val === val) return [level, father]
    // 将节点的父亲信息一起放入队列中
    queue.push([item, item.left, level + 1], [item, item.right, level + 1])
  }
  return [-1, null]
}
```


## BFS

1. [542. 01 矩阵](https://leetcode-cn.com/problems/01-matrix/)

```js
function updateMatrix(matrix) {
  const col = matrix.length, row = matrix[0].length
  const visited = Array(col).fill(null).map(() => Array(row).fill(false))
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const queue = []
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (matrix[i][j] === 0) {
        // 添加状态：坐标 + 步数
        queue.push([i, j, 0])
      }
    }
  }
  while (queue.length) {
    const [_x, _y, step] = queue.shift()
    for (let i = 0; i < directions.length; i++) {
      const x = _x + directions[i][0], y = _y + directions[i][1]
      if (x < 0 || x >= col) continue
      if (y < 0 || y >= row) continue
      if (matrix[x][y] === 0) continue
      if (visited[x][y]) continue
      matrix[x][y] = step + 1
      queue.push([x, y, step + 1])
      visited[x][y] = true
    }
  }
  return matrix
}
```

2. [1091. 二进制矩阵中的最短路径](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)

```js
function shortestPathBinaryMatrix(grid) {
  if (grid[0][0] === 1) return -1
  const col = grid.length, row = grid[0].length
  const visited = Array(col).fill(null).map(() => Array(row).fill(false))
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]]
  // 定义状态：坐标，路径
  const queue = [[0, 0, 1]]
  
  while (queue.length) {
    const [_x, _y, step] = queue.shift()
    if (_x === col - 1 && _y === row - 1 ) return step
    for (let i = 0; i < directions.length; i++) {
      const x = _x + directions[i][0], y = _y + directions[i][1]
      if (x < 0 || x >= col) continue
      if (y < 0 || y >= row) continue
      if (grid[x][y] === 1) continue
      if (visited[x][y]) continue
      queue.push([x, y, step + 1])
      visited[x][y] = true
    }
  }

  return -1
}
```

3. [752. 打开转盘锁](https://leetcode-cn.com/problems/open-the-lock/)

```js
function openLock(deadends, target) {
  // 将死锁放进集合中
  const deads = new Set(deadends)
  const directions = [-1, 1]
  if (deads.has('0000')) return -1
  deads.add('0000')
  const queue = [['0000', 0]]
  
  while (queue.length) {
    const [curr, step] = queue.shift()
    // 达到要求，返回结果
    if (curr === target) return step
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < directions.length; j++) {
        const state = curr.substring(0, i) + getNext(curr[i], directions[j]) + curr.substring(i + 1)
        if (deads.has(state)) continue
        deads.add(state)
        queue.push([state, step + 1])
      }
    }
  }

  return -1
}

function getNext(c, direction) {
  const res = Number(c) + direction
  if (res < 0) return 9
  if (res > 9) return 0
  return res
}
```

4. [剑指 Offer 13. 机器人的运动范围](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

```js
const getSum = ((buff) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      buff[i * 10 + j] = i + j
    }
  }
  return (num) => buff[num]
})([])

function movingCount(m, n, k) {
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const visited = []
  const queue = [[0, 0]]
  visited[0] = true

  let ans = 0

  while (queue.length) {
    const [_x, _y] = queue.shift()
    ans++
    for (let i = 0; i < directions.length; i++) {
      const x = _x + directions[i][0], y = _y + directions[i][1]
      if (x < 0 || x >= m) continue
      if (y < 0 || y >= n) continue
      if (visited[x * n + y]) continue
      if (getSum(x) + getSum(y) > k) continue
      visited[x * n + y] = true
      queue.push([x, y])
    }
  }

  return ans
}
```

5. [773. 滑动谜题](https://leetcode-cn.com/problems/sliding-puzzle/)

```js
function slidingPuzzle(board) {
  const col = board.length, row = board[0].length
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const target = '123450'
  const visited = new Set()
  const queue = []
  // 找到 board 中为 0 的位置
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 0) {
        queue.push([i, j, 0, board, toString(board)])
        visited.add(toString(board))
        break
      }
    }
  }

  while (queue.length) {
    const [_x, _y, step, _board, strBoard] = queue.shift()

    if (target === strBoard) return step
    for (const [m, n] of directions) {
      const x = _x + m, y = _y + n
      if (x < 0 || x >= col) continue
      if (y < 0 || y >= row) continue
      const newBoard = cloneArr(_board, x, y, _x, _y)
      const strNewBoard = toString(newBoard)
      if (visited.has(strNewBoard)) continue
      queue.push([x, y, step + 1, newBoard, strNewBoard])
      visited.add(strNewBoard)
    }
  }

  return -1
}

function cloneArr(arr, x = 0, y = 0, _x = 0, _y = 0) {
  const res = arr.map(item => [...item])
  ;[res[x][y], res[_x][_y]] = [res[_x][_y], res[x][y]]
  return res
}

function toString(arr) {
  return arr.reduce((prev, curr) => [...prev, ...curr], []).join('')
}
```


## DFS

1. [130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)

```js
function solve(board) {
  const col = board.length, row = board[0].length
  // 遍历四条边，找到为 O 的元素，然后深搜将与之相连的 O 变为 o
  for (let i = 0; i < col; i++) {
    if (board[i][0] === 'O') dfs(i, 0, board)
    if (board[i][row - 1] === 'O') dfs(i, row - 1, board)
  }
  for (let j = 0; j < row; j++) {
    if (board[0][j] === 'O') dfs(0, j, board)
    if (board[col - 1][j] === 'O') dfs(col - 1, j, board)
  }

  // 将所有 O 变成 X，所有 o 变成 O
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X'
      else if (board[i][j] === 'o') board[i][j] = 'O'
    }
  }
}

function dfs(x, y, board) {
  board[x][y] = 'o'
  const col = board.length, row = board[0].length
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  for (const [_x, _y] of directions) {
    const m = x + _x, n = y + _y
    if (m < 0 || m >= col) continue
    if (n < 0 || n >= row) continue
    if (board[m][n] !== 'O') continue
    dfs(m, n, board)
  }
}
```

2. [494. 目标和](https://leetcode-cn.com/problems/target-sum/)

```js
function findTargetSumWays(nums, target) {
  const len = nums.length
  const memo = new Map()
  
  const dfs = (target, index) => {
    const key = `${target}-${index}`
    // 递归到底，已经得到一种解法
    if (target === 0 && index === len) return 1
    // 递归到底，没有得到解法
    if (index >= len) return 0
    if (memo.has(key)) return memo.get(key)
    let ans = 0
    // + 这个元素
    ans += dfs(target - nums[index], index + 1)
    ans += dfs(target + nums[index], index + 1)
    memo.set(key, ans)
    return ans
  }

  return dfs(target, 0)
}
```

3. [473. 火柴拼正方形](https://leetcode-cn.com/problems/matchsticks-to-square/)

```js
function makesquare(matchsticks) {
  matchsticks = matchsticks.sort((a, b) => b - a)

  const len = matchsticks.length
  const sum = matchsticks.reduce((sum, curr) => sum + curr)
  if (sum % 4 !== 0) return false
  const target = sum >> 2
  const res = Array(4).fill(null).map(() => target)

  const dfs = (index, res) => {
    if (index === len) {
      return true
    }
    // 四个状态就是这个元素放到这四个桶中
    for (let i = 0; i < res.length; i++) {
      if (res[i] < matchsticks[index]) continue
      // 减支操作，没有不影响结果
      if (res[i] === matchsticks[index] || res[i] >= matchsticks[index] + matchsticks[len - 1]) {
        res[i] -= matchsticks[index]
        if (dfs(index + 1, res)) return true
        res[i] += matchsticks[index]
      }
    }
    return false
  }

  return dfs(0, res)
}
```

4. [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)

```js
function combinationSum(candidates, target) {
  const len = candidates.length
  const ans = []

  // index 累加是保证结果不重复的关键
  const dfs = (index = 0, rest = target, res = []) => {
    if (index === len) return
    if (rest < 0) return
    if (rest === 0) return ans.push(res)
    // 不选
    dfs(index + 1, rest, res)
    // 选
    dfs(index, rest - candidates[index], [...res, candidates[index]])
  }

  dfs()
  return ans
}
```


