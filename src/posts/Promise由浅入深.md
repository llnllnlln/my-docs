---
title: 手写Promise后，用起来好清晰
isTimeLine: true
date: 2026-01-02
category:
  - 前端
tag:
  - JavaScript 
  - 源码
---

### 是什么
1. 是异步编程的一种解决方法，它是一个构造函数，由它的实例对象来封装一个异步操作，并且可以获取其成功或失败的结果。构造函数`Promise`内部自动执行一个执行器函数`executor`，执行器函数接收两个参数`resolve、reject`两个回调函数，`executor`执行器函数是同步回调函数。
2. 有三个状态：`pending、fulfilled、rejected`。实例的状态只能由`pending`转为`fulfilled或rejected`状态，并且状态一经改变，就没办法再被改变了。
3. 状态如何改变的呢？通过`resolve()`将状态改为fulfilled；`reject()`函数将状态改为rejected；
4. 回调地狱：回调函数嵌套使用，不利于阅读以及异常处理，Promise的链式调用解决了回调地狱。它实例对象具有`then和catch`方法，而它们的返回结果依然是一个Promise对象，因此可以使用`.符号`进行链式调用
### Promise构造函数 Promise(excutor){} 
1. excutor函数:同步执行`(resolve, reject)=>{}`, excutor会在Promise内部立即同步回调
2. resolve函数:内部定义成功时我们调用的函数` value =>{}`
3. reject函数:内部定义失败时我们调用的函数 `reason=>{}`
### Promise原型上的方法
1. ` Promise.prototype.then((onResolved, onRejected)=> {})`：   
    a. `onResolved`函数:成功的回调函数(value)=>{}     
    b. `onRejected`函数:失败的回调函数(reason)=>{}  
    c. 成功或失败的回调函数都会返回一个新的Promise，也就是promise能链式书写的原因  
2. `Promise.prototype.catch((onRejected)=> {})`:   
    onRejected函数:失败的回调函数(reason)=>{}。是then()的语法糖，相当于:then(undefined，onRejected)
4. `Promise.prototype.finally`：finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

```js
// 1 Promise构造函数 Promise(excutor){}
const p1 = new Promise((resolve, reject)=>{ 
  // ...异步操作
  resolve(1)
})
// 2 Promise.resolve方法 Promise.reject方法
const p2 = Promise.resolve(2) 
const p3 = Promise.reject(3)  
// 3 原型上的方法 Promise.prototype.then((onResolved, onRejected)=> {})  
// 4 原型上的方法 Promise.prototype.catch((onRejected)=> {})
// onResolved函数:成功的回调函数(value)=>{}; onRejected函数:失败的回调函数(reason)=>{}
p1.then(value=>{console.log(value)})// 结果：1
p2.then(value=>{console.log(value)})// 结果：2
p3.catch(reason=>{console.log('catch', reason)}) // 结果：catch 3
```
### Promise身上的方法
1. `Promise.resolve方法 (value)=>{}`：返回一个成功/失败的promise对象，value参数是成功的数据或promise对象
2. `Promise.reject方法 (reason)=>{}`：返回一个失败的promise对象，reason:失败的原因
3. `Promise.all方法 (promises)=>{}`： 返回一个新的promise，参数是promise数组。只有所有的promise都成功才成功，一个失败了就直接失败了`（全部成功，任一失败立即拒绝`）
4. `Promise.race方法 (promises)=>{}`： 返回一个新的promise，第一个完成的Promise的状态就是最终的结果状态`（第一个响应的是啥就是啥）`
5. `Promise.allSettled方法 (promises)=>{`}：返回一个新的promise，状态总是已完成,用来确定一组异步操作是否都结束了`(全部返回，不管成功或失败)`
6. `Promise.any方法 (promises)=>{}`： 返回一个新的promise，状态总是已完成,只要参数实例有一个变成fulfilled状态，包装实例就会变成 fulfilled状态`（任一成功，全部失败才拒绝）`;如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

