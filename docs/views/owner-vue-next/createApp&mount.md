---
title: createApp && mount
original: true
---

![mount](/code/images/mount.svg)

## 本文目标

简单实现 vue3 中的 `createApp` 和 `mount` 两个 API。虽然只有两个 API，但是这两个 API 实现了 vue3 根实例的创建、组件的解析、vnode 数的构建...  
通过这两个 API 的实现，就能够了解到整个 vue3 项目的整体挂载流程，可以说是 vue3 的核心 API。  
[本文代码 GitHub 仓库地址](https://github.com/yesixuan/test-vue-next)

```js
// 定义根组件
import { h } from 'vue' // 文中只有 h 方法使用 vue 官方提供
import { reactive } from './vic/reactive' // 自己实现的 reactive
import { createApp } from './vic' // 自己实现的 createApp

const App = {
  components: { SubCom },
  setup() {
    const count = reactive({
      value: 0
    })
    const inc = () => {
      count.value++
    }
    return () => h('div', [h('h1', count.value), h('button', { onClick: inc }, '++'), h(SubCom)])
  }
}

// 定义子组件
const SubCom = {
  setup() {
    return () => h('div', [h('h2', '我是子组件')])
  }
}

// 挂载
createApp(App).mount(document.getElementById('app'))
```

## 代码实现

```js
import { effect } from './reactive'

let uid = 0

/**
 * 1. 创建 context，用来承载一些全局的配置、全局注册的指令、组件...
 * 2. 创建 app 实例（vue 项目唯一的实例，目前主要关注它提供的 mount 方法）
 */
export const createApp = (rootComponent, rootProps = null) => {
  const context = {
    config: {
      devtools: true,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null)
  }
  const app = {
    /**
     * 1. 创建根组件的 vnode
     * 2. 调用 render 方法，将 vnode 渲染到真实 dom 上
     */
    mount: (rootContainer) => {
      const vnode = createVNode(rootComponent, rootProps)
      vnode.appContext = context
      render(vnode, rootContainer)
    },
    components: {}
  }
  return app
}

/**
 * 极简版的创建 vnode
 * @param type 当 type 为对象时，表示这是个组件，当 type 为字符串时，表示这是个原生 dom 标签 
 */
function createVNode(type, props) {
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    key: props,
    scopeId: 1,
    children: null,
    component: null,
    el: null,
    shapeFlag: 4, // 表示组件，因为这里只在创建根组件的 vnode 的时候用到，所以这里先写死
    patchFlag: 0,
    appContext: null
  }
  return vnode
}

// render 什么也没做，光是调用了 patch 方法
// patch 的第一个参数传入 null 表示这是首次渲染，没有上一次的 vnode 进行 diff
function render(vnode, container) {
  patch(null, vnode, container)
}

// 整个 vue 应用递归挂载的起点
// 根据 shapeFlag 的不同，选择挂载组件还是挂载 dom 元素
function patch(n1, n2, container,) {
  const { shapeFlag } = n2
  if (typeof n2.type === "symbol") {
    processText(n1, n2, container)
    return
  }
  if (shapeFlag === 17 || shapeFlag === 9) {
    processElement(
      n1,
      n2,
      container
    )
  } else if (shapeFlag === 4) {
    // 首次 mount 走的就是这个分支
    processComponent(
      n1,
      n2,
      container
    )
  }
}

// 啥也没干，调了 mountComponent 方法
function processComponent(n1, n2, container) {
  mountComponent(n2, container)
}

/**
 * 1. 根据 vnode 创建了它的实例
 * 2. 对实例进行各种处理，包裹 props、data、调用组件的 setup 方法、生成组件的 render 方法
 * 3. 调用实例的 render 方法，得到组件下的第一额真实 dom 的 vnode，递归调用 patch（此时 patch 传入的就是真实 dom 的 vnode 了）
 */
function mountComponent(initialVNode, container) {
  const instance = (initialVNode.component = createComponentInstance( initialVNode, null, null ))
  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

// 根据组件 vnode 创建相应的实例
// 这里需要关注两个属性：appContext、components，这两个属性都继承了根实例的相应属性
// 这样做有利于在每个组件中拿到项目共享的一些属性和方法，在任何组件都能够拿到全局注册过的组件
function createComponentInstance(vnode, parent, suspense) {
  // inherit parent app context - or - if root, adopt from root vnode
  const appContext =
    (parent ? parent.appContext : vnode.appContext) || {}
  const instance = {
    uid: uid++,
    vnode,
    parent,
    appContext,
    type: vnode.type,
    root: null, // to be immediately set
    next: null,
    subTree: null, // will be set synchronously right after creation
    update: null, // will be set synchronously right after creation
    render: null,

    // state
    ctx: {},
    data: {},
    props: {},
    attrs: {},
    slots: {},
    refs: {},
    setupState: {},
    setupContext: null,

    // per-instance asset storage (mutable during options resolution)
    components: Object.create(appContext.components || [])
  }
  instance.ctx = { _: instance }
  instance.root = parent ? parent.root : instance
  return instance
}

// 这里主要是调用组件的 setup 方法得到了实例的 render 方法（其实还有更多工作，如处理 data、props...此处暂且不论）
function setupComponent(instance) {
  const Component = instance.type
  const { setup } = Component
  const setupResult = setup(instance.props, {})
  instance.render = setupResult
}

/**
 * 1. 使用 effect 包裹响应式操作
 * 2. 响应式操作里面主要做两件事
 *  2.1 调用实例的 render 方法得到 subTree
 *  2.2 递归调用 patch(subTree, container)
 */
function setupRenderEffect(
  instance,
  initialVNode,
  container
) {
  // create reactive effect for rendering
  // Vic 创建更新函数
  instance.update = effect(function componentEffect() {
    const { el } = initialVNode
    // Vic 在这里创建组件根 dom 的 vNode 树 （这棵树里面的 children 也创建出 vnode）
    const subTree =  (instance.subTree = renderComponentRoot(instance))
    el && container.removeChild(el)
    // Vic 这个方法里面真正开始构建内存中的 dom 树
    patch(
      null,
      subTree,
      container
    )
    initialVNode.el = subTree.el
  })
}

// 调用实例的 render 方法，得到该组件实例下根 dom 节点的 vnode （由 h 函数来生成）
function renderComponentRoot(instance) {
  const {
    props,
    slots,
    attrs,
    emit,
    render
  } = instance

  let result
  
  // 函数式组件
  result = render(props, { attrs, slots, emit })
  return result
}

// 没啥说的，调用 mountElement 方法
function processElement(n1, n2, container) {
  if (n1 == null) {
    mountElement(n2, container)
  }
}

/**
 * 前置： 能走到这里来就意味着 vnode 是一个 dom 的 vnode （这里的 type 一定是一个字符串）
 * 1. 根据 type 创建 dom 节点
 * 2. 将创建出来的 dom 节点添加到 container 里面
 * 3. 处理 props （属性和事件）
 * 4. mountChildren （遍历 children，递归调用 patch）
 */
function mountElement(vnode, container) {
  const { type, props } = vnode

  let el = vnode.el = document.createElement(type)
  container.appendChild(el)
  Object.entries(props || {}).forEach(([key, val]) => {
    if (key.startsWith('on')) {
      el.addEventListener(key.substr(2).toLocaleLowerCase(), val)
    } else {
      el[key] = val
    }
  })
  if (!Array.isArray(vnode.children)) { // 递归的终止点
    el.appendChild(document.createTextNode(vnode.children))
  } else {
    mountChildren(vnode.children, el, null)
  }
}

// 对每一个 child 进行 patch
function mountChildren(children, container) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    patch(
      null,
      child,
      container
    )
  }
}

// 乏善可陈（递归的终止点）
function processText(n1, n2, container) {
  n2.el = document.createTextNode(n2.children)
  container.appendChild(n2.el)
}
```

## 最后

本文旨在厘清 mount 递归挂载 vue3 应用的整个过程。函数名称与 vue-next 源码保持一致，但是隐藏了大量的细节以及与 mount 无关的分支。