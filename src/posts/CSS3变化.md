---
title: CSS3变化
isTimeLine: true
date: 2025-02-20
category:
  - 前端
tag:
  - CSS
---

### CSS3
CSS3 是 CSS（层叠样式表）的最新版本，相较于 CSS2，它引入了众多强大的新特性。主要集中在布局(Flexbox、Grid)、动画(transform、transition、animation)、响应式设计、视觉效果（阴影、渐变、动画）等方面
### 2D变换transform
1. 2D位移: `transform: translate `位移与相对定位很相似，都不脱离文档流，不会影响到其它元素。浏览器针对位移有优化，与定位相比，浏览器处理位移的效率更高。   
2. 2D缩放:` transform: scale(0.5)`让元素放大或缩小,1表示不缩放,大于1放大小于1 缩小。scale不能作用与行内元素，得设置一下display。   
3. 2D旋转: `transform:rotate(20deg)`让元素在二维平面内，顺时针旋转或逆时针旋转。rotate设置旋转角度，需指定一个角度值( deg )，正值顺时针，负值逆时针。
>- 位移配合定位，可实现元素水平垂直居中`.box { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }  `
>- 借助缩放，可实现小于 12px 的文字。`transform: scale(0.5)`
>- `transform: translate(-50%, -50%) rotate(45deg);  `
### 过渡transition
1.  transition:1s 1s linear all;  
2.  如果设置了一个时间，表示 duration( 设置过渡的持续时间) ；如果设置了两个时间，第一是 duration ，第二个是 delay ；其他值没有顺序要求。  
3.  linear过渡的类型，all ：过渡所有能过渡的属性。  
### 动画animation
1. 一段动画，就是一段时间内连续播放 n 个画面。每一张画面管它叫做“帧”；关键帧指的是，在构成一段动画的若干帧中，起到决定性作用的 2-3 帧。  
2.  第一步：定义关键帧 `@keyframes keyName {from{...} to{...}}`
3.  第二步：给元素应用动画 `.inner {animation: keyName 3s 0.5s linear 2 alternate-reverse forwards; }  `
  a. animation-name ：给元素指定具体的动画（具体的关键帧）;
  b. animation-duration ：设置动画所需时间;
  c. animation-delay ：设置动画延迟;
### transition与animation区别是什么？
1. 可以实现同样的效果，虽然写法不一样
2. 区别①动画不需要触发条件，transition需要元素hover等等动作
3. 区别②动画可以在过程中加关键帧，进行更加精细的控制

```css
/*过渡实现inner1跑到右边去,需要元素hover动作*/
.inner1{
  transition:3s linear;
}
.outer:hover .inner1{
  transform: translate(900px)
}

/*动画实现inner2跑到右边去,可以在过程中多加几个关键帧*/
@keyframes go{
  from{ }
  to{ transform: translate(900px);}
}
inner2{
  animation: go 3s linear;
}
```
### 伸缩盒模型flex
1. Flexible Box （伸缩盒模型，又称：弹性盒子）。可以将元素的display属性值设置为flex从而成为一个flex容器，它里面所有的子元素都成为它的项目。它可以轻松的控制：元素分布方式、元素对齐方式、元素视觉顺序。
2. 伸缩容器：开启了 flex 的元素就是伸缩容器；伸缩项目： 伸缩容器所有子元素自动成为了伸缩项目。
3. 容器上属性
>- flex-direction：指定主轴的方向 `flex-direation: row/row-reserve; `主轴方向从左到右/从右到左 `flex-direation: column/column-reserve; `主轴方向从上到下/从下到上
>- justify-content:指定项目在主轴的对齐方式；`justify-content: flex-start/flex-end/center/space-between(两端对齐)/space-evenly(两端距离与中间的一样)/space-around(两端距离是中间的一半)`
>- align-items：指定项目在侧轴的对齐方式；`align-items: flex-start/flex-end/center/baseline/stretch(元素未设置高度则占满容器高度);`
>- flex-wrap：项目是否换行； `flex-wrap: nowrap；`不换行；`flex-wrap: wrap；`自动换行
>- align-content：侧轴对齐方式多行；`align-content:flex-start/flex-end/center/space-between/space-evenly/space-around/stretch;`
4. 项目上属性
>- order：项目排列顺序,数值越小排列越前
>- flex-grow:当排列空间有剩余时候,项目的放大比例。默认为 0，即如果存在剩余空间，也不放大。
>- flex-shrink:当排列空间不足时候，指定项目的缩小比例。默认为 1，即如果空间不足，该项目将缩小。
>- flex-basis：是主轴方向的基准长度,默认值为 auto，即项目的本来大小,设置子元素宽度
>- align-self ：允许单个项目有与其他项目不一样的对齐方式
5. flex是复合属性，包含了flex-grow flex-shrink flex-basis, 默认值是0 1 auto
>- flex: 1; flex: 1 1 0;可以拉伸 可以压缩并设置基准长度为0
>- flex：auto;flex: 1 1 auto;可以拉伸 可以压缩 不设置基准长度
>- flex：none;flex: 0 0 auto;不可以拉伸 不可以压缩 不设置基准长度
>- flex: 0 auto;flex: 0 1 auto;默认值：不可以拉伸 可以压缩 不设置基准长度
6. flex 实现水平垂直居中方式

