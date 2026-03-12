---
title: nodejs是什么
isTimeLine: true
date: 2025-08-10
category:
  - node
tag:
  - 后端 
  - node
---

### 是什么
1. Node.js是一个构建在V8引擎之上的JavaScript运行环境。它使得JS可以运行在浏览器以外的地方。相对于大部分的服务端语言来说，Node.js有很大的不同，它采用了单线程，且通过异步的方式来处理并发的问题。
2. 官方地址：[https://nodejs.org](https://nodejs.org/)
3. Node 可以用来开发各种应用：工具类应用如`webpack、vite、babel、eslint`等；App的各种服务器等

### 安装与使用
1. 下载地址：<https://nodejs.org/en/download>，双击安装文件，依次选择下一步即可。安装完成后，在 CMD 命令行窗口下运行 `node -v`，如显示版本号则证明安装成功。
2. 使用安装工具nvm,可以安装多个版本的node在电脑上
> a.下载最新版的`nvm-setup.exe`然后点击安装，在命令行中输入`nvm version`后，出现版本即表示安装成功。   
> b. 输入`nvm install lts`安装稳定版的node；也可以输入版本号安装指定版本node如`nvm install 10.16.0`；  
> c. 如果下载失败，那么可以将nvm的服务器修改为国内的镜像服务器即可解决，如`nvm node_mirror https://npmmirror.com/mirrors/node/`；  
> d. 最后再指定使用哪个版本，如`nvm use 18.16.0`；  
> e. 安装完成后，在 CMD 命令行窗口下运行 `node -v`，如显示版本号则证明安装成功。
3. 使用：首先创建文件 `hello.js`，文件写上`console.log('hello world');`使用 vscode 自带的命令行窗口 ，输入`node hello.js`即可。
### process模块
1. 表示当前的node进程,通过该对象可以获取进程的信息，或者对进程做各种操作。是一个全局变量，可以直接使用
2. 使用：`process.exit()`结束当前进程，终止node；`process.nextTick(callback[, …args])`，将函数插入到 tick队列中，会在微任务队列和宏任务队列中任务之前执行。调用栈->tick队列->微任务队列->宏任务队列。

```js
setTimeout(() => {
    console.log(1) // 宏任务队列
})
queueMicrotask(() => {
    console.log(2)
}) // 微任务队列
process.nextTick(() => {
    console.log(3) // tick队列
})
console.log(4) // 调用栈
// 1 2 3 4
```
### Path模块
1. 是什么：通过path可以用来获取各种路径，使用前需要先引入`const path = require("path")`
2. 使用：`path.resolve([…paths])`，用来生成一个绝对路径，如c:\xxx
3. `__dirname`：是 Node.js 环境中的内置变量，`__dirname`获取到的是当前执行脚本所在的目录的绝对路径，无需任何特殊声明就可以直接使用。
4. 使用 fs 模块的时候，尽量使用 `path与__dirname `将路径转化为绝对路径，为让代码在哪个位置（本地或者部署在线上）都能使用。`path.resolve(__dirname, "./hello.txt")`
### fs模块 
是什么：全称为`fileSystem`（文件系统），是 Node.js 中内置的一个模块，可以操作计算机中的文件，文件操作也就是所谓的`I/O，input、output`文件。使用前需要引入`const fs = require("fs")`
#### 文件读取
1. 异步读取：`fs.readFile(path[, options], callback)`异步的读取文件的方法
2. 同步读取：`fs.readFileSync(path[, options])`同步的读取文件的方法，会阻塞后边代码的执行
3. 通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
4. Buffer是一个临时用来存储数据的缓冲区，nodejs引入了一个全局的Buffer类，用于直接操作内存中的二进制数据。当使用 fs模块相关API取文件时，若不指定字符编码，文件内容会以二进制数据读取到 Buffer中。
```js
const fs = require('fs');
// 异步读取 err是错误信息，data是读取出来的数据
// 在读取时，若指定字符编码，则data的值是指定字符编码的内容,没有则是buffer需要buffer.toString()
fs.readFile(path.resolve(__dirname, "./hello.txt"), { encoding: 'utf8' }, (err, data) => {
  if (err) throw err;
  console.log(data); // 输出的是utf8编码的文本内容
});  
// 同步读取
const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"))
console.log(buf.toString())
// 异步读取使用promises
const fs = require("node:fs/promises")
fs.readFile(path.resolve(__dirname, './hello.txt'))
    .then(buffer => {
        console.log(buffer.toString())
    }).catch(e=>{
        console.log("读取文件出错了~")
    })
```
#### 文件写入
1. 异步写入`fs.writeFile(file, data[, options], callback)`
2. 同步写入`fs.writeFileSync(file, data[, options])`
3. `fs.mkdir(path)` 创建目录 `fs.rmdir(path)` 删除目录

```js
const fs = require("node:fs/promises")
fs.writeFile(path.resolve(__dirname, './hello.txt'), ',今天sdvsdafferg')
.then(buffer => {
    console.log("添加成功", val);
}).catch(e=>{
    console.log("写入文件出错了~")
})
fs.mkdir(path.resolve(__dirname, './测试测试'))
.then(val => {
    console.log("操作成功~")
}).catch(e=> {
    console.log("创建目录出错了~");
})
```
### http模块
1. http模块是一个内置的核心模块，提供了一系列的功能用于处理`http`事务，通过该模块，开发者可以创建`http`服务器与客户端进行数据的交互。
2. 使用 Node 内置的 http 模块创建服务
```js
// 导入 http 模块
const http = requestuire('http');
// 调用createServer创建http服务
const server = http.createServer((request, response) => {
    /*
      requestuest是对请求报文的封装,值为一个对象，通过requestuest可以获得请求报文的数据。
      response是对响应报文的封装,值为一个对象，通过response可以获得响应报文的数据。
    */
    // 获取路径以及查询字符串参数 requestuest.url 
    // 获取请求方式：requestuest.method
    // 获取请求头 requestuest.headers 
    // 获取请求体 requestuest.on('data',(chunk)=>{})
    // 响应内容中文乱码的解决办法:  
    // application/json：JSON数据格式;text/plain：纯文本;text/html：HTML文档...
    response.setHeader('content-type','text/plain;charset=utf-8');
    response.end('hello！');
});

// 监听端口, 服务启动成功之后，回调函数会自动执行
server.listen(8088, () => {
  console.log('服务器启动成功！')
})  
```
### 链接
[Node.js完全指南（直播回放）李立超](https://www.bilibili.com/video/BV1qN4y1A7jM/?spm_id_from=333.788.recommend_more_video.7&trackid=web_related_0.router-related-2481894-52kq4.1773251625972.646&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)