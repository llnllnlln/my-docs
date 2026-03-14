---
title: VuePress搭建个人博客
isTimeLine: true
date: 2026-03-13
category:
  - node
tag:
  - 后端 
  - Vue
---

### VuePress
1. 以Vue 驱动、以Markdown为中心的静态网站生成器。可以自动识别md文件的标题并且生成目录，几乎零配置，每个md文件预渲染成静态html。
2. 有扩展主题、扩展插件的能力（vuepress-theme-hope、vuepress-theme-reco），不同的主题又组织了不同的插件集合来完成开箱即用的功能，
3. VuePress：`https://vuejs.press/zh/`
### 环境搭建
#### 运行环境设置
1. Git安装：Git官网地址：`https://git-scm.com/`
2. Node：下载并安装最新的长期支持版  (LTS)，
3. pnpm: 安装 Node.js 之后，在终端中输入下列命令启用 `corepack corepack enable`, pnpm包管理器就安装了。
#### 初始化项目 
1. 创建项目`pnpm create vuepress-theme-hope my-docs`
2. 然后选择配置，比如项目名、vite、pnpm、自动部署文档到 `GitHub Pages` 的工作流等
3. 启动开发服务器：`npm run docs:dev`
```js
Need to install the following packages:
  create-vuepress-theme-hope@2.0.0-beta.233
Ok to proceed? (y) y
? Select a language to display / 选择显示语言
  english (US)
❯ 简体中文

D:\work>pnpm create vuepress-theme-hope my-docs
Need to install the following packages:
  create-vuepress-theme-hope@2.0.0-beta.233
Ok to proceed? (y) y
? Select a language to display / 选择显示语言 简体中文
? 选择包管理器 pnpm
生成 package.json...
? 设置应用名称 blogs2
? 设置应用版本号 2.0.0
? 设置应用描述 A project of vuepress-theme-hope
? 设置协议 MIT
? 项目需要用到多语言么? No
? 是否需要一个自动部署文档到 GitHub Pages 的工作流？ Yes
? 你想要创建什么类型的项目？ blog
生成模板...
? 是否初始化 Git 仓库? Yes
? 选择你想使用的源 当前源
```
### 配置优化
#### 首页配置
src 目录下的 `README.md`即为博客或者文档的首页，可以配置背景图、图标等等。
```js
home: true
layout: BlogHome
icon: home
title: 首页
heroImage: /logo.jpg
bgImage: /bgImage.jpg
heroImageStyle:
  {
    maxHeight: "120px",
    display: block,
    borderRadius: "17% 82% 3% 50% / 36% 58% 33% 86%",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 15px 6px",
  }
heroText: willow
heroFullScreen: true
tagline: 走完要走的路，才能到达想去的地方
article: false
```
#### 导航栏
1. 导航栏的相关设置在 `.vuepress/navbar.ts`文件中。从`vuepress-theme-hope`引入`navbar`函数，最后导出该函数即可。
2. 如果要展示较多的链接，可以将同类链接整理成下拉列表，使用`children`选项设置链接列表。
```js
export default navbar([
  "/",
  {
    text: "结实的基底",
    icon: "article",
    link: "/posts/",
  },
  {
    text: "Vue系列",
    icon: "vue",
    link: "/vue/",
  },
  {
    text: "时间轴",
    icon: "time",
    link: "/timeline/",
  },
  {
    text: "时间轴",
    icon: "time",
    children: ["/zh/basic/markdown.md", "/zh/basic/vuepress.md"],
  },
  {
    text: "掘金",
    link: "https://juejin.cn/user/4344913237918861/posts",
    icon: "lightbulb",
  }
])
```
#### 侧边栏
1. 侧边栏的配置在 `.vuepress/sidebar.ts`中,有全局导航栏、根据每个导航栏栏目分离式导航栏。
2. 对于侧边栏的具体条目，可以通过设置`children: "structure"`根据当前目录下的文件名称自动生成。分离式菜单配置更简洁，如下所示：当设置`structure`时，默认根据目录下的文件自动生成侧边栏。
3. 自动生成目录页面：在 `.vuepress/theme.ts`页面设置`autoCatalog:{index:true}`。
```js
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": "structure",
  // 特定路径的侧边栏配置
  "/project/": "structure",
  "/framework/": "structure",
  "/vite/": "structure",
  "/vue/": "structure",
  "/posts/": "structure",
  "/service/": "structure",
  "/ai-tools/": "structure",
});
```
#### 搜索功能
插件：安装 `vuepress-plugin-search-pro`，然后在`.vuepress/config.ts`配置官方配置。
```js
plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category as any,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag as any,
          formatter: "标签：$content",
        },
      ],
    }),
  ],
```
### 自动部署 
1. 该主题已经自动添加了`workflows/deploy-docs.yml`文件，所以只需添加仓库，修改触发分支。
2. 使用 Github Pages ，即 Github 提供的、用于搭建个人网站的静态站点托管服务。很多人用它搭建个人博客。这种方式的好处是免费、方便，坏处是速度可能会有些慢、不能被国内的搜索引擎收录。
#### 新建仓库
1. 新建博客仓库，然后新建一个分支`blog_pages`。然后打开`Settings-> Pages-> Branch`，选择`blog_pages`分支，将选中的分支内容部署在github自带的页面服务中，接着点击`save`按钮，等待一会就可以去对应的站点`http://localhost:8080/my-docs/`访问了。
2. Github需要新建一个`ACCESS_TOKEN`，生成key之后在部署文件中增加`GITHUB_TOKEN: ${{secrets.ACCESS_TOKEN}}`
#### 关联本地项目与仓库，更新
1. 关联github仓库：`git remote add origin https://github.com/llnllnlln/my-docs.git`
2. 拉取代码，然后修改代码，提交到main分支就可以。
  a. 踩坑1：拉取失败，原因是仓库有内容而本地也有，产生冲突了。需要合并一下，才能继续。
  b. 踩坑2：提交失败，大部分是网络原因。
3. 部署ACCESS_TOKEN时候会提交后会自动action，构建对应的站点并实时更新。
  a. 踩坑1：图片样式加载失败，确保图片路径为绝对路径（如 `/images/logo.png`），并放在 public/ 目录。检查 base 路径是否与仓库名一致。
  b. 踩坑2：action失败：原因是pnpm版本没有说明的问题，导致在打包阶段就失败了`uses: pnpm/action-setup@v4  with: version: 10`。
  c. 踩坑3：action失败：配置文件路径原因`src/.vuepress/dist/.nojekyll`。因为是自动生成，路径为\,与linux格式不符，所以生成的路径很奇怪，部署失败。
```js
name: 部署文档

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - name: 设置 pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10


      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: 安装依赖
        run: |
          corepack enable
          pnpm install --frozen-lockfile

      - name: 构建文档
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          pnpm run docs:build
          > src/.vuepress/dist/.nojekyll

      - name: 部署文档
        uses: JamesIves/github-pages-deploy-action@v4
        env:
          GITHUB_TOKEN: ${{secrets.ACCESS_TOKEN}}
        with:
          # 部署文档
          branch: blog_pages
          folder: src/.vuepress/dist
```