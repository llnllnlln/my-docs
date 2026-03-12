---
title: JavaScript的原型与继承
isTimeLine: true
date: 2025-03-28
category:
  - 前端
tag:
  - JavaScript
---

### 原型与原型链？
1. 函数的prototype属性: 在定义函数时自动添加的, 默认值是一个空Object对象
2. 对象的__proto__属性: 创建对象时自动添加的, 默认值为构造函数的prototype属性值
3. 构造函数、实例、原型对象三者之间的关系
>- 每个构造函数会创建一个`prototype`属性指向原型对象，这个对象包含了该构造函数的所有实例共享的属性和方法； 
>- 原型对象会有一个`constructor`属性指回构造函数；  
>- 当我们使用构造函数去创建实例时，实例的`__proto__`属性就会指向构造函数的原型对象。
4. 原型链：当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 `Object.prototype`，直到`Object.prototype的.__proto__==null;`
```js
function Person(){}
let p = new Person()
//用构造函数去创建实例时，实例的`__proto__`属性就会指向构造函数的原型对象Person.prototype === p.__proto__;
p.__proto__; // Person.prototype
Person.prototype.constructor; // Person
p.__proto__.__proto__; //Object.prototype
Person.prototype.__proto__; // Object.prototype
//一切的函数对象(Object, Function, Array)，都是继承自Function对象;Object对象直接继承自Function对象
Object instanceof Function //true Object继承自Function对象，所以他的构造函数是Function
Function instanceof Object //true Function.prototype是一个对象，所以他的构造函数是Object
```
### 对象继承几种方式？
1. 借用构造函数：`Father.call()`借用父类构造器复制父类的实例属性给子类；只能继承父类实例的属性和方法，原型上的继承不了。
2. 原型链继承:`Son.prototype = new Parent(); ` 借用父的实例作为子类的原型，通过构造函数构造产生的对象，可以继承原型的属性和方法；
3. 组合继承：原型链实现对原型属性方法的基础，构造函数实现父类实例的继承。缺点是调用了两次父类构造函数，生成了两份实例；以及有constructor指向问题。
4. 寄生式组合继承:
> a. 子类如何继承父类的属性？call调用父类函数, 并且修改函数运行时的this指向，将this指向子类的(子类函数里面写`Father.call(this, arg1, arg2)`)；  
> b. 子类如何继承父类的方法？改变子类的原型对象为父类原型对象（不能直接赋值，`Son.prototype = new Father()`，子类的constructor再指向子类）；  
> c. 进一步优化就是new Father()改为Object.create(Father.prototype),减少父类的一次调用。（Object.create()将参数(原型对象)作为一个新建的空对象的原型，并返回这个空对象）
```js
// 1 父类
function Parent(name, age){
  this.name = name
  this.age = age
}
Parent.prototype.say = function(){
  console.log(this.name, this.age);
}
// 2 子类
function Son(name, age, grade){
  this.grade = grade；
  // 3 继承父类的属性name, age
  Parent.call(this, name, age) 
}
// 4 继承父类的原型方法say
Son.prototype = Object.create(Parent.prototype);
// 5 子类的constructor再指向子类构造函数
Son.prototype.constructor = Son;
// ---验证：子类Son新建实例对象可以使用父类的方法 属性---
let s = new Son('tom', 12, '111')
s.say(); //tom 12
```
### 类与继承
1. ES6 中新增加了类的概念，使用class关键字声明—个类，之后以这个类来实例化对象。`class ClassName {}`
2. constructor构造函数：类里面有个`constructor`函数,可以接受传递过来的参数,同时返回实例对象；constructor()只要new生成实例时,就会自动调用这个函数。
3. 类中添加方法:直接在类中写方法名和括号即可; 
4. static 静态成员,给成员属性或成员方法添加`static`，该成员就成为静态成员，静态成员只能由该类调用。
5. 类里面的this指向问题：`constructor 里面的this指向实例对象, 方法里面的this指向这个方法的调用者`
6. 类的继承:使用`extends关键字,super关键`字用于访问和调用对象父类上的函数。
7. 类的本质是语法糖。
> a. ES6前通过`构造函数 + 原型`实现面向对象编程。构造函数有原型对象`prototype`，原型对象里面有 `constructor`指向构造函数本身；构造函数创建的实例对象有`__proto__`原型指向构造函数的原型对象     
> b. ES6后通过`class`实现面向对象编程。类有原型对象`prototype`，里面也有`constructor`指向类的本身；类的所有方法都定义在`类的prototype`上，它创建的实例，里面也有` __proto__`指向类的原型对象  
> c. ES6 的类其实就是一种语法糖。
### 扩展运算符 解构 rest参数
1. 扩展运算符: 用于取出参数对象中所有的可遍历属性，拷贝到当前的对象中,与Obiect.assign()作用类似，属于浅拷贝。`let c={..b};//拷贝 let n=[1,2,3]; console.log(...n)//1,2,3`
2. 解构: 可以从数组或者对象有针对的拿到想要的数据。`let {aa,bb}=f`
3. rest参数: 剩余参数，把多个不定的参数放起来，就是收集多个元素，压缩成一个。剩余参数经常与解构配合使用
### proxy可以实现什么功能？
1. 可以用来自定义对象中的操作。`let p = new Proxy(target, handler);`target 代表需要添加代理的对象，`handler`用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。
2. 通过自定义 set 和 get 函数的方式，在原本的逻辑中插入了其他逻辑，实现了在对对象任何属性进行读写时发出通知。Proxy 可以完美监听到任何方式的数据改变，缺陷就是浏览器的兼容性不好。

```js
// proxy:拦截对象属性的任意变化，包括修改添加删除；
// reflect:通过对源对象进行操作，作用是底层使用reflect会比较健壮，不容易出现有个错误就导致程序阻塞
import { reactive } from 'vue';
const user = reactive({ name: "Tom", age: 25 });
// Proxy 代理原始对象
const proxy = new Proxy(user, {
  get(target, key, receiver) {  // 读取时触发
    console.log("读取属性:", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {  // 修改时触发
    console.log("修改属性:", key, value);
    const success = Reflect.set(target, key, value, receiver);
    if (success) {   // 修改成功，通知依赖
      trigger();
    }
    return success;
  }
});
```
### ES6模块与CommonJS模块有什么异同？
1. 模块化是什么？将程序⽂件依据⼀定规则拆分成多个⽂件，拆分出来每个⽂件就是⼀个模块。模块中的数据都是私有的，模块之间互相隔离。同时也能通过⼀些⼿段，可以把模块内的指定数据“交出去”，供其他模块使⽤。
2. 有哪些模块化规范？`CommonJS(服务端应用广泛)；AMD ；CMD；ES6模块化(浏览器应用广泛)`
3. 区别1：导入导出语法对比：CommonJS导出是 `module.exports`，导入是`require`；ES6 Module使用` export  `导出,`import` 引入具体数据。
4. 区别2：加载时机：CommonJS是运行时动态加载，执行到`require()`时才加载模块；而ES6 Module是编译时静态分析，代码执行前完成所有`import`的解析。
5. 区别3：CommonJS输出的是值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值；ES6 Module输出的是值的只读引用，不能修改其变量的指针指向。但是原始值变了，import加载的值也会跟着变。因此，ES6模块是动态引用。
6. 区别4：浏览器支持：CommonJS需要打包工具转换，ES6 Module现代浏览器直接支持，设置`<script type="module">`即可。
### 链接
[尚硅谷JavaScript高级教程(javascript实战进阶)](https://www.bilibili.com/video/BV14s411E7qf?spm_id_from=333.788.videopod.episodes&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)