---
title: Less有啥
isTimeLine: true
date: 2026-02-10
category:
  - 前端
  - Less
tag:
  - Less
---
### 什么是Less
1. 全称（Leaner Style Sheets）是一种css预处理语言，支持变量、函数、混合、嵌套、循环等特点。
2. 是css，在css基础上多了一些东西。引入了变量、混入、嵌套、运算、函数等功能，浏览器不认识需要编译成css让浏览器识别。
3. 如何编译？
>- 第一种与nodejs一起使用，用lessc命令编译lessc styles.less styles.css
>- 第二种使用浏览器，引入less的cdn
>` <link rel="stylesheet/less" type="text/css" href="styles.less" /><script src="https://cdn.jsdelivr.net/npm/less" ></script>`
>- 第三种vscode插件编译：
> ⅰ. vscode中安装less编译插件：Easy Less 插件。
> ⅱ. 安装成功后重启vscode软件，新建.less后缀名文件，保存后会自动生成对应.css文件。
4. 官网地址 [Less.js 中文网](https://lesscss.cn/)
### 变量
1. 格式："@变量名：变量值"; 
2. 选择器、url地址也可以用变量名；
3. 变量可以先使用再声明

```less
@width：100px;
@height：100px;
@mybanner:banner;
.@{mybanner}{
  width： @width;
  height： @height;
}

/*编译后  */
.banner{width100px; height：100px;}
```
### 混入
1. 是什么？将一系列的规则集引入另一个规则集中(ctrl c+ctrl v)。
2. 怎么用？直接调用类名,就能将一个类的属性作用与另一个类中`a{.bordered();}`
3. 带参数、默认值的混合，可以增加样式的灵活性`.border-radius(@radius:1px, @color:blue){..}`
4. 作用？为了提高代码的复用性，减少代码冗余度，就可以将重复的代码抽取到一个独立的地方，在任何选择器中去使用提取出来的代码。

```less
.bordered() {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  /*直接调用类名,就能显示里面的属性*/
  .bordered();
}
/*  带参数、默认值的混合 */
.border-radius(@radius:1px, @color:blue){
  border-radius: @radius;
  color: @color;
}
.box1{.border-radius();}
.box2{.border-radius(10px, black);}
/*编译后  */
.box1{ border-radius: 1px; color: blue;}
.box2{ border-radius: 10px; color: black;}
```
### 嵌套
1. 使用嵌套代替级联，或与级联结合使用。最常用，可以降低代码的冗余度，减少选择器之间的冲突。
2. & 代表当前选择器父级。

```less
#header {
  color: black;
  .logo {
    width: 300px;
  }
  ul{
    overflow: hidden;
    clear: both;
    li{
        float: left;
        &:hover{
            background: green;
        }
        a{
          color: blue;
        }
    }
  }
}
/* 编译后 */
#header {
  color: black;
}
#header .logo {
  width: 300px;
}
#header ul {
  overflow: hidden;
  clear: both;
}
#header ul li{
  float: left;
}
#header ul li:hover{
  background: green;
}
#header ul li a{
  color: blue;
}
```
### 运算函数
1. 计算：算术运算 +、-、*、/ 可以对任何数字、颜色或变量进行运算。
2. 对两个不同单位的值之间的运算，运算结果的值取第一个值的单位。可以添加括号，提升计算的优先级。
3. 函数：内置了很多函数用于转换颜色、处理字符串、算术运算符等,如`width:ceil(99.5);向上取整`

```less
@font-size:12px;
@width:1000px;
@color:#222222;
@height:500px;
/*算术运算 +、-、*、/ 可以对任何数字、颜色或变量进行运算。*/
.box{ 
  font-size: @font-size + 20px;
  background-color: @color * 3;
  width: @width - 120;
  height: (@height / 2);
}
/*内置了很多函数用于转换颜色、算术运算符*/
.box1{
  width: ceil(99.5)
  height: floor(99.5)
}
/*  编译 */
.box { 
  font-size: 32px;
  background-color: #666666; 
  width: 880px; 
  height:250px; 
}
.box1{
  width: 100;
  height: 99;
}
```
### 作用域
作用域：作用域与 CSS 中的作用域非常相似，首先在本地查找变量和混入，如果找不到，则从 "父级" 作用域继承。与 CSS 自定义属性一样，混入和变量定义不必放在引用它们的行之前。

```less
@var: red;
#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```
### 继承
使用关键字 extend。继承（extend）和混入（mixins）相比，继承代码最终会转化成并集选择器。

```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
/*编译  */
nav ul {
  background: blue;
}
.inline, nav ul {
  color: red;
}
```
### 导入
@import '文件名'。导入一个 `.less` 文件，其中的所有变量都将可用。
### 链接
[2024码路Less和Sass | Less | Sass | CSS预处理器](https://www.bilibili.com/video/BV1vC41137TA/?spm_id_from=333.788.videopod.episodes&vd_source=a3aec2a1dd5f478da3517872d0c61c5c&p=6)