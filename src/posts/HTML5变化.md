---
title: HTML5增加了什么
isTimeLine: true
date: 2026-02-10
category:
  - 前端
tag:
  - HTML
---

### HTML5 
1. 是新一代的 HTML 标准，2014年10月由万维网联盟（ W3C ）完成标准制定
2. 特点：新增了一些语义化标签、全局属性。新增了多媒体标签，可以很好的替代flash 。更加侧重语义化，对于 SEO 更友好。 可移植性好，可以大量应用在移动设备上。
3. HTML5新增特性:语义化标签; 表单功能; 媒体标签; WEB存储; canvas与svg; websocket; Web Worker; history API等

### 新增语义化标签

1.  语义化标签： 用特定的标签，去表达特定的含义。
2.  优势： ①代码结构清晰可读性强; ②有利于 SEO（搜索引擎优化）; ③方便设备解析（如屏幕阅读器、盲人阅读器等）。

```html
<header></header>  头部
<nav></nav>  导航栏
<section></section>  区块（有语义化的div）
<main></main>  主要区域
<article></article>  主要内容
<aside></aside>  侧边栏
<footer></footer>  底部

```
### 新增表单功能
1.  表单控件新增属性 ：`placeholder required autofocus autocomplete pattern multiple`
2.  input新增属性：`email number search tel range color date month week time`
3.  表单事件：oninput 每当input里的输入框内容发生变化都会触发此事件; oninvalid 当验证不通过时触发此事件。
```html
<!-- input输入类型扩展 -->
<input type="email" required>         <!-- 邮箱验证 -->
<input type="date">                   <!-- 日期选择器 -->
<input type="range" min="0" max="100"> <!-- 滑块 -->
<input type="color">                  <!-- 颜色选择器 -->

<!-- 表单控件新增属性 -->
<input placeholder="提示文本" autofocus>
<input pattern="[A-Za-z]{3}">        <!-- 正则校验 -->
```
### 新增多媒体标签
1. 视频标签`<video>`属性: src:路径;controls:是否显示控件; muted:是否静音播放; autoplay:是否自动播放; loop:是否循环播放; poster:默认显示当前视频文件的第一帧画面; preload;width;height
2. 音频标签`<audio>`属性: src controls muted autoplay loop poster preload

```html
<video src='' poster='imgs/aa.jpg' controls></video>
<audio src='' controls autoplay loop='true'></audio>
```
### 数据存储
1. HTML5提出的本地存储解决方案：sessionStorage和localStorage。
2. LocalStorage：持久化存储，除非自己手动删除。
3. SessionStorage：会话存储，页面刷新存储的信息会在，页面关闭存储的信息会消失。
4. 共同点：数据存储在用户的浏览器中，一般存储5M大小的数据，并且遵循同源策略，只能被同源页面访问共享。
5. 不同点：在于生命周期与作用域的不同。LocalStorage是持久化存储；SessionStorage当关闭网站之后，这些信息也就随之消除了。由于具有时效性，所以可以用来存储一些网站的游客登录的信息，还有临时的浏览记录的信息

```js
localStorage.setItem('key','value')// 存储数据
localStorage.getItem('key')// 获取数据
localStorage.removeItem('key')// 删除数据

sessionStorage.setItem('key','value')// 存储数据
sessionStorage.getItem('key')// 获取数据
sessionStorage.removeItem('key')// 删除数据
```
### canvas与svg
Canvas 2D 绘图：素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

SVG 矢量图形支持：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准。

```html
<!-- 宽高600px画布 -->
<canvas id="canvas1" width="600" height="600"></canvas>
<!-- 半径10px的红色小圆点 -->
<svg width="100" height="100">
    <circle cx="50" cy="50" r="10" fill="red" />
</svg>
```

> 画布的上下文对象常用方法
> 1. arc()绘制圆弧路径的方法。
> 2. beginPath()通过清空子路径列表开始一个新路径的方法。当你想创建一个新的路径时，调用此方法
> 3. clearRect()通过把像素设置为透明以达到擦除一个矩形区域的目的。
> 4. drawImage()提供了多种在画布（Canvas）上绘制图像的方式。
> 5. getImageData()返回一个ImageData对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
> 6. lineTo()使用直线连接子路径的终点到 x，y 坐标的方法（并不会真正地绘制）。
> 7. moveTo()将一个新的子路径的起始点移动到 (x，y) 坐标的方法。
> 8. measureText()返回一个关于被测量文本TextMetrics 对象包含的信息（例如它的宽度）。
> 9. save()通过将当前状态放入栈中，保存 canvas 全部状态的方法。
> 10. stroke()使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。

```js
// 三角形 stroke()
    // 1找到画布对象
    let canvas1 = document.querySelector("#canvas1");
    // 2 上下文对象
    let ctx = canvas1.getContext("2d")
    // 设置开始路径
    ctx.beginPath();
    // 调用绘制起始点；设置经过某些位置
    ctx.moveTo(150,0);
    ctx.lineTo(150,150);
    ctx.lineTo(250,150);
    // 把路径封闭 虽然只绘制了两条线段，但是closePath会封闭，结果是一个三角形
    ctx.closePath();
    // 一旦路径生成，通过描边或填充路径区域来渲染图形。
    ctx.lineCap = "round";
    ctx.strokeStyle = "lightblue";
    ctx.lineWidth = 2
    ctx.stroke();
// 绘制图像 drawImage(image, x, y, width, height)   
    // 创建img元素
    var img = new Image();   
    img.src = './pic.jpg'; // 设置图片源地址
    // 图片是从网络加载，需要再图片完全加载才放到画布上
    img.onload = function(){
        ctx.drawImage(img, 0, 300 ,200,200)
        // ctx.fillText("hello", 170, 470);//打码
    }
```

