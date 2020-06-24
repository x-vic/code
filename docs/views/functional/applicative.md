---
title: applicative
---

> applicative functor 是实现了 ap 方法的 pointed functor  

> ap 就是这样一种函数，能够把一个 functor 的函数值应用到另一个 functor 的值上

## 瓶中之船

先看下面这个简单的加法运算
```js
// 这样是行不通的，因为 2 和 3 都藏在瓶子里。
add(Container.of(2), Container.of(3));
//NaN
```

我们想要对瓶中之船进行直接的操作，巧的是，我们已经有这样的工具存在了。那就是 `chain` 函数
```js
// add 是接收两个参数的柯里化函数
Container.of(2)
  .chain(
    two => Container.of(3).map(add(two))
  )
// Container(5)
```

只不过，这种方式有一个问题，那就是 `monad` 的顺序执行问题：所有的代码都只会在前一个 `monad` 执行完毕之后才执行。想想看，我们的这两个值足够强健且相互独立，如果仅仅为了满足 `monad` 的顺序要求而延迟 `Container(3)` 的创建，我觉得是非常没有必要的。

事实上，当遇到这种问题的时候，要是能够无需借助这些不必要的函数和变量，以一种简明扼要的方式把一个 `functor` 的值应用到另一个上去就好了。


## ap

ap 是这样一种函数，能够把一个 functor（作为入参） 的**函数值**应用到另一个 functor（作为 this） 的值上。

```js
class Container {
  // 与 chain 相反，chain 自己提供转换函数，外部提供值；ap 外部提供转换函数，内部提供值；
  // 与 chain 相同的是，它们都是使用外部的壳
  ap(functor) {
    return functor.map(this.__value)
  }
}

// 下面使用 ap
Container.of(add(2)).ap(Container.of(3))
// 等价于
Container.of(2).map(add).ap(Container.of(3))

// 等待两个并行的异步任务
Task.of((name, age) => `name:${name}  age:${age}`).ap(Task.of(Http.get('/name'))).ap(Task.of(Http.get('/age')))
```

## lift

一个函数在调用的时候，如果被 `map` 包裹了，那么它就会从一个非 functor 函数转换为一个 functor 函数。我们把这个过程叫做 `lift`。  

一般情况下，普通函数更适合操作普通的数据类型而不是容器类型，在必要的时候再通过 `lift` 变为合适的容器去操作容器类型。这样做的好处是能得到更简单、重用性更高的函数，它们能够随需求而变，兼容任意 functor。

我们来试试以一种 pointfree 的方式调用 applicative functor。因为 map 等价于 `of/ap`，那么我们就可以定义无数个 `ap` 通用函数。

```js
const liftA2 = curry((fn, functor1, functor2) => functor1.map(fn).ap(functor2))

const liftA3 = curry((fn, functor1, functor2, functor3) => functor1.map(fn).ap(functor2).ap(functor3))

// liftA4, etc
```

接下来看看实际用例：
```js
// checkEmail :: User -> Either String Email
// checkName :: User -> Either String String

//  createUser :: Email -> String -> IO User
var createUser = curry(function(email, name) { /* creating... */ });

Either.of(createUser).ap(checkEmail(user)).ap(checkName(user));
// Left("invalid email")

liftA2(createUser, checkEmail(user), checkName(user));
// Left("invalid email")
```
上述两个执行语句是等价的，但是使用了 `liftA2` 的版本没有提到 `Either`，这就使得它更加通用灵活，因为不必与特定的数据类型耦合在一起。
