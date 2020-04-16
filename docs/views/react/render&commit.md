---
title: render & commit
lang: zh-cn
---

## render

```js {3,9}
function render(element, container) {
  // render 时记录 wipRoot
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot
}
```

## 何时做一次整体提交

```js {11,12,13}
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1
  }
  // 当 nextUnitOfWork 为空则表示渲染 fiber 树完成了，
  // 可以提交到 DOM 了
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop)
}
```

## commit

```js{1-4,6-15}
function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  // 递归子节点和兄弟节点
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```

## 整体一览

```js {18-21,24-33,37,43,48,61-63}
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
​
  const isProperty = key => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name];
    });
​
  return dom;
}

// 新增函数，提交根结点到 DOM
function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}
​
// 新增子函数
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  // 递归子节点和兄弟节点
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  // render 时记录 wipRoot
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot;
}
​
let nextUnitOfWork = null;
// 新增变量，跟踪渲染进行中的根 fiber
let wipRoot = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 当 nextUnitOfWork 为空则表示渲染 fiber 树完成了，
  // 可以提交到 DOM 了
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

​// 一旦浏览器空闲，就触发执行单元任务
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;
​
  while (index < elements.length) {
    const element = elements[index];
​
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
​
    prevSibling = newFiber;
    index++;
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
```
