---
title: Vue3核心语法
isTimeLine: true
date: 2025-09-12
category:
  - 前端
tag:
  - JavaScript
  - Vue
---
### vue2与vue3的区别？
1. vue3有性能的提升(打包大小减少，初次渲染、更新渲染等快很多)；
2. 源码变化（proxy代替defineProperty实现响应式，重写虚拟Dom的实现）；
3. vue3支持ts；
4. vue3有了很多新特性，比如setup;ref与reactive;computed与watch等等新的。
### 基于vite创建
1. vite是什么？ 新一代前端构建工具，特点是①极速的服务启动，因为热重载（HMR）；②对ts jsx css开箱即用； ③ 真正的按需编译，无需等待整个应用编译完成。
2. 用vite创建vue3工程`npm create vue@latest`
3. 具体配置:配置项目名称以及选择`是否ts支持、路由、pinia、eslint语法检查、prettier代码格式化`等
4. 启动:`npm run dev`
5. src文件夹：main.ts、App.vue、components文件夹
```js
// 入口文件，引入CreateApp用于创建应用
import {createApp} from Vue
// 引入App根组件
import App from './App.vue'
// 创建一个应用实例，挂载到#app节点上
createApp(App).mount('#app')
```
### Vue Composition API？
1. vue2是Options(配置)风格，它的数据、方法是分散在`data、methods、computed`中的，若增加一个需要，则分别要修改`data、methods、computed`，不利于维护与复用。
2. vue3是Composition(组合)风格，可以让相关功能的代码更有序的组织在一起。
### setup
1. 是什么？是vue3的一个新的配置项，值是一个函数，是`composition`的基础，组件的数据、方法、计算属性 watch、生命周期等都在配置在setup中。
2. 特点？① setup函数返回的对象可在模板直接使用；② setup的this与vue2的this不同，this为undefined；③ setup领先所有钩子执行。
3. 返回值：① 若返回一个对象：则对象中的：属性、方法等，在模板中均可以直接使用；② 若返回一个函数：则可以自定义渲染内容；③ 如果用setup语法糖，这时就不需要写setup函数，返回值也不会return。
### ref、reactive函数
1. ref是基本类型的响应式数据,其实`ref`接收的数据可以是：基本类型、对象类型。
2. ref语法：`let name = ref('tom')`；打印返回值是一个RefImpl的实例对象，ref对象的value属性是响应式的。在js操作数据需要写XX.value，模板无需写XX.value。
3. reactive语法：`let peoson = reactive({name:'tom'})`；打印返回值是一个proxy的实例对象，是一个响应式对象；
4. reactive定义的数据是深层次的，数组可以直接修改下标。并且不能修改一整个对象，会失去响应式，而是使用`Object.assign(xxx, {})`
5. ref与reactive对区别
> a. 定义的数据类型：ref定义基本类型、对象类型；reactive定义对象类型；   
> b. 从语法上：ref定义的操作数据需要`.value`，模板中直接读取则不需要；reactive定义的操作数据与读取数据，都不需要`.value`；    
> c. 使用原则：若需要一个基本类型的响应式数据，必须使用`ref`；若需要一个响应式对象，层级不深则`ref reactive`都可以；若需要一个响应式对象，且层级较深，则使用`reactive`；    
> d. 原理上：ref通过`Object.defineProperty()`的`setter getter`来实现响应式；reactive通过使用`Proxy`来实现响应式，并通过`reflect`操作源对象内部的数据。   
### customRef
1. 作用：创建一个自定义的`ref`，并对其依赖项跟踪和更新触发进行逻辑控制。
2. 写法：`customRef((track, trigger)=>{return{ get(){}, set() }})`。`track`是跟踪，告诉vue这个数据要持续关注，一旦有变化就需要更新；`trigger`是触发，通知vue数据变化了
3. 例子：用`customRef`定义响应式数据的，数据一变，页面1s才更新。
```js
// 1 useMsgRef.js
import { customRef } from "vue";
export default function(initValue:string,delay:number){
  let timer:number
  // 使用Vue提供的customRef定义响应式数据： track(跟踪)、trigger(触发)
  let msg = customRef((track,trigger)=>{
    return {
      get(){
        track() //告诉Vue数据msg很重要，你要对msg进行持续关注，一旦msg变化就去更新
        return initValue
      },
      set(value){
        clearTimeout(timer)
        timer = setTimeout(() => {
          initValue = value
          trigger() //通知Vue一下数据msg变化了
        }, delay);
      }
    }
  })
  return { msg }
}
// 2 使用自定义ref
<script setup lang="ts" name="App">
    import {ref} from 'vue'
    import useMsgRef from './useMsgRef'
    let {msg} = useMsgRef('你好',2000)
</script>
```
### computed
1. 根据已有的数据计算出新数据
2. 格式：computed函数传入的是函数；如果要即读取又修改，那么需要传入的是对象，包含get、set方法，主要是在里面获取、修改数据。

