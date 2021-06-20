---
title: 回溯法
---

1. [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

```js
function letterCombinations(digits) {
  const res = []
  const dict = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'qprs',
    8: 'tuv',
    9: 'wxyz'
  }
  // 子函数，i: 第几个数字， str: 之前累计的字符串
  const findComb = (digits, i, str) => {
    if (i === digits.length) return res.push(str)
    const letters = dict[digits[i]]
    for (let j = 0; j < letters.length; j++) {
      findComb(digits, i + 1, str + letters[j])
    }
    return res
  }

  if (digits.length <= 0) return res
  return findComb(digits, 0, '')
}
```

2. [46. 全排列](https://leetcode-cn.com/problems/permutations/)

```js
function permute (nums) {
  const res = []

  // _nums 可选的数字， ans 之前积累的答案
  function backtrack(_nums, ans = []) {
    if (_nums.length === 0) return res.push(ans)
    for (let i = 0; i < _nums.length; i++) {
      // ans.push(_nums[i]) // 做选择
      backtrack(_nums.slice(0, i).concat(_nums.slice(i + 1)), [...ans, _nums[i]])
    }
  }
  backtrack(nums)
  return res
}
```

3. [77. 组合](https://leetcode-cn.com/problems/combinations/)

```js
function combine(n, k) {
  const ans = []
  // 边界判断
  if (n < k) return ans

  // index 取到了第几个；
  const subCombine = (n, index = 1, k, res = []) => {
    if (res.length === k) return ans.push([...res])
    for (let i = index; i <= n; i++) {
      res.push(i)
      subCombine(n, i + 1, k, res)
      res.pop()
    }
  }

  subCombine(n, 1, k)
  return ans
}
```

4. [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)

```js
function combinationSum(candidates, target) {
  const ans = []

  const combSum = (index = 0, sum = 0, res = []) => {
    if (sum === target) return ans.push([...res])
    if (sum > target) return
    for (let i = index; i < candidates.length; i++) {
      res.push(candidates[i])
      sum += candidates[i]
      combSum(i, sum, res)
      res.pop()
      sum -= candidates[i]
    }
  }

  combSum()
  return ans
}
```

5. [216. 组合总和 III](https://leetcode-cn.com/problems/combination-sum-iii/)

```js
function combinationSum3(k, n) {
  const nums = [1,2,3,4,5,6,7,8,9]
  const ans = []

  const subCombine = (index = 0, sum = 0, res = []) => {
    // 终止条件
    if (sum === n && res.length === k) return ans.push([...res])
    if (sum > n || res.length > k) return

    for (let i = index; i < nums.length; i++) {
      res.push(nums[i])
      sum += nums[i]
      subCombine(i + 1, sum, res)
      res.pop()
      sum -= nums[i]
    }
  }

  subCombine()
  return ans
}
```

6. [78. 子集](https://leetcode-cn.com/problems/subsets/)

```js
function subsets(nums) {
  const ans = []

  const subFunc = (index = 0, res = []) => {
    ans.push([...res])
    if (index > nums.length) return

    for (let i = index; i < nums.length; i++) {
      res.push(nums[i])
      subFunc(i + 1, res)
      res.pop()
    }
  }

  subFunc()
  return ans
}
```

7. [131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

```js
function partition(s) {
  const ans = []
  // 剩余待分割的 str, 前面累计的结果
  const subFunc = (str = s, res = []) => {
    if (str === '') ans.push([...res])

    // 从第一个位置开始截取（含头不含尾，所以 i 可以去到 length 的后一位）
    for (let i = 1; i <= str.length; i++) {
      const leftHalf = str.slice(0, i)
      // 已经截取的字符如果非法，则直接尝试下一种截法
      if (!judge(leftHalf)) continue
      const rightHalf = str.slice(i)
      res.push(leftHalf)
      subFunc(rightHalf, res)
      res.pop()
    }
  }
  subFunc()
  return ans
}

function judge(s) {
  const len = s.length
  if (len <= 1) return true
  const midIndex = Math.floor(len / 2)
  for (let i = 0; i < midIndex; i++) {
    if (s[i] !== s[len - 1 - i]) return false
  }
  return true
}
```
