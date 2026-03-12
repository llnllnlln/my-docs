---
title: Claude code快速上手
isTimeLine: true
date: 2025-11-28
category:
  - AI工具
tag:
  - AI工具
---
### 是什么？
1. Calude Code 是由 Anthropic 开发的官方 CLI 工具，用于协助用户处理软件工程任务。 Anthropic 发现了Cursor的成功后，开发了Claude Code作为Cursor的竞品。
2. Claude是完全通过终端进行交互的，其中内置了多种工具，比如文件操作、搜索等。可以理解自然语言并转化为相应的命令执行。
### 安装
#### Kimi K2API key获取
1. Kimi K2新模型遵循Anthropic协议，这代表着其可以顺利接入Claude Code，并且无需任何路由代理，只需要配置好URL与API即可直接使用。
2. 直接来到Moonshot官网获取自己的`API key`，注册后新建`API key`，然后将Moonshot的url以及`API key`设置进环境变量的系统变量中。`ANTHROPIC_API_KEY：API key` `ANTHROPIC_BASE_URL：https://api.moonshot.cn/anthropic/`
#### Claude Code 的安装
1. 安装Git，安装之后，配置环境变量`CLAUDE_CODE_GIT_BASH_PATH：git路径`
2. 安装Node.js 18+ 版本
3. 安装claude-code : `npm install -g @anthropic-ai/claude-code`  `claude --version`
4. 启动网络代理服务,在开启代理服务后还需要让cmd也能使用代理服务。
5. 登陆方式，一种是官方的，一种使用Anthropic控制平台。选择第二种，会自动从环境变量中寻找配置信息登陆进去
### Claude Code 入门
1. 启动Claude Code:在项目根目录启动`claude`/`claude "帮我分析这个项目的结构"`
2. 语言设置:创建文件夹`.claude`，在.claude文件夹中创建文件`config.json`
3. 通过自然语言生成项目分析报告:读取工作目录下一个项目文件，并生成一份项目分析报告。比如输入`将C:\Users\Administrator\Desktop\test1\drools_demo这个地址设置为你的工作目录,然后在此目录下生成一个分模块详细分析的项目说明文档`，它就会分析，经过一段然后时间后生出报告分析。
4. 从零开始创建简单项目,`/add-dir <工作目录>`, 然后`输入指令:在此工作目录下创建一个使用JavaScript编写的简单的计时器程序，要求交互界面，可以一键运行`。输入后开始执行,在一段等待时间之后，其完成了该任务，创建了一个前端页面
### Claude Code 使用
Claude Code的斜杠命令配合自然语言输入，可以贯穿开发全流程：从环境准备、到编码调试、再到功能完善，以及最后的性能分析和优化，每一步都有相应的操作支持。灵活地组合运用命令和自然语言输入，能把重复繁杂的操作交给AI处理，开发者则专注于高层逻辑，实现真正的人机协作高效编程。
场景：接手一个新项目，需要先熟悉代码，再开发新功能，最后提交PR并做审查。
1. 初始化项目记忆：进入项目目录，启动 Claude Code 后，首先运行 /init 创建 `CLAUDE.md` 项目指南。这样Claude对项目有基本认识。接着询问 `"> summarize this project"`，Claude很快给出代码库概览，得益于刚生成的记忆文件提供的上下文。
2. 配置模型与权限：发现默认模型对架构问题思考稍显吃力，于是输入 `/model opus` 切换到更强大的模型，以更好理解复杂代码结构。
3. 编写代码与反馈：在Claude的协助下，开始编写新功能代码。Claude 直接在终端提议修改文件并执行了编辑。过程中会话变长，适时使用 `/compact "保留新功能相关讨论"` 将上下文压缩，让Claude聚焦当前任务。当一个模块修改完成，用 `/clear` 清理对话历史，针对下一个模块重新开始，确保Claude不被上一部分内容干扰。
4. 代码功能完善
5. 代码性能分析和优化