```css
/*第一种：父容器开启flex布局；再使用justify-content: center; align-items:center;实现居中 */
.outer{
  width: 400px;
  height: 400px;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner{
  width: 100px;
  height: 100px;
  background: orange;
}
/*第二种：父容器开启flex布局；子元素margin:auto;  */
.outer{
  width: 400px;
  height: 400px;
  background: #ddd;
  display: flex;
}
.inner{
  width: 100px;
  height: 100px;
  background: orange;
  margin: auto;
}
```
### BFC
1. 是什么? BFC（Block Formatting Context）全称是块格式化上下文，是一个独立容器，容器内部的元素与外部的元素互不影响
>- 在 BFC 中上下相邻的两个容器的 margin 会重叠
>- 计算 BFC 的高度时，需要计算浮动元素的高度
>- 容器内部元素不会影响外部元素
>- BFC 区域不会与浮动的容器发生重叠
2. 怎么触发BFC? ①设置浮动` float:none以外的`；②设置绝对定位 `position：absolute、fixed；`③行内块元素或flex `display: inline-block flex`；④overflow值不为visiable的块元素` overflow:hidden scorll auto;`⑤表格单元格`table-cell、table-caption；`
3. 应用场景?
>- 垂直margin重叠问题:由于 BFC 是一个独立的区域,将两个元素变为两个 BFC，就解决了 margin 重叠的问题。
>- 清除浮动，解决父元素高度塌陷问题：在对子元素设置浮动后，父元素会发生高度塌陷，父元素的高度变为 0，解决方式就是把父元素设为BFC `overflow: hidden`
>- 创建自适应两栏布局:可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应;左侧设置float:left，右侧设置overflow: hidden。这样右边就触发了 BFC，BFC 的区域不会与浮动元素发生重叠
### 新增长度单位
1. rem 根元素字体大小的倍数，只与根元素字体大小有关。 
2. vw 视口宽度的百分之多少，10vw 就是视口宽度的 10% 。 
3. vh 视口高度的百分之多少，10vh 就是视口高度的 10% 。 
>CSS2长度单位
>- px ： 像素  
>- em：相对于父元素的 `font-size`（例如，`1em = 父元素的字体大小`）
>- %：相对父元素计算
>- rpx: 微信小程序（WXSS）单位，无需手动计算，直接适配屏幕宽度。
### 新增颜色设置方式
1. 新增了三种颜色设置方式，分别是： rgba 、 hsl 、 hsla
2. HSL 或 HSLA： 通过：色相、饱和度、亮度，来表示一个颜色的，格式为： hsl(色相,饱和度,亮度)
>- 色相：取值范围是 0~360 度 红是0度；绿色120度；蓝色240度
>- 饱和度：取值范围是 0%~100% 。
>- 亮度：取值范围是 0%~100% 。

