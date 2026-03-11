---
title: express怎么使用
isTimeLine: true
date: 2026-02-24
category:
  - 服务器
tag:
  - 服务器
---

express
1. express是一个基于Node.js的轻量级 Web 应用框架（服务器软件），因其简洁性和灵活性而广受欢迎。它提供了一组简单的工具，用于快速创建 Web 应用，通过express可以快速的在node中搭建一个web服务器。官网地址：https://www.expressjs.com.cn
2. 下载：①创建并初始化项目yarn init -y；②安装express yarn add express；③创建index.js 并编写代码
3. 使用：
  a. 引入express；const express = require("express")
  b. 获取服务器的实例（对象）；const app = express()
  c. 为服务器设置路由；app.METHOD(...)
  d. 启动服务器 app.listen(3000, () => {})
```js
// 1 引入express
const express = require("express")

// 2 获取服务器的实例（对象）
const app = express()

// 3 如果希望服务器可以正常访问，则需要为服务器设置路由
// 创建一组响应规则（路由规则）
app.get("/hello", (req, res) => {
    console.log("有人访问我了~")
    //读取用户的请求（request）req 表示的是用户的请求信息，通过req可以获取用户传递数据
    console.log(req.url)
    // 根据用户的请求返回响应（response）res 表示的服务器发送给客户端的响应信息
    // res.sendStatus() 向客户端发送响应状态码 
    // res.status() 用来设置响应状态吗
    // res.sendStatus(404) res.status(200)
    res.send("<h1>这是我的第一个服务器</h1>")
})

// 4 监听端口 启动服务
// app.listen(端口号) 用来启动服务器,启动后，可以通过3000端口来访问了
app.listen(3000, () => {
    console.log("服务器已经启动~")
})
// 打开http://127.0.0.1:3000/hello访问，显示文字：这是我的第一个服务器
```
路由
1. 如果希望服务器可以正常访问，则需要为服务器设置路由，路由可以根据不同的请求方式和请求地址来处理用户的请求；格式：app.请求方法(路径，回调函数) app.get('/hello', (request, response) => {...})
2. 参数获取
  a. params 参数：指的是 URL 路径中的参数 console.log(request.params.id);
  b. query 参数：获取请求报文中的数据console.log(request.query);
  c. 请求体参数
3. 响应设置
  a. 设置响应状态码 设置响应头 设置响应体 重定向 响应文件内容
4. Router 管理路由
  a. express 中的 Router 是一个完整的中间件和路由系统，可以看做是一个小型的 app 对象，它可以对路由进行模块化拆分，能更好的管理路由。const router = express.Router();
```js
//  1 获取params参数
app.get("/hello/:name", (req, res) => {
    // 可以通过req.params属性来获取这些参数
    console.log(req.params)
    res.send("<h1>hello</h1>")
})
//  2 获取query参数
app.get("/login", (req, res) => {
    // 通过req.query来获取查询字符串中的数据 req.query.username 
    if (req.query.username === "admin" && req.query.password === "123123") {
        res.send("<h1>欢迎您回来！登录成功</h1>")
    } else {
        res.send("<h1>用户名或密码错误！</h1>")
    }
})
//  3 获取请求体的参数
app.post("/login", (req, res) => {
    // 通过req.body来获取post请求的参数（请求体中的参数）
    // 默认情况下express不会自动解析请求体，需要通过中间件来为其增加功能 app.use(express.urlencoded())
    const {username, password} = req.body
    if (username === "admin" && password === "123123") {
        res.send("<h1>登录成功</h1>")
    } else {
        res.send("<h1>登录失败</h1>")
    }
})
//-----------------------------
// express提供的响应设置api  设置响应状态码 设置响应头 设置响应体 重定向 响应文件内容
response.status(500); //设置响应状态码
response.set('token','r5t776tr5e345e'); //设置响应头
response.send('中文响应不乱码'); //设置响应体
response.redirect('http://baidu.com') //重定向
response.sendFile(__dirname + '/home.html') //响应文件内容
// 1 homeRouter.js文件
const express = require('express');
//创建路由器对象
const router = express.Router();
//在 router 对象身上添加路由
router.get('/list', (req, res) => {
  ...
  res.send('列表');
})
router.post('/add', (req, res) => {
  ...
  res.send('添加成功');
});
module.exports = router;//暴露router
```     
```js                                
// 2 index.js文件使用路由
const express = require('express');
const homeRouter = require('./routes/homeRouter')
const app = express();
//设置和使用中间件
app.use(homeRouter);
app.listen(3000,()=>{
    console.log('3000 端口启动....');
})
```
中间件
1. 中间件（Middleware）本质是一个回调函数。在express使用app.use来定义一个中间件，中间件作用和路由很像
2. 定义与使用
  a. 定义：function middle1 (request,response,next){ ... next();}
  b. 使用：app.use(middle1)
