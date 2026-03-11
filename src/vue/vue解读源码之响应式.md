---
title: vue解读源码之响应式
isTimeLine: true
date: 2025-06-19
category:
  - 前端
tag:
  - Vue
  - 源码
---
## rollup配置
```js
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
export default {
  input: "./src/index.js",
  output: {
    format: "umd", // 模块化类型
    file: "dist/vue.js",
    name: "Vue", // 打包后的全局变量的名字
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    process.env.ENV === "development"
      ? serve({
          open: true,
          openPage: "/public/index.html",
          port: 3000,
          contentBase: "",
        })
      : null,
  ],
};
```
## 响应式数据原理
### 数据初始化
-  src/index.js:  Vue 初始化可能会处理很多事情 比如数据处理 事件处理 生命周期处理等等，所以需要划分不同文件.
-  src/init.js:  把_init 方法挂载在 Vue 原型 供 Vue 实例调用
-  src/state.js:  初始化状态 initState() initData(){}
  1. initState(){} 这里初始化的顺序依次是 prop>methods>data>computed>watch
  2. initData(){} 1)vue组件data推荐使用函数 防止数据在组件之间共享; 2)把data数据代理到vm，即this.a来访问this._data.a；3）对数据进行观测
### 对象的数据劫持
-  src/obserber/index.js： 主要是defineReactive函数，主要是使用Object.defineProperty对数据get set进行劫持 ，然后再set里面进行视图的更新
initData->observe->new Observer(data)->defineReactive(data,key,value)->observe->...
  1. observe(){ ...new Observer ()}  // 如果传过来的是对象或者数组 进行属性劫持
  2. class Observer {walk(){}}// 对象上的所有属性依次进行观测
  3. defineReactive(){}  //1 observe() 递归关键 2数据劫持逻辑
-  缺点1：数组也不能使用这种方式，根据下标可以直接修改数据也能触发 set的话,一个数组里面有上千上万个元素 每一个元素下标都添加 get 和 set 方法 这样对于性能来说是承担不起的；
-  缺点2：对象的新增或者删除属性都不会被set监听到 只有本身有的属性修改才会被劫持
### 数组劫持
- src/obserber/index.js
  1. initData->observe->new Observer(data)->observeArray(data,key,value)如果数组里面还包含数组 需要递归判断->observe->...
  2. 通过重写数组原型方法来对数组的七种方法进行拦截； 2）如果数组里面还包含数组 需要递归判断
  3.  __ ob __ 这个有疑问
- src/obserber/array.js
  1. 保留数组原型
  2. 将arrayMethods继承自数组原型,七种方法遍历
  3. 数组有新增操作，inserted是一个数组，调用Observer实例的observeArray对数组每一项进行观测
