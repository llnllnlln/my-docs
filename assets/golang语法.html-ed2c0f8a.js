import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-e7c604ce.js";const p="/my-docs/assets/go1-f7a730d1.png",e="/my-docs/assets/go2-a9180571.png",o={},c=t('<h2 id="介绍使用" tabindex="-1"><a class="header-anchor" href="#介绍使用" aria-hidden="true">#</a> 介绍使用</h2><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3><ol><li>Go语言保证了既能到达静态编译语言的安全和性能，又达到了动态语言开发维护的高效率。从C语言中继承了很多理念，包括表达式语法，控制结构，基础数据类型，调用参数传值，指针等</li><li>引入包的概念，用于组织程序结构，Go语言的一个文件都要归属于一个包，而不能单独存在</li><li>垃圾回收机制，内存自动回收，不需开发人员管理</li><li>管道通信机制，形成Go语言特有的管道channel,通过管道channel可以实现不同的goroutine之间的相互通信</li><li>天然并发</li><li>有新语法：比如切片 slice、延时执行 defer</li><li>极简单的部署方式：可直接编译成机器码、不依赖其他库、直接运行即可部署</li></ol><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3><ol><li>区块链技术</li><li>后台服务器应用：负载均衡，cache，容错</li><li>云服务后台应用：CDN的调度系统、分发系统</li></ol><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><ol><li>安装<code>visual studio code</code></li><li>下载golang对应版本的安装包 <code>https://golang.google.cn/dl/</code></li><li>windows 下配置 Golang 环境变量 <ul><li><code>GOROOT</code>：指定SDK的安装路径如 <code>d:/programs/go</code></li><li><code>Path</code>：添加SDK的/bin目录</li><li><code>GOPATH</code>：工作目录，go项目的工作路径</li></ul></li><li>配置好，在终端输入<code>go version</code>，会打印出对应的版本号</li><li>使用语法api：<code>https://studygolang.com/pkgdoc</code></li></ol><h3 id="源码阅读" tabindex="-1"><a class="header-anchor" href="#源码阅读" aria-hidden="true">#</a> 源码阅读</h3><ol><li>src目录是重要源码，里面有很多包，import引用的包在里面，阅读源码直接查看这个就好，与中文网的api是一一对应关系。<br><img src="'+p+'" alt="image.png" loading="lazy"><br><img src="'+e+`" alt="image.png" loading="lazy"></li></ol><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><h3 id="main函数" tabindex="-1"><a class="header-anchor" href="#main函数" aria-hidden="true">#</a> main函数</h3><ol><li>新建.go文件，然后编写如下。</li><li>执行： <ul><li>第一种：<code>go run xx</code> 表示直接编译go语言并执行应用程序；</li><li>第二种：<code>go build</code> 命令对该go文件进行编译，生成.exe文件，运行xx.exe文件即可</li></ul></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// package main定义了包名。必须在源文件中非注释的第一行指明这个文件属于哪个包</span>
<span class="token comment">// package main表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包</span>
<span class="token keyword">package</span> main
<span class="token comment">// 告诉 Go 编译器这个程序需要使用 fmt 包, 包实现了格式化 IO（输入/输出）的函数。</span>
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token comment">// func 是一个关键字，表示一个函数。</span>
<span class="token comment">// main 是函数名，是一个主函数，即我们程序的入口。</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 表示调用 fmt 包的函数 Println </span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Go&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量声明" tabindex="-1"><a class="header-anchor" href="#变量声明" aria-hidden="true">#</a> 变量声明</h3><ol><li>局部变量的声明 <ul><li>var a int 声明一个变量 默认的值是0</li><li>var b int = 100 声明一个变量，初始化一个值</li><li>var c=100 可以省去数据类型，通过值自动匹配当前的变量的数据类型</li><li>e:= 100 省去var关键字，直接自动匹配，但是不支持全局</li></ul></li><li>多变量的声明 <ul><li>var xx,yy int = 100,200 单行写法</li><li>多行写法</li></ul></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//方法一：声明一个变量 默认的值是0</span>
	<span class="token keyword">var</span> a <span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;a = &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>  <span class="token comment">//a =  0</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;type of a = %T\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token comment">//type of a = int</span>
	<span class="token comment">//方法二：声明一个变量，初始化一个值</span>
	<span class="token keyword">var</span> b <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b = &quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span>  <span class="token comment">//b =  100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;type of b = %T\\n&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token comment">//type of b = int</span>
  <span class="token comment">//方法三：可以省去数据类型，通过值自动匹配当前的变量的数据类型</span>
	<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token number">100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;c = &quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span> <span class="token comment">//c =  100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;type of c = %T\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token comment">//type of c = int</span>
  <span class="token comment">//方法四：(常用的方法) 省去var关键字，直接自动匹配</span>
	e <span class="token operator">:=</span> <span class="token number">100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;e = &quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token comment">//c =  100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;type of e = %T\\n&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token comment">//type of e = int </span>

  <span class="token comment">// 声明多个变量</span>
	<span class="token keyword">var</span> xx<span class="token punctuation">,</span> yy <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;xx = &quot;</span><span class="token punctuation">,</span> xx<span class="token punctuation">,</span> <span class="token string">&quot;, yy = &quot;</span><span class="token punctuation">,</span> yy<span class="token punctuation">)</span> <span class="token comment">// xx =  100 , yy =  200</span>
  <span class="token comment">//多行的多变量声明</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		vv <span class="token builtin">int</span>  <span class="token operator">=</span> <span class="token number">100</span>
		jj <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;vv = &quot;</span><span class="token punctuation">,</span> vv<span class="token punctuation">,</span> <span class="token string">&quot;, jj = &quot;</span><span class="token punctuation">,</span> jj<span class="token punctuation">)</span> <span class="token comment">// vv =  100 , jj =  true </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h3><ol><li>常量 const a int = 10</li><li>iota 与const来表示枚举类型</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
	<span class="token comment">//可以在const() 添加一个关键字 iota， 每行的iota都会累加1, 第一行的iota的默认值是0</span>
	a <span class="token operator">=</span> <span class="token number">10</span><span class="token operator">*</span><span class="token boolean">iota</span>	 <span class="token comment">//iota = 0</span>
	b 		       <span class="token comment">//iota = 1</span>
	c            <span class="token comment">//iota = 2</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">//常量(只读属性)</span>
	<span class="token keyword">const</span> length <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;length = &quot;</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span> <span class="token comment">// length =  10</span>
	<span class="token comment">//length = 100 //常量是不允许修改的。</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;a = &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">// a =  0 </span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b = &quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">// b =  10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;c = &quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span> <span class="token comment">// c =  20</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> string</h3><ol><li>对于字符串 操作的 4 个包：bytes、strings、strconv、unicode</li><li>bytes包：操作[]byte。因为字符串是只读的，因此逐步构创建字符串会导致很多分配和复制，使用 bytes.Buffer 类型会更高。</li><li>strings包：提供切割、索引、前缀、查找、替换 等功能。</li><li>strconv包：提供布尔型、整型数、浮点数 和对应字符串的相互转换，还提供了双引号转义相关的转换。</li><li>unicode包：提供了IsDigit、IsLetter、IsUpper、IsLower 等类似功能，用于给字符分类。</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	str <span class="token operator">:=</span> <span class="token string">&quot;你好啊！&quot;</span>
	<span class="token comment">// 如果包含汉字，以下遍历方式会出现乱码：ä½ å¥½åï¼</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c&quot;</span><span class="token punctuation">,</span> str<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 使用 range 来遍历，就不会</span>
	<span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> str <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;index = %d value = %c\\n&quot;</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// index = 0 value = 你</span>
	<span class="token comment">// index = 3 value = 好</span>
	<span class="token comment">// index = 6 value = 啊</span>
	<span class="token comment">// index = 9 value = ！</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><ol><li>返回多个返回值</li><li>import导包 <ul><li><code>import _ &quot;fmt&quot;</code> ：给fmt包起一个别名匿名，无法使用当前包的方法，但是会执行当前的包内部的init()方法</li><li><code>import aa &quot;fmt&quot;</code>：给fmt包起一个别名aa， aa.Printn()来直接调用。</li><li><code>import . &quot;fmt&quot;</code>：将当前fmt包中的全部方法，导入到当前本包的作用中，fmt包中的全部的方法可以直接使用API来调用，不需要fmt.APl来调用</li></ul></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token comment">//返回一个返回值</span>
