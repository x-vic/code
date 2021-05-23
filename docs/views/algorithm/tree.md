---
title: 二叉树
---

## 基本操作

1. [#144 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```js
function preorderTraversal(root, res = []) {
  if (root == null) return []
  res.push(root.val)
  preorderTraversal(root.left, res)
  preorderTraversal(root.right, res)
  return res
}
```

2. [#589 N 叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)

```js
function preorder(root, res = []) {
  if (root == null) return []
  res.push(root.val)
  for (let i = 0; i < root.children.length; i++) {
    preorder(root.children[i], res)
  }
  return res
}
```

3. [#226 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

```js
function invertTree(root) {
  if (root == null) return root
  const right = invertTree(root.right)
  const left = invertTree(root.left)
  root.left = right
  root.right = left
  return root
}
```

4. [#剑指 Offer 32 - II 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

递归的时候，传入层级信息
```js
function levelOrder(root, res = [], level = 0) {
  if (root == null) return []
  if ((res[level] || []).length) {
    res[level].push(root.val)
  } else {
    res[level] = [root.val]
  }
  levelOrder(root.left, res, level + 1)
  levelOrder(root.right, res, level + 1)
  return res
}
```

5. [#107 二叉树的层序遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

自底向上层序遍历，利用 `res.length - 1 - level`
```js
function levelOrderBottom(root, res = [], level = 0) {
  if (root == null) return []
  // 已经存有这层的数据
  if (res.length > level) {
    res[res.length - 1 - level].push(root.val)
  } else {
    res.unshift([root.val])
  }
  levelOrderBottom(root.left, res, level + 1)
  levelOrderBottom(root.right, res, level + 1)
  return res
}
```

6. [#103 二叉树的锯齿形层序遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

```js
function zigzagLevelOrder(root, res = [], level = 0, order = true) {
  if (root == null) return []
  // 已经存在该层元素
  if ((res[level] || []).length) {
    if (order) {
      res[level].push(root.val)
    } else {
      res[level].unshift(root.val)
    }
  } else {
    res[level] = [root.val]
  }
  zigzagLevelOrder(root.left, res, level + 1, !order)
  zigzagLevelOrder(root.right, res, level + 1, !order)
  return res
}
```


## 进阶操作

1. [#110 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

```js
function isBalanced(root) {
  // 重新定义这个函数的功能，如果不平衡，则返回一个负的高度
  const getHeight = (root) => {
    if (root == null) return 0
    const lHeight = getHeight(root.left)
    const rHeight = getHeight(root.right)
    // 左右子树任意一颗已经不平衡了
    if (lHeight < 0 || rHeight < 0) return -1
    // 以当前节点为根节点的二叉树已经不平衡了
    if (Math.abs(lHeight - rHeight) > 1) return -1
    return Math.max(lHeight, rHeight) + 1
  }

  return getHeight(root) >= 0
}
```

2. [#112 路径总和](https://leetcode-cn.com/problems/path-sum/)

```js
function hasPathSum(root, targetSum, sum = 0) {
  if (root == null) return false
  // 处理 [], 0 的案例
  if (root.left == null && root.right == null) {
    if (targetSum === sum + root.val) return true
    return false
  }
  return hasPathSum(root.left, targetSum, sum + root.val) || hasPathSum(root.right, targetSum, sum + root.val)
}
```

3. [#105 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```js
function buildTree(preorder, inorder) {
  return build(
    preorder, 
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1,
  )
}

function build(
  preorder, 
  preStart = 0,
  preEnd = preorder.length - 1,
  inorder,
  inStart = 0,
  inEnd = inorder.length - 1,
) {
  // 递归终止条件
  if (preStart > preEnd) return null

  // 获取根结点值
  const rootVal = preorder[preStart]

  // 遍历中序数组获取左子树的节点数
  let index = -1
  for (let i = inStart; i <= inEnd; i++) {
    if (inorder[i] === rootVal) {
      index = i
      break
    }
  }
  const leftSize = index - inStart

  // 构造根结点，递归构造左右子树
  const root = new TreeNode(rootVal)
  root.left = build(
    preorder, preStart + 1, preStart + leftSize,
    inorder, inStart, index - 1,
  )
  root.right = build(
    preorder, preStart + leftSize + 1, preEnd,
    inorder, index + 1, inEnd,
  )

  // 返回根结点
  return root
}
```

4. [#222 完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

```js
// 这种算法不太好，有更优解法
function countNodes(root) {
  if (root == null) return 0
  return countNodes(root.left) + countNodes(root.right) + 1
}
```

5. [#剑指 Offer 54 二叉搜索树的第 k 大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

```js
function kthLargest(root, k) {
  let count = 0, res
  // 从右子树开始遍历
  const inOrder = (root) => {
    if (count > k) return
    if (root == null) return
    inOrder(root.right)
    count++
    if (count === k) return res = root.val
    inOrder(root.left)
  }
  inOrder(root)
  return res
}
```

6. [#剑指 Offer 26 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

```js
function isSubStructure(A, B) {
  const isMatch = (A, B) => {
    if (B == null) return true
    if (A == null) return false
    if (A.val !== B.val) return false
    return isMatch(A.left, B.left) && isMatch(A.right, B.right)
  }

  if (A == null || B == null) return false
  if (isMatch(A, B)) return true
  return isSubStructure(A.left, B) || isSubStructure(A.right, B)
}
```

7. [#968 监控二叉树](https://leetcode-cn.com/problems/binary-tree-cameras/)

```js
```

8. [#662 二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/)

关键在于如何在层序遍历中统计每一层的信息，技巧是 `while` 遍历层，`for` 遍历层中的每一个元素
```js
function widthOfBinaryTree(root) {
  if (root == null) return 0
  let maxWidth = 0
  // 使用队列对每一层的宽度进行统计
  const queue = [{ node: root, i: 0 }]
  // 有多少层就 while 多少次（同一层里的元素交给内部的 for 循环处理了）
  while (queue.length) {
    const len = queue.length
    let l = queue[0].i, r = queue[len - 1].i
    maxWidth = Math.max(maxWidth, r - l + 1)
    // 记录该层最小编号
    const lastMinIndex = queue[0].i
    // 代码至此，队列里面的所有元素都是同一层的
    for (let j = 0; j < len; j++) {
      const { node, i } = queue.shift()
      if (node.left != null) {
        // i 的取值正常来说是取父节点编号 * 2，但是直接这样写的话，编号增量太大，导致后面有用例跑不过去
        // 解决方案是用 (父节点最大编号 - 与父节点同层的最小编号) * 2
        queue.push({ node: node.left, i: 2 * (i - lastMinIndex) })
      }
      if (node.right != null) {
        queue.push({ node: node.right, i: 2 * (i - lastMinIndex) + 1 })
      }
    }
  }
  return maxWidth
}
```
