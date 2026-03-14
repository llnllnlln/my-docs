---
title: vue解读源码之模板渲染
isTimeLine: true
date: 2025-09-21
category:
  - 前端
tag:
  - Vue
  - 源码
---
## 模板渲染原理
### 组件挂载入口
1. `src/init.js`
2. `$mount return mountComponent(vm, el)`; 将当前组件实例挂载到真实的el节点上面
### 组件挂载核心方法
1. `mountComponent(vm._update(vm._render()))`
2. _update和._render方法都是挂载在Vue原型的方法
3. 调用`render`函数,生成虚拟dom,
4. 使用`vm._update()`方法把虚拟dom渲染到页面
### render函数转化成虚拟dom 
核心方法_render
1. `src/vdom/index.js`
2. `renderMixin(){Vue.prototype._render,Vue.prototype._c,Vue.prototype._v ,Vue.prototype._s}`
3. `class Vnode{}`：定义Vnode类
4. `createElement/createTextNode`: 创建元素vnode、文本vnode
### 虚拟dom转化成真实dom 
1. 核心方法`_update(src/vdom/index.js src/vdom/patch.js) `
2. `lifecycleMixin`把_update挂载到vue原型上
3. `patch`用来渲染和更新视图，渲染vnode转成真实dom
4. `createElm`创建真实dom节点，解析虚拟dom属性, 插入到老的el节点的后面,删除老的el节点
```js
//模板渲染原理
// 1 src/init.js 组件挂载入口
Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    // 如果不存在render属性
    if (!options.render) {
        // 如果存在template属性
        let template = options.template;
        if (!template && el) {
            // 如果不存在render和template 但是存在el属性 直接将模板赋值到el所在的外层html结构（就是el本身 并不是父元素）
            template = el.outerHTML;
        }
        // 最终需要把tempalte模板转化成render函数
        if (template) {
            const render = compileToFunctions(template);
            options.render = render;
        }
    }
    // 将当前组件实例挂载到真实的el节点上面
    return mountComponent(vm, el);
};
//// src/lifecycle.js
//2 组件挂载核心方法 mountComponent
function mountComponent(vm, el) {
    // 上一步模板编译解析生成了render函数
    // 下一步就是执行vm._render()方法 调用生成的render函数 生成虚拟dom,最后使用vm._update()方法把虚拟dom渲染到页面
    // 真实的el选项赋值给实例的$el属性 为之后虚拟dom产生的新的dom替换老的dom做铺垫
    vm.$el = el;
    //_update和._render方法都是挂载在Vue原型的方法  类似_init
    vm._update(vm._render());
}
// src/vdom/index.js
//3 render 函数转化成虚拟 dom 核心方法 _render
function renderMixin(Vue) {
    Vue.prototype._render = function () {
        const vm = this;
        // 获取模板编译生成的render方法
        const { render } = vm.$options;
        // 生成vnode--虚拟dom
        const vnode = render.call(vm);
        return vnode;
    };
    Vue.prototype._c = function (...args) {
        return createElement(...args);// 创建虚拟dom元素
    };
    Vue.prototype._v = function (text) {
        return createTextNode(text); // 创建虚拟dom文本
    };
    Vue.prototype._s = function (val) {
        // 如果模板里面的是一个对象  需要JSON.stringify
        return val == null? "": typeof val === "object"? JSON.stringify(val): val;
    };
}
// src/vdom/index.js
// 定义Vnode类
class Vnode {
    constructor(tag, data, key, children, text) {
        this.tag = tag;
        this.data = data;
        this.key = key;
        this.children = children;
        this.text = text;
    }
}
// 创建元素vnode 等于render函数里面的 h=>h(App)
function createElement(tag, data = {}, ...children) {
    let key = data.key;
    return new Vnode(tag, data, key, children);
}
// 创建文本vnode
function createTextNode(text) {
    return new Vnode(undefined, undefined, undefined, undefined, text);
}
//4 虚拟 dom 转化成真实 dom 核心方法 _update
// src/vdom/index.js
function lifecycleMixin(Vue) {
    // 把_update挂载在Vue的原型
    Vue.prototype._update = function (vnode) {
        const vm = this;
        // patch是渲染vnode为真实dom核心
        patch(vm.$el, vnode);
    };
}
// src/vdom/patch.js
// patch用来渲染和更新视图 这里只有初次渲染的逻辑
//渲染vnode转成真实dom：判断是不是初次渲染->createElm创建真实dom节点，解析虚拟dom属性->插入到老的el节点的后面,删除老的el节点
function patch(oldVnode, vnode) {
    // 判断传入的oldVnode是否是一个真实元素
    // 这里很关键  初次渲染 传入的vm.$el就是咱们传入的el选项  所以是真实dom
    // 如果不是初始渲染而是视图更新的时候  vm.$el就被替换成了更新之前的老的虚拟dom
    const isRealElement = oldVnode.nodeType;
    if (isRealElement) {
        // 这里是初次渲染的逻辑
        const oldElm = oldVnode;
        const parentElm = oldElm.parentNode;
        // 将虚拟dom转化成真实dom节点
        let el = createElm(vnode);
        // 插入到 老的el节点下一个节点的前面 就相当于插入到老的el节点的后面
        // 这里不直接使用父元素appendChild是为了不破坏替换的位置
        parentElm.insertBefore(el, oldElm.nextSibling);
        // 删除老的el节点
        parentElm.removeChild(oldVnode);
        return el;
    }
}
// 虚拟dom转成真实dom 就是调用原生方法生成dom树
function createElm(vnode) {
    let { tag, data, key, children, text } = vnode;
    //   判断虚拟dom 是元素节点还是文本节点
    if (typeof tag === "string") {
        //   虚拟dom的el属性指向真实dom
        vnode.el = document.createElement(tag);
        // 解析虚拟dom属性
        updateProperties(vnode);
        // 如果有子节点就递归插入到父节点里面
        children.forEach((child) => {
            return vnode.el.appendChild(createElm(child));
        });
    } else {
        vnode.el = document.createTextNode(text); //   文本节点
    }
    return vnode.el;
}
// 解析vnode的data属性 映射到真实dom上
function updateProperties(vnode) {
    let newProps = vnode.data || {};
    let el = vnode.el; //真实节点
    for (let key in newProps) {
        // style需要特殊处理下
        if (key === "style") {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName];
            }
        } else if (key === "class") {
            el.className = newProps.class;
        } else {
        // 给这个元素添加属性 值就是对应的值
            el.setAttribute(key, newProps[key]);
        }
    }
}
```
```js
1 模板编译入口->2 解析html生存ast->3 ast转成render函数-> 4 组件挂载入口 -> 5 render函数转成虚拟dom -> 6 虚拟dom转成真实dom

1. _init()里面 initState(vm)初始化状态执行后，如果有el属性 进行模板渲染 vm.$mount(）
2. $mount挂载在Vue原型上，如果不存在render属性，则获取template或el的html结构，把tempalte模板转化成render函数compileToFunctions（）
3. parse(template)把html代码转成ast语法树
    - 利用正则匹配 html 字符串，遇到开始标签、结束标签和文本，解析完毕之后生成对应的 ast 并建立相应的父子关联
    - 不断的 advance 截取剩余的字符串，直到 html 全部解析完毕

4. generate(ast)通过ast 重新生成render函数
    - 递归children创建，跟据传入的AST拼接字符串
    - 生成如`c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))`

5. 渲染入口，$mount获取到render函数后就是mountComponent，这里注册一个渲染watcher 执行`vm._update(vm._render())`方法渲染视图
6. 把`_render`挂载在Vue的原型，vm._render()方法 调用生成的render函数 生成虚拟dom
    - _c创建虚拟dom节点
    - _v创建虚拟dom文本
    - _s 如果模板里面的是一个对象  需要JSON.stringify

7. 把`_update`挂载在Vue的原型，vm._update()方法把通过虚拟dom生成真实dom
    - patch(oldVnode, vnode),递归创建真实节点替换老的节点，初次渲染 vm._vnode不存在，通过虚拟节点，渲染出真实的dom，再赋值给$el属性
    - 更新时把上次的vnode和这次更新的vnode穿进去 进行diff算法
```