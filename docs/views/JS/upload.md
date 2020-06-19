---
title: 文件上传
---

## 请求端

上传文件我们一般使用 `multipart/form-data`。这个规范首先需要请求类型（也就是 multipart/form-data）；然后就是一个 boundary（分隔符，文件分片上传的时候，需要用到）；然后就是声明内容的描述是 form-data 类型（字段名/文件名）。

### 发送 formData 请求的几种方式

```js
const file = document.getElementById('file').files[0]
const form = new FormData();
form.append('file', file);
// 方式一：使用 axios
axios.post('http://localhost:3333/files', form)
// 方式二：使用 fecth
fetch('http://localhost:3333/files', {
  method: 'POST',
  body: form
})
// 方式三：使用 xhr
const xhr = new XMLHttpRequest()
xhr.open('POST', 'http://localhost:3333/files', true)
xhr.onload = () => {
  console.log(xhr.responseText)
}
xhr.send(form)
```

::: tip 主要还是要关注如何构造formData请求
- Request Headers
  - Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryjlY2Kd7OA1gqxdb7
- Form Data
  - file: (binary)
:::

### Blob

使用 Blob 构造 formData 对象。
```js
const json = { hello: "world" }
const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
    
const form = new FormData()
form.append('file', blob, '1.json')
axios.post('http://localhost:3333/files', form)
```

使用 File 对 Blob 再一次进行包装（File 兼容性可能会差一些）
```js
const json = { hello: "world" }
const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
    
const file = new File([blob], '1.json')
form.append('file', file)
axios.post('http://localhost:3333/files', form)
```

### ArrayBuffer

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区。虽然它用的比较少，但是他是最贴近文件流的方式了。在浏览器中，他每个字节以十进制的方式存在。
```js
const bufferArrary = [137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,1,3,0,0,0,37,219,86,202,0,0,0,6,80,76,84,69,0,0,255,128,128,128,76,108,191,213,0,0,0,9,112,72,89,115,0,0,14,196,0,0,14,196,1,149,43,14,27,0,0,0,10,73,68,65,84,8,153,99,96,0,0,0,2,0,1,244,113,100,166,0,0,0,0,73,69,78,68,174,66,96,130]
const array = Uint8Array.from(bufferArrary)
const blob = new Blob([array], {type: 'image/png'})
const form = new FormData()
form.append('file', blob, '1.png')
axios.post('http://localhost:3333/files', form)
```

### Base64

```js
const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEUAAP+AgIBMbL/VAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAACklEQVQImWNgAAAAAgAB9HFkpgAAAABJRU5ErkJggg=='
const byteCharacters = atob(base64)
const byteNumbers = new Array(byteCharacters.length)
// 将字节转换成数组
for (let i = 0; i < byteCharacters.length; i++) {
	byteNumbers[i] = byteCharacters.charCodeAt(i)
}
// 将字节数组转换成为 Uint8Array 类型
const array = Uint8Array.from(byteNumbers)
// 将 Uint8Array 转换成 Blob 类型
const blob = new Blob([array], {type: 'image/png'})
const form = new FormData()
form.append('file', blob, '1.png')
axios.post('http://localhost:3333/files', form)
```

### 服务端发送 formData 请求

首先来看看 `multipart/form-data` 规范：
```
Content-type: multipart/form-data, boundary=AaB03x

--AaB03x
content-disposition: form-data; name="field1"
Joe Blow
--AaB03x
content-disposition: form-data; name="pics"; filename="file1.txt"
Content-Type: text/plain

... contents of file1.txt ...
--AaB03x--
```


原生 node 来构造 `multipart/form-data` 请求
```js
const path = require('path');
const fs = require('fs');
const http = require('http');
// 定义一个分隔符，要确保唯一性
const boundaryKey = '-------------------------461591080941622511336662';
const request = http.request({
    method: 'post',
    host: 'localhost',
    port: '3333',
    path: '/files',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundaryKey, // 在请求头上加上分隔符
        'Connection': 'keep-alive'
    }
});
// 写入内容头部
request.write(
    `--${boundaryKey}\r\nContent-Disposition: form-data; name="file"; filename="1.png"\r\nContent-Type: image/jpeg\r\n\r\n`
);
// 写入内容
const fileStream = fs.createReadStream(path.join(__dirname, '../1.png'));
fileStream.pipe(request, { end: false });
fileStream.on('end', function () {
    // 写入尾部
    request.end('\r\n--' + boundaryKey + '--' + '\r\n');
});
request.on('response', function(res) {
    console.log(res.statusCode);
});
```

## 接收端

```js
const fs = require('fs')
const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {
  if (req.url === "/files" && req.method.toLowerCase() === "post") {
    parseFile(req, res)
  }
})
function parseFile(req, res) {
  req.setEncoding("binary")
  let body = ""
  let fileName = ""
  // 边界字符
  let boundary = req.headers['content-type']
    .split('; ')[1]
    .replace("boundary=", "")
  
  req.on("data", function(chunk) {
    body += chunk
  })
  req.on("end", function() {
    // 按照分解符切分
    const list = body.split(boundary)
    let contentType = ''
    let fileName = ''
    for (let i = 0; i < list.length; i++) {
      if (list[i].includes('Content-Disposition')) {
        const data = list[i].split('\r\n')
        for (let j = 0; j < data.length; j++) {
          // 从头部拆分出名字和类型
          if (data[j].includes('Content-Disposition')) {
            const info = data[j].split(':')[1].split(';')
            fileName = info[info.length - 1].split('=')[1].replace(/"/g, '')
            console.log(fileName)
          }
          if (data[j].includes('Content-Type')) {
            contentType = data[j];
            console.log(data[j].split(':')[1])
          }
        }
      }
    }
    // 去除前面的请求头
    const start = body.toString().indexOf(contentType) + contentType.length + 4 // 有多\r\n\r\n
    const startBinary = body.toString().substring(start)
    const end = startBinary.indexOf("--" + boundary + "--") - 2 // 前面有多\r\n
     // 去除后面的分隔符
    const binary = startBinary.substring(0, end)
    const bufferData = Buffer.from(binary, "binary")
    fs.writeFile(fileName, bufferData, function(err) {
      res.end("sucess")
    })
  })
}

server.listen(3333)
```