```js
//响应式数据
//数据驱动:实现数据变化自动更新视图，所以需要内部有个机制可以监听数据的变化然后自动触发更新
//1 初始化结果
new Vue({el: "#app", data() {return {a: 111}},router,store,render: (h) => h(App),}); 
//Vue就是一个构造函数 通过new关键字进行实例化
function Vue(options) { this._init(options);}  initMixin(Vue);
//初始化， 初始化可能会处理很多事情 比如数据处理 事件处理 生命周期处理等
//initMixin文件 把_init 方法挂载在 Vue 原型 供 Vue 实例调用
Vue.prototype._init = function (options) {const vm = this; initState(vm);}
//initState文件 初始化状态 注意这里的顺序  prop>methods>data>computed>watch 否能在data里面直接使用prop的值?
//初始化data数据
function initState(vm){ const opts = vm.$options; if (opts.data) { initData(vm);}}
//2 初始化data数据
function initData(vm) {
    let data = vm.$options.data;
    // 实例的_data属性就是传入的data
    // vue组件data推荐使用函数 防止数据在组件之间共享
    data = vm._data = typeof data === "function" ? data.call(vm) : data || {};
    // 把data数据代理到vm 也就是Vue实例上面 我们可以使用this.a来访问this._data.a
    for (let key in data) {
        proxy(vm, `_data`, key);
    }
    // 对数据进行观测 --响应式数据核心
    observe(data);
}
//3 对象的数据劫持
//数据劫持核心是 defineReactive 函数 主要使用 Object.defineProperty 来对数据 get 和 set 进行劫持,可以在 set 里面去通知视图更新
// initData->observe->new Observer(data)->defineReactive(data,key,value)->observe->...
class Observer {
    // 观测值
    constructor(value) {
        this.walk(value);
    }
    walk(data) {
        // 对象上的所有属性依次进行观测
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            defineReactive(data, key, value);
        }
    }
}
// Object.defineProperty数据劫持核心 兼容性在ie9以及以上
function defineReactive(data, key, value) {
    observe(value); // 递归关键
    // --如果value还是一个对象会继续走一遍odefineReactive 层层遍历一直到value不是对象才停止
    //   思考？如果Vue数据嵌套层级过深 >>性能会受影响
    Object.defineProperty(data, key, {
        get() {
            console.log("获取值");
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            console.log("设置值");
            value = newValue;
        },
    });
}
export function observe(value) {
    // 如果传过来的是对象或者数组 进行属性劫持
    if (
        Object.prototype.toString.call(value) === "[object Object]" ||
        Array.isArray(value)
    ) {
        return new Observer(value);
    }
}
//4 数组的数据劫持
//Object.defineProperty 缺点,对象新增或者删除的属性无法被 set 监听到 只有对象本身存在的属性修改才会被劫持
//数组也不能使用这种方式，根据下标可以直接修改数据也能触发 set的话,一个数组里面有上千上万个元素 每一个元素下标都添加 get 和 set 方法 这样对于性能来说是承担不起的
// initData->observe->new Observer(data)->observeArray(data,key,value)如果数组里面还包含数组 需要递归判断->observe->...
class Observer {
    constructor(value) {
        if (Array.isArray(value)) {
            // 这里对数组做了额外判断
            // 通过重写数组原型方法来对数组的七种方法进行拦截
            value.__proto__ = arrayMethods;
            // 如果数组里面还包含数组 需要递归判断
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }
    observeArray(items) {
        for (let i = 0; i < items.length; i++) {
            observe(items[i]);
        }
    }
    walk(data) {
        // 对象上的所有属性依次进行观测
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            defineReactive(data, key, value);
        }
    }
}
class Observer {
// 观测值 给每个响应式数据增加了一个不可枚举的__ob__属性，并且指向了 Observer 实例
// 可以根据这个属性来防止已经被响应式观察的数据反复被观测 可以使用__ob__来获取 Observer 实例的相关方法
    constructor(value) {
        Object.defineProperty(value, "__ob__", {
            //  值指代的就是Observer的实例
            value: this,
            //  不可枚举
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }
}
// 先保留数组原型
const arrayProto = Array.prototype;
// 然后将arrayMethods继承自数组原型
// 这里是面向切片编程思想（AOP）--不破坏封装的前提下，动态的扩展功能
export const arrayMethods = Object.create(arrayProto);
let methodsToPatch = ["push","pop","shift","unshift","splice","reverse","sort"];
methodsToPatch.forEach((method) => {
    arrayMethods[method] = function (...args) {
        //   这里保留原型方法的执行结果
        const result = arrayProto[method].apply(this, args);
        // 这句话是关键
        // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
        const ob = this.__ob__;
        // 这里的标志就是代表数组有新增操作
        let inserted;
        switch (method) {
        case "push":
        case "unshift":
            inserted = args;
            break;
        case "splice":
            inserted = args.slice(2);
        default:
            break;
        }
        // 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
        if (inserted) ob.observeArray(inserted);
        // 之后咱们还可以在这里检测到数组改变了之后从而触发视图更新的操作--后续源码会揭晓
        return result;
    };
});
```
```js
1 数据初始化->2 对象的劫持->3 数组的劫持-> 4 Watcher、Dep -> 6 对象的依赖收集

1. Vue初始化时候执行_init() 

2. _init方法是挂载在Vue原型

3.  initState(vm);初始化状态(这里初始化的顺序依次是 prop>methods>data>computed>watch)-> initData()

    1)vue组件data推荐使用函数 防止数据在组件之间共享; 2)把data数据代理到vm，即this.a来访问this._data.a；3）对数据进行观测

4. observe() 递归进行属性劫持 new Observer(data)

5. 对象劫持，主要是defineReactive函数，主要是使用Object.defineProperty对数据get set进行劫持 ，然后再set里面进行视图的更新

    - 缺点1：数组也不能使用这种方式，根据下标可以直接修改数据也能触发 set的话,一个数组里面有上千上万个元素 每一个元素下标都添加 get 和 set 方法 这样对于性能来说是承担不起的；

    - 缺点2：对象的新增或者删除属性都不会被set监听到 只有本身有的属性修改才会被劫持

6. 数组劫持，通过重写数组原型方法来对数组的七种方法（push pop shift unshift sort reverse splice）进行拦截； 2）如果数组里面还包含数组 需要递归判断

7. Watcher观察者：订阅数据的变动，当数据变动后，通知他去执行某些方法;

8. Dep被观察者:在subs收集观察者，当数据变动后，通知subs的watcher更新

9. 对象的依赖收集：在数据被访问的时候进行依赖收集，就是在get()里面dep.depend(),每个属性都有dep实例保存自己的watcher；数据更新时进行派发更新，set()通知与属性有关的watcher视图更新

10. 数组的依赖收集：基于Observer实例对象，自身的`__ob__`也指向Observer实例对象;

初始化状态->vm.$mount() 如果有el属性 进行模板渲染 -> 如果存在render属性 ->将当前组件实例挂载到真实的el节点上面mountComponent()
```