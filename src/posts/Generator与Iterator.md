---
title: 虽然一般不用但是懂了就懂了：Generator与Iterator
isTimeLine: true
date: 2026-01-15
category:
  - 前端
tag:
  - JavaScript 
  - 源码
---

## Iterator
### 是什么
1. 遍历器（Iterator），它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要具备Symbol.iterator属性，就可以被遍历。比如for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。
2. 作用：1）是为各种数据结构，提供一个统一的、简便的访问接口；2）使得数据结构的成员能够按某种次序排列；3）Iterator接口主要供for...of消费。
### 调用Iterator接口的场合
>- 解构赋值，对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。`let [first, ...rest] = set`
>- 还有扩展运算符`[...arr]`、`for...of`、`Array.from()`、`Map()`、`Set()`等

```js
// 当使用扩展运算符（...）或者对数组和 Set 结构进行解构赋值时,
// 或者使用for of去遍历某一个数据结构的时候会默认调用Symbol.iterator方法。
// 原生具备iterator接口的数据(可用for of遍历),比如数组 字符串  Set，对象不行
let arr = [1, 2, 3, 4];
let str = "kaixin";
let set = new Set(["q","w","e","r","t","y"])
for(let i of str){
    console.log(i); // k a i x i n
}
console.log(...arr) // 1 2 3 4
console.log(...str) // k a i x i n
console.log(...set) //q w e r t y
```
### 工作原理
1. 创建一个指针对象，指向数据结构的起始位置。  
2. 第一次调用next方法，指针自动指向数据结构的第一个成员  
3. 接下来不断调用next方法，指针会一直往后移动，直到指向最后一个成员   
4. 每调用next方法返回的是一个包含value(当前成员的值)和done(尔)的对象，value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。  
5. 当遍历结束的时候返回的value值是undefined，done值为true  

```js
//模拟`next`方法返回值的例子
//一个遍历器生成函数，作用就是返回一个遍历器对象
    function makeIterator(arr){
        var index = 0;
        return {
            next: function() {
               if(index<arr.length){
                   return {value:arr[index++],done:false}
               }else{
                   return {value: undefined,done:true}
               }
            }
        }
    }
    var it = makeIterator(['a', 'b']);
    //指针对象的next方法，用来移动指针。
    //开始时，指针指向数组的开始位置。
    //然后，每次调用next方法，指针就会指向数组的下一个成员。
    //第一次调用，指向a；第二次调用，指向b。
    console.log(it.next())//Iterator.html:21 {value: "a", done: false}
    console.log(it.next())//{value: "b", done: false}
    console.log(it.next())//{value: undefined, done: true}
```
6. 让对象支持for…of的办法就是手动给对象添加迭代器

```js
// 1 当使用for of去遍历某一个数据结构的时候，首先去找Symbol.iterator，
   //找到了就去遍历，没有找到的话不能遍历。对象使用for of会报错，因为本身没有迭代器。
let obj = { a: 2, b: 3 }
for(let i of obj){
    console.log(i); // Iterator.html:38 Uncaught TypeError: obj is not iterable
}
// 2 让对象支持for…of的办法就是手动给对象添加迭代器
  // a. 实现：返回一个对象有next方法，调用其next函数返回{done, value}
  // b. 思路：index指针记录位置，在返回的函数next里面比较指针与集合的长度，得出done状态，
        //大于则done为true，value为undefined        
obj[Symbol.iterator] = function(){
    const keys = Object.keys(this)
    let index = 0
    return {
        next(){
            let done = index <= len ? false : true;
            let value = !done ? arr[index++] : undefined;
            return { done, value }
        }
    }
}
// 对象可以使用for of了。
for(let i of obj){
    console.log(i); // 2,3
}
```
## Generator
### 1. 是什么？
1. Generator 函数一种异步编程解决方案。它有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态。yield可暂停，next方法可启动。每次返回的是yield后的表达式结果
2. Generator 函数特点
> a. 调用`Generator`函数后该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的遍历器对象。  
> b. 每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`语句（或return语句）为止。  
> c. Generator函数是分段执行的，`yield`语句是暂停执行的标记，而`next`方法可以恢复执行。  
3. Generator执行分析:`yield`相当于看视频的时候有事暂停按钮，调用`next()`就相当于回来后点击一下继续观看。
> a. 遇到`yield`语句，就暂停执行后面的操作。  
> b. 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`语句。  
> c. 如果没有再遇到新的`yield`语句，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。  
> d. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

```js
// yield相当于看视频的时候有事暂停按钮，调用next()就相当于回来后点击一下继续观看。
function* testGenerator(){
    console.log("开始执行")
    yield 'hello';
    console.log("中间")
    yield 'generator';
    yield '！！';
}
let gen = testGenerator();
console.log(gen.next()); 
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
// 开始执行
// {value: 'hello', done: false}
// 中间
// {value: "hello", done: false}
// {value: "generator", done: false}
// {value: "！！", done: false}
// {value: undefined, done: true}
```
### 与 Iterator 接口的关系
由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

```js
// 对象没有iterator接口，用for...of遍历时便会报错。
let obj = { username: 'kobe', age: 39 }
for (let i of obj) {
    console.log(i) //  Uncaught TypeError: obj is not iterable
}
//由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
let obj = { username: '王', age: 12, sex: '男'}
obj[Symbol.iterator] = function* myTest() {
    yield '王';
    yield 12;
    yield 男;
};
for (let i of obj) {
    console.log(i) // 王 // 12  //男
}
```
## 链接
[ES6 Iterator（迭代器或遍历器）和 Generator （生成器）](https://www.cnblogs.com/zjx304/p/10253304.html)  
[ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/generator#yield--%E8%A1%A8%E8%BE%BE%E5%BC%8F)
