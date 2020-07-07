---
title: web security
---

## xss

跨站脚本攻击,英文全称是Cross Site Script，本来缩写是CSS,但是为了和层叠样式表(Cascading Style Sheet, CSS)有所区别,所以在安全领域叫做"XSS"。

**XSS攻击,通常是指黑客通过"HTML注入"篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击**。在一开始，这种攻击的演示案例是跨域的，所以叫做"跨站脚本"。但是发展到今天。是否跨域已经不再重要。

### 反射型 XSS （非持久）

反射型 XSS 只是简单地把用户输入的数据"反射"给浏览器。也就是说，黑客往往需要诱使用户"点击"一个恶意链接，才能攻击成功。反射型 XSS 也叫做"非持久"。

### 存储型 XSS

存储型 XSS 会把用户输入的数据"存储"在服务器端。这种XSS具有很强的稳定性。比较常见的一个场景就是，黑客写下一篇包含恶意JavaScript代码的博客文章，文章发表后，所有访问该博客的用户，都会在它们的浏览器中执行这段恶意的JavaScript代码。黑客把恶意的脚本保存到服务端。所以这种XSS攻击就叫做"存储型 XSS"。

### DOM based XSS

实际上，这种类型的XSS并非按照"数据是否保存在服务器端"来划分。DOM Based XSS从效果上来说也是反射型XSS。单独划分出来，是因为 DOM Based XSS 的形成原因比较特别。通过**修改页面的DOM节点形成的 XSS**，称之为 DOM Based XSS。

### 如何防御

1. 对输入内容的特定字符进行编码，例如："<>"等  
2. 对重要的 cookie 设置 httpOnly  
3. 将不可信的值输出 URL参数之前，进行 URLEncode 操作，而对于从 URL参数中获取值一定要进行格式检测。

举个攻击的例子：  
```php
// $input 会将 url 中的 param 参数读取出来作为 div 的内容。
// http://www.a.com/test.php?param=<script>alert(/xss/)</script> 用户这般输入就造成 XSS 攻击了
<?php 
  $input = $_GET["param"];
  echo "<div>".$input."</div>";
?>
```


## csrf

CSRF 英文全称是 Cross-site request forgery，又称为“跨站请求伪造”。  
顾名思义，CSRF 攻击就是黑客引诱用户打开黑客的网站，利用用户的登陆状态发起跨站请求。

### 攻击过程

1. 用户登陆 A 网站（此时浏览器已经存有 A 网站用户信息的 cookie）
2. 再不关闭 A 网站的情况下，新开标签页访问黑客网站
3. 黑客网站发送向 A 网站的请求（该请求会自动带上用户信息，而服务器无法知道这是个恶意请求）

### 如何防御

1. 对每个请求都设置一个 token,尤其是 post, delete 等危险 method
2. 检查 reffer，检测链接访问来源
3. 使用 X-iframe-options 头部控制别的网站用 iframe 嵌入你的内容

## https

https 对内容加/解密使用对称加密算法。  
对称加密的密码使用非对称加密进行加密传输（公钥加密，私钥解密）。  
这样既保证了安全性，又兼顾了编/解码内容的效率。

对称加密密钥的传输：  
1. Client 发送 random1+对称加密套件列表+非对称加密套件列表
2. Server 收到信息， 选择 对称加密套件+非对称加密套件 并和 random2+证书(公钥在证书中) 一起返回
3. Client 验证证书有效性，并用 random1+random2 生成 pre-master 通过服务器公钥加密+浏览器确认 发送给 Server
4. Server 收到 pre-master，根据约定的加密算法对 random1+random2+pre-master（解密）生成 master-secret，然后发送服务器确认
5. Client 收到生成同样的 master-secert，对称**加密秘钥**传输完毕  

HTTPS 在 TCP 和 HTTP 中间加入了 SSL/TLS 安全层。

对发起 HTTP 请求的数据进行加密操作
对接收到 HTTP 的内容进行解密操作。