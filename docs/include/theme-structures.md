## 文件结构

以下基于通过「[创建应用](dev-app-start?id=创建应用 "创建应用")」生成的初始文件：

```conf
/path/zb_users/theme/curTheme
│  screenshot.png [必需]缩略图 300*240像素, 横向；
│  theme.xml      [必需]自述文件；
│  main.php       [可选]应用内置管理页，在创建主题时填写才会生成；
│  include.php    [可选]应用嵌入页，在创建主题时填写才会生成；
│
├─compile         [废弃]旧版 z-blog 用于放置模板编译文件，可直接删除；
├─include         [可选]主题自带「文件模块」，使用{module:abc}「嵌入调用」该目录下的abc.php文件；
├─script          [可选]JS目录；
├─style           [必需]样式目录, 内存样式表及所需图片；
│      style.css  [必需]不限于这个文件名，一套主题也可以拥有多个样式（各自独立使用）；
│
├─css             [可选]并不会自动创建，用于不应该放在style文件夹中的样式内容；
└─template        用于存放模板文件；建议优先确立以下 6 个模板文件及内容；
       index.php  首页及列表页
       single.php 文章页(单页)
       search.php 搜索结果页，不存在时使用index.php
       header.php 公共头部文件
       footer.php 公共尾部文件
       404.php    建议设置
```

## 主入口模板

默认情况下，系统只会尝试直接调用`index.php`、`single.php`、`search.php`、`404.php`四个模板文件（如果存在的话）；

其他模板则通过「嵌入语法」组合其自身内容到「主模板」之中；

## 嵌入调用

### 语法

  `{template:hearder}` - 嵌入模板文件 hearder.php 的文件内容。

### 示例

- 理论上可以直接使用如下示例作为四个「主模板」文件的基础结构；**「`YouCode`部分除外」**；
- `{template:header}` `{template:footer}` `{template:sidebar}` 为「Z-BlogPHP 体系内」常用模板，`{template:hero}`则可自由命名，用于拆分相应位置的代码；
- 关于「模板描述信息」「变量输出标签」等部分的详情，参见：「[模板书写](dev-app-theme?id=模板书写 "模板书写")」

```html
{* Template Name: 首页及列表页 * Template Type: index|list *}
<!-- ↑ 「模板描述信息」，包括适配的「页面类型」，放在模板文件第一行 -->
<!DOCTYPE html>
<html lang="{$language}"><!-- {$language} 为「变量输出标签」 -->

<head>
  {template:header}<!-- 公共头部文件 -->
</head>

<body class="{$type}"><!-- 同为「变量输出标签」，对应上方 Template Type -->
  {template:hero}
  <!-- ↓YouCode↓ -->
  <!-- ↓YouCode↓ -->
  <div id="divNavBar">
    <!-- 导航「模块」调用 -->
    <ul>{module:navbar}</ul>
  </div>
  <div id="divMiddle">
    <div id="divMain">列表索引或正文内容</div>
    <!-- 「侧栏」调用 -->
    <div id="divSidebar">{template:sidebar}</div>
  </div>
  <!-- ↑YouCode↑ -->
  <!-- ↑YouCode↑ -->
  {template:footer}<!-- 公共尾部文件 -->
</body>

</html>

```