<span class="token keyword">func</span> <span class="token function">foo1</span><span class="token punctuation">(</span>a <span class="token builtin">string</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">100</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回多个返回值， 有形参名称的</span>
<span class="token keyword">func</span> <span class="token function">foo3</span><span class="token punctuation">(</span>a <span class="token builtin">string</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>r1 <span class="token builtin">int</span><span class="token punctuation">,</span> r2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;a = &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">//a =  foo3</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b = &quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">//b =  333</span>
	<span class="token comment">//r1 r2 属于foo3的形参，初始化默认的值是0</span>
	<span class="token comment">//给有名称的返回值变量赋值</span>
	r1 <span class="token operator">=</span> <span class="token number">1000</span>
	r2 <span class="token operator">=</span> <span class="token number">2000</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	c <span class="token operator">:=</span> <span class="token function">foo1</span><span class="token punctuation">(</span><span class="token string">&quot;foo1&quot;</span><span class="token punctuation">,</span> <span class="token number">555</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;c = &quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span>  <span class="token comment">//c =  100</span>

	ret1<span class="token punctuation">,</span> ret2 <span class="token operator">:=</span> <span class="token function">foo3</span><span class="token punctuation">(</span><span class="token string">&quot;foo3&quot;</span><span class="token punctuation">,</span> <span class="token number">333</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;ret1 = &quot;</span><span class="token punctuation">,</span> ret1<span class="token punctuation">,</span> <span class="token string">&quot; ret2 = &quot;</span><span class="token punctuation">,</span> ret2<span class="token punctuation">)</span><span class="token comment">//ret1 =  1000  ret2 =  2000</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h3><ol><li>获取变量的地址，用&amp;，比如:var num int,获取 num 的地址:&amp;num</li><li>变量作为参数传入函数，如果原本的变量值要有变化，那么需要 <ul><li>使用指针<code>swap(&amp;c, &amp;d)</code>，传入的是变量的地址。</li><li>函数的参数需要加上*，<code>func swap(pa *int, pb *int) {...}</code></li></ul></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">swapValue</span><span class="token punctuation">(</span>a <span class="token builtin">int</span> <span class="token punctuation">,</span>b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> temp <span class="token builtin">int</span>
	temp <span class="token operator">=</span> a
	a <span class="token operator">=</span> b
	b <span class="token operator">=</span> temp
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">swap</span><span class="token punctuation">(</span>pa <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">,</span> pb <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> temp <span class="token builtin">int</span>
	temp <span class="token operator">=</span> <span class="token operator">*</span>pa <span class="token comment">//temp = main::a</span>
	<span class="token operator">*</span>pa <span class="token operator">=</span> <span class="token operator">*</span>pb  <span class="token comment">// main::a = main::b</span>
	<span class="token operator">*</span>pb <span class="token operator">=</span> temp <span class="token comment">// main::b = temp</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> a <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">10</span>
	<span class="token keyword">var</span> b <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">20</span>
	<span class="token keyword">var</span> c <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">30</span>
	<span class="token keyword">var</span> d <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">40</span>
	<span class="token function">swapValue</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> 
	<span class="token function">swap</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>c<span class="token punctuation">,</span> <span class="token operator">&amp;</span>d<span class="token punctuation">)</span> 
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;a = &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token string">&quot; b = &quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">//a =  10  b =  20 传入值main里面的无变化</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;c = &quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token string">&quot; d = &quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span> <span class="token comment">// c =  40  d =  30 传入指针则main里面交换了</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="defer" tabindex="-1"><a class="header-anchor" href="#defer" aria-hidden="true">#</a> defer</h3><ol><li>defer的执行顺序：defer关键字的语句，先进后出</li><li>defer和return谁先谁后：return之后的语句先执行，defer后的语句后执行</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">//写入defer关键字</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main end1&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main end2&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main::hello go 1&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main::hello go 2&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//main::hello go 1</span>
<span class="token comment">//main::hello go 2</span>
<span class="token comment">//main end2</span>
<span class="token comment">//main end1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="slice" tabindex="-1"><a class="header-anchor" href="#slice" aria-hidden="true">#</a> slice</h3><ol><li>默认都是采用值传递，但是有些值天生就是指针：<code>slice、map、channel</code>。</li><li>定长数组：写法一：<code>var myArray1 [3]int</code> ；写法二：<code>myArray2 := [5]int{1,2,3}</code></li><li>动态数组：写法一： <code>myArray := []int{1,2,3,4}</code> ；写法二：<code>slice1 := make([]int, 3)</code></li><li>slice定长数组是值传递，slice 是指针传递。</li><li>slice 操作： <ul><li>截取是浅拷贝：<code>numbers := []int{0,1,2,3}</code> <code>numbers[1:3]</code></li><li>append()：增加切片的容量 <code>numbers = append(numbers, 1)</code></li><li>copy()：深拷贝需要使用</li></ul></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 固定长度的数组 两种写法</span>
	<span class="token keyword">var</span> myArray1 <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token comment">//写法一</span>
	myArray2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token comment">//写法二</span>
  <span class="token comment">// 遍历两种写法</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>myArray1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myArray1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>	
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> myArray2 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;index = &quot;</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> <span class="token string">&quot;, value = &quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 0</span>
<span class="token comment">// 0</span>
<span class="token comment">// 0</span>
<span class="token comment">// index =  0 , value =  1</span>
<span class="token comment">// index =  1 , value =  2</span>
<span class="token comment">// index =  2 , value =  3</span>
<span class="token comment">// index =  3 , value =  0</span>
<span class="token comment">// index =  4 , value =  0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">printArray</span><span class="token punctuation">(</span>myArray <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//引用传递</span>
	<span class="token comment">// _ 表示匿名的变量</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> myArray <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;value = &quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
		myArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 动态数组，两种写法</span>
	myArray <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span> <span class="token comment">//写法一</span>
	<span class="token comment">// 声明slice1是一个切片，同时给slice分配空间，3个空间，初始化值是0, 通过:=推导出slice是一个切片</span>
	slice1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">//写法二</span>
	<span class="token comment">// 动态数组是指针传递,在函数里面修改的值，main会改变</span>
	<span class="token function">printArray</span><span class="token punctuation">(</span>myArray<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;修改后遍历-----&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> myArray <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;value = &quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>	
<span class="token punctuation">}</span>
<span class="token comment">// value =  1</span>
<span class="token comment">// value =  2</span>
<span class="token comment">// value =  3</span>
<span class="token comment">// value =  4</span>
<span class="token comment">// 修改后遍历-----</span>
<span class="token comment">// value =  100</span>
<span class="token comment">// value =  2</span>
<span class="token comment">// value =  3</span>
<span class="token comment">// value =  4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h3><ol><li>map和slice类似，只不过是数据结构不同，map有三种声明方式</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">//声明myMap1是一种map类型 key是string， value是string</span>
	<span class="token keyword">var</span> myMap1 <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	<span class="token comment">//在使用map前， 需要先用make给map分配数据空间</span>
	myMap1 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	myMap1<span class="token punctuation">[</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;java&quot;</span>
	myMap1<span class="token punctuation">[</span><span class="token string">&quot;two&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;c++&quot;</span>
	myMap1<span class="token punctuation">[</span><span class="token string">&quot;three&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;python&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myMap1<span class="token punctuation">)</span> <span class="token comment">//map[one:java two:c++ three:python]</span>

	<span class="token comment">//===&gt; 第二种声明方式</span>
	myMap2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	myMap2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;java&quot;</span>
	myMap2<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;c++&quot;</span>
	myMap2<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;python&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myMap2<span class="token punctuation">)</span> <span class="token comment">//map[1:java 2:c++ 3:python]</span>

	<span class="token comment">//===&gt; 第三种声明方式</span>
	myMap3 <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;one&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;php&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;two&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;c++&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;three&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;python&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myMap3<span class="token punctuation">)</span> <span class="token comment">//map[one:php two:c++ three:python]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>使用方式</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">printMap</span><span class="token punctuation">(</span>myMap <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//myMap 是一个引用传递</span>
	<span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> myMap <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;key = &quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token string">&quot;value = &quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	myMap <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	<span class="token comment">//添加</span>
	myMap<span class="token punctuation">[</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;java&quot;</span>
	myMap<span class="token punctuation">[</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;c++&quot;</span>
	myMap<span class="token punctuation">[</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;python&quot;</span>
	<span class="token comment">//遍历</span>
	<span class="token function">printMap</span><span class="token punctuation">(</span>myMap<span class="token punctuation">)</span>
	<span class="token comment">//删除</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>myMap<span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//修改</span>
	myMap<span class="token punctuation">[</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;C#&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;遍历查看是否修改-------&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//遍历查看是否修改</span>
	<span class="token function">printMap</span><span class="token punctuation">(</span>myMap<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//key =  1 value =  java</span>
<span class="token comment">//key =  2 value =  c++</span>
<span class="token comment">//key =  3 value =  python</span>
<span class="token comment">//遍历查看是否修改-------</span>
<span class="token comment">//key =  2 value =  c++</span>
<span class="token comment">//key =  3 value =  C#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="面向对象" tabindex="-1"><a class="header-anchor" href="#面向对象" aria-hidden="true">#</a> 面向对象</h3><ol><li>type、struct:利用 type 可以声明某个类型的别名,声明一种新的数据类型，struct定义一个结构体</li><li>封装：Golang 中，类名、属性名、⽅法名 首字⺟大写 表示对外（其他包）可以访问，否则只能够在本包内访问。</li><li>继承：父类、子类；子类可以继承父类方法，也可以重写父类同名方法</li><li>多态：父类有接口，子类实现父类全部接口方法，父类类型的变量（指针）指向（引用）子类的具体数据变量</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token comment">//声明一种行的数据类型Book</span>
<span class="token comment">//定义一个结构体</span>
<span class="token keyword">type</span> Book <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	title <span class="token builtin">string</span>
	auth  <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">var</span> book1 Book
	book1<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&quot;Golang&quot;</span>
	book1<span class="token punctuation">.</span>auth <span class="token operator">=</span> <span class="token string">&quot;zhang3&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n&quot;</span><span class="token punctuation">,</span> book1<span class="token punctuation">)</span> <span class="token comment">//{Golang zhang3}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>继承例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token comment">// 父类相关</span>
<span class="token keyword">type</span> Human <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
	sex  <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Human<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Human.Eat()...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Human<span class="token punctuation">)</span> <span class="token function">Walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Human.Walk()...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//SuperMan类继承了Human类的方法</span>
<span class="token keyword">type</span> SuperMan <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Human 
	level <span class="token builtin">int</span>
<span class="token punctuation">}</span>
<span class="token comment">//重定义父类的方法Eat()</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>SuperMan<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;SuperMan.Eat()...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//子类的新方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>SuperMan<span class="token punctuation">)</span> <span class="token function">Fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;SuperMan.Fly()...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>SuperMan<span class="token punctuation">)</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;name = &quot;</span><span class="token punctuation">,</span> this<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;sex = &quot;</span><span class="token punctuation">,</span> this<span class="token punctuation">.</span>sex<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;level = &quot;</span><span class="token punctuation">,</span> this<span class="token punctuation">.</span>level<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	h <span class="token operator">:=</span> Human<span class="token punctuation">{</span><span class="token string">&quot;zhang3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;female&quot;</span><span class="token punctuation">}</span>
	h<span class="token punctuation">.</span><span class="token function">Walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	h<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//定义一个子类对象</span>
	s <span class="token operator">:=</span> SuperMan<span class="token punctuation">{</span>Human<span class="token punctuation">{</span><span class="token string">&quot;li4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;female&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;----子类对象&quot;</span><span class="token punctuation">)</span>
	s<span class="token punctuation">.</span><span class="token function">Walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//父类的方法</span>
	s<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">//子类的方法</span>
	s<span class="token punctuation">.</span><span class="token function">Fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">//子类的方法</span>
	s<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//  Human.Walk()...</span>
<span class="token comment">//  Human.Eat()...</span>
<span class="token comment">//  ----子类对象</span>
<span class="token comment">//  Human.Walk()...</span>
<span class="token comment">//  SuperMan.Eat()...</span>
<span class="token comment">//  SuperMan.Fly()...</span>
<span class="token comment">//  name =  li4</span>
<span class="token comment">//  sex =  female</span>
<span class="token comment">//  level =  88</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多态例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token comment">//本质是一个指针</span>
<span class="token keyword">type</span> AnimalIF <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">GetColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token comment">//获取动物的颜色</span>
	<span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>  <span class="token comment">//获取动物的种类</span>
<span class="token punctuation">}</span>

<span class="token comment">//具体的类</span>
<span class="token keyword">type</span> Cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	color <span class="token builtin">string</span> <span class="token comment">//猫的颜色</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Cat<span class="token punctuation">)</span> <span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Cat is 猫类&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Cat<span class="token punctuation">)</span> <span class="token function">GetColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> this<span class="token punctuation">.</span>color
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Cat<span class="token punctuation">)</span> <span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token string">&quot;Cat&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//具体的类</span>
<span class="token keyword">type</span> Dog <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	color <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Dog<span class="token punctuation">)</span> <span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Dog is 犬类&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Dog<span class="token punctuation">)</span> <span class="token function">GetColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> this<span class="token punctuation">.</span>color
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this <span class="token operator">*</span>Dog<span class="token punctuation">)</span> <span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token string">&quot;Dog&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">showAnimal</span><span class="token punctuation">(</span>animal AnimalIF<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;color = &quot;</span><span class="token punctuation">,</span> animal<span class="token punctuation">.</span><span class="token function">GetColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;kind = &quot;</span><span class="token punctuation">,</span> animal<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> animal AnimalIF <span class="token comment">//接口的数据类型， 父类指针</span>
	animal <span class="token operator">=</span> <span class="token operator">&amp;</span>Cat<span class="token punctuation">{</span><span class="token string">&quot;Green&quot;</span><span class="token punctuation">}</span>
	animal<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//Cat is 猫类 调用的就是Cat的Type()方法 , 多态的现象</span>
	animal <span class="token operator">=</span> <span class="token operator">&amp;</span>Dog<span class="token punctuation">{</span><span class="token string">&quot;Yellow&quot;</span><span class="token punctuation">}</span>
	animal<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//Dog is 犬类 调用的就是Cat的Type()方法 , 多态的现象</span>

	cat <span class="token operator">:=</span> Cat<span class="token punctuation">{</span><span class="token string">&quot;Green&quot;</span><span class="token punctuation">}</span>
	dog <span class="token operator">:=</span> Dog<span class="token punctuation">{</span><span class="token string">&quot;Yellow&quot;</span><span class="token punctuation">}</span>

	<span class="token function">showAnimal</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cat<span class="token punctuation">)</span> <span class="token comment">// color =  Green kind =  Cat</span>
	<span class="token function">showAnimal</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dog<span class="token punctuation">)</span> <span class="token comment">// color =  Yellow kind =  Dog</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="interface与类型断言" tabindex="-1"><a class="header-anchor" href="#interface与类型断言" aria-hidden="true">#</a> interface与类型断言</h3><ol><li>interface{}是万能数据类型，</li><li>如何区分此时引用的底层数据类型到底是什么？--“类型断言” 的机制</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token comment">//interface{}是万能数据类型</span>
