---
title: uniapp基础
isTimeLine: true
date: 2026-02-19
category:
  - uniapp
tag:
  - uniapp
---

上### 是什么
1. 是 DCloud 推出的跨端开发框架，支持一次开发，编译到多端。开发者编写一套代码，可发布到i0S、Android、Web以及各种小程序(微信/支付宝/百度/头条/飞书/0Q/快手/钉钉/淘宝)、快应用等多个平台。
2. uniapp是一个框架：vue.js + 微信小程序 = uniapp
3. 什么样的项目适合uniapp？
  a. ⼀套代码可以⽣成多端，可以发布到ios、安卓、web、小程序，节省时间；
  b. 学习成本低,语法是vue的；支持微信小程序 API，无需二次适配；
  c. 适用于花钱少、时间少场景；
4. 缺点：性能差；上架可能会有问题；一个项目要做多端，调试很麻烦；
### 搭建并运行
1. 环境搭建：安装前端开发工具 HbuilderX；安装微信开发者工具
2. 利用HbuilderX初始化项目：
  a. 点击HbuilderX菜单栏文件>项目>新建；
  b. 选择uni-app,填写项目名称，项目创建的目录；
3. 运行项目   
>a. 在菜单栏中点击运行，运行到浏览器，选择浏览器即可运行     
>b. 在微信开发者工具里运行：进入uniapp项目，点击工具栏的运行 -> 配置小程序的相关路径->运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app
### 基础框架

```js
├── pages/           # 页面文件夹
│   ├── index/       # 首页
│   │   ├── index.vue
│   │   ├── index.js
├── components/      # 组件目录
├── static/          # 静态资源（图片等）
├── uni_modules/     # uni-ui 组件库
├── main.js         # 入口文件
├── App.vue         # 应用根组件
├── manifest.json   # 项目配置（如 AppID）
├── pages.json      # 页面配置（路由）
├── uni.scss        # 全局样式
```
page.json配置:用于设置应用的状态栏、导航条、标题、窗口背景色等。主要属性如下：
1. pages 增加页面,第一项表示应用启动页，通过style修改页面的标题和导航栏背景色，并且设置h5下拉刷新的特有样式
2. tabBar底部栏：通过tabBar配置项指定tab栏的表现
3. globalStyle全局样式

```js
{
    "pages": [ 
        {
            "path": "pages/index/index",
            "style": {
                "navigationBarTitleText": "uni-app123"
            }
        },
        {
            "path": "pages/my/my",
            "style": {
                "navigationBarTitleText": "",
                "navigationStyle": "custom",
"enablePullDownRefresh": true,
                "onReachBottomDistance": 500
            }
        }],
    "tabBar": {
      "backgroundColor": "#ffffff",
        "height": "50px",
        "fontSize": "10px",
        "list": [
            {
                "pagePath": "pages/index/index",
                "text": "主页",
                "iconPath": "static/image/home.png",
                "selectedIconPath": "static/image/home-h.png"
            },
            {
                "pagePath": "pages/my/my",
                "text": "我的",
                "iconPath": "static/image/user.png",
                "selectedIconPath": "static/image/user-h.png"
            }]
    }
}
```
### 内置组件
1. 基础组件，有了几十个基础组件，大多数扩展组件也都是基于这些基础组件封装的，如官方提供的扩展ui库uni_ui
2. CSS 尺寸单位:rpx，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度
3. 视图容器：`view、text、button、image、scroll-view、swiper`
4. 表单组件:` button form input label picker（从底部弹起的滚动选择器）`
5. 媒体组件：`audio video image camera`(在 App 和 H5 端，可以使用API方式来调用全屏摄像头)`uni.authorize({scope: 'scope.camera',success() {}, fail() {}})`
6. 页面导航：`navigator`类似`<a>`组件，可以跳转到其他页面，跳转到`tabBar`页面需要配置`open-type`
7. 地图：`map`地图组件用于展示地图，可以实现地图的显示和定位功能