3. 可以多个调用，需要next()放行：next是一个函数，调用函数后，可以触发后续的中间件，不能在响应处理完毕后调用。
4. 作用：
  a. 可以配置静态资源的路径；app.use(express.static(path.resolve(__dirname, "public")))
  b. 引入解析请求体的中间件；app.use(express.urlencoded())
  c. 验证是否登录，没有重定向到登录页
  d. 在路由最后，配置错误路由重定向到404页面，只要这个中间件一执行，说明上边的地址都没有匹配。
```js
// 1 引入express
const express = require("express")
// 2 获取服务器的实例（对象）
const app = express()
// 3 使用中间件，比如可以在这里验证是否登录，检测到session就放行，没有则重定向
app.use((req, res, next) => {
    console.log("第一个中间件111", Date.now())
    next() // 放行
})
app.use((req, res, next) => {
    console.log("第二个中间件222", Date.now())
    // res.send("<h1>222</h1>")
    next() // 不放行，下面不能执行
})
app.use((req, res, next) => {
    if (req.session.loginUser) {
        next()
    } else {
        res.redirect("/")
    }
})
// 4 创建一组响应规则（路由规则）
app.get("/list", (req, res) => {
    // ...
    res.send("列表数据")
})
app.post("/add", (req, res) => {
    // ...
    res.send('添加成功');
})
// 只要这个中间件一执行，说明上边的地址都没有匹配
app.use((req, res) => {
    res.status(404)
    res.send("<h1>您访问的地址已被劫持！</h1>")
})
// 5 监听端口 启动服务
app.listen(3000, () => {
    console.log("服务器已经启动~")
})
```
EJS模版引擎
1. 模板引擎是分离用户界面和业务数据的一种技术,EJS 是一个高效的 Javascript 的模板引擎https://ejs.bootcss.com/
2. html页面属于静态页面，不会自动跟随服务器中数据的变化而变化，可以根据数据变化页面内容有变化，在node中被称为模板，ejs是node中的一款模板引擎
3. 下载安装 ejsnpm i ejs
4. 使用
  a. 配置express的模板引擎为ejsapp.set("view engine", "ejs")
  b. 配置模板路径app.set("views", path.resolve(__dirname, "views"))
  c. views下面新建students.ejs文件，<h1>学生名称：<%=name  %></h1>
  d. 渲染一个模板引擎传递变量，并将其返回给浏览器 res.render("students", { name })
  e. 在网页中显示出来
```js
const express = require('express')
const app = express()

// 1 配置模板引擎
app.set('view engine', 'ejs')
// 2 配置模板位置
app.set('views', 'views')

app.get('/students', (request, response) => {
  let name = '学员1'
  // 3  res.render() 用来渲染一个模板引擎，并将其返回给浏览器
  res.render("students", { name })
})

app.listen(8088, () => {
  console.log('服务器启动成功！')
})

// students.ejs
// 通过它可以将render传递进来的数据直接在网页中显示出来
// <%= %>在ejs中输出内容时，它会自动对字符串中的特殊符号进行转义 &lt;主要是为了避免xss攻击
// <% %>  可以在其中直接编写js代码，js代码会在服务器中执行
<%=name %>
<% if(name === "学员1") {%>
  <h2>学员1值班</h2>
<%} else{%>
  <h2>学员n值班</h2>
<%}%>
```