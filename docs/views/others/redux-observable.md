---
title: redux-observable 源码解读
original: true
---

> redux-observable 是一个 redux 中间件。与多数 redux 中间件不同的是：其他中间件做的是改造 action 的工作，而 redux-observable 是在 action 的上层添加了一个对 action 流的监听，获取它所需要的 action，最后处理成不同的 action.

## 提问

- redux-observable 如何能够监听到所有的 action ？
- 业务里面的 epic 是何时被调用的？
- 其他中间件如何接管 redux-observable 映射出来的 action？

## createEpicMiddleware 创建中间件

1. 创建 action 流
2. 创建 state 流（有初始值）
3. 创建 result 流（后面经过一次 run 会转化成各种 $action 的变形）
4. 监听 result$ 出发 dispatch
```ts
const epicMiddleware: EpicMiddleware<T, O, S, D> = _store => {
    store = _store;
    const actionSubject$ = new Subject<T>();
    const stateSubject$ = new Subject<S>();
    const action$ = actionSubject$
      .asObservable()
      .pipe(observeOn(uniqueQueueScheduler));
    const state$ = new StateObservable(
      stateSubject$.pipe(observeOn(uniqueQueueScheduler)),
      store.getState()
    );

    const result$ = epic$.pipe(
      map(epic => {
        const output$ = epic(action$, state$, options.dependencies!);
        return output$;
      }),
      // 合并所有 epic 返回的流
      mergeMap(output$ =>
        from(output$).pipe(
          subscribeOn(uniqueQueueScheduler),
          observeOn(uniqueQueueScheduler)
        )
      )
    );

    result$.subscribe(store.dispatch);

    // 返回的这一整块是 redux 中间件
    return next => {
      return action => {
        const result = next(action);
        stateSubject$.next(store.getState());
        // 每次有 action 发出，就通知 epic 里面的监听器
        actionSubject$.next(action);
        return result;
      };
    };
  };

  epicMiddleware.run = rootEpic => {
    epic$.next(rootEpic);
  };

  return epicMiddleware;
}
```

## combineEpics 合并所有 epic 返回新的 epic

```js
export function combineEpics(...epics) {
  return (...args) => merge(
    ...epics.map(epic => {
      return epic(...args)
    })
  )
}
```

## 最后

redux-observable 如何能够监听到所有的 action ？

epic 里边监听了 action$；每次有 action 发射的时候，action$ 会将这个 action 发射出去。

其他中间件如何接管 redux-observable 映射出来的 action ？

$result 被监听最终会执行 dispatch
