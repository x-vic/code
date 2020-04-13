---
title: Concurrent Mode & fiber
lang: zh-cn
---

:::tip 主旨
上一版实现的 `render` 是通过递归的方式将 `dom` 层层插入，最终实现了虚拟dom到页面的渲染。  
但是这么做的问题在于递归的过程无法中断，从而导致阻塞用户点击事件和渲染动画这些高优先级的操作，给人一种卡顿的感觉。  
这次旨在解决上述问题。
:::

Concurrent Mode
@flowstart
render=>start: 设置下一个执行单元为根fiber
setNextUnitOfWork=>operation: 设置下一个执行单元
nextUnitOfWork=>condition: 浏览器空闲
handleCurrentFiber=>parallel: 处理当前fiber
nextCallback=>operation: 设置下一次空闲时的任务

createDom=>operation: 给 fiber 创建 dom
appendChild=>operation: 将自身的 dom 插到父 fiber 上
createChildrenFiber=>subroutine: 为每一个子元素创建 fiber
fiberHasChild=>condition: fiber 是否有 child
hasSibling=>condition: 是否有 sibling
hasParentSibling=>condition: 父节点是否有 sibling
returnParent=>operation: 回到上层继续查找
end=>end: 暂停遍历 fiber 树

render->setNextUnitOfWork->nextUnitOfWork(yes)->handleCurrentFiber(path1, left)->setNextUnitOfWork
nextUnitOfWork(no)->nextCallback->end
@flowend

## 利用浏览器的空闲算力

在一个循环中执行任务单元；  
更新下一个任务单元，同时判断是否还有空闲时间；  
跳出循环之后将任务添加到下一次空闲操作中。
react 目前是使用自己实现的调度算法，这里使用 `requestIdleCallback` 这个浏览器提供的 API 实现。

```js
let nextUnitOfWork = null

// 一旦浏览器空闲，就触发执行单元任务
requestIdleCallback(workLoop);

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
```

## 如何处理一个 fiber

![fiber](/code/images/fiber.png)

1. 创建对应的 dom
2. 将自身的 dom 插入到父 dom 上
3. 为 children 创建 fiber
    1. 为每一个 child 创建 parent 指向当前 fiber
    2. 创建当前 fiber 到第一个 child 的指向
    3. 为相邻的 child 创建前一个到后一个的 sibling 指向
4. 找到下一个任务单元返回
    1. 当前 fiber 有 child 返回它
    2. 当前 fiber 有 sibling 返回它
    3. 没有 child 也没有 sibling，那就回到 4.2 找 parent 的 sibling

```js
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  // 为每个子元素创建新的 fiber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    };
    // 根据上面的图示，父节点只链接第一个子节点
    if (index === 0) {
      fiber.child = newFiber
    } else {
      // 兄节点链接弟节点
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
  // 返回下一个任务单元（fiber）
  // 有子节点直接返回
  if (fiber.child) {
    return fiber.child
  }
  // 没有子节点则找兄弟节点，兄弟节点也没有找父节点的兄弟节点，
  // 循环遍历直至找到为止
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
  return null
}
```

## 整体一览

```js
let nextUnitOfWork = null

// 一旦浏览器空闲，就触发执行单元任务
requestIdleCallback(workLoop);

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type)
  const isProperty = key => key !== 'children'
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name];
    })
  return dom
}

// render 设置 nextUnitOfWork 为根的 fiber
export function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

// 处理一个 fiber
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  // 为每个子元素创建新的 fiber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    };
    // 根据上面的图示，父节点只链接第一个子节点
    if (index === 0) {
      fiber.child = newFiber
    } else {
      // 兄节点链接弟节点
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
  // 返回下一个任务单元（fiber）
  // 有子节点直接返回
  if (fiber.child) {
    return fiber.child
  }
  // 没有子节点则找兄弟节点，兄弟节点也没有找父节点的兄弟节点，
  // 循环遍历直至找到为止
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
  return null
}
```

::: warn 问题
目前虽然实现的中断遍历过程，但是中断之后可能会造成页面只渲染一部分的情况...
:::
