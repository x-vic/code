---
title: 函数组件
lang: zh-CN
---

## 函数组件是怎样转化的？

```jsx
/** @jsx Redact.createElement */
function App(props) {
  return <h1>Hi {props.name}</h1>;
};
// 等效 JS 代码 👇
function App(props) {
  return Redact.createElement(
    "h1",
    null,
    "Hi ",
    props.name
  );
}
```

::: tip 函数组件与普通`jsx`的不同点
1. 函数组件的 fiber 节点没有对应 DOM
2. 函数组件的 children 来自函数执行结果，而不是像标签元素一样直接从 props 获取，因为 children 不只是函数组件使用时包含的子孙节点，还需要组合组件本身的结构
:::

## 实现一览

> 注意以下代码省略了未改动部分

```js {8-11,19,27-35,40-44,58-70}
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // 当 fiber 是函数组件时节点不存在 DOM，
  // 故需要遍历父节点以找到最近的有 DOM 的节点
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    // 直接移除 DOM 替换成 commitDeletion 函数
    commitDeletion(fiber, domParent);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

// 新增函数，移除 DOM 节点
function commitDeletion(fiber, domParent) {
  // 当 child 是函数组件时不存在 DOM，
  // 故需要递归遍历子节点找到真正的 DOM
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  // 原本逻辑挪到 updateHostComponent 函数
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

// 新增函数，处理函数组件
function updateFunctionComponent(fiber) {
  // 执行函数组件得到 children
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

// 新增函数，处理原生标签组件
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}
```
