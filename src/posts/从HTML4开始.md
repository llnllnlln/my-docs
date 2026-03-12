---
title: HTML4开始
isTimeLine: true
date: 2025-02-10
category:
  - 前端
  - HTML
tag:
  - HTML
---
### 什么是 HTML？
HyperText Markup Language（超文本标记语言）
### HTML 字符编码
1.  计算机对数据的操作:存储时，对数据进行：编码。 读取时，对数据进行：解码。
2.  字符集
```js
1. ASCII ：大写字母、小写字母、数字、一些符号，共计128个。
2. ISO 8859-1 ：在 ASCII 基础上，扩充了一些希腊字符等，共计是256个。
3. GB2312 ：继续扩充，收录了 6763 个常用汉字、682个字符。
4. GBK ：收录了的汉字和符号达到 20000+ ，支持繁体中文。
5. UTF-8 ：包含世界上所有语言的：所有文字与符号。—— 很常用。
```
3.  平时编写代码时，统一采用 UTF-8 编码（最稳妥）。为了让浏览器在渲染 html 文件时，不犯错误，可以通过 meta 标签配合 charset 属性指 定字符编码。 `<meta charset="UTF-8"/>`
### HTML标准结构
1. 文档声明 `<!DOCTYPE html>`
2. 设置语言 `<html lang="zh-CN">`
3. meta 元信息
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <title>我是一个标题</title>
  </head>
  <body>
  </body>
</html>
```
### meta 元信息
1. 配置字符编码 `<meta charset="utf-8">`
2. 针对 IE 浏览器的兼容性配置 `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
3. 针对移动端的配置 `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
4. 配置网页关键字 `<meta name="keywords" content="8-12个以英文逗号隔开的单词/词语">`
5. 配置网页描述信息 `<meta name="description" content="80字以内的一段话，与网站内容相关">`
6. 针对搜索引擎爬虫配置 `<meta name="robots" content="此处可选值见下表">`
### 图片标签与常见格式
src：图片路径, 图片的具体位置; alt ：图片描述; width ：图片宽度; height ：图片高度;
1. jpg 格式： 是一种有损的压缩格式,支持的颜色丰富、占用空间较小、不支持透明背景、不支持动态图。
2. png 格式： 是一种无损的压缩格式，支持的颜色丰富、占用空间略大、支持透明背景、不支持动态图。 使用场景：①想让图片有透明背景；②想更高质量的呈现图片
3. bmp 格式：支持的颜色丰富、保留的细节更多、占用空间极大 、不支持透明背景、不支持动态图。 使用场景：对图片细节要求极高的场景
4. gif 格式： 支持的颜色较少、支持简单透明背景、支持动态图。 使用场景：网页中的动态图片。
5. webp 格式：谷歌推出的一种格式，专门用来在网页中呈现图片。具备上述几种格式的优点，但兼容性不太好，一
6. base64 格式: 一串特殊的文本，直接作为 img 标签的 src 属性的值即可; 使用场景：一些较小的图片，或者需要和网页一起加载的图片。
### 超链接
1.  主要作用：从当前页面进行跳转。 
2.  可以实现：①跳转到指定页面、②跳转到指定文件（也可触发下载）、③跳转到锚点位置
3.  如何设置锚点 : ①a标签配合name属性 ② 其他标签配合id属性

```html
<!-- 跳转到指定页面: 跳转其他网页、跳转本地网页 -->
<a href="https://www.jd.com/" target="_blank">去京东</a>
<a href="./10_HTML排版标签.html" target="_self">去看排版标签</a>

<!-- 浏览器不能打开的文件，会自动触发下载 -->
<a href="./resource/内部资源.zip">内部资源</a>

<!-- 跳转到test1锚点-->
<a href="#test1">去test1锚点</a>
<!-- 跳到本页面顶部 -->
<a href="#">回到顶部</a>
```
### 表单
1.  form 表单
> action 属性： 表单要提交的地址。
> target 属性： 要跳转的新地址打开位置; 值: _self 、 _blank。
> method 属性： 请求方式，如get 、 post
2.  input 输入框
> type ：设置输入框的类型；
> name ：用于指定提交数据的名字；
> value： text 、 password 、 radio 、 checkbox 、 hidden 、 submit 等；
> disabled 属性： 设置表单控件不可用；
> checked 属性： 用于单选按钮和复选框，默认选中；
3.  button 按钮
> type 属性： 设置按钮的类型，值： submit （默认）、 reset 、 button
5.  textarea
6.  select 、option 下拉框以及其选项
### 框架标签
1.  iframe 框架（在网页中嵌入其他 文件）
2.  name ：框架名字，可以与 target 属 性配合。 width ： 框架的宽。 height ： 框架的高度。 frameborder ：是否显示边框，值：0 或者1。
3.  应用：在网页中嵌入广告。 与超链接或表单的 target 配合，展示不同的内容。

