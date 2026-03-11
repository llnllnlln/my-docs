---
title: uniapp实战
isTimeLine: true
date: 2023-02-24
category:
  - uniapp
tag:
  - uniapp
---

### 💡登录
1. 判断用户登录信息，检测缓存是否有`token`与`userInfo`，如果没有`token`，那么授权微信登录后才能正常使用小程序。
3. 调用`uni.login()`成功后把`code`发给后端，
4. 后端传 `appId、secret、code`，获取 `openid、session_key`，然后返回签名`Token`
5. 前端拿到`token`并缓存起来；可以利用`token`获取用户信息，拿到头像以及昵称显示在页面上;

```js
uni.showModal({
    title:'温馨提示',
    content:'授权微信登录后才能正常使用小程序',
    success(res){
      // 1 使用uni.login()成功后返回token并缓存起来
      uni.login({
            success: async(data) => {
                // 2 把code发给后端，后端传回token，缓存起来
                const { token } = await login(data.code)
                uni.setStorageSync('token', token)
                // 3 利用token调接口获取用户信息, 拿到头像以及昵称显示在页面上，缓存起来
                const {nickName, avatarUrl} = await getUserInfo()
                userInfo.avatarUrl = avatarUrl;
                userInfo.nickName = nickName;
            }
        })
    })
})
```
### 💡请求二次封装
1. 利用`Promise`与`uni.request()`,需要携带`token`;
2. 如果返回成功那么调用`resolve()`，否则弹出弹窗,调用`reject()`
```js
export default function http(url, data={}, method='GET'){
    return new Promise((resolve, reject)=>{
        uni.request({
            url: baseUrl + url,
            data,
            method,
            header:{
               'token': uni.getStorageSync('token') || ''
            },
            success: res =>{
                if(res.statusCode == 200){
                    if(res.data.code == 1){
                        resolve(res.data.data)
                    }else{
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                        reject(res.data.msg)
                    }
                }
            },
            fail: err=> {
                reject(err)
            }
        })
    })
}
// 主页使用实例
onLoad(()=>{
    http('/user/getBanner').then(res=>{
            bannerList.value = res.bannerList
    })
})
```
### 💡小程序支付
1. 通过 `uni.login({})`返回的`code`去拿到`openid`;
2. 向后端发起“创建支付订单”请求（包含订单信息、用户标识、费用等）;
3. 根据返回的订单信息调用`uni.requestPayment({})`，使用后端返回的参数拉起支付界面
4. 用户支付成功后`success`回调会显示信息。

```js
// 1 利用uni.login()获取code
wx.login({
  async success(res){
    // 2 通过code获取openid
    const {openid}= await getMPid({code:res.code})
    // 3 创建订单取支付信息
    const params =await createMPorder({openid, amount:1})
    // 4 用requestPayment发起支付
    wx.requestPayment({
      ...params,
      signType:'MD5',
      success(res){
        wx.showToast({title:"支付成功"})
        console.log(res,"小程序支付成功信息")
      },
      fail(err){
        wx.showToast({title:"支付失败", icon:"error"})
        console.log(err,"小程序支付失败信息")
      }
    })
  }
})
```
### 💡使用uview-plus插件扩展
1. 先下载导入`uview-plus`插件，然后按照下载方式配置文档开始使用
2. `pages.json`配置`easycom`，安装`scss`插件
3. 在入口文件main.js引入`import uviewPlus from '@/uni_modules/uview-plus' app.use(uviewPlus)`，就可以使用该扩展组件。
4. 使用轮播图组件例子：`<up-swiper :list="bannerList" keyName="image" showTitle radius="8" height="160"></up-swiper>`

