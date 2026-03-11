---
title: CSS2有什么
isTimeLine: true
date: 2026-03-10
category:
  - 前端
  - CSS
tag:
  - CSS
---
> 文章同步在公众号：萌萌哒草头将军，欢迎关注
>
> 我的博客地址：https://mmdctjj.github.io/blogs2/
>
> 对应仓库地址：https://github.com/mmdctjj/blogs2
### CSS简介
层叠样式表 ( Cascading Style Sheets ) 。CSS 也是一种标记语言，用于给 HTML 结构设置样式，例如：文字大小、颜色、元素宽高等等。
### CSS选择器
1. CSS基本选择器
> 1.  通配选择器：选中所有标签，一般用于清除样式。     `* {color:red} ` 
> 2.  元素选择器：选中所有同种标签，但是不能差异化选择。`h1 {color:red} ` 
> 3.  类选择器： 选中所有特定类名（ class 值）的元素 。`.say {color:red}  `
> 4.  ID选择器： 选中特定 id 值的那个元素（唯一的）    `#earthy {color:red} ` 
2. CSS复杂选择器 
> 1. 交集选择器：选中同时符合多个条件的元素。语法：选择器1选择器2...选择器n {} ` p.beauty { color: blue;}`
> 2.  并集选择器：语法：选择器1, 选择器2,  ... 选择器n {}  `.rich, .beauty { font-size: 40px;}`
> 3.  后代选择器：语法：选择器1 选择器2 ... 选择器n {}  `ul li a { color: orange; } `
> 4.  子元素选择器：选中指定元素中，符合要求的子元素（儿子元素） 语法：  选择器1 > 选择器2 > 选择器3 > 选择器n {}  `.persons>a{ color: red; }`
> 5.  兄弟选择器
>   ①相邻兄弟选择器， 是紧挨着他的下一个；语法： 选择器1+选择器2{} `div+p { color:red; }`
>   ②通用兄弟选择器， 选中指定元素后，符合条件的所有兄弟元素；语法：选择器1~ 选择器2{} `div~p { color:red;}`
> 6.  属性选择器 ： 选中属性值符合一定要求的元素，如选中title属性值以a开头的元素 `div[title^="a"]{color:red;}`
3. 选择器的优先级：行内样式 > ID选择器 > 类选择器 > 元素选择器 > 通配选择器。
### CSS三大特性
1. 层叠性: 如果发生了样式冲突，那就会根据一定的规则（选择器优先级），进行样式的层叠  
2. 继承性: 元素会自动拥有其父元素、或其祖先元素上所设置的某些样式，优先继承离得近的。  
>   a. 会继承的 css 属性： 字体属性、文本属性（除了vertical-align）、文字颜色 等。  
>   b. 不会继承的 css 属性：  边框、背景、内边距、外边距、宽高、溢出方式 等。  
>   c.  一个规律：能继承的属性，都是不影响布局的，简单说：都是和盒子模型没关系的  
3. 优先级: !important > 行内样式 > ID选择器 > 类选择器 > 元素选择器 > * > 继承的样式。  
### CSS常用属性
1. 颜色:支持颜色名称（`red`）、RGB（`rgb(255,0,0)`）、十六进制（`#RRGGBB`）
> 1. `颜色名`：直接使用颜色对应的英文单词，编写比较简单  
> 2. `rgb 或 rgba`：使用 红、黄、蓝 这三种光的三原色进行组合。 r表示红色；g表示绿色；b表示蓝色；a表示透明度；使用 0~255 之间的数字表示一种颜色
> 3. `HEX 或 HEXA`：通过：红、绿、蓝色 进行组合，只不过要用 6位（分成3组）来表达，格式为：#rrggbb。每一种光的最小值是：00 ，最大值是：ff。所以：`红色:color: #ff0000;` `绿色:color: #00ff00;` `color: 蓝色:#0000ff;`
2. 字体属性：`font-size font-family font-style font-weight`
3. 文本属性：
-   `text-align`：对齐方式（`left`/`center`/`right`）。
-   `text-decoration`：下划线（`underline`）、删除线（`line-through`）。
-   `line-height`：行高控制。
4. 列表属性：`list-style-type`：设置列表符号；`list-style-position`： 设置列表符号的位置；`list-style-image`： 自定义列表符号
5. 表格属性：`border-width border-color border-style`
6. 背景属性：`background-color background-image background-repeat background-position`
7. 鼠标属性：`cursor` 设置鼠标光标的样式；`pointer`小手；`move `移动图标；`text`文字选择器；`wait`等待；`help`帮助  
### 盒子模型
盒模型都是由四个部分组成的，分别是 margin、border、padding 和 content。盒子的大小 = content + 左右 padding + 左右 border；外边距 margin 不会影响盒子的大小，但会影响盒子的位置。 
1. margin（外边距）： 盒子与外界的距离。
2. border（边框）： 盒子的边框。
3. padding（内边距）： 紧贴内容的补白区域。
4. content（内容）：元素中的文本或后代元素都是它的内容。
5. margin问题：上 margin 、左 margin ：影响自己的位置；下 margin 、右 margin ：影响后面兄弟元素的位置。

