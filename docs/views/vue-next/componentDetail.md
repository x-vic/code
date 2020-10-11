---
title: 组件渲染的细节
original: true
---

## 得到组件的 render 方法

> 在 mountComponent 的时候（setupRenderEffect 之前），vue 会 setupComponent(instance)

1. 模版编译得到 render
2. setup 方法返回的是一个函数，那么该函数自动成为实例的 render 方法

### setupComponent(instance)

1. 初始化 props
2. 初始化 slots
3. 调用 setupStatefulComponent

```ts
export function setupComponent(
  instance: ComponentInternalInstance,
  isSSR = false
) {
  const { props, children, shapeFlag } = instance.vnode
  const isStateful = shapeFlag & ShapeFlags.STATEFUL_COMPONENT
  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)

  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined
  return setupResult
}
```

### setupStatefulComponent

```ts
function setupStatefulComponent(
  instance: ComponentInternalInstance
) {
  const Component = instance.type as ComponentOptions
  // 0. create render proxy property access cache
  instance.accessCache = {}
  // 1. create public instance / render proxy
  // also mark it raw so it's never observed
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)
  // 2. call setup()
  const { setup } = Component
  if (setup) {
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null)

    currentInstance = instance
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      ErrorCodes.SETUP_FUNCTION,
      // 这里是真正注入到 setup 函数中的参数
      [__DEV__ ? shallowReadonly(instance.props) : instance.props, setupContext]
    )
    currentInstance = null

    handleSetupResult(instance, setupResult, isSSR)
  } else {
    finishComponentSetup(instance, isSSR)
  }
}
```

### callWithErrorHandling

调用 setup，进行错误处理

```ts
export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}
```

### handleSetupResult

1. 如果 setup 返回的是一个函数，那么这个函数将成为 instance 的 render 方法
2. 将 setupResult 包装成 reactive 类型（如果已经是，那就作罢），并将之赋值给 instance.setupState
3. 得到 render，兼容 2.x 选项组件

```ts
export function handleSetupResult(
  instance: ComponentInternalInstance,
  setupResult: unknown,
  isSSR: boolean
) {
  // 如果 setup 返回的是一个函数，那么这个函数将成为 instance 的 render 方法
  if (isFunction(setupResult)) {
    instance.render = setupResult as InternalRenderFunction
  } else if (isObject(setupResult)) {
    // 将 setupResult 包装成 reactive 类型（如果已经是，那就作罢），并将之赋值给 instance.setupState
    instance.setupState = reactive(setupResult)
  }
  finishComponentSetup(instance, isSSR)
}
```

### finishComponentSetup

1. 运行时编译得到 render
2. 兼容 2.x 版本的 options

```ts
function finishComponentSetup(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type as ComponentOptions

  // template / render function normalization
  if (__NODE_JS__ && isSSR) {
    if (Component.render) {
      instance.render = Component.render as InternalRenderFunction
    }
  } else if (!instance.render) {
    if (compile && Component.template && !Component.render) {
      // 在这里，得到运行时编译出来的 render 方法，并且将这个方法缓存起来 compileCache[key] = render 其中，key 是原始模版字符串 
      Component.render = compile(Component.template, {
        isCustomElement: instance.appContext.config.isCustomElement || NO
      })
      // 标记这个 render 方法是一个 runtime compile function
      ;(Component.render as InternalRenderFunction)._rc = true
    }

    instance.render = (Component.render || NOOP) as InternalRenderFunction

    // 运行时编译的 render 使用了 with 语句，重新代理...
    if (instance.render._rc) {
      instance.withProxy = new Proxy(
        instance.ctx,
        RuntimeCompiledPublicInstanceProxyHandlers
      )
    }
  }

  // 兼容 2.x 选项组件
  if (__FEATURE_OPTIONS__) {
    currentInstance = instance
    applyOptions(instance, Component)
    currentInstance = null
  }
}
```


## 如何得到组件中真正需要渲染的 vdom

> 渲染(effect)一个组件的时候，通过 `const subTree =  (instance.subTree = renderComponentRoot(instance))` 调用了 instance 的 render 方法，生成了标签 vnode 以及 自组件 vnode

### renderComponentRoot

调用 instance 的 render 方法，返回真实节点的 vnode

```ts
export function renderComponentRoot(
  instance: ComponentInternalInstance
): VNode {
  const {
    type: Component,
    parent,
    vnode,
    proxy,
    withProxy,
    props,
    slots,
    attrs,
    emit,
    renderCache
  } = instance

  let result
  currentRenderingInstance = instance
  
  let fallthroughAttrs
  // 选项组件
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // 运行时编译出来的 render 使用了 with 语句，这里要判断是不是需要 withProxy （with 语句对 has 操作符是要区别处理的）
    const proxyToUse = withProxy || proxy
    // 在这里创建子节点的 vNode
    result = normalizeVNode(
      instance.render!.call(proxyToUse, proxyToUse!, renderCache)
    )
    fallthroughAttrs = attrs
  } else {
    // 函数式组件
    const render = Component as FunctionalComponent
    result = normalizeVNode(
      render.length > 1
        // 往函数式组件（即单独一个 setup 函数）注入相关参数
        ? render(props, { attrs, slots, emit })
        : render(props, null as any /* we know it doesn't need it */)
    )
    fallthroughAttrs = Component.props ? attrs : getFallthroughAttrs(attrs)
  }

  let root = result  
  
  root = cloneVNode(root, fallthroughAttrs)
  
  result = root
  currentRenderingInstance = null

  return result
}
```

### 内存中创建的 render

```js
(function anonymous(Vue
) {
const _Vue = Vue

return function render(_ctx, _cache) {
  // 通过 with 语句将 vue 组件实例注入到 render 函数的执行上下文中，以便 render 函数直接读取实例中的 data、method...
  with (_ctx) {
    const { resolveComponent: _resolveComponent, createVNode: _createVNode, toDisplayString: _toDisplayString, createTextVNode: _createTextVNode, Fragment: _Fragment, openBlock: _openBlock, createBlock: _createBlock } = _Vue

    const _component_Hehe = _resolveComponent("Hehe")

    return (_openBlock(), _createBlock(_Fragment, null, [
      _createVNode(_component_Hehe),
      // count 直接从 _ctx 中读取
      _createTextVNode(_toDisplayString(count), 1 /* TEXT */)
    ], 64 /* STABLE_FRAGMENT */))
  }
}
})
```



