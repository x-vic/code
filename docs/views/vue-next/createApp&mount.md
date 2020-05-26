---
title: createApp && mount
lang: zh-cn
---

![patch](/code/images/patch.svg)

# createApp

1. 根据不同的宿主环境创建不同的 app
2. 初始化 app 的各种方法

> 在 createApp 传入的参数被当作闭包存起来，之后在调用 app 的各种方法时，都可以直接取到这些入参。

```ts
const createApp = (rootComponent, rootProps = null) => {
  /**
   * context 包含 components、config、directives、mixins、provides
  */
  const context = createAppContext()
  const app: App = {
    _component: rootComponent as Component,
    _props: rootProps,
    _container: null,
    _context: context,

    get config() {},
    set config(v) {},

    use(plugin: Plugin, ...options: any[]) {},
    mixin(mixin: ComponentOptions) {},
    component(name: string, component?: PublicAPIComponent): any {},
    directive(name: string, directive?: Directive) {},
    mount(rootContainer: HostElement, isHydrate?: boolean): any {},
    unmount() {},
    provide(key, value) {}
  }

  return app
}
```

# mount

```ts
mount(rootContainer: HostElement, isHydrate?: boolean): any {
  // rootComponent 从 createApp 中的闭包中拿到
  /**
   * 1. 确定 shapeFlag （shapeFlag 用来分辨这个 vnode 是什么类型，如 string、element、statefulComponent、FunctionalComponent...）
  */
  const vnode = createVNode(rootComponent as Component, rootProps)
  render(vnode, rootContainer)
}
```

## 根 render

```ts
const render: RootRenderFunction = (vnode, container) => {
  patch(container._vnode || null, vnode, container)
  flushPostFlushCbs()
  container._vnode = vnode
}
```

## patch

```ts
const patch: PatchFn = (
  n1,
  n2,
  container,
  anchor = null,
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  optimized = false
) => {
  // 对比 n1 n2 类型是否相同，如果不想同，就卸载旧的 vnode
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1)
    unmount(n1, parentComponent, parentSuspense, true)
    n1 = null
  }

  const { type, ref, shapeFlag } = n2
  switch (type) {
    case Text:
      processText(n1, n2, container, anchor)
      break
    case Comment:
      processCommentNode(n1, n2, container, anchor)
      break
    case Static:
      if (n1 == null) {
        mountStaticNode(n2, container, anchor, isSVG)
      } else if (__DEV__) {
        patchStaticNode(n1, n2, container, isSVG)
      }
      break
    case Fragment:
      processFragment(
        n1,
        n2,
        container
      )
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(
          n1,
          n2,
          container
        )
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        // 首次 mount 走的就是这个分支
        processComponent(
          n1,
          n2,
          container
        )
      } else if (shapeFlag & ShapeFlags.TELEPORT) {
        ;(type as typeof TeleportImpl).process(
          n1,
          n2,
          container
        )
      } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
        ;(type as typeof SuspenseImpl).process(
          n1,
          n2,
          container
        )
      } else if (__DEV__) {
        warn('Invalid VNode type:', type, `(${typeof type})`)
      }
  }
}
```

## processComponent

1. 判断 n1 是否存在来执行

```ts
const processComponent = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  if (n1 == null) {
    mountComponent(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
  } else {
    updateComponent(n1, n2, parentComponent, optimized)
  }
}
```

## mountComponent

1. 创建组件实例
2. 执行 setup 函数
3. 调用 setupRenderEffect

```ts
const mountComponent: MountComponentFn = (
  initialVNode,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  optimized
) => {
  /**
   * 创建组件实例，该实例主要包含：各钩子函数、ctx（$data、$emit...）、
  */
  const instance: ComponentInternalInstance = (initialVNode.component = createComponentInstance(
    initialVNode,
    parentComponent,
    parentSuspense
  ))

  /**
   * 初始化 props、slots
   * 执行 setup 函数，返回结果
  */
  setupComponent(instance)

  setupRenderEffect(
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  )
}
```

## setupRenderEffect

创建子节点的 vnode

