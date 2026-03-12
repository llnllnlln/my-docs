---
title: 读懂Axios源码后，感觉调用好像小意思了
isTimeLine: true
date: 2026-01-08
category:
  - 前端
tag:
  - JavaScript 
  - 源码
---


### 是什么？
前端最流行的ajax请求库，它的特点是：①基于promise封装的ajax请求库；②支持请求\响应拦截器；③支持取消请求；④浏览器和node端都能使用，浏览器端发起 XMLHttpRequests 请求，node 端发起 http 请求；
### 基本使用
1. 基本语法：`axios({config})`；
2. 快捷方法：`axios.get(url, { params, ...config })`等；
```js
// 基本语法 axios({config})
axios({
    method:'get', url:'/api/user', params:{id: 1}, timeout:5000
}).then(response=>{
    console.log('请求成功：', response.data);
}).catch(error=>{
    console.error('请求失败：', error);
})
```
```js
// 1. get：获取数据，请求指定的信息，返回实体对象
// 2. post：向指定资源提交数据（例如表单提交或文件上传）
// 3. put：更新数据，从客户端向服务器传送的数据取代指定的文档的内容
// 4. patch：更新数据，是对put方法的补充，用来对已知资源进行局部更新
// 5. delete：请求服务器删除指定的数据
// 6. head：获取报文首部
axios.get(url, { params, ...config })//get参数通过params配置（自动拼接到URL的查询字符串）
axios.post(url, data, { ...config }) //post参数通过data传参 有请求体
axios.put(url, data, { ...config })
axios.delete(url, { params, ...config })
// 配置async/await使用更简洁
async function getUser() {
  try {
    const response = await axios.get('/api/user', { params: { id: 1 } });
    console.log('用户数据：', response.data);
  } catch (error) {
    console.error('获取失败：', error);
  }
}
```
### Axios的配置选项
1. 常用配置项：是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 GET 方法。
```js
url: '/user', // 路径url
method: 'get', // 请求方法，默认get
//基础url，最终请求的url是baseURL+url拼接，所以全局设置默认，可以使得发送请求时的url变得简洁
baseURL: 'https://some-domain.com/api/',
headers: {'X-Requested-With': 'XMLHttpRequest'},//设置请求头
params: {ID: 12345,name:"tom"}, //设置请求url的query参数，可以使得url简洁。
data: { firstName: 'Fred'}, //设置请求体
timeout: 1000, ///请求超时，单位毫秒
responseType: 'json',  //响应数据类型，默认json
responseEncoding: 'utf8', //响应数据的编码规则，默认utf-8
maxContentLength: 2000, //响应体的最大长度 
maxBodyLength: 2000, // 请求体的最大长度
```
2. 全局默认配置: 设置全局默认配置，是为了避免多种重复配置在不同请求中重复，比如baseURL、timeout等
```js
axios.defaults.baseURL = 'https://api.example.com'; //全局baseURL
axios.defaults.timeout = 5000;// 全局超时时间
axios.defaults.headers.common['Authorization'] = 'token';// 全局请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
// 后续请求会自动使用全局配置 实际URL：https://api.example.com/user
axios.get('/user').then(response => { }); 
```
3. 创建实例配置：创建一个新的axios。当项目需要访问多个API域名时，可创建多个Axios实例，每个实例有独立配置：那就需要用到axios.create()
```js
// 问题: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理
// 解决: 创建2个新axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中
// axios实例1
axios.defaults.baseURL = 'http://localhost:3000'
axios.get('/posts').then(response => { });
// axios实例2
const instance = axios.create({baseURL:'http://localhost:4000'})
instance.get('/posts').then(response => { });
```
### 拦截器
1. 拦截器：请求与响应的统一处理
2. 允许在请求发送前（请求拦截器）和响应返回后（响应拦截器）进行统一处理，适用于添加token、加载提示、错误统一处理等场景
3. 请求拦截器->请求->响应拦截器->请求的回调，这个流程是promise串联起来的，请求拦截器传递的是config，响应拦截器传递response
```js
// 1 添加请求拦截器: 添加token到请求头、加载动画
axios.interceptors.request.use(config=>{
    // 添加token到请求头
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `${token}`;
    // 显示加载动画
    document.getElementById('loading').style.display = 'block';
  return config;
},error=>{
  return Promise.reject(error)
})
// 2 添加响应拦截器: token过期时跳转到登录页、错误统一处理
axios.interceptors.response.use(response=>{
  return response;
}, error=>{
  // 示例：token过期时跳转到登录页
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error)
})
// 3 使用，发起请求前：请求拦截器->请求->响应拦截器-> 请求回调，处理了多个接口的统一逻辑。
axios.get('http://localhost:3000/posts')
  .then(response => {
    console.log('data', response.data)
  })
  .catch(error => {
    console.log('error', error.message)
  })
```
### 取消请求
1. 在某些场景（如用户快速切换标签、搜索框输入防抖），需要取消未完成的请求，避免资源浪费或数据错乱。
2. 新的写法：创建控制器，获取信号量`const controller = new AbortController();`   
     ① 发送请求时关联信号量`{ signal: controller.signal }`；② 在后面特定时间调用cancel函数取消掉请求`controller.abort()`;
