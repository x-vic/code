---
title: Blob
lang: zh-CN
---

## Blob 是什么

> Blob（Binary Large Object）表示二进制类型的大对象。在数据库管理系统中，将二进制数据存储为一个单一个体的集合。Blob 通常是影像、声音或多媒体文件。

Blob 实例包含两个属性：size 和 type。size 表示数据大小，type 是 MIME 类型。Blob 表示的不一定是 JavaScript 原生格式的数据。比如 File 接口基于 Blob，继承了 Blob 的功能，并将其扩展使其支持用户系统上的文件。

## Blob Api

### 构造函数

```js
const blob = new Blob(blobParts, options)
```

- blobParts：由 ArrayBuffer，ArrayBufferView，Blob，DOMString等对象构成的数组。
- options：一个可选对象，包含两个属性：
  - type---默认值为''，代表 MIME 类型
  - endings---默认值为'transparent'，用于指定包含行结束符 \n 的字符串如何被写入。它是以下两个值中的一个："native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持 blob 中保存的结束符不变。

例一：从字符串创建 Blob
```js
// 
let myBlobParts = ['<html><h2>Hello Semlinker</h2></html>']; // an array consisting of a single DOMString
let myBlob = new Blob(myBlobParts, {type : 'text/html', endings: "transparent"}); // the blob

console.log(myBlob.size + " bytes size");
// Output: 37 bytes size
console.log(myBlob.type + " is the type");
// Output: text/html is the type
```

例二：从类型化数组和字符串创建 Blob
```js
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"
let blob = new Blob([hello, ' ', 'semlinker'], {type: 'text/plain'});
```

### 方法

- `slice([start[, end[, contentType]]])` 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据
- `stream()` 返回一个能读取 blob 内容的 `ReadableStream`
- `text()` 返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 `USVString`
- `arrayBuffer()` 返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 `ArrayBuffer`

## Blob 的使用场景

### 分片上传

File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的上下文中。所以针对大文件传输的场景，我们可以使用 slice 方法对大文件进行切割，然后分片进行上传，具体示例如下：

```js
const file = new File(["a".repeat(1000000)], "test.txt");

const chunkSize = 40000;
const url = "https://httpbin.org/post";

async function chunkedUpload() {
  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize + 1);
    const fd = new FormData();
    fd.append("data", chunk);

    await fetch(url, { method: "post", body: fd }).then((res) =>
      res.text()
    );
  }
}
```

### 从互联网下载数据

我们可以使用以下方法从互联网上下载数据并将数据存储到 Blob 对象中，比如：
```js
const downloadBlob = (url, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    callback(xhr.response)
  }
  xhr.send(null)
}
```

除了使用 `XMLHttpRequest` API 之外，我们也可以使用 fetch API 来实现以流的方式获取二进制数据。这里我们来看一下如何使用 `fetch` API 获取线上图片并本地显示，具体实现如下：
```js
const myImage = document.querySelector('img')
const myRequest = new Request('flowers.jpg')

fetch(myRequest)
  .then(function(response) {
    return response.blob()
  })
 .then(function(myBlob) {
   let objectURL = URL.createObjectURL(myBlob)
   myImage.src = objectURL
});
```
当 fetch 请求成功的时候，我们调用 response 对象的 `blob()` 方法，从 response 对象中读取一个 Blob 对象，然后使用 `createObjectURL()` 方法创建一个 objectURL，然后把它赋值给 `img` 元素的 `src` 属性从而显示这张图片。

### Blob 用作 URL

Blob 文件下载示例：
```js
const download = (fileName, blob) => {
  const link = document.createElement("a");
  // 将 Blob 对象转换成 url
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
  // 释放 Blob 对象
  URL.revokeObjectURL(link.href);
};

const downloadBtn = document.querySelector("#downloadBtn");
downloadBtn.addEventListener("click", (event) => {
  const fileName = "blob.txt";
  const myBlob = new Blob(['详解Blob'], { type: "text/plain" });
  download(fileName, myBlob);
});
```

### Blob 转换为 Base64