```ts
const setupRenderEffect: SetupRenderEffectFn = (
  instance,
  initialVNode,
  container,
  anchor,
  parentSuspense,
  isSVG,
  optimized
) => {
  // Vic 创建更新函数
  instance.update = effect(function componentEffect() {
    if (!instance.isMounted) {
      let vnodeHook: VNodeHook | null | undefined
      const { el, props } = initialVNode
      const { bm, m, a, parent } = instance
      
      // 得到组件中根节点的 vnode (这个节点的 vnode 就是 dom 的 vnode)
      // 将 render 函数依赖收集了（这里的 render 是 vue 生成的 render，不同于上面提到的 render）
      /**
       * renderComponentRoot 里面会创建 child 的 vnode
      */
      const subTree =  (instance.subTree = renderComponentRoot(instance))
      
      // 调用 beforeMount hook
      if (bm) {
        invokeArrayFns(bm)
      }
      
      // 递归调用 patch，与第一次不同的是 n2 已经不是之前的根组件 vnode，而是根组件里面根元素的 vnode （这一次的 patch 是可以真正执行 appendChild 操作）
      patch(
        null,
        subTree,
        container,
        anchor,
        instance,
        parentSuspense,
        isSVG
      )
      initialVNode.el = subTree.el

      // 调用 mounted hook
      if (m) {
        queuePostRenderEffect(m, parentSuspense)
      }
      instance.isMounted = true
    } else {
      // 更新逻辑
    }
  }, __DEV__ ? createDevEffectOptions(instance) : prodEffectOptions)
}
```

## effect 调用 patch

## processElement (n2 为 article 这个节点的 vnode)

```ts
const processElement = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  isSVG = isSVG || (n2.type as string) === 'svg'
  if (n1 == null) {
    mountElement(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
  } else {
    patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized)
  }
}
```

## mountElement

这里包含递归终止条件，即这个 vnode 的 children 是 text，那就终止。

1. 重用静态 dom 节点
2. 根据 vnode 创建 dom
3. 插入 dom 属性
4. 调用指令的钩子(beforeMount)
5. 给 dom 添加 scopeId
6. 处理 children
7. 将创建好的 dom 插入到 container

```ts
const mountElement = (
  vnode: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) => {
  let el: RendererElement
  let vnodeHook: VNodeHook | undefined | null
  const {
    type,
    props,
    shapeFlag,
    transition,
    scopeId,
    patchFlag,
    dirs
  } = vnode
  if (
    vnode.el &&
    hostCloneNode !== undefined &&
    patchFlag === PatchFlags.HOISTED
  ) {
    // 如果是静态节点，那就重用
    el = vnode.el = hostCloneNode(vnode.el)
  } else {
    // 这里创建了真实的 dom
    el = vnode.el = hostCreateElement(
      vnode.type as string,
      isSVG,
      props && props.is
    )
    // props
    if (props) {
      for (const key in props) {
        if (!isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG)
        }
      }
      if ((vnodeHook = props.onVnodeBeforeMount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode)
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount')
    }

    // scopeId
    if (scopeId) {
      hostSetScopeId(el, scopeId)
    }

    // 处理 children （container 变成了新创建的 container，这里一定是先把所有的 children 全部挂载之后，最后一次挂载到 mount 中的 container 上）
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, vnode.children as string)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 这里执行完之后，就在内存中创建了一棵大大的 dom 树
      mountChildren(
        vnode.children as VNodeArrayChildren,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== 'foreignObject',
        optimized || !!vnode.dynamicChildren
      )
    }
  }
  // 这里开始作dom插入
  hostInsert(el, container, anchor)
  if (
    (vnodeHook = props && props.onVnodeMounted) || dirs
  ) {
    queuePostRenderEffect(() => {
      vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode)
      dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted')
    }, parentSuspense)
  }
}
```

### mountChildren

递归调用 patch

```ts
const mountChildren: MountChildrenFn = (
  children,
  container,
  start = 0
) => {
  for (let i = start; i < children.length; i++) {
    const child = (children[i] = optimized
      ? cloneIfMounted(children[i] as VNode)
      : normalizeVNode(children[i]))
    patch(
      null,
      child,
      container,
    )
  }
}
```