margin 塌陷问题：第一个子元素的上 margin 会作用在父元素上，最后一个子元素的下 margin 会作用在父元素上。 
> - 解决：方案一： 给父元素设置不为 0 的 padding; 方案二： 给父元素设置宽度不为 0 的 border; 方案三：给父元素设置overflow:hidden 

margin 合并问题：上面兄弟元素的下外边距和下面兄弟元素的上外边距会合并，取一个最大的值，而不是相加。
>- 解决：底部元素变为行内盒子：display: inline-block；底部元素设置浮动：float；底部元素的 position 设为绝对定位
### 浮动
1.  浮动特点
>- 脱离文档流。  
>- 不管浮动前是什么元素，浮动后：默认宽与高都是被内容撑开且可以设置宽高， 不会独占一行  
>- 不会 margin 合并，也不会 margin 塌陷，能够完美的设置四个方向的 margin 和 padding
>- 不会像行内块一样被当做文本处理（没有行内块的空白问题）。
2. 浮动有什么影响
>- 对兄弟元素的影响： 后面的兄弟元素，会占据浮动元素之前的位置，在浮动元素的下面；对前面的兄弟无影响。
>- 对父元素的影响： 不能撑起父元素的高度，导致父元素高度塌陷；但父元素的宽度依然束缚浮动的元素。  
3. 解决浮动产生的影响
>- 给父元素指定高度。
>- 给父元素也设置浮动，带来其他影响。  
>- 给父元素设置` overflow:hidden`
>- 给浮动元素的父元素，设置伪元素，通过伪元素清除浮动。`.parent::after { content: ""; display: block;  clear:both;  }`

### 定位
1. 相对定位：`position:relative`,参考点是相对自己原来的位置
>- 特点：脱离文档流，会对后面的兄弟元素、父元素有影响。
2. 绝对定位：`position: absolute`, 参考点是它的包含块。对于没有脱离文档流的元素：包含块就是父元素；  
>- 特点： 不会脱离文档流，定位元素的显示层级比普通元素高。 无论是什么元素（行内、行内块、块级）设置为绝对定位之后，都变成了定位元素（默认宽、高都被内容所撑开，且能自由设置宽高）。  
3. 固定定位：`position:  fixed` , 参考点是视口  
>- 特点：不会脱离文档流，定位元素的显示层级比普通元素高。 无论是什么元素（行内、行内块、块级）设置为绝对定位之后，都变成了定位元素（默认宽、高都被内容所撑开，且能自由设置宽高）。  
4. 粘性定位：`position:sticky`, 参考点是离它最近的一个拥有“滚动机制”的祖先元素 
>- 特点： 不会脱离文档流，它是一种专门用于窗口滚动时的新的定位方式。 粘性定位和相对定位的特点基本一致，不同的是：粘性定位可以在元素到达某个位置时将其固定。    
5. 定位层级：定位元素的显示层级比普通元素高。可以通过 css 属性 z-index 调整元素的显示层级，只有定位的元素设置 z-index 才有效。  

### 元素的显示模式
1.  块元素（block）： 在页面中独占一行，默认宽度：撑满父元素， 默认高度：由内容撑开，可以设置宽高。 `<h1> ~ <h6> 、 <hr> 、 <p> 、 <pre> 、 <div>、<ul> 、 <ol> 、 <li>`
2.  行内元素（inline）： 在页面中不独占一行，默认宽度：由内容撑开， 默认高度：由内容撑开，不能设置宽高 。`<br> 、 <em> 、 <strong> 、 <a> 、<label>`
3.  行内块元素（inline-block）：在页面中不独占一行，默认宽度：由内容撑开， 默认高度：由内容撑开，可以能设置宽高 。`<img>、<input> 、 <textarea> 、 <select> 、 <button>、<td> 、 <th>、<iframe>`
### 参考链接

[html+css教程，前端html5+css3零基础入门，web前端开发](https://www.bilibili.com/video/BV1p84y1P7Z5/?spm_id_from=333.1387.search.video_card.click&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)
