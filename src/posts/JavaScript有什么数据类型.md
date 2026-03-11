---
title: JavaScript有什么数据类型
isTimeLine: true
date: 2026-02-11
category:
  - 前端
tag:
  - JavaScript
---

### 有哪些数据类型？
1. 基本类型：`Number` `String` `Boolean` `Null` `Undefined` `Symbol` `BigInt`
2. 引用类型：`Object` `Function` `Array` `Map` `Set`
3. 区别：是数据存储不同 
>a. 基本类型的值存储在栈中，在栈中存储的是值，它赋值后值相同，但是两个值对应的地址不同，所以`a = 1;b=a;a=2;b还是等于1；`   
>b. 引用类型的值存储在堆中，在栈存放的是指向堆内存的指针地址；它赋值时候是将对象的内存地址赋值給另一个对象，也就是说两个对象指向的是同一个堆内存，所以`a={name:11};b=a;b.name=22; a也会改变；`
### null与undefined区别是什么？
1. ①undefined代表定义未赋值；②nulll定义并赋值了, 只是值为null
2. typeof null是object
3. 什么时候给变量赋值为null呢?①初始赋值, 表明将要赋值为对象；②结束前, 让对象成为垃圾对象(被垃圾回收器回收)
4. null==undefined; null!==undefined
### Symbol创建唯一值
1. 是什么？给对象设置“唯一值"的属性名，对象的属性名可以是数字、字符串、Symbol类型；
2. 用法？

```js
let a1= symbol('AA'); 
let a2= symbol('AA'); 
let a3 = a1; 
a1 === a2; //false 
a1 === a3 //true
```
3. 作用？ `Symbol.asyncIterator/iterator/hasInstance/toPrimitive/tostringTag `是某些js底层原理的实现机制。基于symbol类型的值，保证行为标识的唯一性
### BigInt大数类型
1. 超过安全数后，进行运算或者访问，结果会不准确
```js
 a. Number.MAX_SAFE_INTEGER: 9007199254740991 //jS中的最大安全数
 b. Number.MIN_SAFE_INTEGER: -9007199254740991 //jS中的最小安全数
```
2. 解决方案
  a. 服务器返回给客户端的大数，按照"字符串"格式返回；然后客户端把其变为 BigInt，然后按照BigInt进行运算,最后把运算后的BigInt转换为字符串，在传递给服务器即可
### 数据类型的检测方式有哪些？
1. `typeof`：其中数组、对象、null 都会被判断为 object

```js
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof undefined); // undefined
console.log(typeof function () {}); // function
console.log(typeof null); // object
console.log(typeof {}); // object
console.log(typeof []); // object
```
>- 数据类型的值在计算机底层是按照64位的二进制值进行存储的，typeof也是按照二进制进行类型检测。
>- 前三位是0认为是对象，然后再去看有没有实现call方法。如果实现了则返回'function'，没有实现，则返回'object'。null是64个零,所以typeof null->'object'
2. `instanceof`：可以判断对象的类型，不能判断基本类型的；原理是构造函数的prototype属性是否出现在对象原型链的任何位置。

```js
console.log(2 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log("str" instanceof String); // false

console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true
```
>- 先检测构造函数是否拥有 Symbol.hasInstance 方法
>- 如果有这个方法:构造函数`[Symbol.hasInstance](实例)`返回的值就是结果；
>- 如果没有这个方法，则按照原型链进行查找:按照实例的_proto-一直向上找，直到找到0bject.prototype为止，只要在原型链上出现了“构造函数.prototype”，说明当前实例率属于它，结果返回true;如果没找到，结果就是false;
3. `constructor`:判断两种数据的类型，对象实例通过constructor来访问它的构造函数，缺点是如果对象改变过它的原型，那么constructor判断会有问题

