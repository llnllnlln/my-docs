---
title: vue解读源码之模板编译
isTimeLine: true
date: 2025-06-19
category:
  - 前端
tag:
  - Vue
---
## 模板编译原理
将html变成ast语法树 ->通过ast 生成render函数
### 1 模板编译入口
- initMixin.js
1. _init函数里面执行vm.$mount(vm.$options.el);
2. 把$mount方法挂载在 Vue 原型,判断是否存在 render、template和el属性
### 2 模板转化核心方法
- src/compiler/index.js
1. compileToFunctions函数
2. let ast = parse(template); 
● let code = generate(ast); code类似 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
### 3 解析 html 并生成 ast
- src/compiler/parse.js
1. createASTElement函数: ast结构
2. parse函数: 查找<在第一个,是标签:开始标签/结束标签 ,不是是标签:文本2 判断是否开始标签->开始标签截取->匹配属性、结束符号>生成标签名和属性对象->把解析好的标签名和属性解析生成ast3 不断的 advance 截取剩余的字符串,并建立相应的父子关联
### 4 根据 ast 转化成render函数
- src/compiler/codegen.js
- _c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
1. generate函数:递归创建生成code
2. gen函数 genProps函数  处理attrs属性
3. getChildren函数生成子节点 调用gen函数进行递归创建
4. compileToFunctions ->generate->getChildren->gen->generate
5. generate->getChildren为true->gen:根据ast的type，如果是节点则generate(),否则处理普通文本和变量表达式{{}}返回 _v()->code处理attrs属性
```js
//模板编译原理:$mount 方法 最终将处理好的 template 模板转成 render 函数
// 1 initMixin.js
Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    initState(vm);// 初始化状态
    if (vm.$options.el) {
        vm.$mount(vm.$options.el);// 如果有el属性 进行模板渲染
    }
};
Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    if (!options.render) {// 如果不存在render属性
        let template = options.template; // 如果存在template属性
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
};
//2 模板转化核心方法 compileToFunctions 1 把html代码转成ast语法树 2 通过ast 重新生成代码
function compileToFunctions(template) {
    // 我们需要把html字符串变成render函数
    // 1.把html代码转成ast语法树  ast用来描述代码本身形成树结构 不仅可以描述html 也能描述css以及js语法
    // 很多库都运用到了ast 比如 webpack babel eslint等等
    let ast = parse(template);
    // 2.通过ast 重新生成代码
    // 我们最后生成的代码需要和render函数一样
    // 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
    // _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本
    let code = generate(ast);
    //  使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
    let renderFn = new Function(`with(this){return ${code}}`);
    return renderFn;
}
//3 解析 html 并生成 ast
function createASTElement(tagName, attrs) {// 生成ast方法
    return {
        tag: tagName,
        type: ELEMENT_TYPE,
        children: [],
        attrs,
        parent: null,
    };
}
// 对开始标签进行处理 对结束标签进行处理 对文本进行处理
function handleStartTag({ tagName, attrs }) {
    let element = createASTElement(tagName, attrs);
    if (!root) {
        root = element;
    }
    currentParent = element;
    stack.push(element);
}
//解析标签生成ast核心 <div>hello<span>word</span></div>
//1) 查找<在第一个,是标签:开始标签/结束标签 ,不是是标签:文本
//2) 判断是否开始标签->开始标签截取->匹配属性、结束符号>生成标签名和属性对象->把解析好的标签名和属性解析生成ast
//3) 不断的 advance 截取剩余的字符串,并建立相应的父子关联
function parse(html) {
    while (html) {
        let textEnd = html.indexOf("<");// 查找<
        // 如果<在第一个 那么证明接下来就是一个标签 不管是开始还是结束标签
        if (textEnd === 0) {// 如果开始标签解析有结果
            const startTagMatch = parseStartTag();
            if (startTagMatch) {
                handleStartTag(startTagMatch);// 把解析好的标签名和属性解析生成ast
                continue;
            }
            const endTagMatch = html.match(endTag);// 匹配结束标签</
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                handleEndTag(endTagMatch[1]);
                continue;
            }
        }
        let text;
        // 形如 hello<div></div>
        if (textEnd >= 0) {
            // 获取文本
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length);
            handleChars(text);
        }
    }
    // 匹配开始标签
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
            };
            //匹配到了开始标签 就截取掉
            advance(start[0].length);
            // 开始匹配属性，attr表示匹配的属性
            // end代表结束符号>  如果不是匹配到了结束标签
            let end, attr;
            while (
                !(end = html.match(startTagClose)) &&
                (attr = html.match(attribute))
            ) {
                advance(attr[0].length);
                attr = {
                name: attr[1],
                value: attr[3] || attr[4] || attr[5], //这里是因为正则捕获支持双引号 单引号 和无引号的属性值
                };
                match.attrs.push(attr);
            }
            if (end) {
                //   代表一个标签匹配到结束的>了 代表开始标签解析完毕
                advance(1);
                return match;
            }
        }
    }
    //截取html字符串 每次匹配到了就往前继续匹配
    function advance(n) {
        html = html.substring(n);
    }
    //   返回生成的ast
    return root;
}
//4 根据 ast 转化成render函数
//1) compileToFunctions ->generate->getChildren->gen->generate
//2) getChildren为true->gen:根据ast的type，如果是节点则generate(),否则处理普通文本和变量表达式{{}}返回 `_v()`->code处理attrs属性
//const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配花括号 {{  }} 捕获花括号里面的内容
function gen(node) {
    // 源码这块包含了复杂的处理  比如 v-once v-for v-if 自定义指令 slot等等  咱们这里只考虑普通文本和变量表达式{{}}的处理
    if (node.type == 1) {
        return generate(node);//递归创建
    } else {
        //如果是文本节点
        let text = node.text;
        // 不存在花括号变量表达式
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`;
        }
        // 正则是全局模式 每次需要重置正则的lastIndex属性  不然会引发匹配bug
        let lastIndex = (defaultTagRE.lastIndex = 0);
        let tokens = [];
        let match, index;
        while ((match = defaultTagRE.exec(text))) {
            // index代表匹配到的位置
            index = match.index;
            if (index > lastIndex) {
                // 匹配到的{{位置  在tokens里面放入普通文本
                tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }
            //放入捕获到的变量内容
            tokens.push(`_s(${match[1].trim()})`);
            //   匹配指针后移
            lastIndex = index + match[0].length;
        }
        // 如果匹配完了花括号  text里面还有剩余的普通文本 那么继续push
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
        // _v表示创建文本
        return `_v(${tokens.join("+")})`;
    }
}
// 处理attrs属性
function genProps(attrs) {
    let str = "";
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        // 对attrs属性里面的style做特殊处理
        if (attr.name === "style") {
        let obj = {};
        attr.value.split(";").forEach((item) => {
            let [key, value] = item.split(":");
            obj[key] = value;
        });
        attr.value = obj;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }
    return `{${str.slice(0, -1)}}`;
}
// 生成子节点 调用gen函数进行递归创建
function getChildren(el) {
    const children = el.children;
    if (children) {
        return `${children.map((c) => gen(c)).join(",")}`;
    }
}
//递归创建生成code
function generate(el) {
    let children = getChildren(el);
    let code = `_c('${el.tag}',${
        el.attrs.length ? `${genProps(el.attrs)}` : "undefined"
    }${children ? `,${children}` : ""})`;
    return code;
}
//5 code 字符串生成 render 函数
function compileToFunctions(template) {
    let code = generate(ast);
    // 使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值 比如 name值就变成了this.name
    let renderFn = new Function(`with(this){return ${code}}`);
    return renderFn;
}
```