```html
//页面导航
<navigator url="/pages/message/message" open-type="switchTab" >
    <button type="default">跳转到message页面</button>
</navigator>
//地图组件
<map 
    style="width: 100%;height: 400rpx;" 
    :latitude="detailInfo.location[0]" 
    :longitude="detailInfo.location[1]" 
    :show-scale="true" 
    :markers="detailInfo.markers">
</map>
```
### api
1. 页面与路由
```js
// 保留当前页面，跳转到应用内的某个页面,
// 使用uni.navigateBack可以返回到原页面，可以给下一个页面传递相应的参数，接收参数的页面可以通过onLoad生命周期进行接收，
uni.navigateTo({ url: '/pages/detail/detail?id=80' });
//关闭当前页面，跳转到应用内的某个页面
uni.redirectTo({ url: '/pages/index/index' }); 
// 跳转pages.json>tabbar>配置过的页面,使用 switchTab
//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
uni.switchTab({ url: '/pages/index/index' }); 
// 关闭所有页面  
uni.reLaunch({ url: '/pages/login/login' });  
```
2. 联网(uni.request)：`uni.request({url: 'https://www.example.com/request',data:{}, success:function(){}});`  
3. 读取存储(uni.getStorage): ① 存储：`uni.setStorage({key:"属性名"，data:"值"}`； ② 接收：`uni.getStorage({key:"属性名", success(e){e.data}})`
4. 获取位置: 需要配置地图sdk
```js
// 定位
uni.getLocation({
    type: 'gcj02', //腾讯地图坐标系
    success:(res)=> {
        const latitude = res.latitude
        const longitude = res.longitude
    }
}) 
```
5. 图片预览(uni.previewImage)与上传文件`uni.uploadFile({ url: '要上传的地址', fileType:'image',filePath:'图⽚路径', name:'⽂件对应的key', success:function(res){ console.log(res) }})`
```js
// 预览图片(uni.previewImage)
uni.previewImage({
    current,
    urls: this.imgArr
})
// 选择图片(uni.chooseImage)
uni.chooseImage({
  count: 9,
  success: res=>{
    this.imgArr = res.tempFilePaths
  }
})
// 上传文件
uni.uploadFile({
  url: "...",
  filePath: this.data.tempFilePaths[0],
  name: "file", //上传图片key
  formData: {
    user: "MSea" //需要额外携带参数
  },
  header: {
    "content-type": "multipart/form-data"
  },
  success: res => {
    console.log("data");
  }
});
    
```
6. 设备：条件注释实现跨端兼容。在不同的端，展示不同的代码。通过 #ifdef、#ifndef 的⽅式 
> app平台：除了uni.的API，还可以使用plus.的API、Native.js；在微信小程序平台，编写uni.request等同于wx.request；  
> app-plus是无法判断是ios还是安卓？解决:uni.getSystemInfoSync().platform;

```js
<!-- #ifdef H5 -->
<view>
  h5页面会显示
</view>
<!-- #endif -->

<!-- #ifdef MP-WEIXIN -->
<view>
  微信小程序会显示
</view>
<!-- #endif -->

<!-- #ifdef APP-PLUS -->
<view>
  app会显示
</view>
<!-- #endif -->
```
### 生命周期
1. 在page文件夹下，有页面生命周期也有组件生命周期
2. 组件：在component文件夹下,使用vue的组件生命周期

```js
ⅰ. onLoad：第一次进入页面执行的生命周期，会接收页面传递过来的参数
ⅱ. onShow：每一次进入页面执行的生命周期
ⅲ. onReady：页面渲染完成
ⅳ. onHide：页面隐藏时触发
ⅴ. onUnload：页面卸载时触发
ⅵ. onResize：监听窗口尺寸变化
ⅶ. onPullDownRefresh：监听用户下拉动作
ⅷ. onShareAppMessage：用户点击右上角分享
ⅸ. onAddToFavorites：监听用户点击右上角收藏
X. onNavigationBarButtonTap：监听原生标题栏按钮点击事件
Xⅰ. onNavigationBarSearchInputChanged：监听原生标题栏搜索输入框输入内容变化事件
//分享给好友
onShareAppMessage((e)=>{
    return {
        title:"课件2",
        path:"/pages/preview/preview?id="+currentId.value+"&type=share"
    }
})
//分享朋友圈
onShareTimeline(()=>{
    return {
        title:"课件1",
        query:"id="+currentId.value+"&type=share"
    }
}) 
```

