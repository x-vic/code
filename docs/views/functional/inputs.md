---
title: 函数输入处理
---

## 为什么要对函数的参数进行处理

多个参数的输入会增加函数的复杂性，这违背了**一个函数只做一件事**。

## 如何减少函数参数

我们可以利用闭包来收集参数，让函数延迟执行，等到函数参数收集完成，再最终执行函数

### 偏函数(partial)

1. 传入原始函数以及提前确定好的参数（能提前确定的参数一定要定义到靠前位置）
2. 返回新的函数
3. 调用新的函数，传入剩下的参数

```js
const partial = (fn, ...presetArgs) =>
  (...laterArgs) => 
    fn(...presetArgs, ...laterArgs)
```

### 柯里化(currying)

1. 传入原始函数
2. 返回新的函数
3. 调用新的函数，传入提前确定好的参数（这个过程可以进行多次，直到参数收集完成）

```js
const curry = (fn, arity = fn.length, nextCurried) => 
  (nextCurried = prevArgs => 
    (...nextArgs) => {
      const args = [ ...prevArgs, ...nextArgs ]
      return args.length >= arity
        ? fn(...args)
        : nextCurried(args)
    }
  )([])
```

::: tip
这里我们只需要关注偏函数与柯里化的用法（这两个工具在几乎所有函数式编程的库里都已经实现），至于它们的实现原理，不用太过深究。
:::