```js
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```
4. `Object.prototype.toString.call([value])`：使用Object对象的原型方法toString来判断数据类型,属于检测最准确、最全面的方式了，能够区分null、能够检测原始值类型、能够细分对象、即便重构原型对象检测也是准确的

```js
console.log(Object.prototype.toString.call(2));        //'[object Number]'
console.log(Object.prototype.toString.call(true));     //'[object Boolean]'
console.log(Object.prototype.toString.call("str"));    //'[object String]'
console.log(Object.prototype.toString.call([]));       //'[object Array]'
console.log(Object.prototype.toString.call(function () {}));//'[object Function]'
console.log(Object.prototype.toString.call({}));       //'[object Object]'
console.log(Object.prototype.toString.call(undefined));//'[object Undefined]'
console.log(Object.prototype.toString.call(null));     //'[object Null]'
```
>- 返回结果“[object ?] ?：一般是自己所属的构造函数
>- 首先会看[value]值是否有 Symbol.tostringTag 属性，有这个属性，属性值是啥，检测出来是啥就是啥; `Math[Symbol.tostringTag]:'Math'` `map.prototype[Symbol.tostringTag]:'Map'` `Promise.prototype[Symbol.tostringTag]:'Promise'` `Set.prototype[Symbol.tostringTag]:'set'` 
>- 如果没有这个属性，才一般是按照自己所属的构造函数返回
### 数组的判断有几种？
1. Object.prototype.toString.call(): `Object.prototype.toString.call([]).slice(8,-1) === "Array"`
2. Array.isArray(): `Array.isArray([])`
3. instanceof: `[] instanceof Array`
4. Array.prototype.isPrototypeOf：`Array.prototype.isPrototypeOf([])`
5. `__proto__`: `[].__proto__ === Array.prototype`
### typeof NaN是多少？
1. typeof NaN是number
2. NaN:指不是一个数字，意思是执行数字运行失败，是失败后返回的结果
3. NaN === NaN 为false
### instanceof操作符的实现原理？
1. 作用：检测某个对象是否属于某个类型 `[] instanceof Array`
2. 原理是判断构造函数的prototype属性是否出现在对象原型链的任何位置；所以重点就是找到递归对象的原型链以及构造函数的prototype 
3. 步骤
>a. 获取对象的原型 `proto = Object.getPrototypeOf(obj)`  
>b. 获取构造函数的原型对象 `prototype = ctor.prototype;`  
>c. 判断构造函数的原型对象是否在对象的原型链上 `proto === prototype`  
>d. 如果没有找到就继续在其原型上找 `proto = Object.getPrototypeOf(proto);`  

```js
function myInstanceof(obj, ctor) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);
  // 获取构造函数的 prototype 对象
  let prototype = ctor.prototype;
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}
```
### 类型转换机制?
1. 常见的类型转换有：强制转换（显式转换）、自动转换（隐式转换）
2. 显式转换转化规则常见的方法有：`Number() parseInt() parseFloat() String() Boolean()`
3. 隐式转换转化规则？比较运算`（==、!=、>、<）if、while`；算术运算`（+、-、*、/、%）`
4. 其他类型转数字: ①`Number([val])`：比较严格，只要有一个字符无法转成数值，整个字符串就会被转为NaN；  ②`parseInt([val], [radix])`：没那么严格，遇到不能转换的字符就停下来。
>1. 空字符串为0，有出现非数字结果为NaN 
>2. 布尔值转数字，true:1,false:0
>3. Symbol会报错； 
>4. null:0;  undefined:NaN；
>5. BigInt去除“n”
>6. 对象转数字：①先调用对象原型上的一个函数`Symbol.toPrimitive()`②如果不存在则调用对象的`valueOf`获取原始值；③如果获取的不是原始值，再调用对象的`toString`转为字符串；④再把字符串基于`Number`方法转换为数字；
```js
Number([10]) //10
// 1 首先检测Symbol.toPrimitive是否存在，如果存在就调用 ƒ [Symbol.toPrimitive]() { [native code] }
// 2 如果是undefined，那么arr.valueOf()获取原始值 
// 3 结果为[10]，不是原始值，那么就是arr.toString()转为字符串‘10’;
// 4 最后再把字符串转为数字 Number('10')->10
// Number([10, 20])结果为NaN,分析如下：
//  [10,20].valueOf():[10, 20]-> [10,20].toString():'10,20' -> Number('10,20')->NaN
```
5. 其他类型转字符串:①拿字符串包起来`String({}) //'[object Object]'`; ②“+”出现在两边，其中一边是字符串或者某些对象，会以字符串拼接规则处理
```js
console.log(10+'10') //'1010'
console.log(10+new Number(10)) //20
//①new Number(10)[Symbol.toPrimitive]:undefined；-> ②new Number(10).value0f():10 -> 10+10 = 20
console.log(10+[10]) //'1010' 
//①[10][Symbol.toPrimitive]:undefined；-> ②[10].valueOf().toString():'10'，为字符串，所以是拼接 
```
6. 其他类型转布尔值: `Boolean([val])或者!/!!` 除了`null undefined '' NaN`，其他结果都是true。

