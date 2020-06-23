---
title: 函子
---

> 我们已经知道如何书写函数式的程序了，即通过管道把数据在一系列纯函数间传递的程序。我们也知道了，这些程序就是声明式的行为规范。但是，控制流（control flow）、异常处理（error handling）、异步操作（asynchronous actions）和状态（state）呢？还有更棘手的作用（effects）呢？本章将对上述这些抽象概念赖以建立的基础作一番探究。

## 一个最简单的函子

```js
class Container {
  constructor(value) {
    this.__value = value
  }
  static of(value) {
    return new Container(value)
  }
  // 不同函子的 map 实现不一样，但它们的功能都是提供一个操作内部值(__value)的接口
  map(fn) {
    return this.constructor.of(fn(this.__value))
  }
}
```

::: tip
functor 是实现了 map 函数并遵守一些特定规则的容器类型。
:::


## Maybe

最大名鼎鼎的 Maybe 大概是薛定谔的猫了。它代表一种不确定的状态（在我们打开容器之前）。

```js
class Maybe {
  constructor(value) {
    this.__value = value
  }
  static of(value) {
    return new Maybe(value)
  }
  isNothing() {
    return this.__value === null || this.__value === undefined
  }
  // Maybe 的 map 会检测内部的值是否有效
  map(fn) {
    return this.isNothing() ? this.constructor.of(null) : this.constructor.of(fn(this.__value))
  }
}
```

### 一个安全取值的例子
```js
const map = (fn, functor) => functor.map(fn)

const prop = curry((prop, obj) => obj[prop])
const safeprop = curry((prop, obj) => Maybe.of(obj[prop]))

const getC = compose(map(prop('c')), safeprop('b'), prop('a'))

getC({
  a: {
    b: {
      c: 2
    }
  }
})
// Maybe { __value: 2 }

getC({
  a: {}
})
// Maybe { __value: null }
```

::: tip
实际当中，Maybe 最常用在那些可能会无法成功返回结果的函数中。  
这个例子依然存在很严重的问题：如果每一个属性都要试探性地取值，那我们最终会得到一个嵌套多层地 Maybe。后面我们会来解决这个问题。
:::

### maybe

我们最终是要拿到 Maybe 里面的值进行操作的，下面我们来定义一个 maybe 函数来处理最终结果

```js
const maybe = curry((errMsg, fn, functor) => functor.isNothing() ? errMsg : fn(functor.__value))

// 延续上面安全取值的例子
const handleC = compose(maybe('失败了！', val => val), getC)

handleC({
  a: {
    b: {
      c: 2
    }
  }
})
// 2
handleC({
  a: {}
})
// 失败了！
```


## Either

Either 函子是一个抽象类，用来进行错误处理，那就是返回一条有礼貌的的错误消息作为回应。  
Either 本身不能使用，真正起作用的是它的两个子类：Left 和 Right。  
下面看看它们的实现：

```js
class Left {
  constructor(value) {
    this.__value = value
  }
  static of(value) {
    return new Left(value)
  }
  // Left 会忽略 fn
  map(fn) {
    return this
  }
}

class Right {
  constructor(value) {
    this.__value = value
  }
  static of(value) {
    return new Right(value)
  }
  map(fn) {
    return Right.of(fn(this.__value))
  }
}
```

### Either 的实例

```js
// 退 10 钱，看看余额够不够
const withdrow = total => total - 10 >= 0 ? Right.of(total - 10) : Left.of('没得退了！')


withdrow(20)
// Right { __value: 10 }
withdrow(5)
// Left { __value: '没得退了！' }
```

### either 取出值

使用 Either 进行错误处理之后会有两种结果的函子出现，在不能确定函子类型的情况下，我们很难确定下一个函数怎么来处理上一个函数返回的值。  
此时就可以祭出 either 辅助函数将 Either 中的值取出来，交给下一个函数处理。

```js
const either = curry((leftFn, rightFn, functor) => {
  switch(functor.constructor) {
    case Left: return leftFn(functor.__value)
    case Right: return rightFn(functor.__value)
  }
})
```

继续上一个例子：  
```js
const withdrow2 = compose(console.log, either(val => '失败！！' + val, val => '成功！' + val), withdrow)

withdrow2(20)
// 成功！10
withdrow2(5)
// 失败！！没得退了！
```


