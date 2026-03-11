---
title: webapck基础配置
isTimeLine: true
date: 2026-03-10
category:
  - 前端
tag:
  - JavaScript
  - webpack
---
### 为什么需要打包工具?
1. 编译功能：我们在项目使用的`框架、less、sass、es6`等浏览器都不能识别，需要打包工具编译成`css js`等语法才能运行
2. 还可以压缩代码、做兼容性处理、提高代码性能
3. 主要的打包工具：`webpack vite rollup`等
### 对webpack的理解？
1. 是一个静态资源打包工具，它以一个或多个文件作为打包的入口，将整个项目的文件编译成一个或多个文件输出出去，输出文件bundle就是编译好的文件，浏览器可以运行。本身功能有限制，只能编译js的ES Module语法.
2. 可以做什么？   
    ① 编译代码，编译高级的语言或语法（`TS、ES6+、sass`等）；   
    ② 模块整合，在项目中有很多模块和文件，合并之后可以，解决浏览器频繁请求文件的问题；   
    ③ 兼容性和错误检查（`Polyfill、postcss、eslint`）；  
    ④ 代码体积更小，加载更快（`Tree-shaking、压缩、合并`）
### webpack怎么使用
1. 安装webpack 初始化package.json `npm init -y`
2. 启用webpack：`npx webpack ./src/main.js --mode=development`，指定Webpack从`main.js`文件开始打包，并且打包 `main.js`其依赖也一起打包进来。
3. npx是通过检查本地缓存或临时下载的包来执行命令，执行后会清理临时文件。首先它会在当前目录下的`node_modules`的`.bin`文件去查找是否有可执行的命令，如果没有就从全局查找是否有安装对应的模块，全局也没有就会自动下载对应的模块，用完就删。
4. 总结：webpack本身功能比较少，只能处理js资源，一旦遇到css等其他资源就会报错。所以学习webpack，就是主要学习如何处理其他资源。
### 常见的Loader？
1. `css-loader`：加载css,支持模块化
2. `style-loader`：将css添加到页面的style标签里面
3. `postcss-loader`：css的兼容性处理
4. `less-loader`：处理less文件
5. `file-loader`：把文件输出到文件夹，代码可以通过url去引用文件
6. `url-loader`：和file-loader类似,但是能在⽂件很⼩的情况下以base64的⽅式把⽂件内容注⼊到代码中去
7. `babel-loader`：转换es6为es5
8. `eslint-loader`：通过 ESLint 检查 JavaScript 代码
9. `vue-loader`：处理vue文件
### 常见的Plugin？
1. `DefinePlugin`: 定义环境变量,内置插件
2. `clean-webpack-plugin`: 清理构建目录	
3. `html-webpack-plugin`: 打包后自动生成一个html文件，并把打包生成的js自动引入到模块
4. `mini-css-extract-plugin`：将CSS提取到单独的⽂件中
5. `css-minimizer-webpack-plugin`: 压缩css，代替webpack4的`optimize-css-assets-webpack-plugi`n
6. `terser-webpack-plugin`:压缩js,代替webpack4的`uglifyjs-webpack-plugin`
7. `copy-webpack-plugin`：复制静态文件到输出目录
8. `image-minimizer-webpack-plugin`：自动压缩图片
### 基础配置
#### 核心概念
1. entry（入口）：提示文件从哪里打包
2. output（输出）：提示文件打包完的文件输出到哪里去，如何命名
3. loader（加载器）：webpack本身只能处理js资源，需要借助loader处理其他资源
4. plugins（插件）：扩展webpack功能
5. mode（模式）：分为开发模式与生产模式；
#### 开发模式与生产模式
1. 开发模式主要关注：① 编译代码，使浏览器能识别运行。图片、样式、字体、html资源等，webpack默认都不能处理这些资源，所以需要配置来编译这些资源；②检查代码质量、代码规范，统一团队的编码规范、让代码更加优雅美观。
2. 生产模式需要代码将来部署上线，主要关注：优化代码运行性能；优化代码打包速度
#### 处理css资源
##### 开发模式
1. 安装插件：`less-loader css-loader style-loader`
2. less-loader: 将less文件编译成css文件
3. css-loader：将css文件编译成webpack可以识别的模块
4. style-loader：通过动态创造一个style标签，把css添加到html页面上
5. 使用,从右到左执行loader：`rules: [{test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]} ]`
##### 生产模式
1. mini-css-extract-plugin：提取css为单独文件。在开发模式css文件被打包到js文件中，当js文件加载时，会创建一个style标签来生成样式。但是在生产模式实际打开有可能会出现闪屏现象，用户体验不好，新建单独的css文件，通过link标签加载性能才好。
2. 使用：提取css成单独文件,定义输出文件名和目录:`plugins: [new MiniCssExtractPlugin({filename: "static/css/main.css",})]`
3. postcss-loader：css兼容性处理，下载插件：`npm i postcss-loader postcss postcss-preset-env -D`，然后在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性做到什么程度；
4. css-minimizer-webpack-plugin：压缩css，使用`plugins: [new CssMinimizerPlugin()]`
```js
module: {
  rules: [{
    test: /\.less$/,
    //从右到左 less-loader postcss-loader css-loader MiniCssExtractPlugin.loader
    use: [
      // 1 生产环境style-loader替换成 MiniCssExtractPlugin.loader,
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          // 2 postcss-loader 能解决大多数样式兼容性问题
          postcssOptions: {
            plugins: [
              "postcss-preset-env",
            ],
          },
        },
      },
      // 3 将less文件编译成css文件
      "less-loader",
    ],
  ]}
},
plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // css压缩
    new CssMinimizerPlugin(),
  ],
```
#### 处理图片资源
1. 在 Webpack4 时，我们处理图片资源通过`file-loader url-loader`进行处理；
3. Webpack5已经将两个Loader功能内置到Webpack里了，只需简单配置即可处理图片资源`rules: [{test:/.[png|jpe?g|gif|webp]$/, type: "asset"},]`
4. `type: "asset"` 相当于`url-loader`, 将文件转化成Webpack能识别的资源，同时小于某个大小的资源会处理成data URI形式；
5. 将小于10kb的图片转为base64格式, 优点是减少请求数量。`rules: [{test:/\.[png|jpe?g|gif|webp]$/, type: "asset"},perser:{dataUrlCondition:maxSize: 10 *1024}]`
#### 处理字体图标、其他资源如音视频
1. 阿里巴巴矢量图标库添加字体图标需要下面文件：`src/fonts/iconfont.ttf、src/fonts/iconfont.woff、 src/css/iconfont.css`；引入后使用字体图标`<i class="iconfont icon-arrow-down"></i>`
2. 需要在webpack处理`ttf、woff2?`结尾的文件，不然浏览器识别不出来。`[{test: /\.(ttf|woff2?|map4|map3|avi)$/, type: "asset/resource", generator: {filename: "static/media/[hash:8][ext][query]",}}]`
3. `type: "asset/resource"`：相当于`file-loader`, 将文件转化成 Webpack 能识别的资源，其他不做处理
#### 开发服务器&自动化
1. 安装 `npm i webpack-dev-server -D`
2. 开发服务器配置 `devServer: { host: "localhost", port: 3000, open: true}`
3. 含义：启动服务器域名、服务器端口号、是否自动打开浏览器，当使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。
4. 运行的指令为`npx webpack serve`
#### 处理html资源
1. 下载`html-webpack-plugin`
2. 作用: dist 目录输出一个 index.html 文件会自动引入打包生成的js等资源
3. 使用：`plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname, "public/index.html"),})]`，以`public/index.html`为模板创建文件。
4. 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
#### 处理js资源
1. Webpack对js处理是有限的，只能编译js中ES 模块化语法不能编译其他语法，导致js不能在IE等浏览器运行，所以需要做一些兼容性处理，先完成`Eslint`检测代码格式无误后，再由`Babel`做代码兼容性处理。
2. Eslint：它是用来检测 js 和 jsx 语法的工具，可以配置各项功能；需要新建配置文件`.eslintrc`，里面有各种rules，运行Eslint时就会以写的规则对代码进行检查。
4. 使用：安装`eslint-webpack-plugin`，webpack配置：`plugins: [new ESLintWebpackPlugin({ context: path.resolve(__dirname, "src")}) //指定检查文件的根目录`
5. Babel：主要将es6语法转为向后兼容的js语法，可以让它们在旧版浏览器也能用，需要新建`.babelrc`.
6. Babel使用：下载插件：`babel-loader @babel/core @babel/preset-env`，webpack配置 `[{test: /.js$/, exclude: /node_modules/, loader: "babel-loader",}]`

```js
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
 module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            "@babel/plugin-transform-runtime"
          ],
        },
      }]
 },
 plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    })
],
```