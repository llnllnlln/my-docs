---
title: JavaScript的对象数组函数
isTimeLine: true
date: 2026-02-11
category:
  - 前端
tag:
  - JavaScript
---

### 对象理解
1. 什么是对象?多个数据(属性)的集合。在 JavaScript 中，对象是一组无序的相关属性和方法的集合。
2. 操作内部属性？通过`.属性名与['属性名']`
3. 对象的创建
>a. Object构造函数模式：先创建空Object对象, 再动态添加属性/方法；  
>b. 对象字面量模式：使用{}创建对象, 同时指定属性/方法；  
>c. 工厂模式：工厂函数是返回一个对象的函数，通过工厂函数动态创建对象并返回；  
>d. 构造函数模式：自定义构造函数, 通过new创建对象；  
>e. 构造函数+原型的组合模式：自定义构造函数, 属性在函数中初始化, 方法添加到原型
4. 对象类型（引用数据类型）
> a. 标准普通对象 `object`   
> b. 标准特殊对象 `Date Array RegExp Math Error`  
> c. 非标准特殊对象 `Number Boolean String`  
> d. 可调用对象 `function`  
5. 内置对象是什么？存在全局作用域里的由 js 定义的一些全局值属性、函数、构造函数。全局函数如 parseInt()、parseFloat()；用来实例化对象的构造函数如 Date、Object 等，还有Math对象等
6. 标准内置对象
> a. 原始值:`undefined, null, number, string, boolean`;引用值: `object`  
> b. 包装对象:`Number, String, Boolean; `  
> c. 构造函数:`Object, Function, Date, Error, RegExP, Array Math JSON Arguments`   
> d. 使用键的集合对象，如 `Map、Set、WeakMap、WeakSet`  
> e. 可索引的集合对象，如 `Array`  
> f. 控制抽象对象，如` Promise、Generator` 等
### 对象遍历
1. `for in`循环时返回的是存在于实例中的属性，也包括存在于原型中的实例。
2. `Object.keys` => 获取对象自身所有的可枚举的属性值，返回一个由属性名组成的数组。
3. `Object.values` => 获取对象自身所有的可枚举的属性值，返回一个由值组成的数组。
4. `Object.entries`=> 获取对象自身所有的可枚举的属性值，返回二维数组。
5. `Object.getOwnPropertyNames`用于获取对象自身所有的可枚举的属性值，返回一个由属性名组成的数组。
6. `Object.defineProperty()`定义对象中新属性或修改原有的属性。