```js
"easycom": {
  "autoscan": true,
  // 注意一定要放在custom里，否则无效，https://ask.dcloud.net.cn/question/131175
  "custom": {
    "^u--(.*)": "@/uni_modules/uview-plus/components/u-$1/u-$1.vue",
    "^up-(.*)": "@/uni_modules/uview-plus/components/u-$1/u-$1.vue",
    "^u-([^-].*)": "@/uni_modules/uview-plus/components/u-$1/u-$1.vue"
  }
},
```
### 💡上拉加载,下拉刷新
1. 上拉加载：通过在`pages.json`文件中找到当前页面的`pages节点下style中`配置 `"onReachBottomDistance": 500`；`onReachBottomDistance`可以设置距离底部开启加载的距离，默认为50px。然后页面就通过`onReachBottom`监听到触底的行为了。
2. 下拉刷新：`pages的style选项中`开启 `enablePullDownRefresh：true`。页面通过`onPullDownRefresh`监听到下拉刷新的行为，`uni.stopPullDownRefresh()`关闭下拉刷新

```js
"enablePullDownRefresh": true,
"onReachBottomDistance": 500
onPullDownRefresh(()=>{
  console.log('下拉刷新');
  // 关闭下拉刷新
  setTimeout(()=>{
    uni.stopPullDownRefresh();
  },1000)
})
onReachBottom(()=>{
  console.log('上拉加载');
})
```
### 页面传参,组件传参
1. 页面传参   
  a. A页面传参：`uni.navigateTo({url:/pages/search/search?key=${this.key}&id=111})`  
  b. B页面接收：`onLoad((options)=>{ key = options.key}) ` 
2. 组件传参：父传子：`props`；子传父：`$emit`

```js
//子页面
<template>
    <view style="text-align: center;">{{ title }}</view>
    <view class="flex-box">
        <button @click="add">+</button>
        <view>{{ counter }}</view>
        <button @click="minus">-</button>
    </view>
</template>

<script setup>
    import { ref, defineProps, defineEmits } from 'vue'
    defineProps({ title: String })
const emit = defineEmits(['total']) // 声明事件
    const counter = ref(0)
const add = () =>{
        counter.value += 1;
        emit('total', { // 触发事件
                type: 'add',
                counter
        })
    }
    const minus = () =>{
        counter.value -= 1;
        emit('total', { // 触发事件
                type: 'minus',
                counter
        })
    }
</script>
```

```js
//父页面
<template>
    <view class="content">
        <Counter @total="total" />
        <Counter @total="total" />
        <Counter @total="total" />
        总数是: {{totalNum}}
    </view>
</template>
<script setup>
    import {ref} from 'vue'
    const totalNum = ref(0)
    // 总数
    const total = (e) =>{
        console.log('传值：', e.counter.value)
        e.type == 'add' ? totalNum.value++ : totalNum.value--;
    }
</script>
```
### Pinia进行全局状态管理
1. 在入口文件`main.js`引入 `import * as Pinia from 'pinia';` `app.use(Pinia.createPinia())`
2. 创建stores文件，引入`pinia`并开始创建如`useCounterStore`
3. 在页面使用`import { useCounterStore } from '@/stores/counter'` `const store = useCounterStore() `

```js
// 引入
import { defineStore } from 'pinia';
// 暴露出去
export const useCounterStore = defineStore('counter', {
    state: ()=>{
        return { 
            count:0,
            title: '标题标题'
        }
    },
    actions: {
        increment(){
           this.count++;
        }
    }
})
```
### 💡分包问题
1.  小程序有体积和资源加载限制，需要分包优化小程序的下载和启动速度。微信小程序每个分包的大小是2M，总体积一共不能超过20M。
2.  所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本；在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，会把对应分包自动下载下来，下载完成后再进行展示
3. 怎么做
>a. 配置分包 manifest.json，在小程序配置加入`"optimization:{"subPackages":true"}`   
>b. 在项目根目录创建分包文件夹，如`pagesA`，如将pages的详情页面移动过去  
>c. 在`pages.json`页面的`subpackages`数组中加入分包的页面   
>d. 修改分包页面跳转路径

```js
// pages.json
"subPackages":[{
  //此处需对应文件夹名称
  "root": "pagesA",
  //此处分包对应各分包页面
  "pages": [
    {
      "path": "detail/detail",
      "style": {
        "navigationBarTitleText": "",
        "navigationStyle": "custom"
      }
    }]
}],
```
```js
//修改分包页面跳转路径
const toDetail = (item) =>{
    const can =JSON.stringify(item)
    uni.navigateTo({
            url: `/pagesA/detail/detail?item=${encodeURIComponent(can)}`
    })
 }
```