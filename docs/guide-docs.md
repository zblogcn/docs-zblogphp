# 文档规范

## 前言

您可以 `pull` 「本文档项目」 到本地，然后安装 `docsify` 预览编辑后的效果：

[repo-docs](terms/repo-docs.md ':include')

**重要：请使用支持 `.editorconfig` 的编辑器或安装相应插件，以实现最基本的格式统一。**

## 关于 docsify

docsify 文档：[https://docsify.js.org/#/zh-cn/](https://docsify.js.org/#/zh-cn/ "docsify")

**注：这是一个 `npm` 项目，需要提前安装好 `Node.js` 。**

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

**注：虽然不推荐，但是也可以不安装 `docsify` ，仅使用适合的 「代码编辑器」 或 「Markdown 编辑器」 对文件进行编辑后提交。**

**注：对于 VSCode 编辑器，可以使用快捷键 `ctrl + shift + b` 自动执行 `docsify serve docs` 命令。**

## docsify 使用技巧

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

独立成段使用时效果如上，同段落有其他内容时则作为指向链接，[类似这样](terms/repo-docs.md ':include')

**重要：不要指定 `Prettier` 作为「\*.md 文件」的格式化插件， 嵌套语法的单引号会变成双引号。**

## 文法约定

| 形式                   | 适用                                                               | 附加     |
| ---------------------- | ------------------------------------------------------------------ | -------- |
| `zb_system`            | 一个实际存在的文件（夹）/文字对应的路径、链接或按钮/一个命令或操作 | 前后空格 |
| 「本文档」「后台管理」 | 名词概念性的强调                                                   |          |
| **注：内容**           | 整段内容强调，                                                     |          |
| **重要：内容**         | 整段内容强调，重要程度比上边高                                     |          |

## 格式规范检查

本文档使用 lint-md 检查格式规范，配置文件位于 `/mdlint.json`。您可以安装 VSCode 插件 `mdlint` （可以在插件市场搜索到）实时检查，或者通过 [lint-md/cli](https://github.com/lint-md/cli "lint-md/cli") 进行检查和修复。

您通过 `Pull request` 或者直接提交到本仓库后，会运行 `GitHub Action` 来自动检查格式规范。

## 代码片段（VSCode）

**注：中文文本后的英文字符无法触发代码片段，需要前边空一格且关掉中文输入法。**

**注：快捷键： `ctrl + space` 。**

<!-- 拆分至 include/guide-snippets.json -->
[guide-snippets](include/guide-snippets.json ':include')