### websocket
1. 是一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于 TCP 传输协议，并复用 HTTP 的握手通道。浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接， 并进行双向数据传输。
2. 特点：①支持双向通信，实时性更强；②没有同源限制，客户端可以与任意服务器通信；③协议标识符是 ws
3. 使用场景：如实时聊天应用、在线多人游戏、实时数据更新、即时通知和提醒、实时协作和协同编辑等。
4. 工作原理：
> 1.  建立握手：客户端发起WebSocket连接请求，服务器接收到请求后如果支持WebSocket协议，会返回一个握手响应；
> 2.  建立连接：一旦握手成功，客户端和服务器之间建立了持久连接。
> 3.  数据传输：客户端和服务器可以发送文本数据或二进制数据。数据以数据帧的形式传输。
> 4.  关闭连接：当客户端或服务器决定关闭连接时，它们可以发送关闭帧来表示关闭连接。

前端代码
```js
// 1 创建WebSocket连接，先使用new WebSocket创建一个websocket实例，指定要连接的 WebSocket 服务器的 URL。
const socket = new WebSocket('ws://localhost:8080');
// 建立连接事件，通过onopen事件与websocket服务器建立连接
socket.onopen = function() { 
    console.log('WebSocket连接已建立'); 
    socket.send('Hello, server!'); //向 WebSocket 服务器发送消息，可以是字符串、ArrayBuffer 或 Blob。
};
// 监听接收到服务器消息的事件，接收到来自 WebSocket 服务器的消息时触发
socket.onmessage = function(event) {
  const message = event.data;
  console.log('接收到服务器消息:', message);
};
// 监听连接关闭事件
socket.onclose = function() { 
  console.log('WebSocket连接已关闭');
};
// 监听连接错误事件
socket.onerror = function(error) {
  console.error('WebSocket连接错误:', error);
};
```
服务端代码

```js
// 创建WebSocket服务器
const WebSocket = require('ws');  
const wss = new WebSocket.Server({ port: 8080 });
// 监听连接事件  当客户端与服务器建立 WebSocket 连接时触发的事件。
wss.on('connection', function(ws) { 
    console.log('有客户端连接');
    ws.on('message', function(message) {
      // 将接收到的二进制数据转换为字符串 
      const message = data.toString('utf8'); 
      console.log('收到客户端的消息:', message); 
      // 发送消息到客户端 
      ws.send('Hello Client'); //向客户端发送消息，参数 data 可以是字符串或二进制数据。
    });   
    // 监听关闭事件 
    ws.on('close', function() {
        console.log('客户端连接已关闭'); 
    });
});
```
### Web Worker
1. JavaScript的单线程, HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，无法直接操作dom节点，并没有改变JavaScript单线程的本质。
2. Web Worker是运行在后台的 js，独立于其他脚本，不会影响页面的性能。并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Web Worker Demo</title>
  </head>
  <body> </body>
  <script>
    class webWorker {
      // webworker的简单封装
      constructor(data, type = "url") {
        this.worker = null;
        this.workerInit(data, type);
      }
      workerInit(data, type) {
        if (type === "url") {
          // 默认是以url脚本形式的worker线程 此时的data应该是一个url链接
          this.worker = new Worker(data);
        } else {
          // 以字符串形式创建worker线程，把代码字符串，转成二进制对象，生成 URL，加载URL
          const blob = new Blob([data]);
          const url = window.URL.createObjectURL(blob);
          this.worker = new Worker(url)
        }
      }
      //给worker线程发送消息
      postMessage(data) {
        return this.worker.postMessage(data);
      }
      //发送给主进程的数据
      onmessage(fn) {
        this.worker.onmessage = msg => {
          return fn(msg.data);
        };
      }
      //主线程关闭worker线程
      closeWorker() {
        return this.worker.terminate();
      }
      //主线程监听worker线程的错误信息
      errMsg(fn) {
        this.worker.onerror = e => {
          return fn(e);
        };
      }
    }
     const data = `
      // worker线程加载脚本 TODO: Worker 线程无法读取本地文件,加载的脚本必须来自网络        
      // 监听主线程传过来的信息
      console.log(self)
      self.onmessage = e => {
        const n = e.data;
        const result = fib(n);
        self.postMessage(result); // 发送信息给主线程
      };
      // 模拟耗时的递归计算
      function fib(n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
      }
      // 关闭worker线程
      function closeSon() {
        return self.close();
      }`;
    //---使用---
    // 1. 创建Worker
    const worker = new webWorker(data, "script");
    // 2 发送计算任务，数字10
    worker.postMessage(10);
    // 3 监听子线程返回的计算结果
    worker.onmessage(data => {
      console.log("父进程接收的数据：", data);
    });
    worker.errMsg(msg => {
      console.log("worker线程报错：", msg);
    });
  </script>
</html>
```

### history API
3.  早期histroy的api：后退一页` history.go(-1);  `前进两页` history.go(2);  `前进一页`history.forward();`后退一页`history.back();`
3.  HTML5 的规范中新增api：添加新的状态到历史状态栈` history.pushState();  `用新的状态代替当前状态`history.replaceState();`

### 参考链接
[[html+css教程，前端html5+css3零基础入门，web前端开发]](https://www.bilibili.com/video/BV1p84y1P7Z5/?spm_id_from=333.1387.search.video_card.click&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)

[项目没亮点？那就来学下web worker吧~](https://juejin.cn/post/7117774868187185188)