### ToPrimitive: 用来将值转换为基本类型值
1. 如果值为对象，ToPrimitive(obj, type);对象默认type为number。
2. 当type为number时规则：`var objToNumber = (value) => Number(value.valueOf().toString());`
3. 当type为string时规则：`var objToNumber = (value) => Number(value.toString().valueOf());`
4. 对于 Date 以外的对象，转换为基本类型的大概规则可以概括为一个函数：`var objToNumber = (value) => Number(value.valueOf().toString());`

```js
var a = { name: "Tom" };
var b = { age: 18 };
a + b; // "[object Object][object Object]"
a.valueOf().toString(); // "[object Object]"
b.valueOf().toString(); // "[object Object]"
a + b; // "[object Object][object Object]"
```
### ==操作符的强制类型转换规则？
1.  首先会判断两者的类型是否一样，一样则比较大小；不一样则进行类型装换；
2.  两个都为简单类型则有一方为字符串和布尔值都会转换成数值再进行判断；null==undefined是true;
3.  两个都为引用类型则比较他们是否指向同一对象，比较的是堆内存地址，地址相同则相等
4.  一个为引用类型，一个为复杂类型则将复杂类型用ToPrimitive转为原始类型再进行判断
5.  除了以上情况，只要两边类型不一致，剩下的都是转换为数字，然后再进行比较的。

```js
// 一个为引用类型，一个为复杂类型
//对象==字符串 需要将对象转字符串再比较「symbol.toPrimitive->value.toString().valueOf()]
//对象==数字 需要将对象转数字再比较「symbol.toPrimitive->value.valueOf().toString()]
[] == false //true
//只要两边类型不一致，剩下的都是转换为数字 Number([])为0，所以0 == 0为true
```

### 为什么 0.1+0.2 ! == 0.3，如何让其相等？
1.  为什么小数（浮点数）的计算会出现精准度丢失问题？`0.1+0.2 // 0.30000000000000004` `0.1+0.7 //0.7999999999999999`
>- 计算机存储值是以二进制在计算机底层来存的，所以需要先把十进制转为二进制的科学计数法`n.toString(2)`
>- 整数：(10).toString(2) //'1010'->10一直去除以2，余数组合就是结果；
>- 浮点数：(0.1).toString(2) //'0.0001100110011001100110011001100110011001100110011001101' 
>- 某些十进制的浮点数在转二进制可能会无限循环下去，在底层存储最多存64位，舍弃了一些值后值本身就失去了精准值，再转成十进制就有了误差；
2.  怎么解决精准度问题？使用 toPrecision 凑整；扩大系数法，把小数转成整数后再运算；使用第三方库，如Math.js、BigDecimal.js

```js
//扩大系数法,把小数转成整数后再运算
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
```