<span class="token keyword">func</span> <span class="token function">myFunc</span><span class="token punctuation">(</span>arg <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//interface{} 改如何区分 此时引用的底层数据类型到底是什么？</span>
	<span class="token comment">//给 interface{} 提供 “类型断言” 的机制</span>
	value<span class="token punctuation">,</span> ok <span class="token operator">:=</span> arg<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arg<span class="token punctuation">,</span> <span class="token string">&quot;: arg is not string type&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arg<span class="token punctuation">,</span> <span class="token string">&quot;: arg is string type, value = &quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> Book <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	auth <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	book <span class="token operator">:=</span> Book<span class="token punctuation">{</span><span class="token string">&quot;Golang&quot;</span><span class="token punctuation">}</span> 
	<span class="token function">myFunc</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span> <span class="token comment">// book类型  {Golang} : arg is not string type</span>
	<span class="token function">myFunc</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token comment">// int类型   100 : arg is not string type</span>
	<span class="token function">myFunc</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token comment">// string类型  abc : arg is string type, value =  abc</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反射" tabindex="-1"><a class="header-anchor" href="#反射" aria-hidden="true">#</a> 反射</h3><p>reflect包：valueOf用来获取输入参数接口中的数据的值，如果接口为空则返回0；TypeOf用来动态获取输入参数接口中的值的类型，如果接口为空则返回nil；</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id   <span class="token builtin">int</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>this User<span class="token punctuation">)</span> <span class="token function">Call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;user is called ..&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n&quot;</span><span class="token punctuation">,</span> this<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;Aceld&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">}</span>
	<span class="token function">DoFiledAndMethod</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">DoFiledAndMethod</span><span class="token punctuation">(</span>input <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//获取input的type</span>
	inputType <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;inputType is :&quot;</span><span class="token punctuation">,</span> inputType<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">//inputType is : User</span>

	<span class="token comment">//获取input的value</span>
	inputValue <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;inputValue is:&quot;</span><span class="token punctuation">,</span> inputValue<span class="token punctuation">)</span> <span class="token comment">//inputValue is: {1 Aceld 18}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="并发编程" tabindex="-1"><a class="header-anchor" href="#并发编程" aria-hidden="true">#</a> 并发编程</h2><h3 id="goroutine" tabindex="-1"><a class="header-anchor" href="#goroutine" aria-hidden="true">#</a> goroutine</h3><ol><li>协程：goroutine是Go语言并行设计的核心，它比线程更小，执行goroutine只需极少的栈内存，所以可同时运行成千上万个并发任务，goroutine比thread更易用、更高效、更轻便。</li><li>创建Goroutine，在函数调⽤语句前添加 go 关键字，就可创建并发执⾏单元。</li><li>调用<code>runtime.Goexit()</code>将立即终止当前<code>goroutine</code>执⾏</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