```js
setup() {
  const firstName = ref('张');
  const lastName = ref('三');
  let abbreviatedName = computed(
    () => `${firstName.value.charAt(0)}. ${lastName.value}`
  );
}
// vue2写法
computed:{ fullName(){ return this.firstName + '-' + this.lastName } }
```
### watch
1. 作用：监视数据的变化`watch(sum, (newValue, oldValue)=>{})`
2. 特点：只能监视以下四种数据：① ref定义的数据 ② reactive定义的数据 ③ 函数返回一个值（getter函数）④一个包括类上面类型的数组；
3. watchEffect：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。`watchEffect(()=>{if(temp.value >= 50 || height.value >= 20){})`
4. watch对比watchEffect： `watch`要明确指出监视的数据；`watchEffect` ：不用明确指出监视的数据，函数中用到哪些属性，那就监视哪些属性；
```js
<script lang="ts" setup name="Person">
  import {ref,watch} from 'vue'
  let sum = ref(0)
  let person = ref({
    name:'张三',
    age:18
  })
  // 1 监视ref定义的基本类型
  const stopWatch = watch(sum,(newValue,oldValue)=>{
    if(newValue >= 10){... }
  })
  // 2 监视ref定义的对象类型,需要手动开启深度监视
  // 3 监视reactive定义的对象类型，是默认是开启深度监视的
  watch(person,(newValue,oldValue)=>{
    console.log('person变化了',newValue,oldValue)
  },{deep:true})
  // 4 监视ref或reactive的对象类型数据的属性，则该属性不是直接写person.name，而是()=>person.name；
  watch(()=> person.name,(newValue,oldValue)=>{
    console.log('person.name变化了',newValue,oldValue)
  })
</script>
```
```js
// 例子：室温达到50℃，或水位达到20cm，就...
// 1 watch可以监听一个的数组，室温与水位数据放在数组中
watch([temp, height],(value)=>{const [newTemp,newHeight] = value; ...})
// 2 用watchEffect实现，不用明确指出监视的数据。
const stopWtach = watchEffect(()=>{
    if(temp.value >= 50 || height.value >= 20){
      ...
    }
})
```
### 生命周期
生命周期分为四个阶段：创建 挂载 更新 销毁
### Vue2的生命周期
1. 创建阶段：beforeCreate、created
2. 挂载阶段：beforeMount、mounted
3. 更新阶段：beforeUpdate、updated
4. 销毁阶段：beforeDestroy、destroyed
5. 写法：`mounted(){}`
### Vue3的生命周期
1. 创建阶段：setup
2. 挂载阶段：onBeforeMount、onMounted
3. 更新阶段：onBeforeUpdate、onUpdated
4. 卸载阶段：onbeforeUnmount、onUnmounted
5. 写法：`onMounted(()=>{})`
### 自定义hook
1. 什么是hook?本质是一个函数，把setup的组合式API进行封装，类似vue2的mixin；它里面可以用生命周期、计算属性等，返回变量与方法。命名通常是useXXX格式。
2. 优点是什么？复用代码，让setup的逻辑更加清晰易懂
```js
// 1 useSum.js文件定义
import {ref,onMounted} from 'vue'
export default function(){
  let sum = ref(0)
  const increment = ()=>{
    sum.value += 1
  }
  const decrement = ()=>{
    sum.value -= 1
  }
  // 里面可以用生命周期、计算属性等
  onMounted(()=>{
    increment()
  })
  //向外部暴露数据
  return {sum,increment,decrement}
}
// 2 组件使用
<script setup lang="ts">
  import useSum from './hooks/useSum'
  let {sum,increment,decrement} = useSum()
</script>
```
### 组件通信
1. 父子组件：`props 自定义事件`、`$refs $parent` 
2. 兄弟，任意组件：`pinia`、`mitt`
3. 祖传孙，孙传祖：`$attrs`、`provide inject`
4. `Vue3`组件通信和`Vue2`的区别：① `$listeners`所有的东西，合并到`$attrs`中了；② `mitt`代替事件总线；③ `vuex`换成了`pinia`。

