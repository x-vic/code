---
title: 二分搜索
---

## 基础应用

1. [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

```js
function mySqrt(x) {
  // 在 0 ～ x 之间查找一个值的平方 等于 x
  let head = 0, tail = x
  // 寻找最后一个 v * v <= x 的值
  while (head + 2 < tail) { // 为什么不是 head < tail，因为这样容易造成死循环
    const mid = (tail + head) >> 1
    // 目标在后半段
    if (mid * mid <= x) {
      head = mid
    } else {
      tail = mid - 1
    }
  }
  for (let i = tail; i >= head; i--) {
    if (i * i <= x) return i
  }
  return head
}
```

2. [35. 搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)

```js
function searchInsert(nums, target) {
  // 寻找数组中第一个 >= target 的位置
  const len = nums.length
  let head = 0, tail = len - 1, mid
  // 特判，这个值应该放到数组的最后去
  if (target > nums[tail]) return len
  while (head < tail) {
    mid = (tail + head) >> 1
    if (nums[mid] >= target) {
      tail = mid
    } else {
      head = mid + 1
    }
  }
  return head
}
```

3. [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

```js
// 排序之后，二分求解
function twoSum(nums, target) {
  const len = nums.length
  let indexes = Array(len).fill(null).map((_, i) => i)
  // 得到排序后的下标
  indexes = indexes.sort((a, b) => nums[a] - nums[b])
  // 遍历排序后的下标
  for (let i = 0; i < len; i++) {
    const num = nums[indexes[i]]
    // 二分查找剩下的一半
    let head = i + 1, tail = len - 1, mid
    while (head <= tail) {
      mid = (tail + head) >> 1
      if (nums[indexes[mid]] === target - num) return [indexes[i], indexes[mid]]
      if (nums[indexes[mid]] < target - num) head = mid + 1
      else tail = mid - 1
    }
  }
}
```

4. [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

```js
function searchRange(nums, target) {
  // 查找第一个 >= target
  const start = bns0_1(nums, (num) => num >= target)
  // 没有这个元素
  if (nums[start] !== target) return [-1, -1]
  // 查找第一个 > target
  const end = bns0_1(nums, (num) => num > target, start) - 1
  return [start, end]
}

// 0-1 模型二分查找（查找第一个 1）
function bns0_1(arr, condition, start = 0, end = arr.length - 1) {
  const len = arr.length
  let head = start || 0, tail = end || len - 1, mid
  while (head + 2 < tail) {
    mid = ((tail - head) >> 1) + head
    if (condition(arr[mid])) tail = mid
    else head = mid + 1
  }
  for (let i = head; i <= tail; i++) {
    if (condition(arr[i])) return i
  }
  // 没有找到符合条件的元素
  return len
}
```

5. [1658. 将 x 减到 0 的最小操作数](https://leetcode-cn.com/problems/minimum-operations-to-reduce-x-to-zero/)

```js
function minOperations(nums, x) {
  let ans = Infinity
  const len = nums.length
  // 从左到右的前缀和
  const sumL = [0]
  nums.reduce((sum, curr) => {
    sumL.push(sum + curr)
    return sum + curr
  }, 0)
  // 从右到左的前缀和
  const sumR = [0]
  nums.reduceRight((sum, curr) => {
    sumR.push(sum + curr)
    return sum + curr
  }, 0)
  
  for (let i = 0; i < sumL.length; i++) {
    const target = x - sumL[i]
    const index = bs(sumR, target)
    // 找到一个解，并且这个解没有交叉
    if (index < sumR.length && i + index <= len) {
      ans = Math.min(ans, i + index)
    }
  }
  return ans === Infinity ? -1 : ans
}

// 二分搜索
function bs(arr, target) {
  let head = 0, tail = arr.length - 1, mid
  while (head <= tail) {
    mid = (head + tail) >> 1
    if (arr[mid] === target) return mid
    if (arr[mid] < target) head = mid + 1
    else tail = mid - 1
  }
  return arr.length
}
```


## 进阶

1. [475. 供暖器](https://leetcode-cn.com/problems/heaters/)

```js
function findRadius(houses, heaters) {
  let ans = 0
  // 对供暖器进行排序
  heaters = heaters.sort((a, b) => a - b)
  for (let i = 0; i < houses.length; i++) {
    // 寻找第一个 >= 目标的元素（要比较该位置与前一个位置的距离更近的）
    const index = binary_search_0_1(heaters, item => item >= houses[i])

    ans = Math.max(
      ans,
      Math.min(
        Math.abs(heaters[index] - houses[i]),
        // index 可能等于数组最后一位元素的下一位
        Math.abs((heaters[index - 1] || Infinity) - houses[i])
      )
    )
  }

  return ans
}

function binary_search_0_1(arr, condition) {
  let head = 0, tail = arr.length - 1, mid
  while (head < tail) {
    mid = (head + tail) >> 1
    if (condition(arr[mid])) tail = mid
    else head = mid + 1
  }
  return head
}
```

2. [81. 搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

```js
function search(nums, target) {
  let head = l = 0, tail = r = nums.length - 1, mid
  // 看看首尾是否有目标元素
  if (nums[head] === target || nums[tail] === target) return true
  // 剔除首尾相同的元素
  while (nums[l] === nums[r] && l <= r) {
    if (nums[l] === target) return true
    l++
    r--
  }
  head = l
  tail = r
  // 二分
  while (l <= r) {
    mid = (l + r) >> 1
    if (nums[mid] === target) return true
    if (nums[mid] <= nums[tail]) { // 后半段
      if (target <= nums[tail] && target > nums[mid]) l = mid + 1
      else r = mid - 1
    } else { // 前半段
      if (target < nums[mid] && target >= nums[head]) r = mid - 1
      else l = mid + 1
    }
  }

  return false
}
```

3. [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

```js
// 将寻找中位数转变为寻找第 k 大的元素
function findMedianSortedArrays(nums1, nums2) {
  const l1 = nums1.length, l2 = nums2.length
  const mid = (l1 + l2 + 1) >> 1
  const a = findK(nums1, nums2, 0, 0, mid)
  if ((l1 + l2) % 2 === 1) return a
  const b = findK(nums1, nums2, 0, 0, mid + 1)
  return (a + b) / 2
}

// 二分法寻找两个数组中的第 k 大的元素
function findK(arr1, arr2, i, j, k) {
  const l1 = arr1.length, l2 = arr2.length
  // 边界判断
  if (i === l1) return arr2[j + k - 1]
  if (j === l2) return arr1[i + k - 1]
  if (k === 1) return Math.min(arr1[i], arr2[j])

  let m = Math.min(k >> 1, l1 - i)
  let n = Math.min(k - m, l2 - j)
  m = k - n
  if (arr1[i + m - 1] <= arr2[j + n - 1]) return findK(arr1, arr2, i + m, j, k - m)
  return findK(arr1, arr2, i, j + n, k - n)
}
```
