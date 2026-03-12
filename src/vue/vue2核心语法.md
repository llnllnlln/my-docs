---
title: vue2核心语法
isTimeLine: true
date: 2025-09-05
category:
  - 前端
tag:
  - JavaScript
  - Vue
---
### vue的特点是什么
轻量级框架、双向数据绑定、组件化、虚拟 DOM
#### MVVM模型
1. M：模型(`Model`)，数据模型，data中的数据;
2. V：视图(`View`)，模板代码; 负责数据的展示
3. VM：视图模型(`ViewModel`)：Vue实例，负责监听Model数据的改变 并且控制视图的更新
4. data中所有的属性，最后都出现在了vm身上;vm身上所有的属性及Vue原型上所有属性，在Vue模板中都可以直接使用。
5. MVVM：实现V与M的自动同步，当Model的属性改变时，不用再自己手动操作Dom元素，对应的View会自动改变。 
### Vue指令相关
#### 内置指令
1. v-bind: 单向数据绑定
2. v-model：双向数据绑定，一般都应用在表单类元素上，比如`input、select`
3. v-if：条件渲染，控制数据是否存在
4. v-show：条件渲染，控制数据是否显示
5. v-html：向指定节点渲染html内容，比较危险，容易导致XSS注入攻击
6. v-text：向指定节点渲染文件
7. v-once:所在节点在初次动态渲染后，以后数据的改变不会引起v-once所在结构的更新
8. v-clock：用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题
9. v-pre：可以利用它跳过没有指令的节点，加快编译
#### v-if 与 v-for 
不建议一起使用，因为解析时先解析 v-for 再解析 v-if。数据都渲染出来了才判断v-if, 可以写成计算属性的方式
#### 绑定样式 
1. class样式: 写法`:class="xxx"`xxx可以是字符串、对象、数组。
2. style样式: 写法`:style="{fontSize: xxx}"`其中xxx是动态值。
#### v-if、v-show、v-html
1. v-if条件不满足时不渲染此节点；v-show条件不满足时控制样式将对应节点隐藏；
2. v-if适用于在运行时不需要频繁切换条件的场景；v-show适用于需要非常频繁切换条件的场景，比如Tabs；
3. v-if原理：生成`vnode`的时候会忽略对应节点，`render`的时候就不会渲染；在编译过程中会被转化成三元表达式，条件不满足时不渲染此节点。
4. v-show原理：会生成`vnode`，`render`的时候也会渲染成真实节点。在编译过程中会被编译成指令，条件不满足时（`display:none`）控制样式将对应节点隐藏
5. v-html原理：会先移除节点下的所有节点，调用html方法，通过addProp添加`innerHTML`属性
#### v-model的原理？
1. 本质是语法糖，动态绑定了input的value指向一个变量，并在触发input事件的时候动态把变量设置为目标值。写法是 `v-bind:value="message"` `v-on:input="message= $event.target.value"`
2. v-model是`双向绑定，是单项数据流`。单项数据流就是子组件不能改变父组件传递给它的`prop`属性，推荐的做法是`$emit`通知父组件自行修改绑定的值。
```js
// v-model用在普通标签上
<input type="text" v-model="username"> //原生事件与自定义事件区别
<input type="text" :value="username" @input="username = $event.target.value"
// v-model用在组件标签上 组件库的Input组件的实现！！
<IviewInput type="text" v-model="username">
<IviewInput type="text" :modelValue="username" @update:modelValue="username = $event">
```
#### 自定义指令
1. 除了上述指令，还可以自定义指令
2. 使用：① 局部定义：`new Vue({directives{指令名:配置对象/回调函数} }）`；② 全局指令：`Vue.directive(指令名,配置对象/回调函数)`
3. 配置对象中常用的3个回调：`.bind`：指令与元素成功绑定时调用；`.inserted`：指令所在元素被插入页面时调用；`.update`：指令所在模板结构被重新解析时调用。
```js
// 1 定义一个v-fbind指令，可以让其所绑定的input元素默认获取焦点。
Vue.directive('fbind',{
    //指令与元素成功绑定时（一上来）
    bind(element,binding){
            element.value = binding.value
    },
    //指令所在元素被插入页面时
    inserted(element,binding){
            element.focus()
    },
    //指令所在的模板被重新解析时
    update(element,binding){
            element.value = binding.value
    }
})
// 2 使用自定义指令，指令定义时不加v-，但使用时要加v-；
<input type="text" v-fbind:value="n">
```
### 修饰符
#### 事件修饰符
1. @click.prevent:阻止默认事件
2. @click.stop:阻止冒泡事件
3. @click.capture:使用事件的捕获模式
4. @click.once:事件只触发一次
5. @click.self:只有event.targent是当前操作的元素时才触发事件
6. @click.passive:事件的默认行为立即执行，无需等待事件回调执行完毕
#### 键盘修饰符
1. @keydown.enter 回车
2. @keyup.enter
3. @keydown.delete 删除
#### 表单修饰符
1. 常见表单项 textarea checkbox radio select
2. v-model.number:将输入值转换为数值
3. v-model.trim：自动过滤用户输入的首尾空格
4. v-model.lazy：回车或者失去焦点的时候调用
### computed与watch？
#### computed
1. 是什么？计算属性，要用的属性不存在，要通过已有属性计算得来。
2. 与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
3. 原理：底层借助了`Objcet.defineproperty`方法提供的`getter`和`setter`。get函数什么时候执行？初次读取时会执行一次；当依赖的数据发生改变时会被再次调用。
```js
data:{
    firstName:'张',
    lastName:'三',
},
computed:{
    fullName(){
        console.log('get被调用了')
        return this.firstName + '-' + this.lastName
    }
}
```
#### watch
1. 是什么？监视属性watch，当被监视的属性变化时, 回调函数自动调用, 进行相关操作；
2. watch默认不监测对象内部值的改变，配置`deep:true`可以监测对象内部值改变（多层）；`immediate：true`让组件加载立即触发回调函数；
3. 原理：使用Vue的原型方法`$watch`传入处理好的参数，进行创建用户Watcher
```js
watch:{
    //正常写法
    person:{
        immediate:true, //初始化时让handler调用一下
        deep:true, //深度监视
        handler(newValue,oldValue){
            console.log('被修改了',newValue,oldValue)
        }
    },
    //简写
    isHot(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue,this)
    } 
}
```
#### computed与watch的区别?
1. computed不支持异步，支持缓存；watch支持异步，不支持缓存；
2. 使用上：当值需要计算。并且依赖于其他属性可以利用computed的缓存属性，避免每次获取值时都要重新计算；当用于观测某个值的变化去完成一段复杂的业务逻辑或者执行异步，那么用watch。
### vue的生命周期？
1. `beforeCreate`：实例初始化之后，这时候`data method`不能访问
2. `created`：实例已被创建，`data method watch computed`配置已经有了，但是没有`$el`，如果要与DOM交互，可以通过nextick来访问DOM
3. `beforeMount`：在挂载之前调用，对DOM的操作不奏效
4. `mounted`: DOM已挂载，数据完成双向绑定，可以开启定时器，网络请求，订阅事件、绑定自定义事件等
5. `beforeUpdate`：数据更新之前调用，发生在虚拟dom重新渲染之前，这时候数据与页面还没有同步
6. `updated`：数据更新后调用，当前阶段组件dom已完成更新
7. `beforeDestroy`：实例销毁前调用，常用于清除定时器、解绑自定义事件等
8. `destroyed`：实例销毁后调用，实例的东西会被解绑，子实例也被销毁
#### 父子组件生命周期钩子函数执行顺序？
1. 加载渲染过程: 父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted
2. 子组件更新过程：父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
3. 销毁过程：父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed
#### 常用的生命周期钩子：
1. `mounted`: 一般是初始化操作，发送ajax请求、启动定时器、绑定自定义事件、订阅消息等。
2. `beforeDestroy`: 一般是收尾工作，清除定时器、解绑自定义事件、取消订阅消息等。
### 组件通信？
1. `prop $emit`: 父组件通过`props`向子组件传递，子组件通过自定义事件，`$emit`触发事件来传递；
2. `$refs $parent`:`$refs`用于父传子，父组件在使用子组件的时候设置ref，通过ref来获取数据；`$parent`用于子传父；
4. `vuex`状态管理；
5. 消息订阅与发布:提供数据`pubsub.publish('xxx',数据)`；接收数据`pubsub.subscribe('xxx',this.demo)`；
6. `attrs listenters`:`$attrs`用于实现当前组件的父组件，向当前组件的子组件通信，可以实现祖孙通信；
7. `provide inject`: 父组件通过`provide`提供变量，子组件通过`inject`注入变量。可以实现祖孙直接通信，在层级较深下，使用它来传值。
### 插槽
1. 是什么:通过插槽向组件内部指定位置传递内容，让这个组件在不同场景也能使用,比如布局组件，可以让用户扩展组件，更好的复用组件；
2. 分类：默认插槽、具名插槽、作用域插槽
3. 默认插槽: 子组件使用`<slot/>`标签即可渲染父组件传下来的插槽内容；
4. 具名插槽: 有时候可能需要指定多个插槽，那么需要名字来区分。子组件用name属性来表示插槽的名字，写法是`<slot name="s1"/>` 父组件需要通过templates标签绑定`v-slot:name`的属性，来指定传入哪个插槽里。
 ```vue
// 父组件中：
<Category>
  <template slot="center">
    <div>html结构1</div>
  </template>
  <template v-slot:footer>
     <div>html结构2</div>
  </template>
</Category>

// 子组件中：
<template>
  <div>
     <!-- 定义插槽 -->
     <slot name="center">插槽默认内容...</slot>
     <slot name="footer">插槽默认内容...</slot>
  </div>
</template>
```
5. 作用域插槽：子组件去维护自己的数据与结构，界面结构由父组件决定。子传父`<slot :game="games" />`，父接收是templates标签绑定`slot-scope="scopeData"`的属性。

 ```vue
// 父组件中：
<Category>
    <template slot-scope="scopeData">
        <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
    </template>
</Category>

// 子组件中：
<template>
    <div>
        <slot :games="games"></slot>
    </div>
</template>
<script>
 export default {
     name:'Category',
     data() {//数据在子组件自身
         return { games:['红色警戒','穿越火线','劲舞团','超级玛丽'] }
     },
 }
</script>
```
### Vuex是什么？
1. 是什么：状态管理库，对vue中多个组件的共享状态进行集中式的管理，是一种组件间通信的方式，且适用于任意组件间通信。
2. 主要由`State、Mutations、Actions、Getter、Module`构成。它在全局拥有一个`State`存放数据，当组件要修改数据时候，必须通过`Mutation`进行。而有异步操作的时候，就需要走`Action`，但`Action`也是无法直接修改`State`，还得通过`Mutation`。
3. State: 定义了应用状态的数据结构，可以在这里设置默认的初始状态；
4. Getter: 对state数据的一个过滤和加工。getters就像计算属性一样，getter返回值会根据它的依赖被缓存起来
5. Mutations：修改state的数据，是唯一更新store中状态的方法，只能进行同步操作`this.store.commit("mutations中方法名", 数据)`
6. Actions: 响应组件中用户的动作，可以请求接口，通过`this.store.dispatch("actions中方法名",数据)`触发
7. Module: 允许将单一的store拆分成多个store，并同时保存在单一的状态树中。
8. Vuex和localStorage的区别？① `localstorage`则以文件的方式存储在本地，数据持久存储。只能存储字符串类型的数据，存储对象需要JSON的`stringify`和`parse`方法进行处理；② `Vuex`存储在内存中,一刷新数据就丢失，可以使用`vuex-persist`插件。
### vue-router
1. 为什么需要路由？ 因为用Vue做的都是单页应用,它只有一个完整的页面，在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。它在更新视图而不重新请求页面。
2. `param`配置路由格式：`/router/:id`，传递后形成的路径：`/router/123`
> param+to字符串方式：`<router-link :to="'/user/'+userId" replace>用户</router-link>`   
> param+to对象方式：`<router-link :to="{ name: 'users', params: { uname: wade }}">按钮</router-link>`   
> router跳转：`this.$router.push({name:'users',params:{uname:wade}})`
> 参数获取：通过 $route.params.userid`获取传递的值
3. `query`配置路由格式：`/router`，传递后形成的路径：`/route?id=123`
> query+to字符串方式：`<router-link :to="/user?uname=james">跳转</router-link>`  
> query+to对象方式：`<router-link :to="{ path: '/user', query: { uname:james }}">按钮</router-link>`   
> router跳转：`this.$router.push({ path: '/user', query:{ uname:james }})`
> 参数获取：通过 $route.query.userid 获取传递的值
4. `$route`：路由信息对象，每个组件都有自己的`$route`属性，里面存储着自己的路由信息如：`path query params hash name`等
5. `$router`:路由实例，整个应用只有一个`router`,用法：`this.$router.go(); router.afterEach; this.$router.push({...})`
6. 缓存路由组件：用`keep-alive`来缓存页面，当组件在`keep-alive`内被切换时组件的`activated、deactivated`这两个生命周期钩子函数会被执行。
7. 路由守卫：对路由进行权限控制。分类：全局守卫、独享守卫、组件内守卫;
> a. 全局守卫: router.beforeEach()前置守卫； beforeResolved():解析守卫；brforeRouteEnter()之后调用；router.afterEach()后置守卫；  
> b. 独享守卫：beforeEnter()为某些路由单独配置守卫；    
> c. 组件内守卫：beforeRouteEnter()进入组件前触发； beforeRouteLeave()离开组件被调用

```js
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
    console.log('beforeEach',to,from)
    if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
        if(...){ //权限控制的具体规则
           next() //放行
        }else{
           alert('暂无权限查看')
        }
    }else{
        next() //放行
    }
})
```
### keep-alive，具体缓存的是什么？
1. 是什么：不让组件重新加载，直接保留在内存中。它有`include exclude max`属性，`include`是匹配名称的组件才会被缓存；`exclude`是匹配名称的组件不会被缓存；max 数字，最多可以缓存多少组件实例。
2. 设置`keep-alive`缓存的组件，会多出两个生命周期钩子（`activated deactivated`)。`activated`路由组件被激活时触发；`deactivated`路由组件失活时触发；
3. 首次进入时：beforeRouteEnter - beforeCreate - created - beforeMount - mounted - activated ...-beforeRouteLeave - deactivated
4. 再次进入时：beforeRouteEnter - activated ...-beforeRouteLeave - deactivated
```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
 ```
### 什么是 mixin
1. 是什么:是一个js对象，包含我们组件中任意功能选项，如`data、components、methods、created、computed`等等；可以把组件的公共逻辑提取出来传入mixins选项中。当组件使用 mixins对象时，mixins对象的选项都将被混入该组件本身的选项中来，目的是减少代码冗余度，方便后续维护;
2. 选项合并：mixin与组件的配置合并后，命名有冲突了分为两种情况；① 生命周期函数：生命周期函数合并后执行顺序是先执行mixin中的，后执行组件的；② data、方法：组件中的data数据、methods会覆盖mixin中数据
3. 用法：`import { mixins } from "./mixin/index";mixins:['xxx']`
4. 优点：提高代码复用性，维护方便
5. 缺点：变量来源不明确，不利于阅读；多mixin 可能会造成命名冲突；mixin 和组件可能出现多对多的关系，复杂度较高
6. `mixin与Vuex`区别：不同组件中的Mixin是相互独立的，Mixin中的数据和方法都是独立的，组件之间使用后是互相不影响的。Vuex则不一样，它是公共状态管理，在一个组件中更改了Vuex中的某个数据，其它所有引用了Vuex中该数据的组件也会跟着变化

### 动态、异步组件
1. 动态组件是什么：需要根据数据，动态渲染的场景，组件类型不确定使用。
2. 动态组件使用：`<div v-for="(val, key) in newsData" :key="key"><component :is="val.type'/></div>`
3. 异步组件是什么：使用`import()`函数按需加载，去异步加载大组件，是常用的性能优化。
4. 异步组件使用：`components:{FormDemo: () => import('@/BaseUse/FormDemo")}`
### 对SSR的理解
1. SSR 也就是服务端渲染，也就是在服务器端将Vue组件渲染为HTML字符串，然后再把HTML直接返回给客户端。
2. 优点：SSR 有着更好的SEO,首屏加载速度更快
### 链接
[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH/?spm_id_from=333.337.search-card.all.click&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)