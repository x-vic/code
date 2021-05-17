---
title: 链表
---

## 链表访问

1. [#141 判断链表是否有环](https://leetcode-cn.com/problems/linked-list-cycle/)

```js
var hasCycle = function(head) {
    // 判断是否为空节点节点
    if (head == null) return false
    let slowNode = head
    let fastNode = head.next
    // 快慢节点进行追击，重合的时候证明有环
    while(fastNode != null && fastNode.next != null && slowNode !== fastNode) {
        slowNode = slowNode.next
        fastNode = fastNode.next.next
    }
    return slowNode === fastNode
};
```

2. [#142 判断环状链表的环在何处](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

```js
var detectCycle = function(head) {
    // 空节点
    if (head == null) return null
    
    let slowNode = fastNode = head
    while(fastNode != null && fastNode.next != null) {
        slowNode = slowNode.next
        fastNode = fastNode.next.next
        // 在此处相遇，跳出循环
        if (fastNode === slowNode) {
            break
        }
    }
    // 没有环
    if (fastNode == null || fastNode.next == null) return null

    slowNode = head
    while(slowNode !== fastNode) {
        slowNode = slowNode.next
        fastNode = fastNode.next
    }
    return slowNode
};
```

3. [#202 快乐树](https://leetcode-cn.com/problems/happy-number/)

```js
// 使用判断链表是否有环的思维来判断是否为快乐树
var isHappy = function(n) {
    if (n === 1) return true
    let slowNode = fastNode = n
    while(fastNode !== 1 && getNext(fastNode) !== 1) {
        slowNode = getNext(slowNode)
        fastNode = getNext(getNext(fastNode))
        if (slowNode === fastNode) break
    }
    // 如果 fastNode 到底或 getNext(fastNode) 到底，则说明这个链表没有环
    return fastNode === 1 || getNext(fastNode) === 1
};

function getNext(num) {
    return (num + '').split('').reduce((prev, curr) => prev + curr * curr, 0)
}
```


## 链表的反转

1. [#206 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

```js
// 遍历解法
var reverseList = function(head) {
    if (head == null) return head
    let prev = null
    let curr = head
    let next = head.next

    while (curr != null) {
        curr.next = prev
        prev = curr
        ;(curr = next) && (next = next.next)
    }
    return prev
};
```

```js
// 递归解法
// 这是一个递归回溯过程，所以考虑问题的时候要从最小单位来考虑，此处的最小单位为 最后一个节点指向null
var reverseList = function(head) {
    if (head == null || head.next == null) return head
    const tail = head.next
    const list = reverseList(head.next)
    // 本质上，head 从 tail 手上接过来的就是一个 null
    // head.next = tail.next
    head.next = null
    tail.next = head
    return list
};
```

2. [#92 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

```js
var reverseBetween = function(head, m, n) {
    if (m === 1) return reverseN(head, n)

    // 相对于 head.next，翻转区间应该是 [m - 1, n - 1]
    head.next = reverseBetween(head.next, m - 1, n - 1)
    return head
};

let successor = null

function reverseN(head, n) {
  if (n === 1) {
    successor = head.next
    return head
  }
  const list = reverseN(head.next, n - 1)
  head.next.next = head
  head.next = successor
  return list
}
```

3. [#25 K个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

```js
function reverseKGroup(head, k) {
  if (head == null) return null
  let a = b = head
  // 循环有两个目的：1、判断个数是否大于 k;2、得到翻转的终止节点
  for (let i = 0; i < k; i++) {
    // 个数不足，无需反转
    if (b == null) return head
    b = b.next
  }
  const newHead = reverse(a, b)
  a.next = reverseKGroup(b, k)
  return newHead
}

// 左闭右开，两个节点
function reverse(head, end) {
  if (head == null) return head
  let prev = null, curr = head, next = head.next
  // 与反转整个链表唯一的不同点
  while (curr != end) {
    curr.next = prev
    prev = curr
    curr = next
    curr && (next = curr.next)
  }
  return prev
}
```

4. [#61 旋转链表](https://leetcode-cn.com/problems/rotate-list/)

```js
function rotateRight(head, k) {
  if (head == null || head.next == null) return head
  // 将链表变成一个环
  let curr = head, size = 1
  while (curr.next != null) {
    curr = curr.next
    size++
  }
  curr.next = head
  let newHead = head, newTail = curr
  // 计算旋转的步数
  const times = size - (k % size)
  // 一步一步走
  for (let i = 0; i < times; i++) {
    newHead = newHead.next
    newTail = newTail.next
  }
  // 断开首尾的连接
  newTail.next = null
  return newHead
}
```

5. [#24 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs)

```js
function swapPairs(head) {
  // 递归终止条件
  if (head == null || head.next == null) return head
  // 最终要返回的 head
  const newHead = head.next
  // 下一次递归要用到的 head
  const nextHead = head.next.next
  // 两两交换
  newHead.next = head
  head.next = swapPairs(nextHead)
  return newHead
}
```


## 链表节点的删除

1. [#19 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list)

```js
function removeNthFromEnd(head, n) {
  if (head == null) return head
  let size = 1, curr = head
  while (curr.next != null) {
    curr = curr.next
    size++
  }
  // 数量不足
  if (size < n) return head
  // 删除第一个（因为后面遍历是从 head 开始的）
  if (size === n) return head.next
  // 计算需要走多少步
  const times = size - n
  curr = head
  let prev = null, next = curr.next
  for (let i = 1; i <= times; i++) {
    prev = curr
    curr = next
    next = next.next
  }
  // 只有唯一一个元素
  if (prev == null) return null
  prev.next = next
  return head
}
```

2. [#82 删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii)

```js
```
