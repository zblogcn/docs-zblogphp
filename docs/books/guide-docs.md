# 文档规范

## 前言

您可以 `pull` 「本文档项目」 到本地，然后安装 `docsify` 预览编辑后的效果：

[repo-docs](terms/repo-docs.md ':include')

推荐按照「[Git 使用](#git-使用)」一节的方法进行操作；

**重要：请使用支持 `.editorconfig` 的编辑器或安装相应插件，以实现最基本的格式统一。**


## 本地预览配置

**重要：需要安装 `Node.js`；「[Node.js](https://nodejs.org/zh-cn "Node.js")」**

本文档基于 `docsify` 搭建，主要文档内容存于 `docs/books` 文件夹内；

您可以通过安装相应的`cli`工具用以预览编辑后的效果；

可以选择全局安装或者在项目文件夹内安装：

```bash
# 推荐使用 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com

# ----------------------------

# 全局安装
cnpm i docsify-cli @lint-md/cli -g

# 进入项目文件夹
# cd docs-zblogphp

# 开启服务
docsify serve docs
# Listening at http://localhost:3000

# 命令行执行文本检查
lint-md ./docs --config mdlint.json

# ----------------------------

# 项目内安装及使用

# 进入项目文件夹
# cd docs-zblogphp

# 安装依赖
cnpm i

# 开启服务
npm run dev
# Listening at http://localhost:3000

# 命令行执行文本检查
npm run lint

```

**注：**

1. 虽然不推荐，但是也可以不安装 `docsify` ，仅使用适合的 「代码编辑器」 或 「Markdown 编辑器」 对文件进行编辑后提交；
2. `@lind-md/cli`用来对文本排版进行规范，见「[格式规范检查](#格式规范检查)」；
3. 对于 VSCode 编辑器，在全局安装依赖后：
   1. 可以使用快捷键 `ctrl + shift + b` 自动执行 `docsify serve docs` 命令；
   2. 「菜单栏」→「终端」→「运行任务」→「`lint-md cli`」调用语法检查；

## docsify 使用技巧

> docsify 文档：[https://docsify.js.org/#/zh-cn/](https://docsify.js.org/#/zh-cn/ "docsify")

### 嵌套调用重复内容

将需要重复使用的内容单独写进一个「\*.md 文件」文件，然后可以用如下语法引用：

```md
[host](terms/host.md ':include')

[path](terms/path.md ':include')

[repo-docs](terms/repo-docs.md ':include')

<!-- 这里会列出 `terms` 内的全部调用，可直接复制或者熟记文件名后使用代码片段快捷书写 -->
<!-- 触发短语为： `inc_terms` -->
```

效果如下：

[host](terms/host.md ':include')

[path](terms/path.md ':include')

独立成段使用时效果如上，同段落有其他内容时则作为指向链接，[类似这样](books/terms/repo-docs.md ':include')

**重要：不要指定 `Prettier` 作为「\*.md 文件」的格式化插件， 嵌套语法的单引号会变成双引号。**

## 文法约定

| 形式                   | 适用                                                               | 附加     |
| ---------------------- | ------------------------------------------------------------------ | -------- |
| `zb_system`            | 一个实际存在的文件（夹）/文字对应的路径、链接或按钮/一个命令或操作 | 前后空格 |
| 「本文档」「后台管理」 | 名词概念性的强调                                                   |          |
| **注：内容**           | 整段内容强调，                                                     |          |
| **重要：内容**         | 整段内容强调，重要程度比上边高                                     |          |

## 格式规范检查

本文档使用 lint-md 检查格式规范，配置文件位于 `/mdlint.json`。您可以安装 VSCode 插件「[mdLint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=wdssmq.mdlint "mdLint - Visual Studio Marketplace")」实时检查，或者通过 [lint-md/cli](https://github.com/lint-md/cli "lint-md/cli") 进行检查和修复。

您通过 `Pull request` 或者直接提交到本仓库后，会运行 `GitHub Action` 来自动检查格式规范。

## 代码片段（VSCode）

**注：中文文本后的英文字符无法触发代码片段，需要前边空一格且关掉中文输入法。**

**注：快捷键： `ctrl + space` 。**

<!-- 拆分至 guide-docs/guide-snippets.json -->
[guide-snippets](guide-docs/guide-snippets.json ':include')


## Git 使用

> 可视化工具可以使用「[TortoiseGit](https://tortoisegit.org/download/ "TortoiseGit")」或「[GitKraken](https://www.gitkraken.com/download "GitKraken")」；

1、Fork 项目仓库到自己的账号下；「[zblogcn/docs-zblogphp: Z-BlogPHP Documentation](https://github.com/zblogcn/docs-zblogphp "zblogcn/docs-zblogphp: Z-BlogPHP Documentation")」

2、克隆自己的仓库到本地，并按如下命令操作；

`wdssmq`替换为自己的用户名；

```bash
# 初始
YOUR_NAME=wdssmq
YOUR_REPO_URL=git@github.com:wdssmq/docs-zblogphp.git
ZBP_REPO_URL=git@github.com:zblogcn/docs-zblogphp.git

# 克隆
git clone $YOUR_REPO_URL

# 进入目录，后续操作都在该目录下进行
cd docs-zblogphp

# 重命名
git remote rename origin $YOUR_NAME

# 设置 remote.pushdefault
git config remote.pushdefault $YOUR_NAME

# 添加官方仓库，用于同步更新
git remote add zbp $ZBP_REPO_URL

# ↑ 以上操作只需执行一次……

# 查看
git remote -v

# wdssmq  git@github.com:wdssmq/docs-zblogphp.git (fetch)
# wdssmq  git@github.com:wdssmq/docs-zblogphp.git (push)
# zbp     git@github.com:zblogcn/docs-zblogphp.git (fetch)
# zbp     git@github.com:zblogcn/docs-zblogphp.git (push)

```

3、基于 main 创建新分支，修改内容后提交；


```bash

# ↓ 用于查看分支信息，会经常用到
git branch -a -vv

# 确保当前分支为 main
git switch main

# 创建新分支，同一分支下仅修改互相关联的内容，可多次提交
git switch -c feat-2023-03-23 && git branch -a -vv

# 推送，记得更换远程仓库名和分支名
git push -u wdssmq feat-2023-03-23

# 注：对于同一个分支，首次带 `-u` 参数提交后大概后续可以直接用 `git push` 提交

```

4、在 GitHub 上提交 Pull request，等待审核合并；

- **同一分支下可以继续提交内容，但仅限同一内容主旨**；
- 新的内容请按第 3 步创建新分支，如果期间官方有更新先按操作 5 同步 main 分支；

5、同步更新官方仓库；

```bash
# 切换到 main 分支
git switch main

# 拉取官方仓库
git pull zbp main

# 推送到自己的仓库
git push wdssmq main

```