### 自定义事件
1. `props`是使用频率最高的函数，主要是父传子。使用：父传递数据`<Child :car="car" :getToy="getToy">`；子接收数据`defineProps(['car','getToy'])`；
2. 自定义事件常用于子传父。
3. 原生事件：事件名是特定的`click`、`mosueenter`等等，事件对象`$event`: 是包含事件相关信息的对象（如`pageX`、`pageY`、`target`、`keyCode`）
4. 自定义事件：事件名是自定义的，事件对象`$event` : 是调用`emit`时所提供的数据，可以是任意类型。
5. 子组件：声明自定义事件，并在合适的时机去emit触发事件。声明：`const emit = definedEmits(['send-toy']) `，调用: `<button @click="emit('send-toy',toy)">测试</button>`
6. 父组件：给子组件绑定自定义事件，并写出自定义事件的回调函数。绑定:`<Child @send-toy="saveToy()">`

```js
// 1 父组件：给子组件绑定自定义事件
<template>
  <div class="father">
    <h3>父组件</h3>
    <!-- 给子组件Child绑定事件 -->
    <Child @send-toy="saveToy"/>
  </div>
</template>
<script setup lang="ts" name="Father">
    import Child from './Child.vue'
    import { ref } from "vue";
    let toy = ref('')
    // 用于保存传递过来的数据
    function saveToy(value:string){
        toy.value = value
    }
</script>
// 2 子组件：声明自定义事件，并在合适的时机去emit触发事件。
<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具：{{ toy }}</h4>
    <button @click="emit('send-toy',toy)">测试</button>
  </div>
</template>
<script setup lang="ts" name="Child">
    import { ref } from "vue";
    let toy = ref('奥特曼')
    // 声明事件
    const emit = defineEmits(['send-toy'])
</script>
```
### mitt
1. 取代事件总线，与消息发布订阅功能类似，可以实现任意组件的通信。
2. 接收数据的：提前绑定好事件（提前订阅消息）`emitter.on('test1', (value)={})`
3. 提供数据的：在合适的时候触发事件（发布消息）`emitter.emit('test1', value)`

```js
// 引入mitt 
import mitt from "mitt";
// 创建emitter 调用mitt得到emitter，然后绑定事件、触发事件
const emitter = mitt()
// 绑定事件
emitter.on('abc',(value)=>{
  console.log('abc事件被触发',value)
})
setInterval(() => {
  // 触发事件
  emitter.emit('abc',666)
}, 1000);
// 解绑事件 emitter.off('abc')
// 创建并暴露mitt
export default emitter
```
### pinia
1. 符合直觉的vue3状态管理器，取代了Vue2的Vuex集中式状态管理。
2. 核心特点：简洁API、去除了`Mutations`、模块化天然支持、极致`TypeScript`友好，直接通过`Actions`处理同步异步逻辑。
3. 引入: ①引入`import { createPinia } from 'pinia'`； ②创建`const pinia = createPinia()`；③使用插件`app.use(pinia)`。
4. `Store`是一个保存：状态、业务逻辑的实体，每个组件都可以读取、写入它。它有三个概念：`state getter action`，没有了`Mutations`。
5. `State`：通过ref或reactive实现，直接修改自动触发更新
6. `Getters`:当state的值需要经过处理后再使用时，可以在getter配置，类似于computed的功能,可以缓存数据。
7. `Actions`：同步/异步均可，无需区分Mutation和Action，通过this访问其他Actions
8. `storeToRefs`：将store的数据转为ref对象，方便在模板使用。不直接使用toRefs,是因为toRefs会转化store所有内容，方法也是。一般pinia用storeToRefs。

