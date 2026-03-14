---
title: vue解读源码之渲染更新
isTimeLine: true
date: 2025-09-28
category:
  - 前端
tag:
  - Vue
  - 源码
---
### 渲染更新
1. 为了解决当我们改变数据的时候发现页面并不会自动更新
2. vue采用观察者模式定义Watcher和Dep完成依赖收集和派发更新,从而实现渲染更新
#### 定义Watcher
1. 观察者：`update()、addDep()`订阅数据的变动，当数据变动时通知它去渲染视图
2. src/observer/watcher.js
3. class Watcher{}
### 渲染 Watcher
1. `mountComponent(){new Watcher(vm, updateComponent, null, true);}`
2. 注册一个渲染watcher,执行`vm._update(vm._render())`方法渲染视图
### 定义Dep
1. 被观察者，有`depend()、notify()、addSub()`方法。收集观察者在一个数组subs，当数据发生变化的时候，通知数组的watcher更新
2. class Dep {}
### 对象的依赖收集
1. 数据在被访问的时候进行依赖收集，在get()里面调用`dep.depend()`将`渲染watcher`收集在dep的`subs`数组里，同时把dep实例对象也放到渲染watcher中；
2. 数据更新的时候进行派发更新，在set()调用`dep.notify()`通知dep的`subs`存储的watcher进行更新
3. defineReactive函数
    - `new Dep();`为每个属性实例化一个Dep
    - `get(){dep.depend();}`页面取值，watcher收集到dep里面（依赖收集）
    - `set(){dep.notify();}`通知渲染watcher去更新（派发更新）
```js
//渲染更新原理
//为了解决当我们改变数据的时候发现页面并不会自动更新，vue采用观察者模式 定义 Watcher 和 Dep 完成依赖收集和派发更新 从而实现渲染更新
//1 定义Watcher 它需要订阅数据的变动 当数据变动之后 通知它去执行某些方法
// src/observer/watcher.js
let id = 0;// 全局变量id  每次new Watcher都会自增
class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cb = cb; //回调函数 比如在watcher更新之前可以执行beforeUpdate方法
        this.options = options; //额外的选项 true代表渲染watcher
        this.id = id++; // watcher的唯一标识
        if (typeof exprOrFn === "function") { // 如果表达式是一个函数
            this.getter = exprOrFn;
        }
        // 实例化就会默认调用get方法
        this.get();
    }
    get() {
        this.getter();
    }
}
//2 渲染 Watcher
// src/lifecycle.js
function mountComponent(vm, el) {
    // 引入watcher的概念 这里注册一个渲染watcher 执行vm._update(vm._render())方法渲染视图
    let updateComponent = () => {
        console.log("刷新页面");
        vm._update(vm._render());
    };
    new Watcher(vm, updateComponent, null, true);
}
//3 定义 Dep,观察者模式里面的被观察者,在 subs 里面收集 watcher 当数据变动的时候通知自身 subs 所有的 watcher 更新
// src/observer/dep.js
// dep和watcher是多对多的关系,每个属性都有自己的dep
let id1 = 0; //dep实例的唯一标识
class Dep {
    constructor() {
        this.id = id1++;
        this.subs = []; // 这个是存放watcher的容器
    }
}
Dep.target = null;// 默认Dep.target为null
//4.对象的依赖收集
//主要是做了：其实就是在数据被访问的时候，把我们定义好的渲染 Watcher 放到dep的subs数组里面
// 同时把dep实例对象也放到渲染Watcher里面去，数据更新时就可以通知dep的subs存储的watcher更新
// src/observer/index.js
function defineReactive(data, key, value) {
    observe(value);
    let dep = new Dep(); // 为每个属性实例化一个Dep
    Object.defineProperty(data, key, {
        get() {//页面取值，watcher收集到dep里面（依赖收集）
            if (Dep.target) {// 如果有watcher dep就会保存watcher 同时watcher也会保存dep
                dep.depend();
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            observe(newValue);// 如果赋值的新值也是一个对象  需要观测
            value = newValue;
            dep.notify(); // 通知渲染watcher去更新--派发更新
        },
    });
}
//初渲染会执行getter：{{name}}->get()->dep.depend()->Dep.target.addDep()->this.deps.push(dep);dep.addSub(this)->this.subs.push(watcher);
//改变值后触发setter: dep.notify()->this.subs.forEach((watcher) => watcher.update())-> update() 
//5 完善 watcher Dep
// src/observer/watcher.js
class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cb = cb; //回调函数 比如在watcher更新之前可以执行beforeUpdate方法
        this.options = options; //额外的选项 true代表渲染watcher
        this.id = id++; // watcher的唯一标识
        this.deps = []; //存放dep的容器
        this.depsId = new Set(); //用来去重dep
        if (typeof exprOrFn === "function") {// 如果表达式是一个函数
            this.getter = exprOrFn;
        }
        // 实例化就会默认调用get方法
        this.get();
    }
    get() {
        pushTarget(this); // 在调用方法之前先把当前watcher实例推到全局Dep.target上
        this.getter(); //如果watcher是渲染watcher 那么就相当于执行vm._update(vm._render()) 这个方法在render函数执行的时候会取值 从而实现依赖收集
        popTarget(); // 在调用方法之后把当前watcher实例从全局Dep.target移除
    }
    //把dep放到deps里面 同时保证同一个dep只被保存到watcher一次  同样的  同一个watcher也只会保存在dep一次
    addDep(dep) {
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep);
            //直接调用dep的addSub方法  把自己--watcher实例添加到dep的subs容器里面
            dep.addSub(this);
        }
    }
    //这里简单的就执行以下get方法  之后涉及到计算属性就不一样了
    update() {
        this.get();
    }
}
// src/observer/dep.js
class Dep {
    constructor() {
        this.id = id++;
        this.subs = []; // 这个是存放watcher的容器
    }
    depend() {
        if (Dep.target) {//如果当前存在watcher
            Dep.target.addDep(this); // 把自身-dep实例存放在watcher里面
        }
    }
    notify() {   //依次执行subs里面的watcher更新方法
        this.subs.forEach((watcher) => watcher.update());
    }
    addSub(watcher) {//把watcher加入到自身的subs容器
        this.subs.push(watcher);
    }
}
// 默认Dep.target为null
Dep.target = null;
// 栈结构用来存watcher
const targetStack = [];
function pushTarget(watcher) {
    targetStack.push(watcher);
    Dep.target = watcher; // Dep.target指向当前watcher
}
function popTarget() {
    targetStack.pop(); // 当前watcher出栈 拿到上一个watcher
    Dep.target = targetStack[targetStack.length - 1];
}
```
