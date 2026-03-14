---
title: rbac权限控制的实现
isTimeLine: true
date: 2026-01-17
category:
  - 前端
tag:
  - JavaScript 
  - Vue
---
### 场景
1. 不同账号需要展示不同的菜单；比如分析人员可以看到分析相关仪器、试剂，看不到报告管理相关菜单。
2. 还有一种是是页面中的某些功能，比如是业务员可以申请核销发票，没有审批按钮，而财务有这种功能权限。
### 解决方案：RBAC
1. 传统的权限设计是对每个人进行单独的权限设置，但这种方式已经不适合目前企业的高效管控权限的发展需求。
2. RBAC（`Role-Based Access Control`）基于角色的权限分配解决方法，它是在人与权限之前加一个角色的中间层，想对某个用户设置权限，就对该用户设置对应的角色就可。
3. 就是做角色与权限的映射关系，为角色分配权限。
### 难点
1. 在前端写好所有路由，通过路由的mate属性标记权照，每次路由跳转在全局路由守卫中去每次判断。
2. 页面后面越来越多，而是根据后端返回角色名称以及对应的菜单数据动态加载出来。
### 路由权限实现
#### 整体思路
1. 新建角色，为角色分配权限，为用户分配角色
    - 在权限管理页面，新建一个角色比如`analyser`，多选对应功能模块，比如样品管理、样品分样等页面；最后再给用户这只角色。会将新增角色权限信息发送给后端
2. 初始化的时候先挂载不需要权限的路由，比如登录、404页面等
3.   当输入地址进行路由跳转时，进入页面之前全局路由守卫会进行拦截;
    - 在里面获取`token`->获取用户信息、有权限访问的路由。
    - 先判断`token`是否存在，如果不存在就跳到登录页面; 
    - 如果`token`存在则判断是否有用户信息, 没有就发送接口请求用户的信息、角色、有权限的菜单等数据
4. 根据后端返回给当前用户私有的菜单，生成路由信息格式数组，再把它vuex存储起来
    - 主要是根据`GenerateRoutes`这个方法传入菜单数组，再调用`generator`方法将后端返回的结构转化成符合格式的路由，
    - 比如生成`name、path、meta、component`动态路由，`path`路径也得到了拼接补充。
    - 获取到菜单格式：`{ name:'sampleStability'，text:"样本稳定性",  icon，children: [] }`
    - 转化为路由格式：`{ name: 'sampleStability', path:'app/modules/sampleStability', meta:{keepAlive": true, "title": "样本稳定性", icon}, component: ()=> import('@/modules/sampleStability');}`
5. 全局路由守卫有了公共路由与动态路由，调用`addRoutes`添加路由
6. 判断输入地址的是否有权限，有的话跳转到对应页面，没有的话跳到403页面
7. 满足条件都得调用`next()`, 它与node的中间件类似，有放行的意思。
```js
// src/permission.js
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
const whiteList = ['/login', '/404'] // 白名单
router.beforeEach(async(to, from, next) => {
  // 1. 获取token
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 2. 检查用户权限
      const hasRoles = store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 3. 获取用户信息
          const { roles } = await store.dispatch('user/getUserInfo')
          // 4. 生成动态路由
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes', 
            roles
          )
          router.addRoutes(accessRoutes) // 5. 添加路由
          next({ ...to, replace: true })  // 6. 继续导航
        } catch (error) {
          // 错误处理
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
```
#### 遇到的问题、坑点
1. 处理当登出页面时，路由不正确的问题，当我们登出操作之后，虽然看不到菜单，但是用户实际上可以访问页面，直接在地址栏输入地址就能访问。
    - 解决：当我们登出操作之后，除了清除个人缓存，还要将路由重新实例化，相当于换了一个新的路由`const newRouter = createRouter()`
2. 在页面刷新的时候，本来应该拥有权限的页面出现了404
    - 解决：因为404的匹配权限放在了静态路由，而动态路由在没有addRoutes之前，找不到对应的地址，就会显示404，所以需要将404放置到动态路由的最后`router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])`
#### 实现难点-递归生成路由
1. 存放筛选权限路由的逻辑，难点是路由是多级的，需要获取扁平的路由数组或者递归去匹配。
2. 由`{ name:'sampleStability'，text:"样本稳定性",  icon，children: [] }`
转为`{ name: 'sampleStability', path:'app/modules/sampleStability', meta:{keepAlive": true, "title": "样本稳定性", icon}, component: ()=> import('@/modules/sampleStability');}`
```js
// src/store/modules/permission.js
import { asyncRoutes, constantRoutes } from '@/router'
//menus:是当前用户的所拥有的菜单权限 
//asyncRoutes:是所有的动态路由;constantRoutes:所有人默认拥有静态路由
const state = {
  routes: [],
  addRoutes: []
}
// 更新路由 在静态路由的基础上进行追加动态路由
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
// 筛选出动态路由中和menus中能够对上的路由
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 得到的accessedRoutes是所有模块中满足权限要求的路由数组
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

// 路由过滤函数 是一个递归，因为路由可能是多级的,children下面可能还有children
function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
// 根据route.meta.roles的标识去匹配
function hasPermission(roles, route) {
  if (route.meta?.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```
### 按钮权限实现
1. 通过自定义指令，传入权限点，如果判断没有权限使用`el.parantNode.removechild(el)`移除按钮即可
2. 自定义指令文件实现:
    - v-hasPermi 指令：主要是在页面元素的挂载阶段`（inserted、update）`根据roles数组是否包含传入值，来检查用户的权限
    - 如果用户没有操作权限，那么用`el.parentNode.removeChild(el)`移除对应的页面元素比如某个按钮。 
```js
// src/directives/permission.js
import store from '@/store'
function checkPermission(el, binding) {
  const { value } = binding
  const roles = store.getters && store.getters.roles
  //根据roles数组是否包含传入值，来检查用户的权限
  if (value && value instanceof Array) {
    // 如果用户没有操作权限，那么移除对应的页面元素比如某个按钮
    if (value.length > 0) {
      const hasPermission = roles.some(role => value.includes(role))
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    }
  } else {
    throw new Error(`需要 roles 数组! 如 v-permission="['admin']"`)
  }
}
export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
```
3. 注册指令，使用指令
```js
// 注册指令
import permission from './directives/permission'  
Vue.directive('permission', permission)
// 使用指令
<Button v-hasPermi="['fm-bill-submit']">提交财务</el-button>
<Button v-hasPermi="['fm-bill-confirm']">审核</el-button>
```

