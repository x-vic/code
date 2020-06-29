---
title: Observable
---

> Observable 是 rx 体系中的一个概念，而 rx 本身就是一个很大的话题。但是这里我们只是单纯地从函数式编程的角度来理解 Observable

## Observable 如何使用

`Observable` 接收一个生产数据的函数，每当这个函数（生产者）生产出新的数据，就会调用 `subscribe` 传入的函数（消费者）。  
它看起来有点像之前提到过的 Task functor，同样是传入生产函数，通过某个方法传入回调函数。不同之处在于 `Task` 有成功、pedding、失败三种状态。而 `Observable` 由成功变为完成状态，pedding 变成不断发射值的 next 状态，失败状态与 `Task` 保持一致。  
用一句糙话来讲就是：`Observable` 是 `Task` 或是 `Promise` 的加强版。

```js
const observable = new Observable(observer => {
  let i = 1
  setInterval(() => observer.next(i++), 1000)
})

observable
  .pipe(
    val => val * 2,
    val => ++val
  )
  .subscribe(
    console.log
  )
```

## Observable 简单实现

```js
class Observable {
  constructor(createFn) {
    this.createFn = createFn
  }
  next(value) {
    this.resFn(value)
  }
  subscribe(resFn) {
    this.createFn(this)
    this.resFn = compose(resFn, this.handleFn)
  }
  pipe(...fns) {
    this.handleFn = compose(...fns.reverse())
    return this
  }
}
```

## next 是对 resolve 的加维

对于 Task 而言，resolve 意味着该函子生命周期的结束。而放到一个应用中看，我们需要许许多多的 Task 来管理我们的应用。而经过 next 这个状态的扩展之后，前段中的很多场景都可以被抽象为 Observable 了。如：事件响应、ajax、websocket......  
增加一个维度，表现力大增。  
夹一个私货：为什么毛笔的艺术表现力强于钢笔，窃以为毛笔比钢笔多了线条宽度这样一个维度。