```js
// 1 `src/store/count.ts`
// 引入defineStore用于创建store
import {defineStore} from 'pinia'
// 定义并暴露一个store
export const useCountStore = defineStore('count',{
  state(){
    return {
      sum:6,
      school:'',
    }
  },
  // 修改数据
  actions: {
    increment(value:number) {
      if (this.sum < 10) {
        this.sum += value
      }
    },
    decrement(value:number){
      if(this.sum > 1){
        this.sum -= value
      }
    }
  },
  // 计算：当state的值需要经过处理后再使用时
  getters:{
     bigSum:(state):number => state.sum *10,
     upperSchool():string{
      return this.school.toUpperCase()
    }
  }
})

// 组件使用
<script setup lang="ts" name="Count">
    // 引入对应的useXxxxxStore	
    import { useCountStore } from '@/store/sum'
    // 调用useXxxxxStore得到对应的store
    const countStore = useCountStore()
    const {increment,decrement} = countStore;
    // 使用storeToRefs转换countStore，解构出ref对象
    const {sum,school,bigSum,upperSchool} = storeToRefs(countStore)
    countStore.sum = 666 //第一种修改方式，直接修改
    countStore.$patch({ // 第二种修改方式：批量修改 
        sum:999,
        school:'XX'
    })
    countStore.increment(n.value)//第三种修改方式：借助`action`修改
</script>
```
### 路由
1. route:路由是一组key-value对应关系 `{path:'/home', component:Home}`
2. router: 多个路由是由路由器管理的，用户点击导航区，浏览器路径会发生变化。这时候会被路由器检测到，路由器会根据规则进行匹配，根据路径找到对应的组件，最后再展示在页面上。
3. 路由组件与一般组件区别？ ①位置：路由组件通常存放在`pages`或`views`文件夹，一般组件通常存放在`components`文件夹。② 路由组件一般是靠路由规则渲染出来的，一般组件是手写出来的，比如`<Demo />`。
### 路由实例
1. 引入路由器`import {createRouter} from 'vue-router' const router = createRouter({})`
2. 制定路由具体规则，包括什么路径对应什么组件。`routes:[{path:'/home', component:Home}]`
3. 生成一个一个路由组件`Home.vue、News.vue`
4. 入口文件引入路由器`app.use(router)`
```js
// 第一步：引入createRouter
import {createRouter,createWebHistory,createWebHashHistory} from 'vue-router'
// 引入一个一个可能要呈现组件
import Home from '@/pages/Home.vue'
import News from '@/pages/News.vue'
import About from '@/pages/About.vue'
import Detail from '@/pages/Detail.vue'

// 第二步：创建路由器
const router = createRouter({
  history:createWebHistory(), //路由器的工作模式,一种hash 一种history
  routes:[ //一个一个的路由规则
    {
      name:'zhuye',
      path:'/home',
      component:Home
    },
    {
      name:'xinwen',//命名路由
      path:'/news',
      component:News,
      children:[//嵌套路由
        {
          name:'xiang',
          // path:'detail', //query参数
          path:'detail/:id/:title/:content?',//params参数路由规则需要提前占位
          component:Detail
        }
      ]
    },
    {
      name:'guanyu',
      path:'/about',
      component:About
    }
  ]
})

// 暴露出去router
export default router
```
### 路由模式？
1. history：不带#，url更加美观，问题是需要配合后端处理路径问题不然刷新有404问题；写法：①vue2 `mode:'history'` ② vue3 `history:createWebHistory()`；
2. hash：url带#, 但是兼容性更好，无需服务端配合处理路径。但是seo较差。一般是后台系统使用。
### 路由传参
1. 嵌套路由的path无需带/，如详情页面: `routes:[{path:'/news', component:News, children:[{name:'xiang',path:'detail', component:Detail}]}]`
2. query参数（to字符串写法）`to="/news/detail?id=1&title=2"`
2. params参数（to字符串写法）`to="/news/detail/1/2"`,路由规则需要提前占位,如上面例子
3. query参数（to对象写法）`:to="{path:'/news/detail', query:{id: news.id, title: news.title}}"`
4. params参数（to对象写法）`:to="{name:'xiang', params:{id: news.id, title: news.title}}"`传递params参数时，需要提前在规则中占位。若使用to的对象写法，必须使用name配置项。
5. 如何接收参数：`import {useRoute} from 'vue-router'; const route = useRoute()`
### 编程式导航
路由组件的两个重要的属性：`$route`和`$router`变成了两个`hooks`
```js
import {useRoute,useRouter} from 'vue-router'
const route = useRoute()//useRoute 路由规则
const router = useRouter()//useRouter 路由器
console.log(route.query)
console.log(route.parmas)
interface NewsInter {
  id:string,
  title:string,
  content:string
}
// 点击跳转到新闻详情页 router.replace({ })
function showNewsDetail(news:NewsInter){
  router.replace({ 
    name:'xiang',
    query:{
      id:news.id,
      title:news.title,
      content:news.content
    }
  })
}
```
### slot
1. 作用域插槽写法有变化，vue2的是`slot-scope`，vue3是`v-slot` 或 `#` 简写
2. 父要拿到子的数据，需要子传父，写法是`<slot :game="games" />`；
3. 父接收是`v-slot:default="params"`，params是对象，接收所有的数据。
```js
// 父组件中：
//params 接收所有的数据
<Game v-slot:default="params">
<!-- <Game #default="params"> -->
    <ul>
      <li v-for="g in params.games" :key="g.id">{{ g.name }}</li>
    </ul>
</Game>
// 子组件中：
<template>
<div class="category">
  <h2>今日游戏榜单</h2>
  <slot :games="games"></slot>
</div>
</template>
<script setup lang="ts" name="Category">
    import {reactive} from 'vue'
    let games = reactive([
      {id:'asgdytsa01',name:'英雄联盟'},
      {id:'asgdytsa02',name:'王者荣耀'},
      {id:'asgdytsa03',name:'红色警戒'},
      {id:'asgdytsa04',name:'斗罗大陆'}
    ])
</script>
```
### 其他API
### shallowRef shallowReactive
1. shallowRef：创建一个响应式数据，但是只对顶层进行响应式处理`let myVar = shallowRef(initialValue);`
2. shallowReactive：创建一个浅层响应式对象，只有对象的最顶层属性变成响应式的`const myObj = shallowReactive({ ... });`
3. 通过使用`shallowRef() 和 shallowReactive()`来绕开深度响应。所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得更快，可提升性能。
### readonly shallowReadonly
1. readonly：创建一个对象的深度只读副本。`const original = reactive({ ... }); const readOnlyCopy = readonly(original);`对象的所有嵌套属性都将变为只读。任何尝试修改这个对象的操作都会被阻止。应用场景是保护全局状态或配置不被修改。
2. shallowReadonly：创建一个对象的顶层只读副本。只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的。
### toRaw markRaw
1. toRaw:获取一个对象的原始对象，它返回的对象不再是响应式的，不会触发视图的更新。何时使用？ 在需要将响应式对象传递给非 `Vue` 的库或外部系统时，使用 `toRaw` 可以确保它们收到的是普通对象
2. markRaw：标记一个对象，使其永远不会变成响应式的。例如使用`mockjs`时，为了防止误把`mockjs`变为响应式对象，可以使用 `markRaw` 去标记`mockjs`
### 新组件
1. Teleport：是一种能够将我们的组件html结构移动到指定位置的技术。如弹窗位置，就可以用这个指定body顶层`teleport to='body'>...</teleport>`
2. Suspense：等待异步组件时渲染一些额外内容，让应用有更好的用户体验。使用场景：①异步引入组件 ②使用`Suspense`包裹组件，并配置好`default` 与 `fallback`
```js
<teleport to='body' >
    <div class="modal" v-show="isShow">
      <h2>我是一个弹窗</h2>
      <p>我是弹窗中的一些内容</p>
      <button @click="isShow = false">关闭弹窗</button>
    </div>
</teleport>
```
```js
import { defineAsyncComponent,Suspense } from "vue";
const Child = defineAsyncComponent(()=>import('./Child.vue'))
<template>
    <div class="app">
        <h3>我是App组件</h3>
        <Suspense>
          <template v-slot:default>
            <Child/> //异步组件
          </template>
          <template v-slot:fallback>
            <h3>加载中...</h3> //渲染一些额外内容
          </template>
        </Suspense>
    </div>
</template>
```
### 链接
[尚硅谷Vue3入门到实战，最新版vue3+TypeScript前端开发教程](https://www.bilibili.com/video/BV1Za4y1r7KE/?spm_id_from=333.1387.search.video_card.click&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)
