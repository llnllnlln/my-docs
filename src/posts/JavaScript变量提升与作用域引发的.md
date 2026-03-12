---
title: JavaScript变量提升与作用域引发的
isTimeLine: true
date: 2025-03-20
category:
  - 前端
tag:
  - JavaScript
---
### new操作符的原理？
1. new作用：一般用于创建一个构造函数的实例对象，该实例可以访问到构造函数中的属性以及原型链中的属性
2. 场景：构造函数是一种特殊函数，主要用来初始化对象，总是跟new一起使用。
3. 本质：实例可以使用函数的属性与方法，生成的实例对象继承函数的原型。this指向创建的实例对象（与call有关）。
4. 实现
>a. 创建一个新对象，新对象的原型指向构造函数的原型对象  
>b. 使用apply调用构造函数,让构造函数的this指向新对象   
>c. 判断函数的返回值类型,返回对象。
4. `Object.create()`将参数(原型对象)作为一个新建的空对象的原型，并返回这个空对象

```js
// 1 new()手写
// 在内存创建一个空对象，this指向这个空对象；执行构造函数，给这个对象添加属性与方法并返回
function myNew(Fn, ...args){
  // let obj = {}
  // obj.__proto__ = Fn.prototype;
  let obj = Object.create(Fn.prototype) //生成的实例对象继承函数的原型 
  let res = Fn.call(obj, ...args) //执行构造函数,this指向创建的实例对象
  return res instanceof Object ? res : obj;
}
// 2 Object.create()手写
// 将参数(原型对象)作为一个新建的空对象的原型，并返回这个空对象
function myCrate(proto){
  // 声明函数 function c(){}
  function C(){}
  // c的原型指向obj
  C.prototype = proto;
  // 返回这个函数的实例化对象
  return new C();
}
```
### 箭头函数与普通函数的区别？
1. 箭头函数比普通函数更加简洁
2. 没有自己的 this,只会在自己作用域的上一层继承 this，所以箭头函数中 this 的指向在它在定义时已经确定了，之后不会改变。
3. call()、apply()、bind()等方法不能改变箭头函数中 this 的指向
4. 没有prototype属性，没有自己的this绑定，没有自己的 arguments 对象, 不能作为构造函数使用，不能 New 一个箭头函数。
5. 不能用作 Generator 函数，不能使用 yeild 关键字
### 对 this 对象的理解
1. this是执行上下文的一个对象，指向最后一次调用这个方法的对象
2. 第一种是函数调用模式，当函数不是一个对象的属性时，直接作为函数直接调用时，this 指向window对象。
3. 第二种是方法调用模式，如果函数作为一个对象的方法来调用时，this 指向这个对象。
4. 第三种是构造调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
5. 第四种是 apply 、 call 和 bind 调用模式，是调用函数的方式，但是它可以改变函数的this指向
6. 优先级：使用构造器调用模式的优先级最高，然后是 apply、call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。
### call与apply、bind的区别？
相同点：都可以改变函数内部的this指向
##### call:调用函数,改变函数的this指向
1. 理解：执行function,使this为thisArg  
2. 语法：`fun.call(thisArg, arg1, arg2, ...);`  
3. 使用场景：要改变this指向的同时想调用这个函数的时候,可以使用call，比如继承。     
4. 实现思路：Symbol设置一个fn变量，Fn作为obj对象的一个方法并调用后删除fn属性, 返回函数调用结果，`fun.call(obj)`实际里面是执行`obj.fn = fun` 

```js
// mycall：将函数作为传入的上下文属性执行后删除 返回值：函数的调用结果
Function.prototype.mycall = function(context, ...args){
  let cxt = context || window;
  let fn = symbol() //为避免函数与context的其他属性有冲突，使用Symbol作为唯一值
  cxt[fn] = this;   //this（本事是Fn）作为cxt对象的一个方法并调用
  const res = args.length ? cxt[fn](...args) : cxt[fn]()
  delete cxt[fn];
  return res;
}
```
##### apply:调用函数，改变函数的this指向
1. 语法：`fun.apply(thisArg, [argsArray])`
2. 使用场景：apply主要跟数组有关系，比如使用 Math.max() 求数组的最大值`let arr = [-10, 2, 12, 3, 1];let max = Math.max.apply(Math, arr);`

