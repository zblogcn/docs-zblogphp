# 页面路由

本节示例代码基于「[Hello Z-Blog - 插件开发](books/dev-app-plugin?id=hello-z-blog "Hello Z-Blog - 插件开发")」创建的`demoPlugin`插件；

有「[新版 - 页面路由](books/dev-route?id=新版 "新版 - 页面路由")」和「[旧版 - 页面路由](books/dev-route?id=旧版 "旧版 - 页面路由")」两种方式；

## 1.7 新版

<!-- 需求 1 -->

**假定需求 1：**

对于`{%host%}post/{%id%}.html`模式的访问，另外定义一条`{%host%}download/{%id%}.html`用于显示下载内容；

**向`ActivePlugin_demoPlugin()`函数内添加如下接口挂载；**

```php
Add_Filter_Plugin('Filter_Plugin_Zbp_PreLoad', 'demoPlugin_RegRoute');
```

**接口函数定义：**

```php
function demoPlugin_RegRoute()
{
  global $zbp;
  $route = array(
    // 默认取 0 即 article，建议显示设置，表示当前路由无论是单页还是列表都与该类型相关；
    // 可按需设置 $GLOBALS['posttype'] 内的其他值，还可以自行添加类型，或者设置为 null 表示不属于任何类型；
    'posttype' => 0,
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
    'args_with' =>
    array(
      'verify_permalink' => false, //1.7.1新增参数，可以不比对当前url与目标url是否相同
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
  ViewPost($arg);
}
```
<!-- 需求 1 结束 -->

<!-- 需求 2 -->

**假定需求 2：**

（1）添加多条路由。

（2）给文章页分页。

既添加`'{%host%}post/{%id%}_all.html'`和`'{%host%}post/{%id%}_{%page%}.html'`两条路由；

**接口挂载同「需求 1」**

**接口函数定义：**

```php
function demoPlugin_RegRoute2()
{
  global $zbp;
  $routes = array(
    // 全文查看
    array(
      'posttype' => 0,
      'type' => 'rewrite',
      'name' => 'plugin_demoPlugin_PostAll',
      'call' => 'demoPlugin_ViewPost',
      'urlrule' => '{%host%}post/{%id%}_all.html',
      // 匹配到本条路由时传递一个 all 参数用于区分
      'args_with' =>
      array("all" => true, 'verify_permalink' => false),
    ),
    // 分页
    array(
      'posttype' => 0,
      'type' => 'rewrite',
      'name' => 'plugin_demoPlugin_PostPagination',
      'call' => 'demoPlugin_ViewPost',
      'urlrule' => '{%host%}post/{%id%}_{%page%}.html',
    )

  );
  foreach ($routes as $value) {
    $zbp->RegRoute($value);
  }
  return true;
}

function demoPlugin_ViewPost($arg)
{

  // debug
  // ob_clean();
  echo __FILE__ . "丨" . __LINE__ . ":<br>\n";
  var_dump($arg);
  echo "<br><br>\n\n";
  // die();
  // debug

  // 从数组获取指定下标的值，不存在则返回第三个参数；
  $isAll = GetValueInArray($arg, "all", false);
  // 理论上能进入当前函数，则必然存在 $arg["id"]；
  $id = $arg["id"];

  if ($isAll) {
    // 全文获取
    // code
  } else {
    $page = $arg["page"];
    // 将文章内容分页后获取第 $page 页；
    // code
  }
}
```
<!-- 需求 2 结束 -->

<!-- 需求 3 -->

**假定需求 3：**

仍然是文章内容分页，但是只使用一条规则实现；

将`'{%host%}post/{%id%}_{%page%}.html'`改为`'{%host%}post/{%id%}_{%all%}.html'`，由`{%all}`匹配对应位置的内容；

**接口函数定义：**

```php
// 和 demoPlugin_RegRoute2() 只需挂载一个
// demoPlugin_ViewPost() 内的实现会不一样
function demoPlugin_RegRoute3()
{
  global $zbp;
  $route =
    array(
      'posttype' => 0,
      'type' => 'rewrite',
      'name' => 'plugin_demoPlugin_PostPagination',
      'call' => 'demoPlugin_ViewPost',
      'urlrule' => '{%host%}post/{%id%}_{%all%}.html',
      'args' =>
      array(
        // 0 => 'post@id',
        'all' => 'all|[0-9]+',
      ),
      'args_with' =>
      array('verify_permalink' => false),//不比对当前url与目标url是否相同
    );
  $zbp->RegRoute($route);
  return true;
}
```
<!-- 需求 3 结束 -->


## 旧版

**假定需求：**

对于`{%host%}post/{%id%}.html`模式的访问，另外定义一条`{%host%}download/{%id%}.html`用于显示下载内容；

**向`ActivePlugin_demoPlugin()`函数内添加如下接口挂载；**

```php
Add_Filter_Plugin('Filter_Plugin_ViewAuto_Begin', 'demoPlugin_Rewrite');
```

**接口函数定义：**

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