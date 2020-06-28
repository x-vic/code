---
title: 函子之间的转换
---

> 我们在借用函子的各种能力的时候，不可避免会出现函子嵌套函子的情况。前面两章，我们分别介绍了 chain 以及 ap 工具来避免了这种嵌套的情况。

## toTask

`Task` 之外的函子转换比较简单，这里不再赘述。这里只能看到其他函子转成 Task，而不能看到 Task 转成其他函子，因为我们没法将异步操作转为同步操作。

```js
// eitherToTask :: Either a b -> Task a b
const eitherToTask = either(Task.rejected, Task.of)

// ioToTask :: IO a -> Task () a
const ioToTask = x => new Task((reject, resolve) => resolve(x.unsafePerform()))

// maybeToTask :: Maybe a -> Task () a
const maybeToTask = x => (x.isNothing ? Task.rejected() : Task.of(x.$value))
```

## 同构 Promise 与 Task

```js
// promiseToTask :: Promise a b -> Task a b
const promiseToTask = x => new Task((reject, resolve) => x.then(resolve).catch(reject))

// taskToPromise :: Task a b -> Promise a b
const taskToPromise = x => new Promise((resolve, reject) => x.fork(reject, resolve))
```

## 使用示例（）

下面来模拟一个场景：读取本地文件的内容，将之提交给服务器。
1. 校验传入的文件路径（文件读取失败时，reject 一个 Maybe 包装值）
2. 将 Maybe 转为 Task
3. 校验内容长度
4. 将 Either 转为 Task
5. 提交内容
```js
const { readFile } = require('fs')
const { compose, curry } = require('ramda')

class Maybe {
  constructor(value) {
    this.__value = value
  }
  static of(value) {
    return new Maybe(value)
  }
  isNothing() {
    return this.__value === undefined || this.__value === null
  }
  map(fn) {
    return this.isNothing
      ? this.constructor.of(null)
      : this.constructor.of(fn(this.__value))
  }
  chain(fn) {
    return fn(this.__value)
  }
}

class Either {
  constructor(value) {
    this.__value = value
  }
}

class Left extends Either {
  static of(value) {
    return new Left(value)
  }
  map(fn) {
    return this
  }
  isLeft() {
    return true
  }
  isRight() {
    return false
  }
}

class Right extends Either {
  static of(value) {
    return new Right(value)
  }
  map(fn) {
    return this.constructor.of(fn(this.constructor))
  }
  isLeft() {
    return false
  }
  isRight() {
    return true
  }
}

class Task {
  constructor(fn) {
    this.fork = fn
  }
  // 组合 resolve 与 fn
  map(fn) {
    return new Task((reject, resolve) => this.fork(
      reject,
      compose(resolve, fn)
    ))
  }
  // 调用 fork 之后，返回的依然是 Task
  chain(fn) {
    return new Task((reject, resolve) => this.fork(
      reject,
      res => fn(res).fork(reject, resolve))
    )
  }
  ap(functor) {
    return this.chain(fn => functor.map(fn))
  }
}

const map = curry((fn, functor) => functor.map(fn))
const either = curry((leftFn, rightFn, functor) => {
  if (functor.isLeft()) return leftFn(functor.__value)
  if (functor.isRight()) return rightFn(functor.__value)
})
const chain = curry((fn, functor) => functor.chain(fn))

const maybeToTask = functor => new Task((reject, resolve) => functor.isNothing() ? reject() : resolve(functor.__value))
const eitherToTask = functor => new Task((reject, resolve) => either(reject, resolve, functor))

// 读取文件
const read = (path) => new Task((reject, resolve) => {
  if (!path) return reject('非法 path')
  readFile(path, 'utf8', (err, res) => {
    if(err) return reject(err)
    resolve(Maybe.of(res))
  })
})
const validateLen = str => str.length < 3 ? Left.of(str) : Right.of(str)
const submitStr = str => new Task((reject, resolve) => {
  if (str.length <= 10) return resolve('响应内容：' + str)
  return reject('长度超过10' + str)
})

// 永远记住：对 Task 进行 chain 相当于执行了上一个 Task.fork 函数
const run = compose(
  chain(submitStr),
  chain(eitherToTask),
  map(validateLen),
  chain(maybeToTask),
  read
)

run('./src/00.txt').fork(
  rej => console.log('rej:::', rej),
  res => console.log('res:::', res)
)
```