```js
// myapply：与call的区别是 args=[]，没有展开
Function.prototype.myapply = function(context, args=[]){
  let cxt = context || window;
  let fn = symbol()
  cxt[fn] = this;
  const res = args.length ? cxt[fn](...args) : cxt[fn]()
  delete cxt[fn];
  return res;
}
```
##### bind 函数:不调用函数，但是能改变函数内部this指向
1. 理解：bind方法不会立即执行，返回的是一个待执行的函数。
2. 语法：bind(fn,obj,...args)给fn绑定this，返回一个新的函数。
3. 参数与返回值：context对象,参数；返回值是一个函数，并且可传参
4. 支持函数柯里化，在bind的时候可以进行传参，并且在执行bind返回的函数的时候依然可以传参
5. 新函数的this无法再次被修改，使用call、apply也不行。
```js
// bind：返回值：是一个函数，并且可传参
Function.prototype.mybind = function(context, ...args){
  let fn = this; //this指向Function函数
  return function newFn(...args1){
    // this是指向newFn生成的实例对象，newFn算是一个构造函数。
    // Object.getPrototypeOf(this) == newFn.prototype
    if(this instanceof newFn){
      return new fn(...args, ...args1)
    }else{
      return fn.call(context, ...args, ...args1)
    }
  }
}
```
##### call与apply、bind的区别 
1. call和apply会调用函数, 并且改变函数内部this指向
2. call 和apply传递的参数不一样，call传递参数`arg1, arg2,..` 形式，apply必须数组形式
3. bind不会调用函数，可以改变函数内部this指向，并返回一个原函数的拷贝
### let、const、var 的区别
1. 块级作用域：let 和 const 具有块级作用域，var 不存在块级作用域。块作用域由 { }包括，其代码块内部定义的变量在代码块外部是访问不到的，并且代码执行完成之后，里面定义的变量会被销毁
2. 变量提升： 在变量只能在声明之后使用，否在会报错。var 存在变量提升，let 和 const 不存在变量提升。
3. 暂时性死区： 在使用 let、const 命令声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区。使用 var 声明的变量不存在暂时性死区。
4. 重复声明： var 声明变量时可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const 和 let 不允许重复声明变量。
5. 初始值设置：在变量声明时，var 和 let 可以不用设置初始值。而 const 声明变量必须设置初始值
6. 指针指向：let 创建的变量是可以更改指针指向（可以重新赋值）。但 const 声明的变量是不允许改变指针的指向。
> var：  
> let: 使用let声明的变量具有块级作用域；不存在变量提升；具有暂时性死区特性;禁止重复声明；   
> const：声明常量，具有块级作用域；不存在变量提升；声明时必须赋值。如果值是对象，可以修改对象里的属性值，但是不可以重写整个对象。
### 什么是变量提升？
1. 是什么？在代码执行时候，JS引擎把变量和函数的声明，提升带代码开头的行为，变量默认值为undefined
2. 原因：变量提升跟JavaScript 代码的执行流程有关：一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。在编译阶段，生成执行上下文和可执行代码。执行上下文是 JavaScript 执行一段代码时的运行环境，在其中存在一个变量环境的对象，该对象中保存了变量提升的内容。
3. 导致问题？① 变量容易在不被察觉的情况下被覆盖掉；② 本应销毁的变量没有被销毁
4. 如何解决变量提升带来的缺陷？ES6 引入了 let 和 const 关键字，有了块级作用域。
5. JavaScript 是如何支持块级作用域的?
> a. 块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现。   
> b. 通过 var 声明的变量，在编译阶段全都被存放到变量环境里面了，而let 声明的变量编译阶段会被存放到词法环境中。  
> c. 在词法环境内部，维护了一个小型栈结构，栈底是函数最外层的变量，进入一个作用域块后，就会把该作用域块内部的变量压到栈顶；当作用域执行完成之后，该作用域的信息就会从栈顶弹出。   
### 执行上下文与执行上下文栈
1. 执行上下文: 由js引擎自动创建的对象, 用于管理变量、作用域等。
2. 类型：全局执行上下文、函数执行上下文；Eval 执行上下文。
>- 全局执行上下文：JavaScript 代码首次运行时创建。在浏览器中，window 就是全局对象；只有一个全局执行上下文，在整个程序运行期间存在，当页面刷新/关闭页面时死亡。
>- 函数执行上下文：每当调用一个函数时创建，函数执行完时死亡。
>- Eval 执行上下文：仅在 eval() 函数内部运行时创建。
3. 执行上下文栈: 用来管理产生的多个执行上下文，又称调用栈。
4. 执行上下文栈特点：是一个后进先出的栈结构，JavaScript 引擎通过它管理执行顺序程序。
> 在全局代码执行前, JS引擎就会创建一个栈来存储管理所有的执行上下文对象
> 开始时：全局执行上下文(window)入栈；  
> 函数调用时：新的函数执行上下文入栈；  
> 函数执行完毕：该执行上下文从栈顶弹出，当所有的代码执行完后, 栈中只剩下window；

