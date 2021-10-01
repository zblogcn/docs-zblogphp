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

    // 用于跳过同一接口队列中的后续操作
    $GLOBALS['hooks']['Filter_Plugin_ViewAuto_Begin']['demoPlugin_Rewrite'] = PLUGIN_EXITSIGNAL_RETURN;
  }
}
```

## 新版

待补充
