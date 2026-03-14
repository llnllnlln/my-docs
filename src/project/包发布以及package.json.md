---
title: 包发布以及package.json
isTimeLine: true
date: 2025-12-08
category:
  - 前端
tag:
  - JavaScript 
  - 源码
---
package.json
### 必须属性
1. name: 项目名字，不能重复。
2. version：项目的版本号，每次项目改动后，即将发布时，需要手动改项目的版本号。每个版本号由三个部分组成：主版本号.次版本号.修订号。
    - 修订号(bug)、次版本号（新增了功能和特性）、主版本号（新版本无法兼容基于前一版本的代码）
    - ^ 兼容某个大版本，下载的包可能会是更高的次版本号或者修订版本号，如：^1.1.2，可以是1.1.n、1.2.n
    - ~兼容某个次版本，下载的包可能会是更高的修订版本号,如：~1.1.2，可以是1.1.2、1.1.n
### 描述信息
1. description：描述项目包，方便在npm搜索可以找到这个包
2. author：包作者 contributors：包贡献者
3. homepage：项目主页，官网地址文档等
4. repository：仓库地址
### 依赖配置
1. 生产依赖`dependencies`
    - 项目运行时所依赖的模块,在生产环境中要用到的，当你使用第三方包时候，会同步下载第三方包的`dependencies`
2. 开发依赖`devDependencies`  
    - 项目开发所需要的模块，项目运行的时候又用不到的，如`webpack、eslint、预处理器、测试工具`等，
3. 同版本的依赖`peerDependencies `
    - 在很多第三方包都有应用的，如vuex依赖的第三方包是vue，这时候它会在`peerDependencies`中声明，和主项目共用同一个vue依赖，避免了重复安装。
### 脚本配置
1. scripts：用于定义脚本命令，供npm直接调用
2. config：来配置scripts运行时的配置参数
### 文件与目录
1. 入口文件，main、brower、module都是用于指定js的入口文件路径，他们的作用是帮助不用的环境如node或浏览器找到正确的文件入口。
    - `main`--通用commonjs入口
        - 指定加载的入口文件，在browser和Node环境中都可以使用，当通过require引用包时，会查找 main 字段指定的文件。文件格式是.js文件，`"main": "./lib/index.js"`
        - 通常指向一个CommonJS格式（require/exports）的文件。当用户运行`const pkg = require('your-package')`时，实际加载的是`./lib/index.js`
    - `brower`--浏览器专用入口
        - 定义npm包在browser环境下的入口文件，主要适用于专门为浏览器提供特定的代码，如某些包使用浏览器专有的语法。格式为.js,`"browser": "./lib/browser.js"`
        - 适宜严禁在server端使用的npm包
    - `module`--ES Modules 入口
        - 定义npm包的ESM规范的入口文件，指向 `ES Modules（import/export）`格式的文件。
        - 主要使用于js模块化的打包工具`（Rollup、Webpack5）`,Webpack、Rollup 等工具优先使用此字段，以启用`Tree Shaking`优化。
        - 文件格式通常是`.mjs .js`,`"module": "./lib/index.mjs"` `"main": "./lib/index.cjs"`,
2. bin
    - 指定各个内部命令对应的可执行文件的位置，所有`node_modules/.bin /`目录下的命令，都可以用 npm run [命令] 的格式运行。
    -  `"bin": { "someTool": "./bin/someTool.js" }`,定义了一个命令`someTool`，它对应的可执行文件的位置是`./bin/someTool.js`，这样我们就能在scripts里面直接使用该命令了someTool
3. files:是一个数组，用来描述当把 npm 包作为依赖包安装时需要说明的文件列表。当 npm 包发布时，files 指定的文件会被推送到 npm 服务器中，定义在files的文件，是会让用户看到的文件。规定哪些文件会被用户所下载。
### 发布配置
1. private：字段可以防止我们意外地将私有库发布到npm服务器
2. os：os字段可以让我们设置该npm包可以在什么操作系统使用
3. cpu
4. license：字段用于指定软件的开源协议，开源协议表述了其他人获得代码后拥有的权利
### 第三方配置
1. eslintConfig：eslint的配置可以写在单独的配置文件`.eslintrc.json `中，也可以写在`package.json`文件的`eslintConfig`配置项中
2. babel：babel的配置可以写在单独的配置文件`babel.config.json `中，也可以写在`package.json`文件的`babel`配置项中
3. lint-staged：一个在Git暂存文件上运行`linters`的工具，通常配合`gitHooks`一起使用，使用`lint-staged`时，每次提交代码只会检查当前改动的文件
4. gitHooks：来定义一个钩子，比如在提交（commit）之前执行`lint-staged`
5. browserslist：用来告知支持哪些浏览器及版本
### package-lock.json
1. `package-lock.json`文件的目的是用来锁定包版本的，为了保证在任意的机器上我们去执行`npm install`都会得到完全相同的`node_modules`安装结果，所以lock文件需要一起提交到仓库中去。
2. `package-lock.json`它会在npm更改`node_modules`目录树或者`package.json`时自动生成的, 它准确的描述了当前项目npm包的依赖树
3. 一般升级包：执行`npm install @..` 命令后，验证没有问题之后, 是需要提交新的`package.json`和`package-lock.json`文件