### 作用域与作用域链
1. 是什么？作用域是一块代码区域, 在编码时就确定了,不会再变化。可以控制函数、变量的可见性以及生命周期。
2. 作用域类型？全局作用域；函数作用域；块级作用域
> a. 全局作用域：不在函数中或是大括号中声明的变量，变量可以在任意位置访问  
> b. 函数作用域：声明在函数内部的变量，函数外不能访问；  
> c. 块级作用域：可通过let const新增，其代码块内部定义的变量。在代码块外部是访问不到的，并且等该代码块中的代码执行完成之后，代码块中定义的变量会被销毁；let const不能重复声明，不会有变量提升的问题；
3. 作用：作用域: 隔离变量, 可以在不同作用域定义同名的变量不冲突；作用域链: 查找变量
4. 作用域链？在当前作用域查找变量，如果没有往它的父级上找，一直找到全局作用域为止，这种一层一层的关系就叫作用域链；

```js
// 变量在创建时候就确定它的作用域，而非运行时候确定；作用域链是已经注定好了，比如即使在 foo 函数中调用了 bar 函数，你也无法在 bar 函数中直接使用 foo 函数中的变量信息。
var a = 2;
function foo(){
    console.log(a)
}
function bar(){
    var a = 3;
    foo();
}
bar() //2 因为在定义的时候作用域就确定了，相同层级的函数都指向全局作用域
```
### 区别作用域与执行上下文
1. 作用域: 静态的, 编码时就确定了(不是在运行时), 一旦确定就不会变化了；
2. 执行上下文: 动态的, 执行代码时动态创建, 当执行结束消失；③联系: 执行上下文环境是在对应的作用域中的
3. 区别1：作用域是静态的, 只要函数定义好了就一直存在, 且不会再变化；执行上下文是动态的, 调用函数时创建, 函数调用结束时就会自动释放
4. 区别2：全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了。而不是在函数调用时。全局执行上下文环境是在全局作用域确定之后, js代码马上执行之前创建；函数执行上下文是在调用函数时, 函数体代码执行之前创建。
### 闭包
1. 是什么：当一个嵌套的内部函数引用了它外部函数的变量时, 就产生了闭包。闭包会导致原本的作用域链不释放。
2. 产生闭包的条件? ① 函数嵌套；② 内部函数引用外部函数的数据
3. 常见的闭包？① 将函数作为另一个函数的返回值；② 将函数作为实参传递给另一个函数调用
4. 闭包的作用？① 延长局部变量的生命周期；② 让函数外部可以操作函数内部的变量
5. 闭包的生命周期？  
  a. 在嵌套内部函数定义执行完时就产生了(不是在调用)  
  b. 在嵌套的内部函数成为垃圾对象时f = null 
6. 闭包缺点：函数执行完后里面的局部变量没有释放, 占用内存时间会变长，滥用闭包会有性能问题。
7. 闭包的应用场景？防抖节流；柯里化函数；模块化；缓存等

```js
function fn1() {
  //此时闭包就已经产生了(函数提升, 内部函数对象已经创建了)
  var a = 2
  return function fn2 () {
    a++;
    console.log(a)
  }
}
var f = fn1()
f() // 3
f() // 4
//闭包死亡(包含闭包的函数对象成为垃圾对象)
f = null 
```

```js
//  应用一：模块化
// 早期 JS 没有 import/export，闭包用来模拟私有变量和方法；
// 优点：防止全局污染；数据封装，实现私有变量。函数外部可以操作函数内部的变量
function counterFn(){
  let count = 0;
  return {
    add: function(){
      count++;
    },
    getCount: function(){
      return count;
    },
  }
}
let counter = counterFn();
counter.add()
counter.add()
console.log(counter.getCount()); //2
// 应用二：函数柯理化 
// 将多参数函数转为单参数链式调用。优势是参数复用和延迟调用
function add(x) {
  return function(y) { // 闭包保存 x
    return x + y;
  };
}
const add5 = add(5);
console.log(add5(3)); // 8
```
### 函数柯里化？
1. 是什么：将多参数函数转为单参数链式调用。优势是参数复用和延迟调用，是一种预先存续的思想，是闭包的进阶
2. 应用：让函数执行产生闭包，把后续用到的值存在闭包的某个私有变量中，然后其下级上下文想用的时候直接拿去用

```js
// 手写题1 实现 let res=fn(1, 2)(3);
let res=fn(1, 2)(3);
console.log(res);//=>6 1+2+3
// fn函数的实现
function fn(...params){
    let arr = [...params];
    return function fn1(...args){
        arr = arr.concat(args); 
        return arr.reduce((res, item)=> res + item);// arr的求和    
    }
}
```
### 内存溢出与内存泄漏
1. 内存溢出：一种程序运行出现的错误；当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误
2. 内存泄露：占用的内存没有及时释放；内存泄露积累多了就容易导致内存溢出
3. 常见的内存泄露：意外的全局变量；没有及时清理的计时器或回调函数；闭包
### 链接
[尚硅谷JavaScript高级教程(javascript实战进阶)](https://www.bilibili.com/video/BV14s411E7qf?spm_id_from=333.788.videopod.episodes&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)