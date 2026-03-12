---
title: JavaScript的DOM与BOM
isTimeLine: true
date: 2025-03-10
category:
  - 前端
tag:
  - JavaScript
---

### 事件模型
1. 事件模型：a. 捕获阶段：事件从window对象自上而下向目标节点传播；b. 目标阶段：真正的目标节点处理事件阶段；c. 冒泡阶段：事件从目标节点自下而上向window对象传播阶段
2. 事件怎么注册？通常使用`addEventListenter`注册事件，函数的第三个参数`useCapture`决定是捕获事件还是冒泡事件，默认是false。
3. 如何阻止事件冒泡？`event.stopPropagation()`阻止事件冒泡到父元素；IE浏览器使用`event.cancelBubble = true;`
4.`event.preventDefault()`使默认事件行为不被触发，如a标签的点击跳转。
### 事件委托
1. 什么是事件委托？ 本质是利用浏览器事件冒泡的机制，因为事件在冒泡的事件会上传到父节点，父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父元素的监听函数统一处理多个子元素事件。
2. 优点是什么？ `① 减少内存消耗`：可以不用为每一个子节点都绑定监听事件，减少了内存的消耗；`② 动态绑定事件`：比如新增一个子节点，可以不用单独为它添加一个监听事件，会交由父元素的监听函数处理。
3. 缺点是什么？ 绑定的层级过多，点击的最底层元素，到绑定事件元素之间的DOM层数过多可能会影响页面性能。另外`mousemove、mouseout`是不断通过位置去计算定位，对性能消耗高，不适合事件委托；

```js
//ul列表里面有多li元素。点击任意li时，打印它的内容.
// 非事件委托 每个li要绑定一个新事件，内存占用高
const items = document.querySelectorAll("li");
items.forEach(item => {
  item.addEventListener("click", () => {
    console.log(item.textContent);
  });
});
// 事件委托 只绑定一个事件
const ul = document.querySelector("ul");
ul.addEventListener("click", (e) => {
  // e.target 是实际被点击的元素
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
  }
});
```
### DOM的常见操作？
1. 全称：Document Obiect Model 文档对象模型
2. 节点获取：
>- `getElementById` 按照 id 查询；
>- `getElementsByTagName` 按照标签名查询；
>- `getElementsByClassName` 按照类名查询；
>- `querySelectorAll` 按照 css 选择器查询
3. 节点增加
>a. `document.createElement(tagName)` 指定的一个标签名来创建一个元素  
>b. `document.createTextNode(data)`创建一个文本节点   
>c. `document.cloneNode(deep)` 参数为true,则该节点的所有后代节点也都会被克隆  
>d. `parentNode.appendChild(node)` 末尾插入子节点  
>e. `parentNode.insertBefore(newNode, refNode)` 在指定节点前插入  
>f. `document.createDocumentFragment()` 创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树；因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流(reflow),可以解决添加大量节点时的性能问题
5. 节点删除：`parent.remove()；parent.removeChild()`删除指定的子节点并返回
6. 节点修改
> a. `element.setAttribute(name, value)`; 指定元素上的一个属性值   
> b. `parentNode.repalceChild(new,old)` 使用一个节点替换另一个节点  
> c. `innerHTML`  
7. 元素样式型API
> a. `getComputedStyle()`通过style可以访问到元素计算后的样式  
> b. `getBoundingClientRect()`用来返回元素的大小以及相对于浏览器可视窗口的位置  
> c. `window.innerWidth/innerHeight`,查看视口的尺寸；标准模式-`document.documentElement.clientWidth/clientHeight`；怪异模式-`document.body.clientWidth/clientHeight`
### setTimeout、setInterval、requestAnimationFrame 各有什么特点？
1. `setTimeout(callback, delay)`单次延迟执行,在定时器到期后执行一个回调，定时器的最小间隔是 4ms，有超时延迟特点
2. `setInterval(callback, delay)`循环执行,每隔delay毫秒就执行一次回调,setInterval不精准。
3. `requestAnimationFrame`，浏览器的一个循环定时器，类似于setInterval，主要作用是安帧对页面进行重绘作用是让网页有统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。
4. rAF动画API，不需要设置时间间隔。大多数电脑刷新频率是60hz，就是每秒钟重绘60次，`1000ms/60 ->16.6ms`
5. 使用上：在高频率事件(`resize, scroll`等)中，可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。
### 判断页面滚动到可见位置的三种方式实现图片懒加载
最开始加载页面的时候，图片的src没有值,有个data-src属性放置图片路径。检测到盒子进入视口的时候，再开始加载图片，设置图片的src。
##### offsetTop
1. offsetTop:HTMLElement.offsetTop 为只读属性，它返回当前元素相对于其祖先元素`offsetParen`t元素上边框边缘的垂直距离（像素）,不受页面滚动影响
2. scrollTop:获取或设置元素内容因垂直滚动而隐藏的顶部距离；

