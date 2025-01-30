## 5分钟快速入门

- 1.开启开发者模式

在`后台首页`->`应用中心`->`配置`页面开启`启用开发者模式`

在`后台首页`->`网站配置`->`全局配置`页面开启`调试模式`

可选辅助插件`KOD文件管理`、`Adminer数据库管理`、`debug`

- 2.创建主题并配置主题描述

在`后台首页`->`应用中心`->`新建主题`页面开始主题的创建。

| 必要字段   | 说明         |
| ---------- | ------------ |
| 应用ID | 为了防止与其他应用id冲突，采用 缩写_字母 的形式，如：my_themename |
| 应用名称 | 在主题管理页面显示 |
| 发布页面 | 点击应用名称的时候会跳转到发布页面 |
| 应用简介 | 主题的简要说明，不在主题管理页面显示 |
| 作者名称 | 在主题管理页面显示 |
| 作者网站 | 点击作者名称的时候会跳转到作者网站 |

- 3.创建模板文件

在`zb_users\theme\default\template`文件夹下创建模板文件`index.php`和`single.php`。
`index.php`，文件内容如下:
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
<body>
    {foreach $articles as $article}
    <a href="{$article.Url}">{$article.Title}</a>
    {/foreach}
</body>
</html>
```
`single.php`，文件内容如下:
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
<body>
    <h2>{$article.Title}</h2>
	<div>{$article.Content}</div>
</body>
</html>
```
- 4.启用模板

在`后台首页`->`主题管理`页面选择自己的主题，点击`启用`，`启用`后主题会显示到第一个位置，并显示蓝色选中状态。
- 5.打开前台首页

此时，我们进入网站首页就可以看到我们写的主题了,至此我们的快速入门就讲完了。
