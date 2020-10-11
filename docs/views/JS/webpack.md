---
title: webpack
---

本文部分摘录[webpack 系列](https://segmentfault.com/a/1190000023016347)

## loader

loader 文件处理器是一个 CommonJs 风格的函数，该函数接收一个 String/Buffer 类型的入参，并返回一个 String/Buffer 类型的返回值。

### 同步 loader

```js
// content：文件内容；map：sourcemap；meta：一些源信息
module.exports = function(content, map, meta) {
  // 一些同步操作
  outputContent = syncFn(content)
  return outputContent
}

// 如果返回结果只有一个，也可以直接使用 return 返回结果。但是，如果有些情况下还需要返回其他内容，如 sourceMap 或是 AST 语法树，这个时候可以借助 webpack 提供的 api this.callback
module.exports = function(content, map, meta) {
  this.callback(
    err: Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    meta?: any
  )
}
```

### 异步 loader

异步 loader，使用 `this.async` 来获取 `callback` 函数。
```js
module.exports = function(source) {
  var callback = this.async()
  // 做异步的事
  asyncFn(content, function(err, result) {
    if (err) return callback(err)
    callback(null, result)
  })
}
```

### 一个简单的 md-loader 示例

```js
const marked = require('marked')

const loaderUtils = require('loader-utils')
module.exports = function(content) {
  // 有缓存的情况下，合理利用缓存
  this.cacheable && this.cacheable()
  const options = loaderUtils.getOptions(this)
  try {
    marked.setOptions(options)
    return marked(content)
  } catch (err) {
    this.emitError(err)
    return null
  }
}
```


## 插件

通过插件我们可以扩展webpack，在合适的时机通过Webpack提供的 API 改变输出结果，使webpack可以执行更广泛的任务，拥有更强的构建能力。

### 插件结构

1. 读取配置的过程中会先执行 new HelloPlugin(options) 初始化一个 HelloPlugin 获得其实例
2. 初始化 compiler 对象后调用 HelloPlugin.apply(compiler) 给插件实例传入 compiler 对象
3. 插件实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称, 回调函数) 监听到 Webpack 广播出来的事件

```js
class HelloPlugin {
  // 配置处理
  constructor(options) {}
  // Webpack 会调用这个方法给插件实例传入 compiler 对象
  apply(compiler) {
    // 在emit阶段插入钩子函数，用于特定时机处理额外的逻辑；
    compiler.hooks.emit.tap('HelloPlugin', (compilation) => {
      // 在功能流程完成后可以调用 webpack 提供的回调函数；
    })
    // 监听 webpack 发射出来的 emit 事件
    compiler.plugin('emit', function (compilation, callback) {
      // 支持处理逻辑
      // 处理完毕后执行 callback 以通知 Webpack
      // 如果不执行 callback，运行流程将会一直卡在这不往下执行
      callback()
    })
  }
}

module.exports = HelloPlugin
```

### 构建流程

1. 校验配置文件 ：读取命令行传入或者 webpack.config.js 文件，初始化本次构建的配置参数

2. 生成 `Compiler` 对象：执行配置文件中的插件实例化语句 new MyWebpackPlugin()，为 webpack 事件流挂上自定义 hooks

3. 进入 entryOption 阶段：webpack 开始读取配置的 Entries，递归遍历所有的入口文件

4. run/watch：如果运行在 watch 模式则执行 watch 方法，否则执行 run 方法

5. compilation：创建 Compilation 对象回调 compilation 相关钩子，依次进入每一个入口文件(entry)，使用 loader 对文件进行编译。通过 compilation 我可以可以读取到 module 的 resource（资源路径）、loaders（使用的 loader）等信息。再将编译好的文件内容使用 acorn 解析生成 AST 静态语法树。然后递归、重复的执行这个过程，
所有模块和和依赖分析完成后，执行 compilation 的 seal 方法对每个 chunk 进行整理、优化、封装    __webpack_require__ 来模拟模块化操作

6. emit：所有文件的编译及转化都已经完成，包含了最终输出的资源，我们可以在传入事件回调的 compilation.assets 上拿到所需数据，其中包括即将输出的资源、代码块 Chunk 等等信息。

### compiler 与 compilation

compiler 对象包含了当前运行 webpack 的配置，包括 entry、output、loaders 等配置，这个对象在启动 webpack 时被实例化，而且是全局唯一的。plugin 可以通过该对象获取到 webpack 的配置信息进行处理。  

compilation 的职责就是构建模块和 chunk，并利用插件优化构建过程。它和 compiler 用法相同，钩子类型不同，也可以在某些钩子上访问 tapAsync 和 tapPromise。

## 简单实现打包器

先来看看 webpack 的整体运行流程：  
1. 读取参数
2. 实例化 Compiler
3. entryOption 阶段，读取入口文件
4. Loader 编译对应文件，解析成 AST
5. 找到对应依赖，递归编译处理，生成 chunk
6. 输出到 dist

下边的简单实现流程为：  
1. 解析 entry，得到 dependencies、code
2. 解析 entry 的过程中遇到依赖，则回到第一步，直到得到所有文件的路径、依赖、代码信息
3. 根据上面得到的所有文件信息，生成 bundle
  1. 调用自定义的 require 函数，传入文件路径
  2. eval code 注入 require 函数

```js
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser') //解析成ast
const traverse = require('@babel/traverse').default //遍历ast
const { transformFromAst } = require('@babel/core') //ES6转换ES5
module.exports = class Webpack {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modulesArr = []
  }
  // 生成一个大对象，键为文件路径，每个键包含该文件的依赖和代码字符
  run() {
    const info = this.build(this.entry)
    this.modulesArr.push(info)
    for (let i = 0; i < this.modulesArr.length; i++) {
      // 判断有依赖对象,递归解析所有依赖项
      const item = this.modulesArr[i]
      const { dependencies } = item
      if (dependencies) {
        for (let j in dependencies) {
          this.modulesArr.push(this.build(dependencies[j]))
        }
      }
    }
    //数组结构转换
    const obj = {}
    this.modulesArr.forEach((item) => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      }
    })
    this.emitFile(obj)
  }
  build(entryFile) {
    const conts = fs.readFileSync(entryFile, 'utf-8')
    const ast = parser.parse(conts, {
      sourceType: 'module',
    })
    //  console.log(ast)
    // 遍历所有的 import 模块,存入dependecies
    const dependencies = {}
    traverse(ast, {
      //  类型为 ImportDeclaration 的 AST 节点，
      // 其实就是我们的 import xxx from xxxx
      ImportDeclaration({ node }) {
        const newPath =
          './' + path.join(path.dirname(entryFile), node.source.value)
        dependencies[node.source.value] = newPath
        // console.log(dependencies)
      },
    })
    // 将转化后 ast 的代码重新转化成代码
    // 并通过配置 @babel/preset-env 预置插件编译成 es5
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    return {
      entryFile,
      dependencies,
      code,
    }
  }
  emitFile(allInfo) {
    //生成bundle.js
    const filePath = path.join(this.output.path, this.output.filename)
    const allInfoString = JSON.stringify(allInfo)
    const bundle = `(function(modules){
      // moduleId 为传入的 filename ，即模块的唯一标识符
      function require(moduleId){
        function localRequire(relativePath){
          return require(modules[moduleId].dependencies[relativePath]) 
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,modules[moduleId].code)
        return exports;
      }
      require('${this.entry}')
    })(${allInfoString})`
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

// 使用如下：
// new Webapck(options).run()
```

