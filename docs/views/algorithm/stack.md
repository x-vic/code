---
title: 递归与栈
---

1. [#946 验证栈序列](https://leetcode-cn.com/problems/validate-stack-sequences/)

```js
function validateStackSequences(pushed, popped) {
  // 两个长度不同，直接判 false
  if (pushed.length !== popped.length) return false
  const len = pushed.length
  // 两个序列都是空
  if (len === 0) return true
  const stack = []
  stack.push(pushed.shift())
  for (let i = 0; i < 2 * len - 1; i++) {
    // 判断栈顶元素与第二个序列的第一个元素是否相等
    if (stack[stack.length - 1] === popped[0]) {
      stack.pop()
      popped.shift()
    } else {
      stack.push(pushed.shift())
    }
  }
  return stack.length === 0
}
```

2. [#20 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

```js
```

3. [#1021 删除最外层的括号](https://leetcode-cn.com/problems/remove-outermost-parentheses/)

```js
```

4. [#1249 移除无效的括号](https://leetcode-cn.com/problems/minimum-remove-to-make-valid-parentheses/)

利用计数器对左括号进行计数，数字大于 0 时，右括号才是有效的
```js
function minRemoveToMakeValid(s) {
  let count = 0
  // 从左往右遍历，删除多余右括号
  let res1 = ''
  for (let i = 0; i < s.length; i++) {
    // 左括号入栈
    if (s[i] === '(') {
      count++
      res1 += s[i]
      continue
    }
    if (s[i] === ')') {
      if (count > 0) {
        count--
        res1 += s[i]
      }
      continue
    }
    res1 += s[i]
  }
  count = 0
  // 从右往左遍历，删除多余左括号
  let res2 = ''
  for (let i = res1.length - 1; i >= 0; i--) {
    // 左括号入栈
    if (res1[i] === ')') {
      count++
      res2 = res1[i] + res2
      continue
    }
    if (res1[i] === '(') {
      if (count > 0) {
        res2 = res1[i] + res2
        count--
      }
      continue
    }
    res2 = res1[i] + res2
  }
  return res2
}
```

5. [#145 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)
```js
function postorderTraversal(root, res = []) {
  if (root == null) return []
  const stack = [root]
  while (stack.length) {
    const item = stack.pop()
    if (typeof item === "number") {
      res.push(item)
      continue
    }
    if (item == null) continue
    if (item.val) {
      stack.push(item.val, item.right, item.left)
    }
  }
  return res
}
```

6. [#331 验证二叉树的前序序列化](https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/)

关键在于将 `3##` 这样的序列融合成 `#`
```js
function isValidSerialization(preorder) {
  // 一个数字后面跟两个 # 的可以合并为一个 #
  const stack = []
  for (let i = 0; i < preorder.length; i++) {
    if (preorder[i] !== ',') {
      // 处理多位数字的情况，只将最后一位数字推入栈
      if(preorder[i + 1] !== '#' && preorder[i + 1] !== undefined && preorder[i + 1] !== ',') {
        continue
      }
      // 入栈
      stack.push(preorder[i])
      // 判断栈顶三个元素是否符合 数字、#、#
      while (stack[stack.length - 1] === '#' && stack[stack.length - 2] === '#' && stack[stack.length - 3] !== '#' && stack[stack.length - 3] !== undefined) {
        stack.pop()
        stack.pop()
        stack.pop()
        stack.push('#')
      }
    }
  }
  return stack.length === 1 && stack[0] === '#'
}
```

7. [#227 基本计算器 II](https://leetcode-cn.com/problems/basic-calculator-ii/)
