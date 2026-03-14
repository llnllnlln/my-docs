---
title: vue解读源码之异步更新
isTimeLine: true
date: 2025-09-29
category:
  - 前端
tag:
  - Vue
  - 源码
---
### 异步更新
1. 异步队列机制，每次watcher进行更新的时候，让他们先缓存起来，之后再一起调用
2. 同步把watcher都放到队列里面去`queue.push(watcher)`，再异步调用`nextTick(flushSchedulerQueue);`
3. 作用是汇总data修改一次性更细视图，监视DOM操作次数，提高性能
#### watcher 更新的改写
1. `class Watcher {update(){ queueWatcher(this);}}`
2. 异步队列机制，每次watcher进行更新的时候，让他们先缓存起来，之后再一起调用
### queueWatcher 实现队列机制
1. 同步把watcher都放到队列里面去`queue.push(watcher);`
2. 再异步调用`nextTick(flushSchedulerQueue);`
3. `flushSchedulerQueue()`循环queue，调用watcher的run方法，执行真正的更新操作
### nextTick 实现原理
1. `nextTick()`: 除了渲染watcher,还有用户自己手动调用的nextTick 一起被收集到数组`let callbacks = []; function nextTick(cb){callbacks.push(cb);timerFunc()}`
2. `timerFunc()`:定义异步方法,采用优雅降级:`Promise>MutationObserver>setImmediate>最后降级采用setTimeout`
### $nextTick 挂载原型
1. Vue.prototype.$nextTick = nextTick; 可供用户手动调用
```js
// 异步更新
// 1 src/observer/watcher.js
class Watcher {
    update() {
        // 每次watcher进行更新的时候  是否可以让他们先缓存起来  之后再一起调用
        // 异步队列机制
        queueWatcher(this);
    }
    run() {
        // 真正的触发更新
        this.get();
    }
}
//// src/observer/scheduler.js
// 2 queueWatcher 实现队列机制
//先同步把 watcher 都放到队列里面去 执行完队列的事件之后再清空队列 主要使用 nextTick 来执行 watcher 队列
let queue = [];
let has = {};
function flushSchedulerQueue() {
    for (let index = 0; index < queue.length; index++) {
        //   调用watcher的run方法 执行真正的更新操作
        queue[index].run();
    }
    // 执行完之后清空队列
    queue = [];
    has = {};
}
// 实现异步队列机制
function queueWatcher(watcher) {
    const id = watcher.id;
    //   watcher去重
    if (has[id] === undefined) {
        //  同步代码执行 把全部的watcher都放到队列里面去
        queue.push(watcher);
        has[id] = true;
        // 进行异步调用
        nextTick(flushSchedulerQueue);
    }
}
// 3 nextTick 实现原理
// src/util/next-tick.js
// 主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法
let callbacks = [];
let pending = false;
function flushCallbacks() {
    pending = false; //把标志还原为false
    // 依次执行回调
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i]();
    }
}
let timerFunc; //定义异步方法  采用优雅降级
if (typeof Promise !== "undefined") {
    // 如果支持promise
    const p = Promise.resolve();
    timerFunc = () => {
        p.then(flushCallbacks);
    };
} else if (typeof MutationObserver !== "undefined") {
    // MutationObserver 主要是监听dom变化 也是一个异步方法
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true,
    });
    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    };
} else if (typeof setImmediate !== "undefined") {
    // 如果前面都不支持 判断setImmediate
    timerFunc = () => {
        setImmediate(flushCallbacks);
    };
    } else {
    // 最后降级采用setTimeout
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}
function nextTick(cb) {
    // 除了渲染watcher  还有用户自己手动调用的nextTick 一起被收集到数组
    callbacks.push(cb);
    if (!pending) {
        // 如果多次调用nextTick  只会执行一次异步 等异步队列清空之后再把标志变为false
        pending = true;
        timerFunc();
    }
}
// src/render.js
function renderMixin(Vue) {
    // 挂载在原型的nextTick方法 可供用户手动调用
    Vue.prototype.$nextTick = nextTick;
}
```
