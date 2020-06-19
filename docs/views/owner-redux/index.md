---
title: redux
lang: zh-CN
---

## createStore

创建 store 核心对象

```js
const createStore = (reducer, initState, enhancer) => {
  if (!enhancer && typeof initState === "function") {
    enhancer = initState
    initState = null
  }
  if (enhancer && typeof enhancer === "function") {
    return enhancer(createStore)(reducer, initState)
  }
  let store = initState, 
    listeners = [],
    isDispatch = false;
  const getState = () => store
  // 原始 dispatch 内部执行 reducer 通知监听者
  const dispatch = (action) => {
    if (isDispatch) return action
    // dispatch 必须一个个来，加锁
    isDispatch = true
    store = reducer(store, action)
    isDispatch = false
    listeners.forEach(listener => listener())
    return action
  }
  const subscribe = (listener) => {
    if (typeof listener === "function") {
      listeners.push(listener)
    }
    // 在监听的同时返回卸载监听的函数，利用闭包缓存监听者，以免想卸载监听的时候却找不到对应的想卸载的监听者
    return () => unsubscribe(listener)
  }
  const unsubscribe = (listener) => {
    const index = listeners.indexOf(listener)
    listeners.splice(index, 1)
  }
  return {
    getState,
    dispatch,
    subscribe,
    unsubscribe
  }
}
```

## applyMiddleware

添加中间件

```js
const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, initState, enhancer) => {
    const store = createStore(reducer, initState, enhancer);
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    // 剥掉中间件的第一层外衣
    let chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 剥掉中间件的第二层外衣
    store.dispatch = compose(...chain)(store.dispatch)
    return {
      ...store
    }
  }
}
```

### compose

```js
// 将一系列函数串起来，返回一个函数，增强原始 dispatch 的功能
// 中间件是由三阶函数构成，这里参数的函数是剥了最外层的中间件
const compose = (...funcs) => {
  // 没有传入函数则原样返回
  if (!funcs) {
    return args => args
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((f1, f2) => (...args) => f1(f2(...args)))
}
```

## combineReducers

```js
// 拿到 reducer 的键，修改 state 对应键的值
const combineReducers = reducers => {
  const finalReducers = {},
    nativeKeys = Object.keys
  nativeKeys(reducers).forEach(reducerKey => {
    if(typeof reducers[reducerKey] === "function") {
      finalReducers[reducerKey] = reducers[reducerKey]
    }
  })
  return (state, action) => {
    const store = {}
    nativeKeys(finalReducers).forEach(key => {
      const reducer = finalReducers[key]
      const nextState = reducer(state[key], action)
      store[key] = nextState
    })
    return store
  }
}
```

## bindActionCreator

```js
const bindActionCreator = (action, dispatch) => {
  return (...args) => dispatch(action(...args))
}
```