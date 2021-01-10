# 文档规范

## 前言

您可以`pull` 「本文档项目」 到本地，然后安装`docsify`预览编辑后的效果：

[repo-docs](terms/repo-docs.md ':include')

**重要：请使用支持`.editorconfig`的编辑器或安装相应插件，以实现最基本的格式统一。**

## 关于docsify

docsify文档：[https://docsify.js.org/#/zh-cn/](https://docsify.js.org/#/zh-cn/ "docsify")

**注：这是一个`npm`项目，需要提前安装好`Node.js`**

基本的命令备忘：

```bash
# cnpm i docsify-cli -g
npm i docsify-cli -g
# 全局安装`docsify`

# cd "/d/web/#Git/docs-zblogphp"
# docsify init ./docs
# 用于创建新的文档项目，「本文档」已经创建过了

# cd "/d/web/#Git/docs-zblogphp"
docsify serve docs
# Listening at
# http://localhost:3000
```

**注：虽然不推荐，但是也可以不安装`docsify`，仅使用适合的 「代码编辑器」 或 「Markdown编辑器」 对文件进行编辑后提交。**

## docsify使用技巧

### 嵌套调用重复内容

将需要重复使用的内容单独写进一个*.md文件，然后可以用如下语法引用：

```md
[host](terms/host.md ':include')

[path](terms/path.md ':include')
```

效果如下：

[host](terms/host.md ':include')

[path](terms/path.md ':include')

**独立成段使用时效果如上，同段落有其他内容时则作为指向链接，[类似这样](terms/repo-docs.md ':include')**

## 文法约定

## 代码片段（VSCode）
