## 本地环境搭建
将下载后的程序代码解压到你的网站根目录，如`/home/wwwroot/example.com/`，运行你的网站，会自动跳转到安装页面：`http://example.com/zb_install/index.php`。

在安装页面输入您的数据库信息、博客名称、用户名、密码等信息后程序将会自动安装。

本地环境mysql默认账户密码均是root，数据库名为字母或字母加数字
- [视频教程](https://www.bilibili.com/video/BV1wyZnY2EYq/?share_source=copy_web&vd_source=8a82759c2c3c36bf8a6dcde3d4b74658) 

## 5分钟快速入门

#### 1.开启开发者模式

在`后台首页`->`应用中心`->`配置`页面开启`启用开发者模式`

在`后台首页`->`网站配置`->`全局配置`页面开启`调试模式`

可选辅助插件`KOD文件管理`、`Adminer数据库管理`、`debug`

#### 2.创建主题并配置主题描述

在`后台首页`->`应用中心`->`新建主题`页面开始主题的创建。

| 必要字段   | 说明         |
| ---------- | ------------ |
| 应用ID | 为了防止与其他应用id冲突，采用 缩写_字母 的形式，如：my_themename |
| 应用名称 | 在主题管理页面显示 |
| 发布页面 | 点击应用名称的时候会跳转到发布页面 |
| 应用简介 | 主题的简要说明，不在主题管理页面显示 |
| 作者名称 | 在主题管理页面显示 |
| 作者网站 | 点击作者名称的时候会跳转到作者网站 |

#### 3.创建模板文件

在`zb_users\theme\主题ID\template`文件夹下创建模板文件`index.php`和`single.php`。

`index.php`，文件内容如下:
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$name}-{$title}</title>
    <link rel="stylesheet" rev="stylesheet" href="{$host}zb_users/theme/{$theme}/style/{$style}.css" type="text/css" media="all"/>
	  <script src="{$host}zb_system/script/jquery-latest.min.js?v={$version}"></script>
	  <script src="{$host}zb_system/script/zblogphp.js?v={$version}"></script>
	  <script src="{$host}zb_system/script/c_html_js_add.php?hash={$html_js_hash}&v={$version}"></script>
{$header}
</head>
<body>
    {foreach $articles as $article}
    <a href="{$article.Url}">{$article.Title}</a>
    {/foreach}
{$footer}
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
    <title>{$name}-{$title}</title>
    <link rel="stylesheet" rev="stylesheet" href="{$host}zb_users/theme/{$theme}/style/{$style}.css" type="text/css" media="all"/>
	  <script src="{$host}zb_system/script/jquery-latest.min.js?v={$version}"></script>
	  <script src="{$host}zb_system/script/zblogphp.js?v={$version}"></script>
	  <script src="{$host}zb_system/script/c_html_js_add.php?hash={$html_js_hash}&v={$version}"></script>
{$header}
</head>
<body>
    <h2>{$article.Title}</h2>
	  <div>{$article.Content}</div>
{$footer}
</body>
</html>
```
#### 4.启用模板

在`后台首页`->`主题管理`页面选择自己的主题，点击`启用`，`启用`后主题会显示到第一个位置，并显示蓝色选中状态。
#### 5.打开前台首页

此时，我们进入网站首页就可以看到我们写的主题了,至此我们的快速入门就讲完了。

- [视频教程](https://www.bilibili.com/video/BV1xpRUY9EKB/)
  
## template模板布局
一个网站很多页面都有相同的部分，比如公共的css和js 文件，导航，底部，如何把这些公共部分有效的组织起来呢。
#### 拆分首页
```html
<!DOCTYPE html>
<html>
<head>
    <!--公共头部，负责加载公共 css，和其它资源，放在 header.php-->
    <!--本页面自定义的样式，或其它资源-->