```js
// 1 Promise构造函数 Promise(excutor){}
const p1 = new Promise((resolve, reject)=>{ 
  // ...异步操作
  resolve(1)
})
// 2 Promise身上的几个方法使用
const p2 = Promise.resolve(2)  //Promise.resolve方法
const p3 = Promise.reject(3)  //Promise.reject方法
const p4 = Promise.all([p1, p2, p3]) //Promise.all方法
const p5 = Promise.race([p1, p2, p3]) //Promise.race方法
const p6 = Promise.allSettled([p1, p2, p3]) //Promise.allSettled方法
const p7 = Promise.any([p1, p2, p3]) //Promise.any方法
// 对应all race allSettled any的结果
p4.catch(reason=>{console.log('catch', reason)})// all结果：catch 3，全部成功，任一失败立即拒绝
p5.then(value=>{console.log(value)})// race结果：1，第一个响应的是啥就是啥
p6.then(value=>{console.log(value)})
// allSettled结果：[{"status": "fulfilled","value": 1},{"status": "fulfilled","value": 2}
//,{"status": "rejected","reason": 3}]，全部返回，不管成功或失败
p7.then(value=>{console.log(value)})// any结果：1 //任一成功，全部失败才拒绝
```
### promise.all与promise.race的区别
1. 相同点用来完成并行任务， 它接收一个数组，数组的每一项都是一个promise对象
2. 不同点：`Promise.all 关注全部完成，Promise.race 关注最先响应`
3. `Promise.all`：只有所有的promise都成功才成功，一个失败了就直接失败了。  
  a.当数组中所有的promise的状态都达到resolved的时候，all方法的状态就会变成resolved;   
  b.有一个状态变成了rejected，那么all方法的状态就会变成rejected。 
5. `Promise.race`: 第一个完成的Promise的状态就是最终的结果状态。  
  a.如果第一个promise对象状态变成resolved状态就是resolved；第一个promise变成rejected，状态就是rejected。