3. 旧的写法：配置cancelToken对象，缓存用于取消请求的cancel函数,在后面特定时间调用cancel函数取消掉请求cancel()。

```js
// 写法1 AbortController
const controller = new AbortController();
axios.get('/foo/bar', {
  signal: controller.signal
}).then(function(response) {
  //...
});
// 取消请求
controller.abort();

// 写法2 CancelToken
const source = axios.CancelToken.source();
axios.get('/foo/bar', {
  cancelToken: source.token
}).then(function(response) {
  //...
});
//取消请求，参数可选，该参数信息会发送到请求的catch中
source.cancel('取消后的信息');
```
### 封装实例
1. 优化配置，设置默认配置项（responseType、跨域携带cookie、token、超时设置）
2. 统一设置请求头 根据环境设置 baseURL
3. 添加请求拦截器 添加响应拦截器
```js
// 默认配置项
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器：每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
// 响应拦截器：服务器状态码不是2开头的的情况，根据返回的状态码进行一些操作。
    // 例如登录过期提示，错误提示等等 
    // 401未登录->login；403token过期->login；404请求不存在弹出弹窗；
```

```js
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import store from '../store/index';
import { Toast } from 'vant';
// 提示函数,禁止点击蒙层、显示一秒后关闭
const tip = msg => {    
    Toast({        
      message: msg,duration: 1000,forbidClick: true    
    });
}
// 跳转登录页, 携带当前页面路由，以期在登录页面完成登录后返回当前页面
const toLogin = () => {
    router.replace({
        path: '/login',        
        query: { redirect: router.currentRoute.fullPath }
    });
}
// 请求失败后的错误统一处理 
const errorHandle = (status, other) => {
    switch (status) {  // 状态码判断
        case 401: // 401: 未登录状态，跳转登录页
            toLogin();
            break;
        case 403: // token过期清除token并跳转登录页
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                    toLogin();
            }, 1000);
            break;
        case 404:// 404请求不存在
            tip('请求的资源不存在'); 
            break;
        default;
      }
})
// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 1 请求拦截器, 每次请求前，如果存在token则在请求头中携带token 
instance.interceptors.request.use(    
    config => {                
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => Promise.error(error));
// 2 响应拦截器, 错误统一处理
instance.interceptors.response.use(    
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    // 请求失败
    error => {
        const { response } = error;
        if (response) {// 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
               store.commit('changeNetwork', false);
            } else {
               return Promise.reject(error);
            }
        }
    });
export default instance;
```
### axios源码分析
#### 目录

