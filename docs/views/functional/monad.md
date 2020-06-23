---
title: monad
---

> monad 是可以变扁（flatten）的 pointed functor。

## 容器嵌套引发的灾难

先看下面一个例子：
```js
const safeProp = curry((prop, obj) => Maybe.of(obj[prop]))

const getD = compose(map(map(map(safeProp('d')))), map(map(safeProp('c'))), map(safeProp('b')), safeProp('a'))

getD({ a: { b: { c: { d: 'd' } } } })
// Maybe { __value: Maybe { __value: Maybe { __value: [Maybe] } } }
```

## join 来解围

往 Maybe 函子里面添加 join 方法来解开一层外衣（不同函子的 join 实现不一样）
``` js
// 依然用上面的例子
class Maybe {
  // ...
  join() {
    return this.__value
  }
}
```

下面我们来重构上面的这个例子
```js
const join = functor => functor.join()

// 每当外套达到两件时，就用 join 脱掉一件
const getD = compose(join, map(safeProp('d')), join, map(safeProp('c')), join, map(safeProp('b')), safeProp('a'))

getD({ a: { b: { c: { d: 'd' } } } })
// Maybe { __value: 'd' }
```

## chain 更进一步

我们总是在紧跟着 map 的后面调用 join。让我们把这个行为抽象到一个叫做 chain 的函数里。  
chain 将 map 之后再 join 的行为整合到一起，从而简化我们的书写。  

```js
class Maybe {
  // ...
  chain(fn) {
    return this.map(fn).join()
  }
}
```

使用 chain 来重构上面的例子
```js
const chain = curry((fn, functor) => functor.chain(fn))

const getD = compose(chain(safeProp('d')), chain(safeProp('c')), chain(safeProp('b')), safeProp('a'))
// Maybe { __value: 'd' }
```

## 其他函子的 chain 实现

Either
```js
class Left {
  join() {
    return this
  }
  chain(fn) {
    return this
  }
}
class Right {
  join() {
    return this.__value
  }
  chain(fn) {
    return this.map(fn).join()
  }
}
```

IO
```js
class IO {
  join() {
    return this.unsafePerformIO()
  }
  chain(fn) {
    return this.map(fn).join()
  }
}
```

Task
```js
class Task {
  join() {
    const fork = this.fork
    return new Task((reject, resolve) => fork(
      err => reject(err),
      res => res.fork(reject, resolve)
    ))·
  }
  // 借助 map 和 join 方法（尝试用 . 的方式调用 chain 方法执行串行的两个任务看看，会有惊喜）
  chain(fn) {
    return this.map(fn).join()
  }
  // 完整实现
  chain (fn) {
    const fork = this.fork
    return new Task((reject, resolve) => fork(
      err => reject(err), 
      res => fn(res).fork(reject, resolve)
    )
  }
}
```