### Promise几个关键问题
1. `new Promise(executor)` 中的执行器以及` .then、.catch` 都是同步的，但是执行器中的异步操作是异步的，.then 和 .catch 中的回调函数也是异步的。 
2. `promise.then与promise.catch`的区别：catch()是then()的语法糖，相当于:then(undefined，onRejected)
3. promise怎么串联多个操作任务？通过then的链式调用串连多个同步/异步任务，因为promise的 then() 返回一个新的 promise
4. `promise.then()`返回的新的promise状态是谁改变？由then里面回调执行的结果决定。
> ① 如果`抛出异常`，新promise变为rejected;  
> ② 如果返回的是`非promise`，那么状态为已完成，value为返回值;  
> ③ 如果返回的是`promise`，那么状态由promise的状态决定  
5. 异常穿透：在Promise的链式调用链中，所有的then都没有指定错误的回调，则前面出现的异常会在最后失败的回调中处理。
6. 值传透：链式调用的参数不是函数时，会发生值穿透，就传入的非函数值忽略，传入的是之前的函数参数。
7. 如何中断promise链？在回调函数中返回一个pendding状态的promise对象：`return new Promise(()=>{})`
### Promise问题
1. 无法取消Promise，若没有状态变更，也无法停止 promise 的等待
2. 不设定 then 或 catch 方法，构造函数(excutor函数)错误，无法捕获
3. 未完成状态时，无法得知是刚开始，还是即将完成
### 手写一个简易promise
1. 定义Promise构造函数：① 定义`excutor`执行器函数是同步执行；② 声明`pending、fulfilled、rejected`三个全局状态；③ 定义`resolve()`修改状态以及异步执行所有成功的回调函数；④ 定义`reject()`修改状态以及异步执行所有失败的回调函数
2. 定义Promise原型对象`then()`，参数是`onResolved, onRejected`两个回调；① 返回一个新的Promise对象，返回promise的结果由onResolved/onRejected执行结果决定。② 根据全局状态，如果是`fulfilled、rejected`则异步执行`onResolved/onRejected`，改变return的promise的状态；③ 如果是`pending`则push进数组等待被执行。
3. Promise原型对象`catch()`，返回一个新的Promise对象
```js
// 1 Promise 构造函数 excutor执行器函数 同步执行
const PENDING = 'pending'
const RESOLVED = 'fulfilled'
const REJECTED = 'rejected'
function Promise(excutor){
   try{// excutor同步执行
      excutor(resolve, reject) 
  }catch(error){// 若执行器异常，promise 对象变为 rejected 状态
      reject(error)
  }
  this.data = null
  this.status = PENDING //状态默认是pending
  this.callbacks = [] //保存的回调数组，结构是[{onResolved(){},onRejected(){}}]
  // 修改状态以及异步执行所有成功的回调函数
  function resolve(value){
      // 状态只能修改一次
      if(this.status !== PENDING) return
      // 修改值与状态
      this.status = RESOLVED;
      this.data = value;
      // 回调数组有值则立马取出执行
      if(this.callbacks.length > 0){
          // 模拟异步执行所有成功的回调函数
          setTimeout(()=>{
              this.callbacks.forEach(callbacksObj => {
                  callbacksObj.onResolved(value)
              });
          })
      }
  }
  // reject同理 修改状态以及异步执行所有失败的回调函数
}
// 2 Promise原型对象then方法 返回一个新的Promise对象
Promise.prototype.then = function(onResolved, onRejected){
  // 返回一个新的Promise对象 返回promise的结果由onResolved/onRejected执行结果决定
   return new Promise((resolve, reject)=>{
     function handle(callback){
      // a. 如果抛出异常，新 promise 变为 rejected, reason为抛出的异常
      // b. 如果返回的是非 promise 的任意值，新promise变为 resolved，value 为返回的值
      // c. 如果返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果
        try{
            let result = callback(self.data)
            //3 返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果
            if(result instanceof Promise){
                result.then(
                    value => resolve(value), // 当result成功，返回的promise也成功
                    reason => reject(reason) // 当result失败，返回的promise也失败
                )
            }else{
                resolve(result)//2 如果返回的是非 promise 的任意值,promise变为 resolved
            }
        }catch(error){ reject(error) }//1 如果抛出异常 promise 变为 rejected
    }
     // resolved/rejected状态，则异步执行onResolved/onRejected，改变return的promise的状态
     if(self.status === RESOLVED){
        setTimeout(()=>{
          handle(onResolved)
        },0)
     }else if(self.status === REJECTED){ 
       setTimeout(()=>{
          handle(onRejected)
        },0
     }else if(self.status === PENDING){//push进数组等待被执行
       self.callbacks.push({
         onResolved(){ handle(onResolved) }, 
         onRejected(){ handle(onRejected) }
       })
     }    
   })
}
// Promise原型对象 catch 方法 返回一个新的Promise对象
Promise.prototype.catch = function(onRejected){
  return this.then(undefined, onRejected);
}
// Promise函数对象resolve方法，返回一个新的Promise对象
// 返回新promise得结果由value决定，如果value是一个非promise，那么返回成功的promise，value就是这个传入的参数;value是一个promise，那么返回的promise，执行结果取决于传入的promise；
Promise.resolve = function(value){
  return new Promise((resolve, reject)=>{
    if(value instanceof Promise) value.then(resolve,reject)
    else resolve(value);
  })
}
// Promise函数对象reject方法，返回reason
Promise.reject = function(value){ 
  return new Promise((resolve, reject)=>{  reject(value) })
})
```
### 其他
1. 手写Promise函数对象`all`方法，参数是promise类型的数组。返回一个新的Promise对象，所有promise成功则成功，只有一个失败就失败；
2. 手写Promise函数对象`race`方法，参数是promise类型的数组。返回一个新的Promise对象，第一个响应的是啥就是啥。

```js
// 1 all方法参数是promise类型的数组，返回一个新的Promise对象 所有promise成功则成功，只有一个失败就失败
// 循环数组的每个promise实例的响应结果，有一个失败状态就直接reject(reason)；
// 没有的话比较数组个数与成功状态的个数，相等了才resolve(values)
Promise.all = function(promises){
    let values = new Array(promises.length)
    let count = 0
    return new Promise((resolve, reject)=>{
        promises.forEach((p, index) => {
            p.then(value=>{
                count++
                values[index] = value;
                if(promises.length === count){// 全部成功，返回所有成功的值的数组
                    resolve(values)
                }
            },reason=>{ // 出现失败就返回失败
                reject(reason)
            })
        })
    })
}
// 2 Promise函数对象race方法，参数是promise类型的数组
// 返回一个新的Promise对象，第一个响应的是啥就是啥
Promise.race = function(value){
    return new Promise((resolve, reject)=>{
        promises.forEach((p, index) => {
            p.then(value=>{
                resolve(value)
            },reason=>{
                reject(reason)
            })
        })
    })
}
```
### 链接
[尚硅谷Promise教程(promise前端进阶)](https://www.bilibili.com/video/BV1MJ41197Eu/?spm_id_from=333.1387.search.video_card.click&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)