---
title: vue解读源码之Diff算法
isTimeLine: true
date: 2025-06-19
category:
  - 前端
tag:
  - Vue
---
## Diff算法
### 1. patch 核心渲染方法改写
- src/vdom/patch.js patch(){}//初次渲染 //非初次渲染
- diff只进行同级比较,如果新旧标签不一致 用新的替换旧的 oldVnode.el代表的是真实dom节点--同级比较，如果一样则比较子节点
- 根据新老 vnode 子节点不同情况分别处理
●更新属性 updateProperties（vnode, oldVnode.data）
●新老都存在子节点 updateChildren(el, oldCh, newCh);
●老的有儿子新的没有el.innerHTML = "";
●新的有儿子老的没有 el.appendChild(createElm(child));
### 2. updateProperties 更新属性
- 如果新的节点没有 需要把老的节点属性移除 老的style值置为空
- 遍历新的属性 进行增加操作(class style  setAttribute)
### 3. updateChildren 更新子节点-diff 核心方法
- 使用双指针移动来进行新老节点的对比
- 用isSameVnode 来判断新老子节点的头头 尾尾 头尾 尾头 是否是同一节点 如果满足就进行相应的移动指针(头头 尾尾)或者移动 dom 节点(头尾 尾头)操作
- 如果全都不相等 进行暴力对比 如果找到了利用 key 和 index 的映射表来移动老的子节点到前面去 如果找不到就直接插入
- 对老的子节点进行递归 patch 处理
- 最后老的子节点有多的就删掉 新的子节点有多的就添加到相应的位置
### 4. 改造原型渲染更新方法_update(lifecycleMixin())
- Vue.prototype._update = function (vnode) {}
- `if (!prevVnode) {vm.$el = patch(vm.$el, vnode);} else {vm.$el = patch(prevVnode, vnode);}`
```js
//diff算法
//1.patch 核心渲染方法改写
// src/vdom/patch.js
function patch(oldVnode, vnode) {
    const isRealElement = oldVnode.nodeType;
    if (isRealElement) {
        // oldVnode是真实dom元素 就代表初次渲染
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
    } else {
        // oldVnode是虚拟dom 就是更新过程 使用diff算法
        if (oldVnode.tag !== vnode.tag) {
            // 如果新旧标签不一致 用新的替换旧的 oldVnode.el代表的是真实dom节点--同级比较
            oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
        }
        // 如果旧节点是一个文本节点
        if (!oldVnode.tag) {
            if (oldVnode.text !== vnode.text) {
                oldVnode.el.textContent = vnode.text;
            }
        }
        // 不符合上面两种 代表标签一致 并且不是文本节点
        // 为了节点复用 所以直接把旧的虚拟dom对应的真实dom赋值给新的虚拟dom的el属性
        const el = (vnode.el = oldVnode.el);
        updateProperties(vnode, oldVnode.data); // 更新属性
        const oldCh = oldVnode.children || []; // 老的儿子
        const newCh = vnode.children || []; // 新的儿子
        if (oldCh.length > 0 && newCh.length > 0) {
            // 新老都存在子节点
            updateChildren(el, oldCh, newCh);
        } else if (oldCh.length) {
            // 老的有儿子新的没有
            el.innerHTML = "";
        } else if (newCh.length) {
            // 新的有儿子
            for (let i = 0; i < newCh.length; i++) {
                const child = newCh[i];
                el.appendChild(createElm(child));
            }
        }
    }
}
//2.updateProperties 更新属性
//src/vdom/patch.js
//解析vnode的data属性 映射到真实dom上
function updateProperties(vnode, oldProps = {}) {
    const newProps = vnode.data || {}; //新的vnode的属性
    const el = vnode.el; // 真实节点
    // 如果新的节点没有 需要把老的节点属性移除
    for (const k in oldProps) {
        if (!newProps[k]) {
            el.removeAttribute(k);
        }
    }
    // 对style样式做特殊处理 如果新的没有 需要把老的style值置为空
    const newStyle = newProps.style || {};
    const oldStyle = oldProps.style || {};
    for (const key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = "";
        }
    }
    // 遍历新的属性 进行增加操作
    for (const key in newProps) {
        if (key === "style") {
            for (const styleName in newProps.style) {
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
//3.updateChildren 更新子节点-diff 核心方法
// src/vdom/patch.js
    // 判断两个vnode的标签和key是否相同 如果相同 就可以认为是同一节点就地复用
    function isSameVnode(oldVnode, newVnode) {
        return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
    }
    //diff算法核心 采用双指针的方式 对比新老vnode的儿子节点
    function updateChildren(parent, oldCh, newCh) {
        let oldStartIndex = 0; //老儿子的起始下标
        let oldStartVnode = oldCh[0]; //老儿子的第一个节点
        let oldEndIndex = oldCh.length - 1; //老儿子的结束下标
        let oldEndVnode = oldCh[oldEndIndex]; //老儿子的起结束节点

        let newStartIndex = 0; //同上  新儿子的
        let newStartVnode = newCh[0];
        let newEndIndex = newCh.length - 1;
        let newEndVnode = newCh[newEndIndex];
        // 根据key来创建老的儿子的index映射表  类似 {'a':0,'b':1} 代表key为'a'的节点在第一个位置 key为'b'的节点在第二个位置
        function makeIndexByKey(children) {
            let map = {};
            children.forEach((item, index) => {
                map[item.key] = index;
            });
            return map;
        }
        // 生成的映射表
        let map = makeIndexByKey(oldCh);
        // 只有当新老儿子的双指标的起始位置不大于结束位置的时候  才能循环 一方停止了就需要结束循环
        while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
            // 因为暴力对比过程把移动的vnode置为 undefined 如果不存在vnode节点 直接跳过
            //a  b  c
            //b  c  e  a
            if (!oldStartVnode) {
                oldStartVnode = oldCh[++oldStartIndex];
            } else if (!oldEndVnode) {
                oldEndVnode = oldCh[--oldEndIndex];
            } else if (isSameVnode(oldStartVnode, newStartVnode)) {
                // 头和头对比 依次向后追加
                patch(oldStartVnode, newStartVnode); //递归比较儿子以及他们的子节点
                oldStartVnode = oldCh[++oldStartIndex];
                newStartVnode = newCh[++newStartIndex];
            } else if (isSameVnode(oldEndVnode, newEndVnode)) {
                //尾和尾对比 依次向前追加
                patch(oldEndVnode, newEndVnode);
                oldEndVnode = oldCh[--oldEndIndex];
                newEndVnode = newCh[--newEndIndex];
            } else if (isSameVnode(oldStartVnode, newEndVnode)) {
                // 老的头和新的尾相同 把老的头部移动到尾部
                patch(oldStartVnode, newEndVnode);
                parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling); //insertBefore可以移动或者插入真实dom
                oldStartVnode = oldCh[++oldStartIndex];
                newEndVnode = newCh[--newEndIndex];
            } else if (isSameVnode(oldEndVnode, newStartVnode)) {
                // 老的尾和新的头相同 把老的尾部移动到头部
                patch(oldEndVnode, newStartVnode);
                parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
                oldEndVnode = oldCh[--oldEndIndex];
                newStartVnode = newCh[++newStartIndex];
            } else {
               
                // 上述四种情况都不满足 那么需要暴力对比
                // 根据老的子节点的key和index的映射表 从新的开始子节点进行查找 如果可以找到就进行移动操作 如果找不到则直接进行插入
                let moveIndex = map[newStartVnode.key];
                if (!moveIndex) {
                    // 老的节点找不到  直接插入
                    parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
                } else {
                    let moveVnode = oldCh[moveIndex]; //找得到就拿到老的节点
                    oldCh[moveIndex] = undefined; //这个是占位操作 避免数组塌陷  防止老节点移动走了之后破坏了初始的映射表位置
                    parent.insertBefore(moveVnode.el, oldStartVnode.el); //把找到的节点移动到最前面
                    patch(moveVnode, newStartVnode);
                }
            }
        }
        // 如果老节点循环完毕了 但是新节点还有  证明  新节点需要被添加到头部或者尾部
        if (newStartIndex <= newEndIndex) {
            for (let i = newStartIndex; i <= newEndIndex; i++) {
                // 这是一个优化写法 insertBefore的第一个参数是null等同于appendChild作用
                const ele = newCh[newEndIndex + 1] == null ? null : newCh[newEndIndex + 1].el;
                parent.insertBefore(createElm(newCh[i]), ele);
            }
        }
        // 如果新节点循环完毕 老节点还有  证明老的节点需要直接被删除
        if (oldStartIndex <= oldEndIndex) {
            for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                let child = oldCh[i];
                if (child != undefined) {
                    parent.removeChild(child.el);
                }
            }
        }
    }
//4.改造原型渲染更新方法_update
    // src/lifecycle.js
    function lifecycleMixin(Vue) {
        // 把_update挂载在Vue的原型
        Vue.prototype._update = function (vnode) {
            const vm = this;
            const prevVnode = vm._vnode; // 保留上一次的vnode
            vm._vnode = vnode;
            if (!prevVnode) {
                // patch是渲染vnode为真实dom核心
                vm.$el = patch(vm.$el, vnode); // 初次渲染 vm._vnode肯定不存在 要通过虚拟节点 渲染出真实的dom 赋值给$el属性
            } else {
                vm.$el = patch(prevVnode, vnode); // 更新时把上次的vnode和这次更新的vnode穿进去 进行diff算法
            }
        };
    }
```
```js
diff算法 _update()->patch(){}//初次渲染 //非初次渲染->同级比较->子节点比较

diff算法是什么？是一种对比算法，根据传入的新旧虚拟dom,对比出哪些虚拟节点更改了并更新对应的真实节点，从而提高效率。

1 _update

  数据发送变化的时候，会触发setter,并且会通过Dep.notify去通知所有的订阅者Watcher，订阅者会调用`_render()`生成新的虚拟dom,再调用`_update()`实现虚拟dom创建真实dom;_update()里面会调用patch()方法进行新旧虚拟dom来对比。

2  patch()

diff是同级比较,如果新旧标签不一样，那么用新的替换旧的；如果一样则更新属性 updateProperties并比较子节点；

1. 老的有子节点，新的没有则直接删除
2. 老的没有子节点新的有，则直接appendChild添加
3. 老的有子节点新的也有；updateChildren进行比较

4 更新子节点比较

主要是用双指针移动来进行新老节点的比较。

1. 用isSameVnode(标签和key是否相同)来判断新老子节点的头头 尾尾 头尾 尾头是否同一节点，如果是则进行指针移动或者dom节点移动。
2. 如果全部不相等则进行暴力比对。利用key和index的映射表，比较并移动对应老的子节点到前面，如果找不到就插入
3. 对老的子节点进行递归的patch()处理
4. 最后老的自己子节点有多的就删除，新的子节点有多的就添加到相应的位置
```