### 新增选择器 
1. 新增的选择器有：动态伪类、目标伪类、语言伪类、 UI 伪类、结构伪类、否定伪类、伪元素
2. 伪类选择器 : 像类( class )，但不是类，是元素的一种特殊状态。
>- 动态伪类：`:link :visited :hover :active :focus :checked`
>- 结构伪类：`:first-child  :last-child  :nth-child(n)第n个子元素 :first-of-type(n)所有同类型兄弟元素中的第一个` 
3. 伪元素选择器： 像元素，但是不是元素，是元素的一些特殊位置。
> a. ::first-letter 选中元素中的第一个文字。  
> b. ::first-line 选中元素中的第一行文字。  
> c. ::selection 选中被鼠标选中的内容。  
> d. ::before 在元素最开始的位置，创建一个子元素（必须用 content 属性指定内容）。  
> e. ::after 在元素最后的位置，创建一个子元素（必须用 content 属性指定内容）。

### 新增盒模型相关属性
1. 盒模型都是由四个部分组成的，分别是` margin、border、padding 和 content`。盒子的大小 = content + 左右 padding + 左右 border；
2. 类型:
>- 标准盒子模型：width/height 只是内容高度，不包含 padding 和 border值；
>- IE 盒模型：width/height 包含了 padding和 border值
3. 设置:
>- box-sizing：content-box；width 和 height 设置的是盒子内容区的大小。（默认值） 
>- box-sizing：border-box； width 和 height 设置的是盒子总大小。（IE盒模型）  
### 新增背景属性
1.  使用 box-shadow 属性为盒子添加阴影。`box-shadow: 10px 10px 10px red;`
2.  background-origin: 设置背景图的原点。  
3.  background-clip: 设置背景图的向外裁剪的区域。
4.  background-size: 设置背景图的尺寸。`contain`:将背景图片等比缩放，使背景图片的宽或高与容器的宽或高相等;`cover`:将背景图片等比缩放，直到完全覆盖容器。 
### 新增边框属性
border-radius 属性可以将盒子变为圆角。 `border-radius:10px;`
### 新增文本属性
1. text-shadow 属性给文本添加阴影。
2. white-space 属性设置文本换行方式。 `normal` 文本超出边界自动换行，文本中的换行被浏览器识别为一个空格。（默认值） ;` nowrap` 强制不换行
### 新增渐变
1. 线性渐变 `background-image: linear-gradient(red,yellow,green);`
2. 径向渐变 `background-image: radial-gradient(red,yellow,green);`
### web 字体
通过 @font-face 指定字体的具体地址，浏览器会自动下载该字体，这样就不依赖用户电脑上的字体了。 `@font-face { font-family: "情书字体"; src: url('./方正手迹.ttf'); }`
### link与@import引入CSS的区别
1. 两者都是外部引用 CSS 的方式
2. 用法上：<link rel="stylesheet" href="标签路径">  @import url("标签路径")
3. 本质上：link 属于 XHTML 标签，而 @import 完全是 CSS 提供的一种方式。
4. 加载顺序的差别：link 引用的 CSS 会同时被加载；而 @import 引用的 CSS 会等到页面全部被下载完再被加载
5. link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持
### 隐藏元素的方法有哪些
1. display:none  不渲染元素
2. visibility:hidden  渲染元素，但是不可见
3. opacity:0 透明度为0，元素不可见，占据页面空间，可以响应点击事件
4. transform:scale(0,0) 将元素缩放为0
5. position:absolute 将元素移出可视区域
6. z-index:负值，使其他元素遮盖住该元素
> display:none与visibility:hidden的区别：
>- display:none不会再页面占据位置，也不会响应绑定的点击事件，修改此属性会导致整个文档重排
>- visibility:hidden 元素在页面中仍占据空间，但是不会响应绑定的点击事件，修改此属性，只会导致当前元素重绘
### 参考链接

[html+css教程，前端html5+css3零基础入门，web前端开发](https://www.bilibili.com/video/BV1p84y1P7Z5/?spm_id_from=333.1387.search.video_card.click&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)