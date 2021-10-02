# 页面路由

本节示例代码基于「[Hello Z-Blog - 插件开发](books/dev-app-plugin?id=hello-z-blog "Hello Z-Blog - 插件开发")」创建的`demoPlugin`插件；

假定需求：

对于`{%host%}post/{%id%}.html`模式的访问，另外定义一条`{%host%}download/{%id%}.html`用于显示下载内容；

有「[旧版 - 页面路由](books/dev-route?id=旧版 "旧版 - 页面路由")」和「[新版 - 页面路由](books/dev-route?id=新版 "新版 - 页面路由")」两种方式；

## 旧版

向`ActivePlugin_demoPlugin()`函数内添加如下接口挂载；

```php
Add_Filter_Plugin('Filter_Plugin_ViewAuto_Begin', 'demoPlugin_Rewrite');
```

接口函数：

```php
function demoPlugin_Rewrite($original_url, $url)
{
  global $zbp;
  $r = UrlRule::OutputUrlRegEx("{%host%}download/{%id%}.html", 'article');

  // debug
  // ob_clean();
  echo __FILE__ . "丨" . __LINE__ . ":<br>\n";
  var_dump($r); // string(38) "/(?J)^download\/(?P[0-9]+)\.html$/"
  echo "<br><br>\n\n";
  // die();
  // debug

  $m = array();
  if (preg_match($r, $url, $m) == 1) {

    // debug
    // ob_clean();
    echo __FILE__ . "丨" . __LINE__ . ":<br>\n";
    var_dump($m);
    echo "<br><br>\n\n";
    // die();
    // debug

    /**
    * array(3) {
    *   [0]=>
    *   string(16) "download/32.html"
    *   ["id"]=>
    *   string(2) "32"
    *   [1]=>
    *   string(2) "32"
    * }
    **/

    // 可以使用 $m['id'] 作为参数进行查询和输出；
    // 也可以使用 ViewPost($m) 并配合 Filter_Plugin_ViewPost_Template 等接口；
    unset($m[0]); // 因为新机制的附带影响，目前需要在传值前额外处理；
    ViewPost($m);

    // 用于跳过同一接口队列中的后续操作
    $GLOBALS['hooks']['Filter_Plugin_ViewAuto_Begin']['demoPlugin_Rewrite'] = PLUGIN_EXITSIGNAL_RETURN;
  }
}
```

## 1.7 新版

1.假定需求 1：

对于`{%host%}post/{%id%}.html`模式的访问，另外定义一条`{%host%}download/{%id%}.html`用于显示下载内容；

向`ActivePlugin_demoPlugin()`函数内添加如下接口挂载；

```php
Add_Filter_Plugin('Filter_Plugin_Zbp_PreLoad', 'demoPlugin_RegRoute');
```

接口函数：

```php
function demoPlugin_RegRoute()
{
  global $zbp;
  $route = array(
    // 路由类型 (rewrite 类型使用 route 规则进行匹配，从规则中取得参数并传入 call，不匹配将跳出本规则进入下一条)
    'type' => 'rewrite',
    // 路由名称，推荐格式：前缀_路由功能
    'name' => 'plugin_demoPlugin_download',
    // 路由调用的函数 (可以为'函数名'或是'变量名@方法名'或是'变量名::静态方法')
    // 'call' => 'ViewPost', // 在本示例中并不能直接调用 ViewPost()
    'call' => 'demoPlugin_ViewDownload',
    // 动态路由和伪静路由的原始规则 (必须)
    'urlrule' => '{%host%}download/{%id%}.html',
    // 从伪静规则匹配到的数组中取值传给 call 的参数 (示例为 array('id', 'page') or array('cate@alias', 'page') )
    'args' =>
    array(
      0 => 'post@id',
    ),
  );
  $zbp->RegRoute($route);
}
// 对于路由匹配到的访问，会调用这个函数
function demoPlugin_ViewDownload($arg)
{

  // debug
  // ob_clean();
  echo __FILE__ . "丨" . __LINE__ . ":<br>\n";
  var_dump($arg);
  echo "<br><br>\n\n";
  // die();
  // debug

  /**
  * array(5) {
  *   [0]=>
  *   string(16) "download/32.html"
  *   ["id"]=>
  *   string(2) "32"
  *   [1]=>
  *   string(2) "32"
  *   ["post"]=>
  *   string(2) "32"
  *   ["route"]=>
  *   array(7) {
  *     // ……
  *     ["original_url"]=>
  *     string(17) "/download/32.html"
  *     ["url"]=>
  *     string(16) "download/32.html"
  *   }
  * }
  **/

  // 可以使用 $arg['id'] 作为参数进行查询和输出；
  // 也可以使用 ViewPost($arg) 并配合 Filter_Plugin_ViewPost_Template 等接口；
  unset($arg[0]); // 因为新机制的附带影响，目前需要在传值前额外处理；
  ViewPost($arg);
}
```

