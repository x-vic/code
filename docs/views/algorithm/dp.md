---
title: 动态规划
---

## 单序列

1. [完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

```js
function numSquares(n) {
  const dp = Array(n + 1).fill(Number.MAX_SAFE_INTEGER)
  dp[0] = 0, dp[1] = 1

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j < n; j++) {
      // 拆出一个 
      if (j * j > i) break
      dp[i] = Math.min(dp[i], 1 + dp[i - j * j])
    }
  }

  return dp[n]
}
```

2. [跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

```js
function canJump(nums) {
  const len = nums.length
  // 能否到达索引为 i
  const dp = Array(len).fill(false)
  dp[0] = true

  for (let i = 1; i < nums.length; i++) {
    // 扫描以前能达到的位置，加上能跳的最大距离，看能否到达当前位置
    for (let j = i - 1; j >= 0; j--) {
      if (dp[j] && j + nums[j] >= i) {
        dp[i] = true
        continue
      }
    }
  }

  return dp[len - 1]
}
```

3. [跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)

```js
function jump(nums) {
  const len = nums.length
  // 走到第 i 个索引，最少需要多少步
  const dp = Array(len).fill(len - 1)
  dp[0] = 0

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      // nums[j] 如果一步还跨不到终点，那就让 nums[j + 1] 继续尝试，我们只需要找那些能一步跨到终点的解即可，因为这些解已经包含了那些不能一步跨越的解
      if (nums[j] >= i - j) {
        dp[i] = Math.min(dp[i], dp[j] + 1)
        // 由于 dp[i] 的结果是单调递增的，所以我们只需要取第一个能跨越终点的解即可
        break
      }
    }
  }
  return dp[len - 1]
}
```

4. [分割回文串 II](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

```js
function minCut(s) {
  const len = s.length

  // 动态规划得到任意区间是否为回文字符串
  const dp1 = Array(len).fill(null).map(() => Array(len).fill(true))
  for (let m = len - 2; m >= 0; m--) {
    for (let n = m + 1; n < len ; n++) {
      dp1[m][n] = (s[m] === s[n]) && dp1[m + 1][n - 1]
    }
  }

  // 分割前 i 个字符，最少需要多少次
  dp = Array(len).fill(len)
  dp[0] = 0

  for (let i = 1; i < len; i++) {
    // 0, i 本身已是一个回文，此时不需要进行分割
    if (dp1[0][i]) {
      dp[i] = 0
      continue
    }
    for (let j = 0; j <= i; j++) {
      // 找到从后往前找到的回文字符串，最后 dp[j - 1] + 1 即可
      if (dp1[j][i]) {
        dp[i] = Math.min(dp[i], dp[j - 1] + 1)
      }
    }
  }

  return dp[len - 1]
}
```

5. [最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

```js
function lengthOfLIS(nums) {
  const len = nums.length
  // dp[i] 表示以 nums[i] 这个数为结尾的最长递增子序列
  const dp = Array(len).fill(1)
  let ans = 1

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j])
        dp[i] = Math.max(dp[i], dp[j] + 1)
    }
    ans = Math.max(ans, dp[i])
  }

  return ans
}
```
