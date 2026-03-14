import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,a as n,b as s,e,f as p}from"./app-d9d82146.js";const i={},u=p('<h3 id="什么是less" tabindex="-1"><a class="header-anchor" href="#什么是less" aria-hidden="true">#</a> 什么是Less</h3><ol><li>全称（Leaner Style Sheets）是一种css预处理语言，支持变量、函数、混合、嵌套、循环等特点。</li><li>是css，在css基础上多了一些东西。引入了变量、混入、嵌套、运算、函数等功能，浏览器不认识需要编译成css让浏览器识别。</li><li>如何编译？</li></ol><blockquote><ul><li>第一种与nodejs一起使用，用lessc命令编译lessc styles.less styles.css</li><li>第二种使用浏览器，引入less的cdn<br><code> &lt;link rel=&quot;stylesheet/less&quot; type=&quot;text/css&quot; href=&quot;styles.less&quot; /&gt;&lt;script src=&quot;https://cdn.jsdelivr.net/npm/less&quot; &gt;&lt;/script&gt;</code></li><li>第三种vscode插件编译：<br> ⅰ. vscode中安装less编译插件：Easy Less 插件。<br> ⅱ. 安装成功后重启vscode软件，新建.less后缀名文件，保存后会自动生成对应.css文件。</li></ul></blockquote>',3),r={start:"4"},d={href:"https://lesscss.cn/",target:"_blank",rel:"noopener noreferrer"},k=p(`<h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3><ol><li>格式：&quot;@变量名：变量值&quot;;</li><li>选择器、url地址也可以用变量名；</li><li>变量可以先使用再声明</li></ol><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@width</span>：100px<span class="token punctuation">;</span>
<span class="token variable">@height</span>：100px<span class="token punctuation">;</span>
<span class="token variable">@mybanner<span class="token punctuation">:</span></span>banner<span class="token punctuation">;</span>
<span class="token selector">.@{mybanner}</span><span class="token punctuation">{</span>
  width： <span class="token variable">@width</span><span class="token punctuation">;</span>
  height： <span class="token variable">@height</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*编译后  */</span>
<span class="token selector">.banner</span><span class="token punctuation">{</span>width100px<span class="token punctuation">;</span> height：100px<span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="混入" tabindex="-1"><a class="header-anchor" href="#混入" aria-hidden="true">#</a> 混入</h3><ol><li>是什么？将一系列的规则集引入另一个规则集中(ctrl c+ctrl v)。</li><li>怎么用？直接调用类名,就能将一个类的属性作用与另一个类中<code>a{.bordered();}</code></li><li>带参数、默认值的混合，可以增加样式的灵活性<code>.border-radius(@radius:1px, @color:blue){..}</code></li><li>作用？为了提高代码的复用性，减少代码冗余度，就可以将重复的代码抽取到一个独立的地方，在任何选择器中去使用提取出来的代码。</li></ol><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.bordered()</span> <span class="token punctuation">{</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> dotted 1px black<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> solid 2px black<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#menu a</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #111<span class="token punctuation">;</span>
  <span class="token comment">/*直接调用类名,就能显示里面的属性*/</span>
  .<span class="token function">bordered</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*  带参数、默认值的混合 */</span>
<span class="token selector">.border-radius(<span class="token variable">@radius</span>:1px, <span class="token variable">@color</span>:blue)</span><span class="token punctuation">{</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token variable">@radius</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box1</span><span class="token punctuation">{</span><span class="token mixin-usage function">.border-radius</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">.box2</span><span class="token punctuation">{</span><span class="token mixin-usage function">.border-radius</span><span class="token punctuation">(</span>10px<span class="token punctuation">,</span> black<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token comment">/*编译后  */</span>
<span class="token selector">.box1</span><span class="token punctuation">{</span> <span class="token property">border-radius</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span> <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token selector">.box2</span><span class="token punctuation">{</span> <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span> <span class="token property">color</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="嵌套" tabindex="-1"><a class="header-anchor" href="#嵌套" aria-hidden="true">#</a> 嵌套</h3><ol><li>使用嵌套代替级联，或与级联结合使用。最常用，可以降低代码的冗余度，减少选择器之间的冲突。</li><li>&amp; 代表当前选择器父级。</li></ol><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">#header</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span>
  <span class="token selector">.logo</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">ul</span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
    <span class="token selector">li</span><span class="token punctuation">{</span>
        <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
        <span class="token selector">&amp;:hover</span><span class="token punctuation">{</span>
            <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">a</span><span class="token punctuation">{</span>
          <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 编译后 */</span>
<span class="token selector">#header</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#header .logo</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#header ul</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#header ul li</span><span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#header ul li:hover</span><span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#header ul li a</span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运算函数" tabindex="-1"><a class="header-anchor" href="#运算函数" aria-hidden="true">#</a> 运算函数</h3><ol><li>计算：算术运算 +、-、*、/ 可以对任何数字、颜色或变量进行运算。</li><li>对两个不同单位的值之间的运算，运算结果的值取第一个值的单位。可以添加括号，提升计算的优先级。</li><li>函数：内置了很多函数用于转换颜色、处理字符串、算术运算符等,如<code>width:ceil(99.5);向上取整</code></li></ol><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@font-size<span class="token punctuation">:</span></span>12px<span class="token punctuation">;</span>
<span class="token variable">@width<span class="token punctuation">:</span></span>1000px<span class="token punctuation">;</span>
<span class="token variable">@color<span class="token punctuation">:</span></span>#222222<span class="token punctuation">;</span>
<span class="token variable">@height<span class="token punctuation">:</span></span>500px<span class="token punctuation">;</span>
<span class="token comment">/*算术运算 +、-、*、/ 可以对任何数字、颜色或变量进行运算。*/</span>
<span class="token selector">.box</span><span class="token punctuation">{</span> 
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">@font-size</span> <span class="token operator">+</span> 20px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">@color</span> <span class="token operator">*</span> 3<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">@width</span> <span class="token operator">-</span> 120<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token variable">@height</span> <span class="token operator">/</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*内置了很多函数用于转换颜色、算术运算符*/</span>
<span class="token selector">.box1</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">ceil</span><span class="token punctuation">(</span>99.5<span class="token punctuation">)</span>
  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">floor</span><span class="token punctuation">(</span>99.5<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">/*  编译 */</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span> 
  <span class="token property">font-size</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #666666<span class="token punctuation">;</span> 
  <span class="token property">width</span><span class="token punctuation">:</span> 880px<span class="token punctuation">;</span> 
  <span class="token property">height</span><span class="token punctuation">:</span>250px<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
<span class="token selector">.box1</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 99<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作用域" tabindex="-1"><a class="header-anchor" href="#作用域" aria-hidden="true">#</a> 作用域</h3><p>作用域：作用域与 CSS 中的作用域非常相似，首先在本地查找变量和混入，如果找不到，则从 &quot;父级&quot; 作用域继承。与 CSS 自定义属性一样，混入和变量定义不必放在引用它们的行之前。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token variable">@var<span class="token punctuation">:</span></span> red<span class="token punctuation">;</span>
<span class="token selector">#page</span> <span class="token punctuation">{</span>
  <span class="token selector">#header</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@var</span><span class="token punctuation">;</span> <span class="token comment">// white</span>
  <span class="token punctuation">}</span>
  <span class="token variable">@var<span class="token punctuation">:</span></span> white<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h3><p>使用关键字 extend。继承（extend）和混入（mixins）相比，继承代码最终会转化成并集选择器。</p><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">nav ul</span> <span class="token punctuation">{</span>
  &amp;<span class="token punctuation">:</span><span class="token function">extend</span><span class="token punctuation">(</span>.inline<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.inline</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*编译  */</span>
<span class="token selector">nav ul</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.inline, nav ul</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h3>`,19),v=n("h3",{id:"链接",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#链接","aria-hidden":"true"},"#"),s(" 链接")],-1),b={href:"https://www.bilibili.com/video/BV1vC41137TA/?spm_id_from=333.788.videopod.episodes&vd_source=a3aec2a1dd5f478da3517872d0c61c5c&p=6",target:"_blank",rel:"noopener noreferrer"};function m(h,x){const a=l("ExternalLinkIcon");return c(),o("div",null,[u,n("ol",r,[n("li",null,[s("官网地址 "),n("a",d,[s("Less.js 中文网"),e(a)])])]),k,n("template",null,[v,n("p",null,[n("a",b,[s("2024码路Less和Sass | Less | Sass | CSS预处理器"),e(a)])])])])}const f=t(i,[["render",m],["__file","什么是Less.html.vue"]]);export{f as default};
