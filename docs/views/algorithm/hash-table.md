---
title: 哈希表
---

## 基础应用

1. [705. 设计哈希集合](https://leetcode-cn.com/problems/design-hashset/)

```js
class Node {
  constructor(key = 0, next = null) {
    this.key = key
    this.next = next
  }
  insertAfter(node) {
    node.next = this.next
    this.next = node
  }
  removeAfter() {
    if (this.next === null) return
    this.next = this.next.next
  }
}

class MyHashSet {
  constructor() {
    this.data = Array(100).fill(null).map(() => new Node())
  }
  hashFunc(key) {
    return stringToHex(key)
  }
  add(key) {
    if (this.contains(key)) return
    const index = this.hashFunc(key) % this.data.length
    const node = this.data[index]
    if (node == null) return this.data[index] = new Node(key)
    this.data[index].insertAfter(new Node(key))
  }
  remove(key) {
    const index = this.hashFunc(key) % this.data.length
    let node = this.data[index]
    if (node == null) return
    while (node.next && node.next.key !== key) node = node.next
    node.removeAfter()
  }
  contains(key) {
    const index = this.hashFunc(key) % this.data.length
    if (!this.data[index]) return false
    let node = this.data[index].next
    while (node && node.key !== key) node = node.next
    return node != null
  }
}

function stringToHex(str){
  //定义一个变量来存储hashCode
  let hashCode = 0

  // 利用霍纳法则计算出hashCode的值
  for (var i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }

  return hashCode
}
```

2. [706. 设计哈希映射](https://leetcode-cn.com/problems/design-hashmap/)

```js
// 跟第一道题大同小异
class Node {
  constructor(key = 0, value = 0, next = null) {
    this.key = key
    this.value = value
    this.next = next
  }
  insertAfter(node) {
    node.next = this.next
    this.next = node
  }
  removeAfter() {
    if (this.next === null) return
    // const p = this.next
    this.next = this.next.next
  }
}

class MyHashMap {
  constructor() {
    this.data = Array(100).fill(null).map(() => new Node())
  }
  hashFunc(key) {
    return stringToHex(key)
  }
  put(key, value) {
    // if (this.get(key) !== -1) return
    const index = this.hashFunc(key) % this.data.length
    let node = this.data[index]
    // if (node == null) return this.data[index] = new Node(key, value)
    while (node.next && node.next.key !== key) node = node.next
    // node 不为空
    if (node.next) {
      node.next.value = value
    } else {
      this.data[index].insertAfter(new Node(key, value))
    }
  }
  remove(key) {
    const index = this.hashFunc(key) % this.data.length
    let node = this.data[index]
    if (node == null) return
    while (node.next && node.next.key !== key) node = node.next
    node.removeAfter()
  }
  get(key) {
    const index = this.hashFunc(key) % this.data.length
    // if (!this.data[index]) return -1
    let node = this.data[index].next
    while (node && node.key !== key) node = node.next
    if (node == null) return -1
    return node.value
  }
}

function stringToHex(str){
  //定义一个变量来存储hashCode
  let hashCode = 0

  // 利用霍纳法则计算出hashCode的值
  for (var i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }

  return hashCode
}
```

3. [面试题 16.25. LRU 缓存](https://leetcode-cn.com/problems/lru-cache-lcci/)

```js
// 双向链表
class Node {
  constructor(key = 0, value = 0, prev = null, next = null) {
    this.key = key
    this.value = value
    this.prev = prev
    this.next = next
  }
  removeMe() {
    if (this.prev) this.prev.next = this.next
    if (this.next) this.next.prev = this.prev
    this.next = this.prev = null
  }
  insertPrev(node) {
    node.next = this
    node.prev = this.prev
    if (this.prev) this.prev.next = node
    this.prev = node
  }
}

/**
哈希列表（这个列表里面维护着一个缓存队列）
使用虚拟头尾节点。添加：往虚尾前面插入；删除：往虚头后面删除
 */
class HashList {
  constructor(capacity = 10) {
    this.capacity = capacity
    this.data = new Map()
    this.head = new Node()
    this.tail = new Node()
    this.head.next = this.tail
    this.tail.prev = this.head
  }
  put(key, value) {
    // 原本就存在
    if (this.data.has(key)) {
      // 维护 hash 表
      this.data.get(key).value = value
      // 维护 链表
      this.data.get(key).removeMe()
    } else {
      // 维护 hash 表
      this.data.set(key, new Node(key, value))
    }
    // 维护 链表
    this.tail.insertPrev(this.data.get(key))
    // 添加到链表之前判断容量是否超出
    if (this.data.size > this.capacity) {
      // 在 hash 表中删除
      this.data.delete(this.head.next.key)
      // 在链表中删除第一个元素
      this.head.next.removeMe()
    }
  }
  get(key) {
    const node = this.data.get(key)
    if (node == null) return -1
    // 在链表中删除自己
    node.removeMe()
    // 在链表中将自己添加到末尾
    this.tail.insertPrev(this.data.get(key))
    
    return this.data.get(key).value
  }
}

class LRUCache {
  constructor(capacity) {
    this.h = new HashList(capacity)
  }
  get(key) {
    return this.h.get(key)
  }
  put(key, val) {
    return this.h.put(key, val)
  }
}
```

4. [535. TinyURL 的加密与解密](https://leetcode-cn.com/problems/encode-and-decode-tinyurl/)

```js
const dict = new Map()

function encode(longUrl) {
  // 将生成的随机字符串和 longUrl 作为键值对存入对象
  let shortStr = roundString(5)
  while (dict.has(shortStr)) {
    shortStr = roundString(5)
  }
  dict.set(shortStr, longUrl)
  return shortStr
}

function decode(shortUrl) {
  return dict.get(shortUrl)
}

function roundString(n) {
  const strs = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
  let str = ''
  for (let i = 0; i < n; i++) {
    const random = Math.random() * 62 >> 0
    str += strs[random]
  }
  return str
}
```

5. [187. 重复的DNA序列](https://leetcode-cn.com/problems/repeated-dna-sequences/)

```js
function findRepeatedDnaSequences(s) {
  const dict = Object.create(null)
  const len = s.length
  for (let i = 0; i < len - 9; i++) {
    const key = s.substr(i, 10)
    dict[key] = (dict[key] || 0) + 1
  }
  return Object.keys(dict).filter(key => dict[key] > 1)
}
```

6. [318. 最大单词长度乘积](https://leetcode-cn.com/problems/maximum-product-of-word-lengths/)

```js
function maxProduct(words) {
  const mark = words.map(() => 0)
  // mark 当中用 二进制位 标记每一个字母是否出现
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      mark[i] |= (1 << (words[i].charCodeAt(j) - 96))
    }
  }
  let ans = 0
  for (let m = 0; m < words.length; m++) {
    for (let n = m + 1; n < words.length; n++) {
      if ((mark[m] & mark[n]) !== 0) continue
      ans = Math.max(ans, words[m].length * words[n].length)
    }
  }
  return ans
}
```

