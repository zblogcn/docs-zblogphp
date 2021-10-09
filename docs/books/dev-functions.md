# 函数列表

Z-BlogPHP 封装了众多辅助函数，文件路径为：「[zb_system/function/c_system_common.php](https://github1s.com/zblogcn/zblogphp/blob/master/zb_system/function/c_system_common.php "zb_system/function/c_system_common.php - GitHub1s") 」←此链接可直接在线查看；

本章节会介绍一些相对常用的，具体定义可在文件中搜索查看。

## GetList()

通过 GetList 可以获取自定义的文章列表，如指定分类的最新文章、置顶文章等等；

```php
$result = GetList(array('count'=>10)) //返回array(Post类型) 或是 空array()
```

array 参数如下
```php
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
  'is_related' => false, //指定查询相关文章 （可省略）
  'order_by_metas' => false, //指定按 Metas 值排序输出结果 （可省略）
  'random' => 5, //指定抽取 5 篇 Post 表的记录 （可省略）
  'where_custom' => array(array('=', 'log_Template', '')), //自定义 where
  'order_custom' => array('log_ViewNums' => 'DESC', 'log_CommNums' => 'ASC'), //自定义 order
)
```

## GetPost()

通过 GetPost 可以获取指定的文章或页面或是其它类型的 Post 表的数据；

```php
//返回id为10的Post对象实例，如果没有就返回一个空的Post对象实例
$post = GetPost(array('id'=>10)) //返回object(Post类型)
```

array 参数如下
```php
array(
  'id' => 10, //指定 ID（可省略）
  'title' => 'abc', //指定 Post 标题（可省略）
  'alias' => 'cba', //指定 Post 别名（可省略）
  'titleoralias' => 'ddd', //指定 Post 标题 or 别名（可省略）
  'idorname' => 'fff', //指定 Post 的 ID 或标题 or 别名（可省略）
  //以下是原$option 参数的 key 键
  'post_type' => null, //指定查询 Post 表的类型 （可省略）
  'post_status' => null, //指定查询 Post 表的状态 （可省略）
  'only_article' => false, //指定是查找文章 （可省略）
  'only_page' => false, //指定是查找页面 （可省略）
  'where_custom' => array(array('=', 'log_Template', '')), //自定义 where
  'order_custom' => array('log_CommNums' => 'ASC'), //自定义 order
)
```

## GetVars()

- 可快速获取 `GET`/`POST` 等传值；
- 不存在时将默认返回`null`，无需`isset($_GET['act'])`判断；
- 可通过第三个可选参数决定默认返回值；
- 其实第二个参数大小写不敏感，但是不知道为什么习惯上还是大写；

```php
$act = GetVars("act", "GET");
$name = GetVars("name", "POST");
```

## GetValueInArray()

- 从数组中获取指定键值的元素；
- 内部封装了所需键值是否存在的判断，不存在时返回第三个参数；
- 第三个参数可省，默认值为 `null`；

```php
  $siteInfos = array(
    "url" => "https://docs.zblogcn.com/php/",
    "git" => "https://github.com/zblogcn/docs-zblogphp",
    "engine" => "docsify",
  );
  $siteUrl = GetValueInArray($siteInfos, "url", "");
  echo $siteUrl;
  // https://docs.zblogcn.com/php/
```

## GetImagesFromHtml()

从 HTML 中获取所有图片；

参数及返回值；

```php
// @param  string $html
// @return array
```

## 获取空间环境信息

```php
// 系统信息概览
var_dump(GetEnvironment());
// string(73) "WINNT10.0; IIS10.0; PHP7.4.21x64; mysqli5.7.23; curl7.70.0; OpenSSL1.1.1k"

// 以下是其他相关函数

// 请求协议
GetScheme($_SERVER)

// web 服务 - Nginx / Apache / IIS
GetWebServer()

// 操作系统
GetSystem()

// PHP 版本
GetPHPVersion()

```
