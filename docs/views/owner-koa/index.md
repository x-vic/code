---
title: koa
lang: zh-CN
---

> koa 给我印象比较深刻的是 ctx 以及中间件的洋葱模型，本次简单实现中，重点实现这两个特性

## 目录结构

koa 主要有以下几个模块：  
- application.js 核心模块
- context.js 上下文模块
- response.js 响应对象模块
- request.js 请求对象模块

## request

```js
const url = require('url')

const request = {
  get url() {
    return this.req.url
  },
  get path() {
    return url.parse(this.req.url).pathname
  },
  get query() {
    return url.parse(this.req.url).query
  }
}

module.exports = request
```

## response

```js
const response = {
  get body() {
    return this._body
  },
  set body(value) {
    this.res.statusCode = 200
    this._body = value
  }
}

module.exports = response
```

## context

```js{3-7,9-13}
const proto = {}

function defineGetter(prop, name) {
  proto.__defineGetter__(name, function() {
    return this[prop][name]
  })
}

function defineSetter(prop, name) {
  proto.__defineSetter__(name, function(val) {
    this[prop][name] = val
  })
}
// 访问 ctx 的某个属性时，代理到 request 或 response 的对应属性上
defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = proto
```

## application

```js{20-27}
const http = require('http')
const EventEmmit = require('events')
const Stream = require('stream')
const request = require('./request')
const context = require('./context')
const response = require('./response')

class VKoa extends EventEmmit {
  constructor() {
    super()
    this.middlewares = []
    this.request = request
    this.response = response
    this.context = context
  }
  use(fn) {
    this.middlewares.push(fn)
  }
  // 实现洋葱模型中间件的关键逻辑
  async compose(middlewares, ctx) {
    const dispatch = async(index) => {
      if (index >= middlewares.length) return
      const middleware = middlewares[index]
      return middleware(ctx, () => dispatch(index + 1))
    }
    return dispatch(0)
  }
  // 这一块主要是让用户能够更方便地获取 ctx request response 三个对象
  createContext(req, res){
    const ctx = Object.create(this.context)
    const request = ctx.request = Object.create(this.request)
    const response = ctx.response = Object.create(this.response)
    ctx.req = request.req = response.req = req
    ctx.res = request.res = response.res = res
    request.ctx = response.ctx = ctx
    request.response = response
    response.request = request
    return ctx
  }
  // 执行完所有中间件之后，根据 ctx.body 的类型返回相应的 Content-Type
  handleRequest(req, res){
    res.statusCode = 404
    const ctx = this.createContext(req, res)
    const fn = this.compose(this.middlewares, ctx)
    fn.then(() => {
      if(typeof ctx.body == 'object'){
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        res.end(JSON.stringify(ctx.body))
      } else if (ctx.body instanceof Stream){ // 如果是流
        ctx.body.pipe(res)
      }
      else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
        res.setHeader('Content-Type', 'text/htmlcharset=utf8')
        res.end(ctx.body)
      } else {
        res.end('Not found')
      }
    }).catch(err => {
      this.emit('error', err)
      res.statusCode = 500
      res.end('server error')
    })
  }
  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(3000)
  }
}

module.exports = VKoa
```