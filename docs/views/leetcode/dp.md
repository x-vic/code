---
title: 动态规划
---

## 经典问题

- [300. 最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

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

- [1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)

```js
function longestCommonSubsequence(s1, s2) {
  const l1 = s1.length, l2 = s2.length
  // 前 n 个子序列，因为前面有 0 个存在，所以初始化数字要在字符串长度基础上加 1
  const dp = Array(l1 + 1).fill(null).map(() => Array(l2 + 1).fill(0))
  // 这里省略了初始化 dp[0][0...n] = 0, dp[0...n][0] = 0

  for (let m = 1; m <= l1; m++) {
    for (let n = 1; n <= l2; n++) {
      // 前 m 个字符串的最后字符为 s[m - 1]
      // dp[m][n] 的状态只跟 dp[m - 1][n - 1]、dp[m - 1][n]、dp[m][n - 1] 有关
      if (s1[m - 1] === s2[n - 1]) {
        dp[m][n] = dp[m - 1][n - 1] + 1
        continue
      }
      dp[m][n] = Math.max(dp[m - 1][n], dp[m][n - 1])
    }
  }

  return dp[l1][l2]
}
```

- [887. 鸡蛋掉落](https://leetcode-cn.com/problems/super-egg-drop/)

```js
function superEggDrop(k, n) {
  // 定义 dp[k][m] k 个鸡蛋，扔 m 次，可以测试几层楼
  const dp = Array(k + 1).fill(null).map(() => Array(n + 1).fill(0))
  // base case 0 个鸡蛋、0 次尝试
  for (let i = 0; i <= k; i++) {
    dp[i][0] = 0
  }
  for (let i = 0; i <= n; i++) {
    dp[0][i] = 0
  }

  let m = 0
  // 因为最后求的解就在状态当中，所以使用 while 来找到解
  while (dp[k][m] < n) {
    m++
    for (let i = 1; i <= k; i++) {
      dp[i][m] = dp[i][m - 1] + dp[i - 1][m - 1] + 1
    }
  }

  return m
}
```


- [354. 俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes/)

```js
/**
思路：将问题转化为求解最长递增子序列
1. 先按照 w 顺序排列
2. w 相同的情况下，h 按照逆序排列（因为相同 w 不能嵌套）
3. 最后求解 h 的最长递增子序列
*/
function maxEnvelopes(envelopes) {
  const sortedEnvelopes = envelopes.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]
    return b[1] - a[1]
  })

  const len = sortedEnvelopes.length

  const dp = Array(len).fill(1)

  let ans = 1
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (sortedEnvelopes[i][1] > sortedEnvelopes[j][1])
        dp[i] = Math.max(dp[i], dp[j] + 1)
    }
    ans = Math.max(ans, dp[i])
  }

  return ans
}
```


## 单序列

- [完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

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

- [跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

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

- [跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)

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

- [分割回文串 II](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

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

- [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

```js
function maxSubArray(nums) {
  const len = nums.length
  // dp[i] 只跟 dp[i - 1] 有关，所以可以启用状态压缩
  let prevMax = nums[0]
  let ans = nums[0]

  for (let i = 1; i < len; i++) {
    // 状态转移：前面的最长序列 + 当前元素 和 当前元素单独组成序列
    prevMax = Math.max(prevMax + nums[i], nums[i])
    ans = Math.max(ans, prevMax)
  }

  return ans
}
```

- [152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)

```js
/**
乘法最大的最优子结构需要分情况讨论：
1、nums[i] 为正时，我们希望 nums[i - 1] 越大越好
2、nums[i] 为负时，我们希望 nums[i - 1] 越小越好
所以此处维护两个 dp，分别表示以 nums[i] 结尾的最大和最小乘积
 */
function maxProduct(nums) {
  const len = nums.length
  const maxDp = Array(len).fill(nums[0])
  const minDp = Array(len).fill(nums[0])

  let ans = nums[0]

  for (let i = 1; i < len; i++) {
    if (nums[i] > 0) {
      maxDp[i] = Math.max(maxDp[i - 1] * nums[i], nums[i])
      minDp[i] = Math.min(minDp[i - 1] * nums[i], nums[i])
    } else {
      maxDp[i] = Math.max(minDp[i - 1] * nums[i], nums[i])
      minDp[i] = Math.min(maxDp[i - 1] * nums[i], nums[i])
    }
    ans = Math.max(ans, maxDp[i])
  }

  return ans
}
```

## 打家劫舍系列

- [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

```js
function rob(nums) {
  const dp = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(
      (dp[i - 2] || 0) + nums[i],
      dp[i - 1]
    )
  }
  return dp[nums.length - 1]
}
```

- [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)

```js
function rob(nums) {
  function dp(start, end) {
    let [a, b] = [0, (nums[start] || 0)]
    for (let i = start + 1; i <= end; i++) {
      [a, b] = [
        b,
        Math.max(a + (nums[i] || 0), b)
      ]
    }
    return b
  }
  return Math.max(
    dp(0, nums.length - 2),
    dp(1, nums.length - 1)
  )
}
```

- [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)

```js
function rob(root) {
  const memo = new WeakMap()

  const subFunc = (root) => {
    if (root == null) return 0
    if (memo.has(root)) return memo.get(root)

    const res = Math.max(
      // 偷 root
      root.val + subFunc((root.left || {}).left) + subFunc((root.left || {}).right) + subFunc((root.right || {}).left) + subFunc((root.right || {}).right),
      // 不偷 root
      subFunc(root.left) + subFunc(root.right)
    )
    memo.set(root, res)
    return res
  }

  return subFunc(root)
}
```

## 股票系列

- [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

```js
// 这道题是最普世的
function maxProfit(k, prices) {
  const len = prices.length
  if (k > len >> 1) return maxProfit(len >> 1, prices)
  if (k === 0) return 0
  if (len === 0) return 0
  const dp = Array(len).fill(null).map(() => Array(k + 1).fill(null).map(() => Array(2).fill(null).map((_, i) => i)))
  // dp[-1][k][0] = 0 // 还没开始，利润为 0
  // dp[-1][k][1] = Number.MIN_SAFE_INTEGER // 还没开始就有了股票，不可能
  // dp[i][0][0] = 0 // 0 次交易，利润为 0
  // dp[i][0][1] = Number.MIN_SAFE_INTEGER // 0 次交易，就有了股票，不可能
  for (let i = 0; i < len; i++) {
    for (let j = 1; j <= k; j++) {
      // base case
      if (i - 1 === -1) {
        // dp[i][j][0] = Math.max(
        //   dp[-1][j][0], // 0
        //   dp[-1][j][1] + prices[i], // -∞
        // )
        dp[i][j][0] = 0
        // dp[i][j][1] = Math.max(
        //   dp[-1][j][1], // -∞
        //   dp[-1][j][0], // -prices[i]
        // )
        dp[i][j][1] = -prices[i]
        continue
      }
      // 还有一个状态，持有与不持有就不用循环了，直接写就好
      dp[i][j][0] = Math.max(
        dp[i - 1][j][0],
        // 为什么不是 j - 1，买入 + 卖出 = 一笔交易。而卖出时的交易数量是不会变的
        dp[i - 1][j][1] + prices[i]
      )
      dp[i][j][1] = Math.max(
        dp[i - 1][j][1],
        // 为什么是 j - 1，买入的时候，交易书减 1
        dp[i - 1][j - 1][0] - prices[i]
      )
    }
  }

  return dp[len - 1][k][0]
}
```

- [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```js
function maxProfit(prices) {
  const len = prices.length
  const k = 1
  const dp = Array(len).fill(null).map(() => Array(2).fill(null).map((_, i) => i))

  for (let i = 0; i < len; i++) {
    // base case
    if (i - 1 === -1) {
      // dp[i][1][0] = Math.max(
      //   dp[-1][1][0],  // 0
      //   dp[-1][1][1] + prices[0] // -∞
      // )
      dp[i][0] = 0
      // dp[i][1][1] = Math.max(
      //   dp[-1][1][1], // -∞
      //   dp[-1][1][0] - prices[0] // -prices[0]
      // )
      dp[i][1] = -prices[0]
      continue
    }
    dp[i][0] = Math.max(
      dp[i - 1][0],
      dp[i - 1][1] + prices[i]
    )
    dp[i][1] = Math.max(
      dp[i - 1][1],
      -prices[i]
    )
  }

  return dp[len - 1][0]
}
```

- [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

```js
// 本题因为不限制交易次数，所以 k 这个状态已经不需要了
function maxProfit(prices) {
  const len = prices.length
  const dp = Array(len).fill(null).map(() => Array(2).fill(null).map((_, i) => i))
  for (let i = 0; i < len; i++) {
    // base case
    if (i - 1 === -1) {
      // dp[0][j][0] = Math.max(
      //   dp[-1][j][0], // 0
      //   dp[-1][j][1] + prices[0] // -∞
      // )
      dp[0][0] = 0
      // dp[0][j][1] = Math.max(
      //   dp[-1][j][1], // -∞
      //   dp[-1][j - 1][0] - prices[0] // -prices[0]
      // )
      dp[0][1] = -prices[0]
      continue
    }
    dp[i][0] = Math.max(
      dp[i - 1][0],
      dp[i - 1][1] + prices[i]
    )
    dp[i][1] = Math.max(
      dp[i - 1][1],
      dp[i - 1][0] - prices[i]
    )
  }

  return dp[len - 1][0]
}
```

- [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

```js
function maxProfit(prices) {
  const len = prices.length
  const dp = Array(len).fill(null).map(() => Array(3).fill(null).map(() => Array(2).fill(null).map((_, i) => i)))

  for (let i = 0; i < len; i++) {
    for (let j = 1; j <= 2; j++) {
      // base case
      if (i - 1 === -1) {
        // dp[0][j][0] = Math.max(
        //   dp[-1][j][0], // 0
        //   dp[-1][j][1] + prices[0] // -∞
        // )
        dp[i][j][0] = 0
        // dp[0][j][1] = Math.max(
        //   dp[-1][j][1], // -∞
        //   dp[-1][j - 1][0] - prices[0] // -prices[0]
        // )
        dp[0][j][1] = -prices[0]
        continue
      }
      dp[i][j][0] = Math.max(
        dp[i - 1][j][0],
        dp[i - 1][j][1] + prices[i]
      )
      dp[i][j][1] = Math.max(
        dp[i - 1][j][1],
        dp[i - 1][j - 1][0] - prices[i]
      )
    }
  }

  return dp[len - 1][2][0]
}
```

- [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

```js
function maxProfit(prices) {
  const len = prices.length
  // const dp = Array(len).fill(null).map(() => Array(2).fill(null).map((_, i) => i))

  let dp_i_0 = 0, dp_i_1 = Number.MIN_SAFE_INTEGER, dp_pre_0 = 0 // 代表 dp[i - 2][0]

  for (let i = 0; i < len; i++) {
    // base case
    // if (i - 1 === -1) {
    //   // dp[i][0] = Math.max(
    //   //   dp[i - 1][0], // 0
    //   //   dp[i - 1][1] + prices[0] // -∞
    //   // )
    //   dp[i][0] = 0
    //   // dp[i][1] = Math.max(
    //   //   dp[i - 1][1], // -∞
    //   //   dp[i - 2][0] - prices[0] // -prices[0]
    //   // )
    //   dp[i][1] = -prices[0]
    //   continue
    // }
    // if (i - 2 === -1) {
    //   dp[i][0] = 0
    //   dp[i][1] = 0
    //   continue
    // }

    // dp[i][0] = Math.max(
    //   dp[i - 1][0],
    //   dp[i - 1][1] + prices[i]
    // )
    // dp[i][1] = Math.max(
    //   dp[i - 1][1],
    //   dp[i - 2][0] - prices[i]
    // )
    const temp = dp_i_0
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i])
    dp_pre_0 = temp
  }
  // return dp[len - 1][0]
  return dp_i_0
}
```

- [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

```js
function maxProfit(prices, fee) {
  const len = prices.length
  const dp = Array(len).fill(null).map(() => Array(2).fill(null).map((_, i) => i))
  
  for (let i = 0; i < len; i++) {
    // base case
    if (i - 1 === -1) {
      dp[i][0] = 0
      dp[i][1] = -prices[0] - fee
      continue
    }
    dp[i][0] = Math.max(
      dp[i - 1][0],
      dp[i - 1][1] + prices[i]
    )
    dp[i][1] = Math.max(
      dp[i - 1][1],
      dp[i - 1][0] - prices[i] - fee
    )
  }

  return dp[len - 1][0]
}
```

## 字符串匹配系列

- [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance/)

```js
function minDistance(s1, s2) {
  const l1 = s1.length, l2 = s2.length
  // 每个字符前面都加了空格，所以要加 1
  const dp = Array(l1 + 1).fill(null).map(() => Array(l2 + 1).fill(0))

  // base case
  for (let i = 1; i <= l1; i++) {
    dp[i][0] = i
  }
  for (let j = 1; j <= l2; j++) {
    dp[0][j] = j
  }

  for (let m = 1; m <= l1; m++) {
    for (let n = 1; n <= l2; n++) {
      // 这里的条件要注意，因为在前面补了空字符，所以索引都要 - 1
      if (s1[m - 1] === s2[n - 1]) {
        dp[m][n] = dp[m - 1][n - 1]
        continue
      }
      dp[m][n] = Math.min(
        dp[m - 1][n - 1],
        dp[m - 1][n],
        dp[m][n - 1]
      ) + 1
    }
  }

  return dp[l1][l2]
}
```

- [44. 通配符匹配](https://leetcode-cn.com/problems/wildcard-matching/)

```js
function isMatch(s, p) {
  const m = s.length, n = p.length
  const memo = {}
  const dp = (s, i, p, j) => {
    const key = `${i}-${j}`
    if (memo[key] != null) return memo[key]
    // 当 p === j 递归终止
    if (j >= n) {
      return i >= m
    }
    // 当 s === i 判断 剩下的 p 必须得全部是 *
    if (i >= m) {
      for (; j < n; j++) {
        if (p[j] !== '*') {
          return false
        }
      }
      return true
    }

    if (s[i] === p[j] || p[j] === '?') {
      // 下一个 p 是 *
      if (j + 1 < n && p[j + 1] === '*') {
        return memo[key] = dp(s, i + 2, p, j + 1) // 使用 * 抵消 1 个
          || dp(s, i + 1, p, j + 2) // 使用 * 抵消 0 个
      } else {
        return memo[key] = dp(s, i + 1, p, j + 1)
      }
    } else {
      // 当下是 * 
      if (j < n && p[j] === '*') {
        return memo[key] = dp(s, i + 1, p, j) // 使用 * 抵消 1 个
          || dp(s, i, p, j + 1) // 使用 * 抵消 0 个
      } else {
        return memo[key] = false
      }
    }
  }

  return dp(s, 0, p, 0)
}
```

- [10. 正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)

```js
function isMatch(s, p) {
  const m = s.length, n = p.length
  const memo = {}
  const dp = (s, i, p, j) => {
    if (memo[`${i}-${j}`] != null) return memo[`${i}-${j}`]
    // 当 p === j 递归终止
    if (j === n) {
      return i === m
    }
    // 当 s === i 判断 剩下的 p 是不是 a*b*  的形式
    if (i === m) {
      if ((n - j) % 2 === 1) {
        return memo[`${i}-${j}`] = false
      }
      for (; j + 1 < n; j += 2) {
        if (p[j + 1] !== '*') {
          return memo[`${i}-${j}`] = false
        }
      }
      return memo[`${i}-${j}`] = true
    }

    if (s[i] === p[j] || p[j] === '.') {
      // 下一个 p 是不是 *
      if (p[j + 1] === '*') {
        return memo[`${i}-${j}`] = dp(s, i, p, j + 2) // 没有取 *
          || dp(s, i + 1, p, j) // 取了 *
      } else {
        return memo[`${i}-${j}`] = dp(s, i + 1, p, j + 1)
      }
    } else {
      // 下一个如果是 * 就可以跳过两个
      if (j < n - 1 && p[j + 1] === '*') {
        return memo[`${i}-${j}`] = dp(s, i, p, j + 2)
      } else {
        return memo[`${i}-${j}`] = false
      }
    }
  }
  return dp(s, 0, p, 0)
}
```

## 区间DP

- [516. 最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)

```js
// 这里的子序列不要求是连续的
function longestPalindromeSubseq(s) {
  const len = s.length
  // 空字符，回文串长度为 0
  const dp = Array(len).fill(null).map(() => Array(len).fill(0))

  for (let i = len - 1; i >= 0; i--) {
    // base case 一个元素下长度为 1
    dp[i][i] = 1
    for (j = i + 1; j < len; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2
      } else {
        dp[i][j] = Math.max(
          dp[i + 1][j],
          dp[i][j - 1]
        )
      }
    }
  }
  
  return dp[0][len - 1]
}
```

- [730. 统计不同回文子序列](https://leetcode-cn.com/problems/count-different-palindromic-subsequences/)

```js
function countPalindromicSubsequences(s) {
  const len = s.length
  const mod = Math.pow(10, 9) + 7
  const words = ['a', 'b', 'c', 'd']
  const dp = Array(4).fill(null).map(() => Array(len).fill(null).map(() => Array(len).fill(0)))

  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      for (let k = 0; k < 4; k++) {
        const word = words[k]
        // i === j
        if (i === j) {
          // base case 有且仅有一个字母
          dp[k][i][j] = s[i] === word ? 1 : 0
          continue
        }
        // i < j
        if (s[i] !== word) {
          dp[k][i][j] = dp[k][i + 1][j]
        } else if (s[j] !== word) {
          dp[k][i][j] = dp[k][i][j - 1]
        } else { // s[i] === s[j] === word
          if (i + 1 === j) {
            // base case 有且仅有两字母相同的情况
            dp[k][i][j] = 2
          } else {
            // dp[k][i][j] = 2 + 循环四个字母相加
            dp[k][i][j] = 2
            for (let l = 0; l < 4; l++) {
              dp[k][i][j] += dp[l][i + 1][j - 1]
              dp[k][i][j] %= mod
            }
          }
        }
      }
    }
  }

  let ans = 0
  for (let k = 0; k < 4; k++) {
    ans += dp[k][0][len - 1]
    ans %= mod
  }

  return ans
}
```

- [1039. 多边形三角剖分的最低得分](https://leetcode-cn.com/problems/minimum-score-triangulation-of-polygon/)

```js
function minScoreTriangulation(values) {
  const len = values.length
  if (len === 0) return 0
  // dp[i][j] 表示 i、j 区间的最低分
  const dp = Array(len).fill(null).map(() => Array(len).fill(0))

  for (let i = len - 2; i >= 0; i--) {
    for (let j = i + 2; j < len; j++) {
      for (let m = i + 1; m < j; m++) {
        if (dp[i][j] === 0) { // i、j 相邻
          dp[i][j] = values[i] * values[j] * values[m] + dp[i][m] + dp[m][j]
        } else {
          dp[i][j] = Math.min(
            dp[i][j],
            values[i] * values[j] * values[m] + dp[i][m] + dp[m][j]
          )
        }
      }
    }
  }

  return dp[0][len - 1]
}
```

- [664. 奇怪的打印机](https://leetcode-cn.com/problems/strange-printer/)

```js
function strangePrinter(s) {
  const len = s.length
  // 不合法的区间不需要打印，所以赋值为 0
  const dp = Array(len).fill(null).map(() => Array(len).fill(0))

  // 从下往上遍历会让区间由小变大
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      // base case
      if (i === j) {
        dp[i][j] = 1
        continue
      }
      if (s[i] === s[j]) {
        dp[i][j] = dp[i][j - 1]
      } else {
        let res = Number.MAX_SAFE_INTEGER
        // 遍历区间中的每一个位置，找到最小值
        for (let m = i; m < j; m++) {
          res = Math.min(
            res,
            dp[i][m] + dp[m + 1][j]
          )
        }
        dp[i][j] = res
      }
    }
  }

  return dp[0][len - 1]
}
```

- [312. 戳气球](https://leetcode-cn.com/problems/burst-balloons/)

```js
function maxCoins(nums) {
  // 在 nums 的首尾各加上一个虚拟气球 数字为 1
  const options = [1, ...nums, 1]
  const len = options.length
  const dp = Array(len).fill(null).map(() => Array(len).fill(0))

  // 自下往上遍历
  for (let i = len - 1; i >= 0; i--) {
    // 取的是 dp[i][j] 的开区间
    for (let j = i + 1; j < len; j++) {
      // 最后戳破的气球是哪一个（取不到 i、j）
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + options[i] * options[j] * options[k]
        )
      }
    }
  }

  return dp[0][len - 1]
}
```

## 背包DP

- [416. 分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

```js
function canPartition(nums) {
  const len = nums.length
  const sum = nums.reduce((prev, curr) => prev + curr)
  if (sum % 2 !== 0 || len < 2) return false
  const target = sum >> 1
  // 前 i 个元素能不能凑齐 target
  const dp = Array(len + 1).fill(null).map(() => Array(target + 1).fill(false))
  // base case 前 0 个元素，怎么都不能凑
  for (let m = 0; m <= len; m++) {
    dp[m][0] = true
  }

  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= target; j++) {
      // 不选择该元素
      dp[i][j] = dp[i - 1][j]
      // 可以放入该元素（注意这里取的下标是 i - 1）
      if (j >= nums[i - 1]) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
      }
    }
  }

  return dp[len][target]
}
```

- [494. 目标和](https://leetcode-cn.com/problems/target-sum/)

```js
function findTargetSumWays(nums, target) {
  const len = nums.length
  const sum = nums.reduce((sum, num) => sum + num)
  if ((sum - target) % 2 !== 0) return 0
  target = (sum - target) >> 1
  // 凑不出个负数
  if (target < 0) return 0
  const dp = Array(len + 1).fill(null).map(() => Array(target + 1).fill(0))

  // base case （因为元素中可能会有 0 存在，所以 只能确定 dp[0][0]）
  dp[0][0] = 1

  for (let i = 1; i <= len; i++) {
    for (let j = 0; j <= target; j++) {
      dp[i][j] = dp[i - 1][j]
      // 注意：这里取的下标是 i - 1
      if (nums[i - 1] <= j) {
        dp[i][j] += dp[i - 1][j - nums[i - 1]]
      }
    }
  }

  return dp[len][target]
}
```

- [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

```js
function coinChange(coins, amount) {
  const len = coins.length
  // 因为状态转移需要通过 Math.min 来择优，所以赋初始值为 Infinity
  const dp = Array(len + 1).fill(null).map(() => Array(amount + 1).fill(Infinity))

  // base case 凑成 0，最少需要 0 个硬币
  for (let m = 0; m <= len; m++) {
    dp[m][0] = 0
  }

  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= amount; j++) {
      // 不放入，继承前一次的结果
      dp[i][j] = dp[i - 1][j]
      // 可以放入
      if (j - coins[i - 1] >= 0) {
        dp[i][j] = Math.min(
          dp[i][j],
          // 这里是 i 而不是 i - 1 是因为这里的硬币可以取多次
          dp[i][j - coins[i - 1]] + 1
        )
      }
    }
  }

  return dp[len][amount] === Infinity ? -1 : dp[len][amount]
}
```

- [518. 零钱兑换 II](https://leetcode-cn.com/problems/coin-change-2/)

```js
function change(amount, coins) {
  const len = coins.length
  const dp = Array(len + 1).fill(null).map(() => Array(amount + 1).fill(0))

  for (let m = 0; m <= len; m++) {
    dp[m][0] = 1
  }

  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= amount; j++) {
      // 不放
      dp[i][j] = dp[i - 1][j]
      // 放
      if (j - coins[i - 1] >= 0) {
        dp[i][j] += dp[i][j - coins[i - 1]]
      }
    }
  }

  return dp[len][amount]
}
```

 - [474. 一和零](https://leetcode-cn.com/problems/ones-and-zeroes/)

 ```js
 function findMaxForm(strs, m, n) {
  const len = strs.length
  // base case: dp[i][0][k] = dp[i][j][0] = 0
  const dp = Array(len + 1).fill(null).map(() => Array(m + 1).fill(null).map(() => Array(n + 1).fill(0)))

  for (let i = 1; i <= len; i++) {
    // 统计 0 和 1 的个数
    const [zero, one] = calStr(strs[i - 1])
    for (let j = 0; j <= m; j++) {
      for (let k = 0; k <= n; k++) {
        // 不选择
        dp[i][j][k] = dp[i - 1][j][k]
        // 选择
        if (j - zero >= 0 && k - one >= 0) {
          dp[i][j][k] = Math.max(
            dp[i][j][k],
            dp[i - 1][j - zero][k - one] + 1
          )
        }
      }
    }
  }

  return dp[len][m][n]
}

function calStr (str) {
  const res = [0, 0]
  for (let i = 0; i < str.length; i++) {
    res[str[i]] = res[str[i]] + 1
  }
  return res
}
 ```

## 树形DP

- [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

```js
function maxPathSum(root) {
  // 对于以 root 为根的节点来说，最大路径和在 root || root + left || root + right || root + left + right 中选择最大值

  let ans = Number.MIN_SAFE_INTEGER
  const memo = new WeakMap()

  const subFunc = (root) => {
    if (root == null) return 0
    if (memo.has(root)) return memo.get(root)
    
    // 以该节点为根的最大结果
    let subAns = Math.max(
      root.val,
      root.val + subFunc(root.left),
      root.val + subFunc(root.right),
      root.val + subFunc(root.left) + subFunc(root.right)
    )
    ans = Math.max(ans, subAns)
    // 左右两边的路径，只能选择其中一条或者一条都不选
    let res = Math.max(
      root.val,
      root.val + subFunc(root.left),
      root.val + subFunc(root.right),
    )
    memo.set(root, res)
    return res
  }

  subFunc(root)
  return ans
}
```

 - [543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

 ```js
 function diameterOfBinaryTree(root) {
  let ans = 0
  const memo = new WeakMap()

  // 返回以 root 为根节点贡献的节点个数
  const subFunc = (root) => {
    if (root == null) return 0
    if (memo.has(root)) return memo.get(root)

    const leftNodes = subFunc(root.left)
    const rightNodes = subFunc(root.right)

    // 统计结果需要三方相加
    const _ans = 1 + leftNodes + rightNodes
    ans = Math.max(ans, _ans)

    // 返回结果只需要左右其中一边
    const res = Math.max(
      leftNodes,
      rightNodes
    ) + 1
    memo.set(root, res)

    return res
  }

  subFunc(root)
  return ans - 1
}
```

## 状态压缩DP

- [464. 我能赢吗](https://leetcode-cn.com/problems/can-i-win/)

```js
// 首先我们把问题倒过来思考，不是累加到 100，而是从 100 开始取数，能否最后一个取完。
function canIWin(maxChoosableInteger, desiredTotal) {
  // 取一次最大值直接获胜
  if (maxChoosableInteger >= desiredTotal) return true
  // 一个人把所有的数都拿出来还不能凑齐，则直接判定不能赢
  if (maxChoosableInteger * (maxChoosableInteger + 1) / 2 < desiredTotal) return false

  const memo = []
  
  const subFunc = (target, state) => {
    if (memo[state] != null) return memo[state]
    // 一个数一个数地尝试
    for (let i = maxChoosableInteger; i >= 1; i--) {
      // 将第 i 位（二进制位）标记为 1（已选择）
      const curr = 1 << i
      // 已经抽过这个数（两个数的第 i 位都是 1）
      if (curr & state) continue
      if (i >= target) return memo[state] = true
      // 下一轮对手选择，所以要取反
      if (!subFunc(target - i, state | curr)) return memo[state] = true
    }
    return memo[state] = false
  }

  return subFunc(desiredTotal, 0)
}
```

- [526. 优美的排列](https://leetcode-cn.com/problems/beautiful-arrangement/)

```js
function countArrangement(n) {
  let ans = 0
  // 使用二进制位来标记该元素是否被使用
  const visited = 0

  const subFunc = (n, pos = 1, visited) => {
    // 可以走到最后，说明符合题意
    if (pos > n) return ++ans
    for (let i = 1; i <= n; i++) {
      const curr = 1 << i
      if (!(visited & curr) && (i % pos === 0 || pos % i === 0)) {
        subFunc(n, pos + 1, visited | curr)
      }
    }
  }
  
  subFunc(n, 1, visited)
  return ans
}
```

- [935. 骑士拨号器](https://leetcode-cn.com/problems/knight-dialer/)

```js
function knightDialer(n) {
  // 分别代表了 0 ～ 9 之间能到达的数字。例如：0 能到达 4、6
  const paths = [[4, 6], [6, 8], [7, 9], [4, 8], [3, 9, 0], [], [1, 7, 0], [2, 6], [1, 3], [4, 2]]
  const mod = 1000000007
  // dp[i][j] 代表 i 步达到数字 j 有多少走法
  const dp = Array(n).fill(null).map(() => Array(10).fill(0))

  // base case 走 0 步，只有一条路径
  for (let m = 0; m < 10; m++) {
    dp[0][m] = 1
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 10; j++) {
      // 累计 10 个数字到达 j 的所有走法
      for (let k = 0; k < paths[j].length; k++) {
        dp[i][j] = (dp[i][j] + dp[i - 1][paths[j][k]]) % mod
      }
    }
  }

  let ans = 0
  for (let v = 0; v < 10; v++) {
    ans = (ans + dp[n - 1][v]) % mod
  }
  return ans
}
```

## 路径类

- [64. 最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

```js
function minPathSum (grid) {
  const row = grid.length
  const col = grid[0].length
  const dp = Array(row).fill('').map(_ => Array(col))
  // 初始化 dp
  for (let i = 0, sum = 0; i < col; i++) {
    sum += grid[0][i]
    dp[0][i] = sum
  }
  for (let i = 0, sum = 0; i < row; i++) {
    sum += grid[i][0]
    dp[i][0] = sum
  }
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j],
        dp[i][j - 1]
      ) + grid[i][j]
    }
  }
  return dp[row - 1][col - 1]
}
```

- [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)

```js
function minimumTotal(triangle) {
  // 将这个三角形倒置，我们要求的问题便成了到终点 2 的最小路径
  const row = triangle.length
  const col = triangle[triangle.length - 1].length
  const dp = Array(row).fill('').map(_ => Array(col))
  // 初始化 dp，最底下那层的路径便是元素自身
  for (let i = 0; i < col; i++) {
    dp[row - 1][i] = triangle[row - 1][i]
  }
  // 从下往上遍历（从倒数第二层开始往上走）
  for (let i = row - 2; i >=0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[i][j] = Math.min(
        dp[i + 1][j],
        dp[i + 1][j + 1]
      ) + triangle[i][j]
    }
  }
  return dp[0][0]
}
```

- [931. 下降路径最小和](https://leetcode-cn.com/problems/minimum-falling-path-sum/)

```js
function minFallingPathSum(matrix) {
  const row = matrix.length
  const col = matrix[0].length
  // 往左右各添加一个极限大的一列值，防止数组越界
  const dp = Array(row).fill('').map(_ => Array(col + 2))
  // 初始化 dp，第一行为矩阵的第一行元素，首尾两列为无限大
  for (let i = 1; i < col + 1; i++) {
    dp[0][i] = matrix[0][i - 1]
  }
  for (let j = 0; j < row; j++) {
    dp[j][0] = dp[j][col + 1] = Number.MAX_VALUE
  }
  for (let m = 1; m < row; m++) {
    for (let n = 1; n < col + 1; n++) {
      dp[m][n] = Math.min(
        dp[m - 1][n - 1],
        dp[m - 1][n],
        dp[m - 1][n + 1],
      ) + matrix[m][n - 1]
    }
  }
  return Math.min(...dp[row -1])
}
```

- [1289. 下降路径最小和  II](https://leetcode-cn.com/problems/minimum-falling-path-sum-ii/)

```js
function minFallingPathSum (matrix) {
  const row = matrix.length
  const col = matrix[0].length
  // 往左右各添加一个极限大的一列值，防止数组越界
  const dp = Array(row).fill('').map(_ => Array(col + 2))
  // 初始化 dp，第一行为矩阵的第一行元素，首尾两列为无限大
  for (let i = 1; i < col + 1; i++) {
    dp[0][i] = matrix[0][i - 1]
  }
  for (let j = 0; j < row; j++) {
    dp[j][0] = dp[j][col + 1] = Number.MAX_VALUE
  }
  for (let m = 1; m < row; m++) {
    for (let n = 1; n < col + 1; n++) {
      dp[m][n] = Math.min(
        ...[...dp[m - 1].slice(0, n), ...dp[m - 1].slice(n + 1)],
      ) + matrix[m][n - 1]
    }
  }
  return Math.min(...dp[row -1])
}
```

- [1301. 最大得分的路径数目](https://leetcode-cn.com/problems/number-of-paths-with-max-score/)

```js
function pathsWithMaxScore(board) {
  let res = [Math.log(0), 0]

  const len = board.length
  const dp = board.map(str => str.split(''))
  const pathes = board.map(_ => Array(len).fill(0))
  const times = board.map(_ => Array(len).fill(1))
  // 初始化 dp，最后一行和最后一列为原数组累加值，E、S为0，X为无限小
  dp[0][0] = dp[len - 1][len - 1] = 0
  // 初始化 X
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      pathes[i][j] = [[board[i][j]]]
      if (dp[i][j] === 'X') {
        dp[i][j] = Math.log(0)
      }
    }
  }
  // 初始化最后一行
  for (let i = len - 2, sum = 0; i >=0; i--) {
    sum += Number(dp[len - 1][i])
    dp[len - 1][i] = sum
  }
  // 初始化最后一列
  for (let i = len - 2, sum = 0; i >=0; i--) {
    sum += Number(dp[i][len - 1])
    dp[i][len - 1] = sum
  }
  // 状态转移
  for (let m = len - 2; m >= 0; m--) {
    for (let n = len - 2; n >= 0; n--) {
      res[0] = dp[m][n] = Math.max(
        dp[m + 1][n],
        dp[m + 1][n + 1],
        dp[m][n + 1],
      ) + Number(dp[m][n])
      times[m][n] = getTimes(times, board, dp, m, n)
    }
  }
  if (dp[0][0] === Math.log(0)) return [0, 0]
  return [dp[0][0], times[0][0]]
}

function getTimes(times, board, dp, m, n) {
  const arr = [dp[m + 1][n], dp[m + 1][n + 1], dp[m][n + 1]]
  let res = 0
  const max = Math.max(...arr)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === max) {
      if (i === 0) {
        res += times[m + 1][n]
      }
      if (i === 1) {
        res += times[m + 1][n + 1]
      }
      if (i === 2) {
        res += times[m][n + 1]
      }
      
    }
  }
  return res % (10 ** 9 + 7)
}

function getPathes(pathes, board, dp, m, n) {
  const arr = [dp[m + 1][n], dp[m + 1][n + 1], dp[m][n + 1]]
  let res = []
  const max = Math.max(...arr)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === max) {
      if (i === 0) {
        res.push(...pathes[m + 1][n].map(item => [...item, board[m][n]]))
      }
      if (i === 1) {
        res.push(...pathes[m + 1][n + 1].map(item => [...item, board[m][n]]))
      }
      if (i === 2) {
        res.push(...pathes[m][n + 1].map(item => [...item, board[m][n]]))
      }
      
    }
  }
  return res
}
```