## IO

> 现在我们用我们的纯函数去接触真是环境中的脏东西了。这个脏东西就是“副作用”。

### 处理副作用的办法

副作用会让函数的输出变得不可靠，而我们的编程希望使用纯函数来让代码变得透明可靠。采取的方式就是“**延迟**”，实际上的做法就是将副作用封印到一个函数中，在我们纯函数链条中不去使用它，而是将副作用使用交到调用者的手上。而我们的输入与输出都是纯的函数。

### IO 函子的实现

```js
// IO 函子实际上是将副作用包裹在一个函数中延迟执行，这样一来，它还是一个纯函数
class IO {
  constructor(fn) {
    this.unsafePerformIO = fn
  }
  static of(fn) {
    return new IO(fn)
  }
  map(fn) {
    // 与普通函子不同的是：普通函数调用 fn，而 IO 函子组合 fn
    return IO.of(compose(fn, this.unsafePerformIO))
  }
}
```

### IO 的应用实例

```js
const $ = selector => IO.of(() => document.querySelectorAll(selector))

const getValue = compose(map(dom => dom.value), map(domList => domList[0]), $)

getValue('#sb_form_q').unsafePerformIO()
// 这段代码可以查看 bing 搜索框中的内容
```


## Task 精密的时间胶囊

除了IO读写这种阻塞式的副作用，还有一种常见的非阻塞式的副作用，即异步。  
而将异步操作变纯的思路跟 IO 函子纯化副作用的思路一致，都是将副作用延迟执行。不同之处在于 IO 函子可以直接返回所需的值，而 Task 函子则需要传入函数，通过函数的参数来得到所需的值。  
使用 Task 需要调用它的 fork 方法。

### Task 的简单实现

```JS
class Task {
  constructor(computation) {
    this.fork = computation
  }
  static of(resFn) {
    return new Task((_, resolve) => resolve(resFn))
  }
  // fn 要作用到 resolve 接收的参数上
  map(fn) {
    const fork = this.fork
    return new Task((reject, resolve) => fork(
      rejFn => reject(rejFn),
      resFn => resolve(fn(resFn))
    ))
  }
}
```

### 使用 Task 的例子

```js
const delayPrint = () => new Task((reject, resolve) => {
  setTimeout(() => resolve('hehe'), 2000)
})

const getPrint = compose(map(res => res + '!!!'), delayPrint)

// fork 方法执行的时候，异步动作才真正执行
getPrint().fork(
  rej => rej,
  console.log
)
// 2秒之后打印 hehe!!!
```


## 一个综合的例子（Either、IO、Task）

1. 判断用户输入的路径，返回不同的 Either(__value)
2. Right 分支上读取文件，返回 Either(IO(unsafePerformIO))
3. 将文件内容传入异步任务，返回 Either(IO(Task))

```js
const either = curry((leftFn, rightFn, functor) => {
  switch(functor.constructor) {
    case Left: return leftFn(functor.__value)
    case Right: return rightFn(functor.__value)
  }
})

const IOFn = filePath => new IO(
  () => readFileSync(filePath, 'utf-8')
)

const eitherFn = str => str.length >= 14 ? Right.of(str) : Left.of('文件路径少于14个字符')

const taskFn = content => new Task((reject, resolve) => {
  setTimeout(() => resolve(content), 2000)
})

// 直接使用这个函数的话会得到一个嵌套多层容器的结果，需要这般使用：res.__value.unsafePerformIO().fork(resFn, rejFn)
// res.__value.unsafePerformIO().fork(resFn, rejFn) 这样的调用方式只适用 Right 分支；Left 分支只有一层 Either 容器
const asyncGetFile = compose(map(map(taskFn)), map(IOFn), eitherFn)

removeNeedlessContainer = compose(either(val => val, val => val.unsafePerformIO()), asyncGetFile)

removeNeedlessContainer('./src/test.txt').fork(
  console.log,
  console.log
)
```

::: tip
至此，四类常用的函子已经介绍完毕。可以延伸的话题还很多，例如 Task 与 Promise 的关系...这些暂不准备展开来讲。  
在最后一个综合示例中我们可以看到一些别扭的地方，如 compose 中的嵌套 map、返回结果的多层容器嵌套。下面准备请出 monad 登场来解决这两个问题。
:::
