---
title: rxjs-hooks 源码解读
original: true
---

::: tip
这里一共 useObservable 以及 useEventCallback 两个 hook。  
useObservable 从虚无中或是变化的 props 中得到衍生的数据。  
useEventCallback 从点击事件、变化的 props 中得到衍生数据。
:::

## useObservable

1. 创建 state
2. 调用传入的函数，得到输出流，监听该流，更新 state
3. 组件销毁时做一些清理工作
```ts
export function useObservable(
  inputFactory,
  initialState,
  inputs,
) {
  const [state, setState] = useState(typeof initialState !== 'undefined' ? initialState : null)

  const state$ = useConstant(() => new BehaviorSubject(initialState))
  const inputs$ = useConstant(() => new BehaviorSubject(inputs))

  useEffect(() => {
    inputs$.next(inputs)
  }, inputs || [])

  useEffect(() => {
    let output$
    if (inputs) {
      output$ = inputFactory(state$, inputs$)
    } else {
      output$ = inputFactory(state$)
    }
    const subscription = output$.subscribe((value) => {
      state$.next(value)
      setState(value)
    })
    return () => {
      subscription.unsubscribe()
      inputs$.complete()
      state$.complete()
    }
  }, [])

  return state
}
```

## useEventCallback

与 useObservable 相似，不过是提供了从外部发射事件的能力。
```ts
export function useEventCallback(
  callback,
  initialState,
  inputs,
) {
  const initialValue = typeof initialState !== 'undefined' ? initialState : null
  const [state, setState] = useState(initialValue)
  const event$ = useConstant(() => new Subject())
  const state$ = useConstant(() => new BehaviorSubject(initialValue))
  const inputs$ = useConstant(
    () => new BehaviorSubject(typeof inputs === 'undefined' ? null : inputs),
  )

  function eventCallback(e) {
    return event$.next(e)
  }
  const returnedCallback = useCallback(eventCallback, [])

  useEffect(() => {
    inputs$.next(inputs!)
  }, inputs || [])

  useEffect(() => {
    setState(initialValue)
    let value$

    if (!inputs) {
      value$ = callback(event$, state$)
    } else {
      value$ = callback(event$, state$, inputs$)
    }
    const subscription = value$.subscribe((value) => {
      state$.next(value)
      setState(value)
    })
    return () => {
      subscription.unsubscribe()
      state$.complete()
      inputs$.complete()
      event$.complete()
    }
  }, []) // immutable forever

  return [returnedCallback, state]
}
```

