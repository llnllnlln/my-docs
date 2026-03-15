import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as e}from"./app-e7c604ce.js";const p={},t=e(`<h3 id="vuepress" tabindex="-1"><a class="header-anchor" href="#vuepress" aria-hidden="true">#</a> VuePress</h3><ol><li>以Vue 驱动、以Markdown为中心的静态网站生成器。可以自动识别md文件的标题并且生成目录，几乎零配置，每个md文件预渲染成静态html。</li><li>有扩展主题、扩展插件的能力（vuepress-theme-hope、vuepress-theme-reco），不同的主题又组织了不同的插件集合来完成开箱即用的功能，</li><li>VuePress：<code>https://vuejs.press/zh/</code></li></ol><h3 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h3><h4 id="运行环境设置" tabindex="-1"><a class="header-anchor" href="#运行环境设置" aria-hidden="true">#</a> 运行环境设置</h4><ol><li>Git安装：Git官网地址：<code>https://git-scm.com/</code></li><li>Node：下载并安装最新的长期支持版 (LTS)，</li><li>pnpm: 安装 Node.js 之后，在终端中输入下列命令启用 <code>corepack corepack enable</code>, pnpm包管理器就安装了。</li></ol><h4 id="初始化项目" tabindex="-1"><a class="header-anchor" href="#初始化项目" aria-hidden="true">#</a> 初始化项目</h4><ol><li>创建项目<code>pnpm create vuepress-theme-hope my-docs</code></li><li>然后选择配置，比如项目名、vite、pnpm、自动部署文档到 <code>GitHub Pages</code> 的工作流等</li><li>启动开发服务器：<code>npm run docs:dev</code></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Need to install the following packages<span class="token operator">:</span>
  create<span class="token operator">-</span>vuepress<span class="token operator">-</span>theme<span class="token operator">-</span>hope@<span class="token number">2.0</span><span class="token number">.0</span><span class="token operator">-</span>beta<span class="token punctuation">.</span><span class="token number">233</span>
Ok to proceed<span class="token operator">?</span> <span class="token punctuation">(</span>y<span class="token punctuation">)</span> y
<span class="token operator">?</span> Select a language to display <span class="token operator">/</span> 选择显示语言
  <span class="token function">english</span> <span class="token punctuation">(</span><span class="token constant">US</span><span class="token punctuation">)</span>
❯ 简体中文

<span class="token constant">D</span><span class="token operator">:</span>\\work<span class="token operator">&gt;</span>pnpm create vuepress<span class="token operator">-</span>theme<span class="token operator">-</span>hope my<span class="token operator">-</span>docs
Need to install the following packages<span class="token operator">:</span>
  create<span class="token operator">-</span>vuepress<span class="token operator">-</span>theme<span class="token operator">-</span>hope@<span class="token number">2.0</span><span class="token number">.0</span><span class="token operator">-</span>beta<span class="token punctuation">.</span><span class="token number">233</span>
Ok to proceed<span class="token operator">?</span> <span class="token punctuation">(</span>y<span class="token punctuation">)</span> y
<span class="token operator">?</span> Select a language to display <span class="token operator">/</span> 选择显示语言 简体中文
<span class="token operator">?</span> 选择包管理器 pnpm
生成 <span class="token keyword">package</span><span class="token punctuation">.</span>json<span class="token operator">...</span>
<span class="token operator">?</span> 设置应用名称 blogs2
<span class="token operator">?</span> 设置应用版本号 <span class="token number">2.0</span><span class="token number">.0</span>
<span class="token operator">?</span> 设置应用描述 <span class="token constant">A</span> project <span class="token keyword">of</span> vuepress<span class="token operator">-</span>theme<span class="token operator">-</span>hope
<span class="token operator">?</span> 设置协议 <span class="token constant">MIT</span>
<span class="token operator">?</span> 项目需要用到多语言么<span class="token operator">?</span> No
<span class="token operator">?</span> 是否需要一个自动部署文档到 GitHub Pages 的工作流？ Yes
<span class="token operator">?</span> 你想要创建什么类型的项目？ blog
生成模板<span class="token operator">...</span>
<span class="token operator">?</span> 是否初始化 Git 仓库<span class="token operator">?</span> Yes
<span class="token operator">?</span> 选择你想使用的源 当前源
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置优化" tabindex="-1"><a class="header-anchor" href="#配置优化" aria-hidden="true">#</a> 配置优化</h3><h4 id="首页配置" tabindex="-1"><a class="header-anchor" href="#首页配置" aria-hidden="true">#</a> 首页配置</h4><p>src 目录下的 <code>README.md</code>即为博客或者文档的首页，可以配置背景图、图标等等。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">home</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token literal-property property">layout</span><span class="token operator">:</span> BlogHome
<span class="token literal-property property">icon</span><span class="token operator">:</span> home
<span class="token literal-property property">title</span><span class="token operator">:</span> 首页
<span class="token literal-property property">heroImage</span><span class="token operator">:</span> <span class="token operator">/</span>logo<span class="token punctuation">.</span>jpg
<span class="token literal-property property">bgImage</span><span class="token operator">:</span> <span class="token operator">/</span>bgImage<span class="token punctuation">.</span>jpg
<span class="token literal-property property">heroImageStyle</span><span class="token operator">:</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">maxHeight</span><span class="token operator">:</span> <span class="token string">&quot;120px&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">display</span><span class="token operator">:</span> block<span class="token punctuation">,</span>
    <span class="token literal-property property">borderRadius</span><span class="token operator">:</span> <span class="token string">&quot;17% 82% 3% 50% / 36% 58% 33% 86%&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">boxShadow</span><span class="token operator">:</span> <span class="token string">&quot;rgba(0, 0, 0, 0.2) 0px 15px 6px&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token literal-property property">heroText</span><span class="token operator">:</span> willow
<span class="token literal-property property">heroFullScreen</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token literal-property property">tagline</span><span class="token operator">:</span> 走完要走的路，才能到达想去的地方
<span class="token literal-property property">article</span><span class="token operator">:</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="导航栏" tabindex="-1"><a class="header-anchor" href="#导航栏" aria-hidden="true">#</a> 导航栏</h4><ol><li>导航栏的相关设置在 <code>.vuepress/navbar.ts</code>文件中。从<code>vuepress-theme-hope</code>引入<code>navbar</code>函数，最后导出该函数即可。</li><li>如果要展示较多的链接，可以将同类链接整理成下拉列表，使用<code>children</code>选项设置链接列表。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">navbar</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;结实的基底&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;article&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;/posts/&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;Vue系列&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;/vue/&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;时间轴&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;time&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;/timeline/&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;时间轴&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;time&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/zh/basic/markdown.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/zh/basic/vuepress.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;掘金&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;https://juejin.cn/user/4344913237918861/posts&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;lightbulb&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="侧边栏" tabindex="-1"><a class="header-anchor" href="#侧边栏" aria-hidden="true">#</a> 侧边栏</h4><ol><li>侧边栏的配置在 <code>.vuepress/sidebar.ts</code>中,有全局导航栏、根据每个导航栏栏目分离式导航栏。</li><li>对于侧边栏的具体条目，可以通过设置<code>children: &quot;structure&quot;</code>根据当前目录下的文件名称自动生成。分离式菜单配置更简洁，如下所示：当设置<code>structure</code>时，默认根据目录下的文件自动生成侧边栏。</li><li>自动生成目录页面：在 <code>.vuepress/theme.ts</code>页面设置<code>autoCatalog:{index:true}</code>。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> sidebar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuepress-theme-hope&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">sidebar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 特定路径的侧边栏配置</span>
  <span class="token string-property property">&quot;/project/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;/framework/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;/vite/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;/vue/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;/posts/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;/service/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;/ai-tools/&quot;</span><span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="搜索功能" tabindex="-1"><a class="header-anchor" href="#搜索功能" aria-hidden="true">#</a> 搜索功能</h4><p>插件：安装 <code>vuepress-plugin-search-pro</code>，然后在<code>.vuepress/config.ts</code>配置官方配置。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">searchProPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 索引全部内容</span>
      <span class="token literal-property property">indexContent</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token comment">// 为分类和标签添加索引</span>
      <span class="token literal-property property">customFields</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token function-variable function">getter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">page</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> page<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>category <span class="token keyword">as</span> any<span class="token punctuation">,</span>
          <span class="token literal-property property">formatter</span><span class="token operator">:</span> <span class="token string">&quot;分类：$content&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token function-variable function">getter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">page</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> page<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>tag <span class="token keyword">as</span> any<span class="token punctuation">,</span>
          <span class="token literal-property property">formatter</span><span class="token operator">:</span> <span class="token string">&quot;标签：$content&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动部署" tabindex="-1"><a class="header-anchor" href="#自动部署" aria-hidden="true">#</a> 自动部署</h3><ol><li>该主题已经自动添加了<code>workflows/deploy-docs.yml</code>文件，所以只需添加仓库，修改触发分支。</li><li>使用 Github Pages ，即 Github 提供的、用于搭建个人网站的静态站点托管服务。很多人用它搭建个人博客。这种方式的好处是免费、方便，坏处是速度可能会有些慢、不能被国内的搜索引擎收录。</li></ol><h4 id="新建仓库" tabindex="-1"><a class="header-anchor" href="#新建仓库" aria-hidden="true">#</a> 新建仓库</h4><ol><li>新建博客仓库，然后新建一个分支<code>blog_pages</code>。然后打开<code>Settings-&gt; Pages-&gt; Branch</code>，选择<code>blog_pages</code>分支，将选中的分支内容部署在github自带的页面服务中，接着点击<code>save</code>按钮，等待一会就可以去对应的站点<code>http://localhost:8080/my-docs/</code>访问了。</li><li>Github需要新建一个<code>ACCESS_TOKEN</code>，生成key之后在部署文件中增加<code>GITHUB_TOKEN: \${{secrets.ACCESS_TOKEN}}</code></li></ol><h4 id="关联本地项目与仓库-更新" tabindex="-1"><a class="header-anchor" href="#关联本地项目与仓库-更新" aria-hidden="true">#</a> 关联本地项目与仓库，更新</h4><ol><li>关联github仓库：<code>git remote add origin https://github.com/llnllnlln/my-docs.git</code></li><li>拉取代码，然后修改代码，提交到main分支就可以。<br> a. 踩坑1：拉取失败，原因是仓库有内容而本地也有，产生冲突了。需要合并一下，才能继续。<br> b. 踩坑2：提交失败，大部分是网络原因。</li><li>部署ACCESS_TOKEN时候会提交后会自动action，构建对应的站点并实时更新。<br> a. 踩坑1：图片样式加载失败，确保图片路径为绝对路径（如 <code>/images/logo.png</code>），并放在 public/ 目录。检查 base 路径是否与仓库名一致。<br> b. 踩坑2：action失败：原因是pnpm版本没有说明的问题，导致在打包阶段就失败了<code>uses: pnpm/action-setup@v4 with: version: 10</code>。<br> c. 踩坑3：action失败：配置文件路径原因<code>src/.vuepress/dist/.nojekyll</code>。因为是自动生成，路径为,与linux格式不符，所以生成的路径很奇怪，部署失败。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">name</span><span class="token operator">:</span> 部署文档

<span class="token literal-property property">on</span><span class="token operator">:</span>
  <span class="token literal-property property">push</span><span class="token operator">:</span>
    <span class="token literal-property property">branches</span><span class="token operator">:</span>
      <span class="token operator">-</span> main

<span class="token literal-property property">permissions</span><span class="token operator">:</span>
  <span class="token literal-property property">contents</span><span class="token operator">:</span> write

<span class="token literal-property property">jobs</span><span class="token operator">:</span>
  deploy<span class="token operator">-</span>gh<span class="token operator">-</span>pages<span class="token operator">:</span>
    runs<span class="token operator">-</span>on<span class="token operator">:</span> ubuntu<span class="token operator">-</span>latest
    <span class="token literal-property property">steps</span><span class="token operator">:</span>
      <span class="token operator">-</span> name<span class="token operator">:</span> Checkout
        <span class="token literal-property property">uses</span><span class="token operator">:</span> actions<span class="token operator">/</span>checkout@v4
        <span class="token keyword">with</span><span class="token operator">:</span>
          fetch<span class="token operator">-</span>depth<span class="token operator">:</span> <span class="token number">0</span>
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules<span class="token operator">:</span> <span class="token boolean">true</span>

      <span class="token operator">-</span> name<span class="token operator">:</span> 设置 pnpm
        <span class="token literal-property property">uses</span><span class="token operator">:</span> pnpm<span class="token operator">/</span>action<span class="token operator">-</span>setup@v4
        <span class="token keyword">with</span><span class="token operator">:</span>
          <span class="token literal-property property">version</span><span class="token operator">:</span> <span class="token number">10</span>


      <span class="token operator">-</span> name<span class="token operator">:</span> 设置 Node<span class="token punctuation">.</span>js
        <span class="token literal-property property">uses</span><span class="token operator">:</span> actions<span class="token operator">/</span>setup<span class="token operator">-</span>node@v4
        <span class="token keyword">with</span><span class="token operator">:</span>
          node<span class="token operator">-</span>version<span class="token operator">:</span> <span class="token number">22</span>
          <span class="token literal-property property">cache</span><span class="token operator">:</span> pnpm

      <span class="token operator">-</span> name<span class="token operator">:</span> 安装依赖
        <span class="token literal-property property">run</span><span class="token operator">:</span> <span class="token operator">|</span>
          corepack enable
          pnpm install <span class="token operator">--</span>frozen<span class="token operator">-</span>lockfile

      <span class="token operator">-</span> name<span class="token operator">:</span> 构建文档
        <span class="token literal-property property">env</span><span class="token operator">:</span>
          <span class="token constant">NODE_OPTIONS</span><span class="token operator">:</span> <span class="token operator">--</span>max_old_space_size<span class="token operator">=</span><span class="token number">8192</span>
        <span class="token literal-property property">run</span><span class="token operator">:</span> <span class="token operator">|</span><span class="token operator">-</span>
          pnpm run docs<span class="token operator">:</span>build
          <span class="token operator">&gt;</span> src<span class="token operator">/</span><span class="token punctuation">.</span>vuepress<span class="token operator">/</span>dist<span class="token operator">/</span><span class="token punctuation">.</span>nojekyll

      <span class="token operator">-</span> name<span class="token operator">:</span> 部署文档
        <span class="token literal-property property">uses</span><span class="token operator">:</span> JamesIves<span class="token operator">/</span>github<span class="token operator">-</span>pages<span class="token operator">-</span>deploy<span class="token operator">-</span>action@v4
        <span class="token literal-property property">env</span><span class="token operator">:</span>
          <span class="token constant">GITHUB_TOKEN</span><span class="token operator">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets<span class="token punctuation">.</span><span class="token constant">ACCESS_TOKEN</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token keyword">with</span><span class="token operator">:</span>
          # 部署文档
          <span class="token literal-property property">branch</span><span class="token operator">:</span> blog_pages
          <span class="token literal-property property">folder</span><span class="token operator">:</span> src<span class="token operator">/</span><span class="token punctuation">.</span>vuepress<span class="token operator">/</span>dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),o=[t];function r(l,i){return n(),a("div",null,o)}const d=s(p,[["render",r],["__file","VuePress搭建个人博客.html.vue"]]);export{d as default};
