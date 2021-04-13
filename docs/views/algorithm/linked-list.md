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
```

3. [#25 K个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

```js
```

4. [#61 旋转链表](https://leetcode-cn.com/problems/rotate-list/)

```js
```

5. [#24 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs)

```js
```


## 链表节点的删除

1. [#19 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list)

```js
```

2. [#83 删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list)

```js
```

3. [#82 删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii)

```js
```