<span class="token string">&quot;fmt&quot;</span>
<span class="token string">&quot;runtime&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A.defer&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;B.defer&quot;</span><span class="token punctuation">)</span>
            runtime<span class="token punctuation">.</span><span class="token function">Goexit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 终止当前 goroutine, import &quot;runtime&quot;</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 不会执行</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 不会执行</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  
<span class="token punctuation">}</span>
<span class="token comment">// B.defer</span>
<span class="token comment">// A.defer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> channel</h3><ol><li>channel是Go语言中的一个核心类型，可以把它看成管道。</li><li>channel是一个数据类型，主要用来解决go程的同步问题以及go程之间数据共享（数据传递）的问题。</li><li>定义channel变量：需要一个对应make创建的底层数据结构的引用， <ul><li>chan是创建channel所需使用的关键字<code>make(chan Type)</code></li><li>发送value到channel:<code>channel &lt;- value</code></li><li>从channel中接收数据，并赋值给x:<code>x :=&lt;-channel</code></li></ul></li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义一个channel</span>
	c <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;goroutine 结束&quot;</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;goroutine 正在运行&quot;</span><span class="token punctuation">)</span>
		c <span class="token operator">&lt;-</span> <span class="token number">666</span> <span class="token comment">// 将666发送给c</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	num <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c <span class="token comment">// 从c中接受数据, 并赋值给num</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;num = &quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main goroutine 结束...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// goroutine 正在运行</span>
<span class="token comment">// goroutine 结束</span>
<span class="token comment">// num =  666</span>
<span class="token comment">// main goroutine 结束...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,60),i=[c];function l(u,k){return s(),a("div",null,i)}const m=n(o,[["render",l],["__file","golang语法.html.vue"]]);export{m as default};
