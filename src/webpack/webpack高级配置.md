---
title: webpack高级配置
isTimeLine: true
date: 2025-10-15
category:
  - 前端
tag:
  - JavaScript
  - webpack
---
### 提升打包构建速度-HMR/Cache/Thread
#### Cache
1. Cache是什么？每次打包文件都要经过`Eslint Bebal`处理，速度比较慢；可以缓存之前的Eslint检查的结果和Babel编译的结果，这样第二次打包速度就比较快。
2. babel: 开启babel编译缓存`{test: /.js$/, loader: "babel-loader", option:{cacheDirectory: true, }}`
3. Eslint: cache开启缓存,cacheLocation缓存目录。`new ESLintWebpackPlugin({ context: path.resolve(__dirname, "../src"), exclude: "node_modules", cache: true, cacheLocation: path.resolve( __dirname,"../node_modules/.cache/.eslintcache")}) `
#### Include/Exclude
1. 在开发时候使用的第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。所以我们在对 js 文件处理时，要排除 node_modules 下面的文件。
2. include（包含）：`include: path.resolve(__dirname, "../src")`
3. exclude（排除）：`exclude: "node_modules"`
#### Thread
1. 当项目越来越庞大时，打包速度越来越慢，提升打包速度，其实就是要提升 js 的打包速度，因为其他文件都比较少，而对 js 文件处理主要就是`eslint 、babel、Terser`三个工具，主要是提升这三个的速度。开启多进程同时处理 js 文件。
2. 多进程打包是开启多个进程同时干一件事，速度更快。仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销。
3. 下载`thread-loader`, 获取CPU的核数，启动进程的数量就是CPU的核数：`const os = require("os"); const threads = os.cpus().length;`
4. loader开启多进程:` {test: /\.js$/,use: [{loader: "thread-loader",options: {workers: threads}}, {loader: "babel-loader", options: {cacheDirectory: true}}]}`
5. eslint开启多进程: `new ESLintWebpackPlugin({cache: true, cacheLocation:...,threads})`
6. Terser开启多进程: `optimization: {minimize: true, minimizer: [new CssMinimizerPlugin(), new TerserPlugin({parallel: threads})]}`,生产模式会默认开启TerserPlugin，但是要进行其他配置，就要重新写了
```js
module: {
    // 开启babel编译缓存
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
    // ESLint开启多线程以及缓存
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      threads,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
],
optimization: {
    // 压缩的操作开启多进程
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({parallel: threads}),
    ]
}
```
#### HotModuleReplacement
1. HMR是什么？在开发过程中修改某一块代码，会默认把所有的模块重新打包，速度很慢。HMR可以在修改某个模块的代码时候，只打包编译某个模块，这样速度就会很快。
2. 热模块替换就是在程序运行中，添加、删除或替换模块，无需重新加载整个页面
3. 怎么用：在`devserver`里面设置`hot:true`就是开启了HMR功能，这个时候css经过`style-loader`处理就可以做到修改后不加载整个页面了。js哪个文件需要热更新需要额外写上`module.hot.accept("./js/count.js")`
4. 实际开发我们会使用其他loader来解决，比如`vue-loader react-hot-loader`
### 减少代码体积-Babel/图片压缩/code split
#### Image Minimizer
1. 项目如果中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢。所以可以对图片进行压缩，减少图片体积
2. 下载`npm i image-minimizer-webpack-plugin imagemin -D`；以及压缩各种格式图片的插件
3. 无损压缩`npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D`
4. 有损压缩`npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D`
5. 配置 `optimization: {minimize: true, minimizer: [new CssMinimizerPlugin(), new ImageMinimizerPlugin({minimizer: {...配置压缩各种格式图片的插件}}) ]}`
#### Code Split
1. 代码分割是什么？打包代码时会将所有 js 文件打包到一个文件中，体积太大了。所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样每次加载的资源就少，速度就更快。
2. 种类：多入口打包；提取插件代码或重复代码到公共模块；使用import按需加载，动态导入
3. 多入口打包：在entry配置了几个入口，输出几个 js 文件。入口文件：`entry: {main: "./src/main.js",app: "./src/app.js"}` ；出口文件：`output: {path: path.resolve(__dirname, "./dist"), filename: "js/[name].js",}`
4. 提取插件代码或重复代码到公共模块：`optimization: {splitChunks: {chunks: "all", cacheGroups: { default: {minSize: 0, minChunks: 2,priority: -20,}}}}`，cacheGroups 修改配置组，配置哪些模块要打包到一个组。
5. 使用import按需加载，动态导入：`import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {...})`
#### Core-js
1. 使用babel对js进行兼容性处理，使用`@babel/preset-env`智能预设处理兼容性问题，它可以对ES6的扩展运算符、箭头函数进行处理，但是版本更高的`promise`对象、`async`函数没办法处理。
2. core-js是专门来做es6及以上的`api polyfill`，叫做垫片/补丁。就是用社区上提供的一段代码，可以在不兼容某些新特性的浏览器上，使用该新特性。
3. 如何使用？ 在babel.config.js文件，直接 `import "@babel-polyfill"`会过大，只使用一部分功能可以按需引用。
```js
module.exports = {
  // 智能预设：能够编译ES6语法
  presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      // { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
      { useBuiltIns: "usage", corejs: 3 },
    ],
  ],
};
```
#### Tree Shaking
1. Webpack开发模式已经默认开启了这个功能，无需其他配置。
2. 开发时引用第三方工具函数库或组件库,如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能；
3. `Tree Shaking`移除 JavaScript 中的没有使用上的代码。它是基于es6模块静态编译思想，在编译时候确定模块的依赖关系、输入输出的变量。在编译阶段利用`ES Module`判断哪些模块已经加载，哪些未被使用进而删除对应的代码。
### 链接
[尚硅谷Webpack5入门到原理](https://www.bilibili.com/video/BV14T4y1z7sw?spm_id_from=333.788.videopod.episodes&vd_source=a3aec2a1dd5f478da3517872d0c61c5c)