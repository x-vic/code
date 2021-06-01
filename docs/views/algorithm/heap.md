---
title: 堆
---

## 堆的实现

```js
class Heap {
  constructor(list = [], compare = (a, b) => (a - b)) {
    // 数组维护的堆
    this.list = []
    this.compare = compare
    list.forEach(e => this.push(e))
  }
  get size() {
    return this.list.length
  }
  get top() {
    return this.list[0]
  }
  // 入队
  push(e) {
    this.list.push(e)
    this.shiftUp()
  }
  // 出队
  pop() {
    if (this.size <= 0) return '没有元素了'
    const front = this.list.shift()
    if (this.size >= 1) {
      this.list.unshift(this.list.pop())
      this.shiftDown()
    }
    return front
  }
  // 上浮
  shiftUp() {
    let i = this.size - 1
    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / 2)
      if (this.compare(this.list[i], this.list[parentIndex]) > 0) {
        this.swap(i, parentIndex)
        i = parentIndex
      } else {
        break
      }
    }
  }
  // 下潜
  shiftDown() {
    let i = 0
    while (i < this.size - 1) {
      let findIndex = i
      const subLeftIndex = 2 * i + 1, subRightIndex = 2 * i + 2
      if (this.compare(this.list[findIndex], this.list[subLeftIndex]) < 0) {
        findIndex = subLeftIndex
      }
      if (this.compare(this.list[findIndex], this.list[subRightIndex]) < 0) {
        findIndex = subRightIndex
      }
      if (i !== findIndex) {
        this.swap(i, findIndex)
        i = findIndex
      } else {
        break
      }
    }
  }
  swap(index1, index2) {
    const temp = this.list[index1]
    this.list[index1] = this.list[index2]
    this.list[index2] = temp
  }
}
```

## 基础应用

1. [#剑指 Offer 40 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)

```js
function getLeastNumbers(arr, k) {
  // 维护 k 个元素的大顶堆
  const heap = new Heap()
  for (let i = 0; i < arr.length; i++) {
    // 数量不足时，直接入队
    if (heap.size < k) {
      heap.push(arr[i])
      continue
    }
    if (heap.list[0] > arr[i]) {
      heap.pop()
      heap.push(arr[i])
    }
  }
  return heap.list
}
```

2. [#1046 最后一块石头的重量](https://leetcode-cn.com/problems/last-stone-weight/)

```js
```

3. [#703 数据流中的第 K 大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)

```js
class KthLargest {
  constructor(k, nums) {
    this.k = k
    // 维护 k 个元素的小顶堆
    this.heap = new Heap([], (a, b) => (b - a))
    for (const x of nums) {
      this.add(x)
    }
  }
  add(val) {
    this.heap.push(val)
    if (this.heap.size > this.k) this.heap.pop()
    return this.heap.top
  }
}
```

4. [#373 查找和最小的K对数字](https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/)

```js
```

5. [#215 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```js
function findKthLargest(nums, k) {
  // 维护容量为 k 的小顶堆
  const heap = new Heap([], (a, b) => b - a)
  for (let i = 0; i < nums.length; i++) {
    if (heap.size < k) {
      heap.push(nums[i])
    } else if (heap.top < nums[i]) {
      heap.pop()
      heap.push(nums[i])
    }
  }
  return heap.top
}
```


## 堆的进阶应用

1. [#355 设计推特](https://leetcode-cn.com/problems/design-twitter/)

```js
```

2. [#692 前K个高频单词](https://leetcode-cn.com/problems/top-k-frequent-words/)

```js
```

3. [#面试题 17.20. 连续中值](https://leetcode-cn.com/problems/continuous-median-lcci/)

```js
```

4. [#295. 数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/)

```js
```

5. [#1801. 积压订单中的订单总数](https://leetcode-cn.com/problems/number-of-orders-in-the-backlog/)

```js
```