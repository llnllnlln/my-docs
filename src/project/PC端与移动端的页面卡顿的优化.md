---
title: PC端与移动端的页面卡顿的优化
isTimeLine: true
date: 2026-02-16
category:
  - 前端
tag:
  - JavaScript 
  - 性能优化
---

### PC场景
- 随着数据量增多,系统一些复杂页面的加载速度、响应速度越来越慢，用户体验不好
### PC解决方案
- 加载阶段，从发出请求到渲染出完整页面的过程，影响到这个阶段的主要因素有网络和JavaScript脚本
- 所以就是降低关键资源大小与个数；交互阶段就是减少DOM个数、DOM操作，避免重排重绘，使用防抖节流
### PC端实现
1. 文件体积上：延迟加载非关键资源，减少关键资源的个数，优先加载关键CSS和JS
    - 解决：路由懒加载、全局组件改为懒加载、弹窗的数据改为点击后才请求。
    - `import()`函数导入组件，Webpack在打包时会将异步导入拆分成单独的`chunk`文件。通过`webpackChunkName`设置分割后代码块的名字
2. 缓存上：利用浏览器的缓存机制
    - 文件资源进行强缓存、协商缓存，在服务器设置了正确的响应头时才会生效
    - 其中HTML文档不要缓存，要保持非缓存状态：`Cache-Control: no-store；`其他文件有变化了才能引入新的文件路径。
    - `Expires、Cache-control，last-modify、etag`这些强缓存、协商缓存相关的`Header`可以让浏览器高效地利用文件缓存。只有当文件的内容修改了，才会重新加载文件（打包后的静态资源都会带上一串 Hash 值）
3. indexDB缓存：不怎么修改的数据用`indexDB`存储，为了减少数据请求的接口。
    - 一些各个流程都用到的资源数据改为了`indexDB`缓存，比如检测方法、检测项目这些名字、标准号等这些是国家标准，一般新增后不会改动，所以存在本地的indexDB上。
    - 修改：数据的关键字段有变动时候，再通知`indexDB`数据更改。使用了`websoket`进行消息通知，如果数据有变动就清空`indexDB`数据列表，下次用到重新请求并存储。
    - 使用：封装数量列表在全局变量上，系统各个地方就可以直接使用，无需请求接口。`await this.$app.webdata.getdatas("lims.analysisitem")`
4. 渲染上：大数据的场景使用虚拟列表组件
    - 虚拟滚动指的是只渲染可视区域的列表项，非可见区域的不渲染，在滚动时动态更新可视区域；
    - 一些数据的弹窗选择组件，就算数据从缓存拿不走接口，但是一下子加载一千多节点，页面还是用户体验不好。
    - 系统多出弹窗使用组件库`vue-virtual-scroller`封装的`fx-table`，用它替换到之前的组件，达到渲染上优化。
    - 基本原理：计算出`totalHeight`列表总高度，并在触发时滚动事件时根据`scrollTop`值不断更新`startIndex`以及`endIndex`，最后从列表数据`listData`中截取对应元素。
5. 页面响应上：适当使用防抖和节流，避免重复执行JS逻辑造成页面交互上的阻塞。
### 手机端场景
手机端组件库是使用vant，采样流程中采样人员在手机端添加crad，填写检测项目基本信息，之前一般是几十条，但是最近业务发生变化，出现二三百数据后，手机出现卡顿甚至闪退。
### 手机端性能优化
1. 之前单个任务数据量没那么大，是使用定时器来实现分批渲染
    - loop函数里面判断总数据长度跟现在列表长度比较，小于则加载十条，`requestAnimationFrame`定时调用loop，大于总数据则加载结束。
2. 优化1：vant的list内部没有封装虚拟列表的，所以使用它的上拉加载下拉刷新
    - 下拉刷新主要是靠下拉刷新组件`van-pull-refresh`。`@refresh="onRefresh"`调用refresh事件。
    - 上拉加载`van-list`的`@load="loadMore"`上拉加载是拼接数据，滑动触底就立马渲染后页数加1。
3. 优化2：加载完几百条数据后，在线上使用快速往前面滑动还是会卡顿，为了用户体验改成了定高的虚拟列表
    - 当滚动时候可视区内容会发生变更，虚拟列表就是在监听滚动时候，动态渲染可视区的数据，并移除之前的数据。
    - 可渲染的条数：根据可视区高度算出可视区可渲染的条数count为`clientHeight / itemHeight`(可视区高度/列表项的高度)；
    - 算出开始索引：`startIndex`就是`scollTop / itemHeight`(滚动高度/列表项的高度)；
    - 算出结束索引：`endIndex`就等于`startIndex + count`；
    - 获取数组：根据起始索引、结束索引slice截取数据展示在页面上。
    - 计算列表区域的偏移量`startOffset`：会撑开元素的内容高度，起缓冲的作用，可平滑的滚动。
```js
computed: {
    _listData() {
      return this.listData.map((item, index) => {
        return {
          _index: `_${index}`,
          item
        };
      });
    },
    visibleCount() {
      return Math.ceil(this.screenHeight / this.estimatedItemSize);
    },
    visibleData() {
      return this._listData.slice(this.start, this.end);
    }
},
methods: {
    //获取当前的偏移量
    setStartOffset() {
      let startOffset =
        this.start >= 1 ? this.positions[this.start - 1].bottom : 0;
      this.$refs.content.style.transform = `translate3d(0,${startOffset}px,0)`;
    },
    //滚动事件
    scrollEvent() {
      //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引
      this.start = this.getStartIndex(scrollTop);
      //此时的结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量
      this.setStartOffset();
    }
}
```