---
title: react-redux
---

## 用法

看看 react-redux 有两个重要的 API 的用法：
```jsx
// Provider
ReactDOM.render({
  <Provider store={store}></Provider>,
  document.getElementById('app')
})

// connect
@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {}
```

## Provider

传递 store 和 订阅方法给所有组件

```js
class Subscription {
  constructor(store) {
    this.store = store
    this.listeners = [this.handleChangeWrapper]
  }
  notify = () => {
    this.listeners.forEach(listener => {
      listener()
    })
  }
  addListener(listener) {
    this.listeners.push(listener)
  }
  // 监听 store
  trySubscribe() {
    this.unsubscribe = this.store.subscribe(this.notify)
  }
  // onStateChange 需要在组件中设置
  handleChangeWrapper = () => {
    if (this.onStateChange) {
      this.onStateChange()
    }
  }
  unsubscribe() {
    this.listeners = null
    this.unsubscribe()
  }
}

const Provider = ({ store, children }) => {
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store)
    return {
      store,
      subscription
    }
  }, [store])
  // 监听 store 变化
  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [contextValue])
  return (
    <ReactReduxContext.Provider value={contextValue}>
      {children}
    </ReactReduxContext.Provider>
  )
}
```

## connect

从 sore 中的到 state 和 actionCreator，监听 state 变化，触发重渲染

```jsx
const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    return (props) => {
      // 获取 store 和 订阅方法
      const { store, subscription } = useContext(ReactReduxContext)
      const [count, setCount] = useState(0)
      useEffect(() => {
        // redux 中的 state 变化 ==> 触发监听者：onStateChange ==> setCount 引发组件重渲染
        subscription.onStateChange = () => setCount(count + 1)
      }, [count])
      const newProps = useMemo(() => {
        const stateProps = mapStateToProps(store.getState())
        const dispatchProps = mapDispatchToProps(store.dispatch)
        return {
          ...stateProps,
          ...dispatchProps,
          ...props
        }
      }, [props, store, count])
      return <WrappedComponent {...newProps} />
    }
  }
}
```