</head>
<body>
<!--导航，放在c_nav.php-->
<!--主要内容-->
<!--公共底部，js文件，放在 footer.php-->
<!--本页面自定义的js-->
</body>
</html>
```
#### 制作公共头部文件
在`zb_users\theme\主题ID\template`目录下添加`header.php`,内容如下：
```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<meta name="generator" content="{$zblogphp}" />
<meta name="renderer" content="webkit">
<title>{$name}-{$title}</title>
<!--加载主题主css样式-->
<link rel="stylesheet" rev="stylesheet" href="{$host}zb_users/theme/{$theme}/style/{$style}.css?{$themeinfo['modified']}" type="text/css" media="all" />
<!--加载zblog必要的js-->
<script src="{$host}zb_system/script/jquery-latest.min.js?v={$version}"></script>
<script src="{$host}zb_system/script/zblogphp.js?v={$version}"></script>
<script src="{$host}zb_system/script/c_html_js_add.php?{if isset($html_js_hash)}hash={$html_js_hash}&{/if}v={$version}"></script>
<!--激活插件-->
{$header}
<!--XML-->
{if $type=='index'&&$page=='1'&&$option['ZC_XMLRPC_ENABLE']}
<link rel="alternate" type="application/rss+xml" href="{$feedurl}" title="{$name}" />
<link rel="EditURI" type="application/rsd+xml" title="RSD" href="{$host}zb_system/xml-rpc/?rsd" />
<link rel="wlwmanifest" type="application/wlwmanifest+xml" href="{$host}zb_system/xml-rpc/wlwmanifest.xml" />
{/if}
```
#### 制作导航文件
在`zb_users\theme\主题ID\template`目录下添加`c_nav.php`,内容如下：
```html
<div id="divTop">
    <h1 id="BlogTitle"><a href="{$host}">{$name}</a></h1>
    <h2 id="BlogSubTitle">{$subname}</h2>
</div>
<div id="divNavBar">
    <ul>
        {module:navbar}
    </ul>
</div>
```
- 制作公共底部文件
在`zb_users\theme\主题ID\template`目录下添加`footer.php`,内容如下：
```html
<!--版权说明-->
{$copyright}
<!--激活插件-->
{$footer}
```
#### 拼装首页
在这一步我们就使用`template`标签来加载公共文件，更改后台首页模板内容如下：
```html
<!DOCTYPE html>
<html>
<head>
    <!--加载公共头部文件-->
    {template:header}
    <!--本页面自定义的样式，或其它资源-->
</head>
<body>
<!--加载导航文件-->
{template:c_nav}
<div class="container">
    <!--主要内容-->
</div>
{template:footer}
<!--本页面自定义的js-->
</body>
</html>
```

- [视频教程](https://www.bilibili.com/video/BV1Y1duYbEBm/)

## 页面判断
#### 列表页
首页、分类页、用户页、日期页和标签页都是用的index.php模板页面，如想个性化设置每个页面的模板，可以这样判断
```html
{if $type=='index'&&$page=='1'}
<!--/*判断首页*/-->
{template:c_list_index}
{elseif $type=='category'}
<!--/*判断分类页*/-->
{template:c_list_cate}
{elseif $type=='author'}
<!--/*判断用户页*/-->
{template:c_list_author}
{elseif $type=='date'}
<!--/*判断日期页*/ -->
{template:c_list_date}
{elseif $type=='tag'}
<!--/*判断标签页*/-->
{template:c_list_tag}
{else}
<!--/*其他自定义列表页面*/-->
{template:c_list}
{/if}
```
然后新建相应的模板文件，c_list这里的命名随意，只要和模板文件名一致即可。文档这样起名是为了方便管理。

#### 列表页
{if $article.Type==ZC_POST_TYPE_ARTICLE}
<!--/*判断文章页*/-->
{template:post-single}
{else}
<!--/*判断单页*/-->
{template:post-page}
{/if}

#### 页面说明
在网站 \zb_users\theme\主题ID\ 文件夹下创建 template.json
```json
  {
      "id": "主题ID",
      "templates": [
          {
              "filename": "index",
              "type": "list",
              "name": "列表自动模板"
          },
          {
              "filename": "single",
              "type": "single",
              "name": "文章/单页自动模板"
          }
      ]
  }
```

## 导航标签制作

导航标签用于生成前台导航,标签`{module:navbar}`
zblog的导航默认只支持到二级导航，自定义样式可参考以下步骤。
- 1.开启《链接模块管理》插件
- 2.找到当前主题的模板目录，进入template文件夹
- 3.在template文件夹下创建`lm-module-navbar.php`文件，文件内容如下:
```html
<li class="{if count($item.subs)}dropdown{/if}">{if count($item.subs)}<i class="arr"></i>{/if}
    <a href="{$item.href}" target="_self" target="{$item.target}" title="{$item.title}">{$item.text}</a>
    {if count($item.subs)}
    <div class="dropdown-box">
        {foreach $item.subs as $itemSub}
        <p><a href="{$itemSub.href}" target="{$itemSub.target}" title="{$itemSub.title}">{$itemSub.text}</a></p>
        {/foreach}
    </div>
    {/if}