```js
├── /dist/ # 项目输出目录  
├── /lib/ # 项目源码目录  
│ ├── /adapters/ # 定义请求的适配器 xhr、http  
│ │ ├── http.js # 实现http适配器(包装http包)  
│ │ └── xhr.js # 实现xhr适配器(包装xhr对象)  
│ ├── /cancel/ # 定义取消功能  
│ ├── /core/ # 一些核心功能  
│ │ ├── Axios.js # axios的核心主类  
│ │ ├── dispatchRequest.js # 用来调用http请求适配器方法发送请求的函数  
│ │ ├── InterceptorManager.js # 拦截器的管理器  
│ │ └── settle.js # 根据http响应状态，改变Promise的状态  
│ ├── /helpers/ # 一些辅助方法  
│ ├── axios.js # 对外暴露接口  
│ ├── defaults.js # axios的默认配置  
│ └── utils.js # 公用工具  
├── package.json # 项目信息  
├── index.d.ts # 配置TypeScript的声明文件  
└── index.js # 入口文件
```
#### 整体流程
1. 用户使用`axios(config)/axios.get(url, config)`；axios内部发请求的流程是什么？
2. 主入口初始化请求:`request(config)`：在Axios.js核心类里面，添加原型方法，`methods:['delete', 'get', 'head', 'options']` 这些方法实际都是调用`request()`；
3. 整体核心流程: `request(config)  ===> dispatchRequest(config) ===> xhrAdapter(config)`
4. `Axios.prototype.request()`做了什么？链接流程：将请求拦截器->dispatchRequest()->响应拦截器通过promise连接起来，返回promise。
5. `dispatchrequest()`做了什么？ 转换数据：合并配置->请求数据转换->选择适配器，调用xhrAdapter()请求->转换响应数据，返回promise
6. `xhrAdapter()`基于xhr的适配器做了什么？创建xhr对象，发送请求。
7. 使用了适配器模式，如果是node环境，调用node专属的http适配器; 如果是浏览器环境，调用基于xhr的适配器。两个适配器的入参都是`config`；两个适配器的出参都是一个`Promise`。`function xhrAdapter(config) { return new Promise(function dispatchXhrRequest(resolve, reject) {}}`

```js
// 1 methods:['delete', 'get', 'head', 'options'] 这些方法实际都是调用request()
Axios.prototype[method] = function(url, config) {
  return this.request(utils.merge(config || {}, {
    method: method,
    url: url
  }));
// 2 request通过promise的then()串连起所有的请求拦截器/请求方法/响应拦截器
Axios.prototype.request = function request(){
  // 合并配置config
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  // 后添加的请求拦截器保存在数组的前面
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 后添加的响应拦截器保存在数组的后面
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  // 通过promise的then()串连起所有的请求拦截器/请求方法/响应拦截器
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
}
// 3 dispatchRequest：转换请求数据->调用xhrAdapter()请求->请求返回后转换响应数据，返回promise
function dispatchRequest(config) {
  // 转换请求数据：合并config中的baseURL和url，整合config中所有的header config.headers
  config.data = transformData(config.data, config.headers, config.transformRequest);
  // 调用adapter发送请求
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    // 请求返回后转换响应数据：对response中的data数据进行解析
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );
    return response;
  }),
});
}
// 4 http或xhr的请求的适配器 不同环境加载不同文件，文件的入参出参都一样的
function getDefaultAdapter() {
    var adapter;
    // 判断当前是否是node环境，如果是node环境，调用node专属的http适配器
    //如果是浏览器环境，调用基于xhr的适配器
    if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        adapter = require('./adapters/http');
    } else if (typeof XMLHttpRequest !== 'undefined') {
        adapter = require('./adapters/xhr');
    }
    return adapter;
}
// 5 实际发送请求
function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var request = new XMLHttpRequest();// 创建XHR对象
     request.open()// 初始化请求
     request.onreadystatechange = function handleLoad() {}// 绑定请求状态改变的监听
     // ...
  }
}
```
#### 如何实现取消未完成请求？
1. 其实就是两个Promise，一个用来发送请求一个用取消请求
2. CancelToken作用: 创建一个用于将来中断请求的`cancelPromise`，并定义了一个用于取消请求的`cancel函数`
3. 用户调用cancel()取消请求：① 用户调用`cancel(message)`, 传入错误信息；② 内部会让cancelPromise变为成功,在cancelPromise的成功回调中中断请求, 并让发请求的proimse失败。

```js
// 中断请求
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }
  // 为取消请求准备一个promise对象, 并保存resolve函数
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  // 保存当前token对象
  var token = this;
  // 立即执行接收的执行器函数, 并传入用于取消请求的cancel函数
  executor(function cancel(message) {
    // 如果token中有reason了, 说明请求已取消
    if (token.reason) return;
    // 将token的reason指定为一个Cancel对象
    token.reason = new Cancel(message);
    // 将取消请求的promise指定为成功, 值为reason
    resolvePromise(token.reason);
  });
}
//  创建一个包含token对象和cancel函数的对象, 并添加给CancelToken
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;
```
### 链接
[Axios之核心语法详解](https://blog.csdn.net/aa_hdkf_vg/article/details/149271569)
[尚硅谷_axios核心技术](https://www.bilibili.com/video/BV1NJ41197u6/?spm_id_from=333.1387.search.video_card.click&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)