---
title: createElement && render
lang: zh-cn
---

## createElement

将 `babel` 解析过后的参数处理成一个虚拟 `dom`
```js
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
    }
  }
}
```

::: details createTextElement的实现
```js
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}
```
:::

## render

```js
export function render(element, container) {
  // 创建节点
  const dom = element.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(element.type)
  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  // 递归遍历子节点
  element.props.children.forEach(child => render(child, dom))
  container.appendChild(dom)
}
```