```js
// Object.defineProperty(obj, prop, descriptor)` descriptor 对象的参数值均为默认值
Object.defineProperty(obj, prop, {
    value: undefined,//设置属性的值
    writable: false,//值是否可以重写。
    enumerable: false,//目标属性是否可以被枚举
    configurable: false//目标属性是否可以被删除或是否可以再次修改特性
})  
```
### 数组理解与使用
1.  数组是用一个变量存储多个数据的一种特殊的数据结构，可以通过数组下标获取对应位置的数据；
2. 数组的常用API? ① 改变原数组：`pop push shift unshift  reserve sort splice`； ② 不改变原数组：`slice concat toString toLocalString join`
3. 数组的遍历方式由哪些？
>- `forEach、for循环与for..of`：for速度最快；forEach 无法跳出循环；for 和 for ..of 可以使用 break 或者 continue 跳过或中断,不能return;
>- `some every`:返回一个布尔值，`some`如果数组有某个元素满足回调那么就返回true; `every`如果数组所有元素满足回调那么就返回true
>- `find、findIndex`: 查找数组元素，找到第一个满足回调的元素（元素Index）并返回  
>- `filter、map` 不会改变原数组, `filter`将回调函数的返回值为true的数组元素放进新数组并返回；`map`返回一个由回调函数的返回值组成的新数组
>- `reduce、reduceRight`：从左到右为每个元素执行一次回调，并把上次回调的返回值缓存起来传给下次回调，返回最后一次的回调函数的返回值
4. 手写基本实现

```js
// 1 手写map方法
function map(array, callback){
    let res = [];
    for (let index = 0; index < array.length; index++) {
        //返回一个由回调函数的返回值组成的新数组
        res.push(callback.call(array[index], index)) 
    }
    return res;
}
// 2 手写filter方法
function filter(array, callback){
    let res = [];
    for (let index = 0; index < array.length; index++) {
        // 将回调函数的返回值为true的数组元素放进新数组
        let flag = callback.call(array[index], index);
        if(flag) res.push(array[index])
    }
    return res;
}
// 3 手写find方法
function find(array, callback){
    let res = [];
    for (let index = 0; index < array.length; index++) {
        // 找到第一个满足回调函数的元素并返回那个元素
        let flag = callback.call(array[index], index);
        if(flag) return array[index];
    }
}
// 4 手写some方法
function some(array, callback){
    for (let index = 0; index < array.length; index++) {
        // 有回调函数的返回值为true则返回true
        let flag = callback.call(array[index], index);
        if(flag) return true;
    }
    return false;
}
// 5 手写every方法
function every(array, callback){
    for (let index = 0; index < array.length; index++) {
        // 有回调函数的返回值为false就立马返回false
        let flag = callback.call(array[index], index);
        if(!flag) return false;
    }
    return true;
}
// 6 reduce理解：循环数组中的每一项，每次循环都会触发回调的执行，可以实现累加
let arr=[1,2,3,4];
let total = arr.reduce((res,item,index)=>{return res + item;}) 
console.log(total) //10 
// 过程分析：第一次:res=1 item=2 返回:3; 第二次:res=3 item=3 返回:6; 第三次:res=6 item=4,返回:10迭代完成
// 7 手写reduce方法
function reduce(array, callback, initVal){
    let res = initVal;
    for (let index = 0; index < array.length; index++) {
        // 调用回调函数将返回的结果赋值给res
        res = callback.call(res, array[index]);
    }
    return res;
}
```
### 数组与类数组的类别，怎么转化成数组？
1. 类数组是什么?  
  a. 属性要为索引（数字）属性；必须有length属性；不能使用数组的操作方法，比如push pop slice等   
  b. 常见的类数组对象有: 函数的arguments属性；DOM操作：document.querySelectorAll()获取nodeList。
2. 怎么转化成数组?
> a. 创建新数组，用for循环push进去新的数组  
> b. 通过Array.from 方法来实现转换`Array.from(arrayLike) Array.from(arguments);`  
> c. es6展开运算符（rest参数`[...arguments]`  
> d. 通过 call 调用数组的 slice 方法来实现转换`Array.prototype.slice.call(arrayLike);`  
> e. 利用concat+apply, 通过 apply 调用数组的 concat 方法来实现转换`Array.prototype.concat.apply([], arguments)`
### Set与WeakSet
1. Array和Set的区别：元素可重复性，Set不可重复；元素序列，Array有序
2. WeakSet的弱集合：垃圾回收是一种内存管理技术。在这种技术中，不再被引用的对象会被自动删除，而与其相关的资源也会被一同回收。Set中对象的引用都是强类型化的，并不会允许垃圾回收。WeakSet它们允许从内存中清除不再需要的被这些集合所引用的对象。
3. WeakSet与Set的区别？
>a. 存储类型:Set可以存储值类型和对象引用类型，而WeakSet只能存储对象引用类型，否则会抛出TypeError。  
>b. api方法：WeakSet对象是不可枚举的，也就是说无法获取大小，也无法获取其中包含的元素。只能使用add delete方法，遍历方法不能使用  
>c. 内存管理:set存储在set中的对象会保持引用; WeakSet弱引用(不会计数)，无引用的对象会被自动清除出集合（垃圾回收机制）。
### 函数的理解和使用？
1. 什么是函数? 用来实现特定功能的, n条语句的封装体，只有函数类型的数据是可以执行的。
2. 函数定义? ① 函数声明方式 `function` 关键字 (命名函数); ② 函数表达式 (匿名函数)：`let func = function() {};`
3. 函数调用：① `test()`一般函数是直接调用；② 构造函数是通过new调用`new test()`；③ 通过.调用对象内部的属性/方法`p.test()`；④ 通过call/apply指定谁调用:` xxx.call(obj)`；
> a. 普通函数：`fn()`,this指向window   
> b. 对象的方法：`obj.fn()`，this指向该方法所属对象  
> c. 构造函数：`new test()`，new构造函数this指向实例对象，原型里面的方法也指向实例对象  
> d. 通过call/apply调用: `xxx.call(thisArg, arg1, arg2)`：在fun函数运行时改变函数的this值  
> e. 绑定事件函数：触发相应事件，例如 `click`点击触发函数，this指向绑定事件对象  
> f. 定时器函数：`setInterval`每隔一段时间调用函数，this指向window  
> g. 立即执行函数：`(function() {})()`自动调用直接执行，this指向window  