`URL.createObjectURL` 的一个替代方法是，将 `Blob` 转换为 base64 编码的字符串。`Base64` 是一种基于 64 个可打印字符来表示二进制数据的表示方法。  
利用 FileReader API，我们也可以方便的实现图片本地预览功能，具体代码如下：
```html
<input type="file" accept="image/*" onchange="loadFile(event)">
<img id="output"/>

<script>
  const loadFile = function(event) {
    const reader = new FileReader();
    reader.onload = function(){
      const output = document.querySelector('output');
      output.src = reader.result;
    };
    // Blob 转 Base64
    reader.readAsDataURL(event.target.files[0]);
  };
</script>
```
在完成本地图片预览之后，我们可以直接把图片对应的 Data URLs 数据提交到服务器。针对这种情形，服务端需要做一些相关处理，才能正常保存上传的图片，这里以 Express 为例，具体处理代码如下：
```js
const app = require('express')();

app.post('/upload', function(req, res){
    let imgData = req.body.imgData; // 获取POST请求中的base64图片数据
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function(err) {
      if(err){
        res.send(err);
      }else{
        res.send("图片上传成功！");
      }
    });
});
```
对于 FileReader 对象来说，除了支持把 Blob/File 对象转换为 Data URL 之外，它还提供了 `readAsArrayBuffer()` 和 `readAsText()` 方法，用于把 Blob/File 对象转换为其它的数据格式。这里我们来看个 `readAsArrayBuffer()` 的使用示例：
```js
// 从 blob 获取 arrayBuffer
let fileReader = new FileReader()

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result
}
fileReader.readAsArrayBuffer(blob)
```

### 图片压缩

在一些场合中，我们希望在上传本地图片时，先对图片进行一定的压缩，然后再提交到服务器，从而减少传输的数据量。在前端要实现图片压缩，我们可以利用 Canvas 对象提供的 `toDataURL()` 方法，该方法接收 `type` 和 `encoderOptions` 两个可选参数。

其中 `type` 表示图片格式，默认为 `image/png`。而 `encoderOptions` 用于表示图片的质量，在指定图片格式为 `image/jpeg` 或 `image/webp` 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 `0.92`，其他参数会被忽略。

下面我们来看一下具体如何实现图片压缩：
```js
// compress.js
const MAX_WIDTH = 800; // 图片最大宽度

function compress(base64, quality, mimeType) {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
}
```

对于返回的 Data URL 格式的图片数据，为了进一步减少传输的数据量，我们可以把它转换为 Blob 对象：
```js
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}
```

在转换完成后，我们就可以压缩后的图片对应的 Blob 对象封装在 FormData 对象中，然后再通过 AJAX 提交到服务器上：
```js
function uploadFile(url, blob) {
  let formData = new FormData();
  let request = new XMLHttpRequest();
  formData.append("image", blob);
  request.open("POST", url, true);
  request.send(formData);
}
```

其实 Canvas 对象除了提供 toDataURL() 方法之外，它还提供了一个 toBlob() 方法，该方法的语法如下：
::: tip
`canvas.toBlob(callback, mimeType, qualityArgument)`
:::

和 `toDataURL()` 方法相比，`toBlob()` 方法是异步的，因此多了个 `callback` 参数，这个 `callback` 回调方法默认的第一个参数就是转换好的 `blob` 文件信息。  
介绍完上述的内容，我们来看一下本地图片压缩完整的示例：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>本地图片压缩</title>
  </head>
  <body>
    <input type="file" accept="image/*" onchange="loadFile(event)" />
    <script src="./compress.js"></script>
    <script>
      const loadFile = function (event) {
        const reader = new FileReader();
        reader.onload = async function () {
          let compressedDataURL = await compress(
            reader.result,
            90,
            "image/jpeg"
          );
          let compressedImageBlob = dataUrlToBlob(compressedDataURL);
          uploadFile("https://httpbin.org/post", compressedImageBlob);
        };
        reader.readAsDataURL(event.target.files[0]);
      };
    </script>
  </body>
</html>
```

### 生成 PDF 文档

在浏览器端，利用一些现成的开源库，比如 jsPDF，我们也可以方便地生成 PDF 文档。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>客户端生成 PDF 示例</title>
  </head>
  <body>
    <h3>客户端生成 PDF 示例</h3>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
    <script>
      (function generatePdf() {
        const doc = new jsPDF();
        doc.text("Hello semlinker!", 66, 88);
        const blob = new Blob([doc.output()], { type: "application/pdf" });
        blob.text().then((blobAsText) => {
          console.log(blobAsText);
        });
      })();
    </script>
  </body>
</html>
```

其实 jsPDF 除了支持纯文本之外，它也可以生成带图片的 PDF 文档，比如：
```js
let imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...'
let doc = new jsPDF();

doc.setFontSize(40)
doc.text(35, 25, 'Paranyan loves jsPDF')
doc.addImage(imgData, 'JPEG', 15, 40, 180, 160)
```