然后你就可以配合 Filter_Plugin_ViewPost_Template 等接口使用了。。这个简单的路由就结束了。

2.假定需求 2：

（1）添加多条路由。

（2）给文章页分页。

函数(甚至你都不需要新建函数，建立函数是为了整洁。。)

```php
function tt_test_rounte(){
	global $zbp;
		$route=array(
		array (
//路由类型 (rewrite类型使用Route规则进行匹配，从规则中取得参数并传入Call，不匹配将跳出本规则进入下1条)
'type' => 'rewrite',
//路由名称(同类型下不可重复，否则会覆盖)
'name' => 'post_article_single2',
//路由调用的函数(可以为'函数名'或是'变量名@方法名'或是'变量名::静态方法')
'call' => 'ViewPost',
//动态路由和伪静路由的原始规则(必须)
'urlrule' => '{%host%}post/{%id%}_all.html',
//从伪静规则匹配到的数组中取值传给call的参数(示例为array('id', 'page') or array('cate@alias', 'page') )
'args' =>
  array (
    0 => 'post@id',
    1 => 'post@alias',
    2 => 'post@all',
  ),
  ),
  array (
//路由类型 (rewrite类型使用Route规则进行匹配，从规则中取得参数并传入Call，不匹配将跳出本规则进入下1条)
'type' => 'rewrite',
//路由名称(同类型下不可重复，否则会覆盖)
'name' => 'post_article_single3',
//路由调用的函数(可以为'函数名'或是'变量名@方法名'或是'变量名::静态方法')
'call' => 'ViewPost',
//动态路由和伪静路由的原始规则(必须)
'urlrule' => '{%host%}post/{%id%}_{%page%}.html',
//从伪静规则匹配到的数组中取值传给call的参数(示例为array('id', 'page') or array('cate@alias', 'page') )
'args' =>
  array (
    0 => 'post@id',
    1 => 'post@alias',
    2 => 'post@page',
  ),
)

  );
			foreach ($route as $key => $value) {
               $zbp->RegRoute($value);
            }
            return true;

}
//添加路由可以配合Filter_Plugin_ViewPost_Template 等接口使用。
```
3.假定需求 3：

给文章页分页--直接使用一条路由解决问题，万能的正则表达式也能愉快的使用了。

对于`{%host%}post/{%id%}_{%page%}.html`模式的访问,给文章分页

```php
function tt_test_rounte(){
	global $zbp;
		$route=
		array (
//路由类型 (rewrite类型使用Route规则进行匹配，从规则中取得参数并传入Call，不匹配将跳出本规则进入下1条)
'type' => 'rewrite',
//路由名称(同类型下不可重复，否则会覆盖)
'name' => 'post_article_single2',
//路由调用的函数(可以为'函数名'或是'变量名@方法名'或是'变量名::静态方法')
'call' => 'ViewPost',
//动态路由和伪静路由的原始规则(必须)
'urlrule' => '{%host%}post/{%id%}_{%all%}.html',
//从伪静规则匹配到的数组中取值传给call的参数(示例为array('id', 'page') or array('cate@alias', 'page') )
'args' =>
  array (
    0 => 'post@id',
    1 => 'post@alias',
	'all' => 'all|[0-9]+',
  ),
  );
		$zbp->RegRoute($route);
    return true;

}
```