```js
// 方法1 offsetTop：图片的头部距离浏览器顶部的高度
// clientHeight：浏览器视口的高度；scrollTop：滚动轴滚动的距离 
let imgs = document.querySelectorAll('img');
let clientHeight = window.innerHeight || document.documentElement.clientHeight;
const lazyLoad = () =>{
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    for(let i=0 ;i < imgs.length; i++){
        // 判断图片进入视口，此时加载图片
        if(imgs[i].offsetTop < scrollTop + clientHeight ){
            imgs[i].src = imgs[i].getAttribute('data-src');
        } 
    }
}
window.onscroll = throttle(lazyLoad, 200);
```
##### getBoundingClientRect()
1. 返回值是一个 DOMRect 对象，是包含整个元素的最小矩形。该对象使用 `left、top、right、bottom、x、y、width 和 height` 这几个以像素为单位的只读属性描述整个矩形的位置和大小。
2. 传统的实现方法是，①监听到scroll事件或者使用setInterval来判断; ②调用目标元素的  `getBoundingClientRect()`方法，得到它对应于视口左上角的坐标，再判断是否在视口之内
3. 这种方法的缺点是，由于scroll事件触发频率高，计算量很大，如果不做防抖节流的话，很容易造成性能问题。

```js
// 方法2 getBoundingClientRect拿到对应于视口左上角的坐标
let imgs = document.querySelectorAll('img');
let clientHeight = window.innerHeight || document.documentElement.clientHeight;
function lazyLoad() {
    for (var i = 0; i < imgs.length; i++) {
        let imgBox = imgs[i];
        // 拿到坐标位置，跟clientHeight比较来判断是否在视口之内
        let { top, bottom } = imgBox.getBoundingClientRect();
        // 判断图片进入视口，此时加载图片
        if(clientHeight >= bottom && top > 0){
            imgBox.src = imgBox.getAttribute('data-src');
            imgBox.onload=()=>{
                imgBox.style.opacity = 1;
            };
        }
    }
}
window.onscroll = throttle(lazyLoad, 200);
```
##### IntersectionObserver
1. 它可以用来自动监听元素是否进入了设备的可视区域之内，而不需要频繁的计算来做这个判断。目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。
2. 创建一个新的 IntersectionObserver对象，当其监听到目标元素的可见部分（的比例）超过了一个或多个阈值（threshold）时，会执行指定的回调函数。
3. 原理：当目标元素和根元素相交的面积占目标元素面积的百分比到达或跨过某些指定的临界值时就会触发回调函数。

```js
 // 方法3 IntersectionObserver监听到交叉就出现，无需scroll监听、节流
function lazy(imgBox){
    imgBox.src = imgBox.dataset.src;
    imgBox.onload = () => imgBox.style.opacity = 1;
}
let ob = new IntersectionObserver(entries => {
    entries.forEach(item =>{
        if(item.isIntersecting){
            //完全出现在视口中:延迟加载
            lazy(item.target)
            ob.unobserve(item.target)// 处理过的需要移除监听
        }
    })
},{ threshold:[1]})
// 每张图片都得加上observe方法进行监听
imgs.forEach(item => {
    ob.observe(item)
})
```