</li>
```
- 4.在需要显示导航的模板文件中添加以下代码:
```html
{module:navbar}
```
- 5.这个时候就可以在后台-》模块管理-》导航栏，编辑里面配置导航了。

## 自定义区域调用文章列表
```html
array(
  'count' => 10, //（可省略）
  'cate' => 1, //（可省略）
  'auth' => 2, //（可省略）
  'date' => '2020-1', //（可省略）
  'tags' => 'abc', //（可省略）
  'search' => 's', //（可省略）
  //以下是原$option 参数的 key 键
  'post_type' => null, //指定查询 Post 表的类型 （可省略）
  'post_status' => null, //指定查询 Post 表的状态 （可省略）
  'only_ontop' => false, //指定全是置顶 （可省略）
  'only_not_ontop' => false, //指定全不是置顶 （可省略）
  'has_subcate' => false, //指定包含子孙目录 （可省略）
  'is_related' => '文章id', //指定查询相关文章 （可省略）
  'order_by_metas' => false, //指定按 Metas 值排序输出结果 （可省略）
  'random' => 5, //指定抽取 5 篇 Post 表的记录 （可省略）
  'where_custom' => array(array('=', 'log_Template', '')), //自定义 where
  'order_custom' => array('log_ViewNums' => 'DESC', 'log_CommNums' => 'ASC'), //自定义 order
)
```
#### 调用某个分类下的文章
```html
{php}
$w=array();
$w['count']=9;   //显示9篇文章
$w['cate']=1;    //分类ID
$array=GetList($w);
{/php}
{foreach $array as $key=>$related}
<li><a href="{$related.Url}"><i>{$key+1}</i> {$related.Title} </a></li>
{/foreach}
```
#### 调用同分类文章
```html
{php}
$cid=$article->Category->RootID?$article->Category->RootID:$article->Category->ID; //获取当前大分类ID
$posttime=$article->PostTime;
$weektime=$posttime-604800;
$w=array();
$w['random']=9;  //随机9篇文章
$w['count']=9;   //读取9篇文章
$w['cate']=$cid;    //当前分类或当前大分类
$w['has_subcate']=1; //指定包含子孙目录
$w['where_custom']=array(array('<>', 'log_ID', $article->ID),array('>', 'log_PostTime', $weektime),array('<', 'log_PostTime', $posttime)); //当前文章发布时间一周内的文章
$array=GetList($w);
{/php}
{foreach $array as $key=>$related}
<li><a href="{$related.Url}" target="_blank"><i>{$key+1}</i> {$related.Title} </a></li>
{/foreach}
```
#### 调用最热门文章
```html
{php}
$w=array();
$w['count']=5;
$w['order_custom']=array('log_ViewNums' => 'DESC'); //热门文章
$w['where_custom']=array(array('>', 'log_PostTime', time()-31536000)); //仅显示一年内的文章
$w['cate']=(int)$zbp->Config('ytecn')->proid;  //分类ID
$w['has_subcate']=1;    //包含子孙目录分类
$w['offset']=5;         //偏移值
$array=GetList($w);
{/php}
{foreach $array as $key=>$related}
{$key+1}-{$related.Time()}--<a href="{$related.Url}" title="{$related.Title}">{$related.Title}</a></li>
{/foreach}
```
#### 过滤某个分类
```html
$w=array();
$w['count']=10;    //显示数量
//分类id为1的文章不显示
$w['where_custom']=array();
$w['where_custom'][]=array('<>', 'log_CateID', '1');
$result = GetList($w);
{foreach $array as $key=>$related}
{$key+1}-{$related.Time()}--<a href="{$related.Url}" title="{$related.Title}">{$related.Title}</a></li>
{/foreach}
```
## 分类列表
#### 调用全部分类
```html
{foreach $categoriesbyorder as $categorynav}
<li><a href='{$categorynav.Url}'>{$categorynav.Name}</a></li>
{/foreach}
```
#### 调用当前子分类的同级分类
```html
{php}
$cid=0;
if($type=='category'){
  $cid=$category->RootID?$category->RootID:$category->ID;
}elseif($type=='article'){
  $cid=$article->Category->RootID?$article->Category->RootID:$article->Category->ID;
}
{/php}
{if $cid}
{$zbp->GetCategoryByID($cid)->Name}
{foreach $categorys[$cid].SubCategorys as $categorynav}
<li><a href='{$categorynav.Url}'>{$categorynav.Name}</a></li>
{/foreach}
{/if}
```
