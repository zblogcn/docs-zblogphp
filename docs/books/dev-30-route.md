# 页面路由

本节示例代码基于「[Hello Z-Blog - 插件开发](books/dev-15-plugin?id=hello-z-blog "Hello Z-Blog - 插件开发")」创建的`demoPlugin`插件；

有「[新版 - 页面路由](books/dev-30-route?id=_17-新版 "新版 - 页面路由")」和「[旧版 - 页面路由](books/dev-30-route?id=旧版 "旧版 - 页面路由")」两种方式；

## 1.7 新版路由

1.7 版本新增加了`路由系统`，一般来说，我们只要向系统注入一条`路由规则`，再实现该条路由 call 的函数，匹配成功后向该函数传入一个数组参数，就实现路由功能了。

增加路由条目的关键是在配置`路由规则`的数组，如果对`路由系统`不熟悉，请在应用中心下载 `Z-Blog PHP Development Kit` 插件，仔细研究系统自带的`路由规则`。


<!-- 需求 1 -->

### 例子 1(搜索功能伪静态化)

**假定需求 1：**

实现搜索功能的伪静态化

```php
//将注入路由的函数挂上接口
Add_Filter_Plugin('Filter_Plugin_Zbp_PreLoad', 'demoPlugin_RegRoute');

//创建搜索伪静化的规则，并挂在 Filter_Plugin_Zbp_PreLoad 接口
function demoPlugin_RegRoute()
  global $zbp;
  $route = array (
    'posttype' => 0,//文章类型
    'type' => 'rewrite',
    'name' => 'post_article_search', //名称
    'call' => 'ViewSearch', //呼叫的函数，匹配成功后call之，并传入一个含有各种匹配参数的数组
    'urlrule' => '{%host%}search/{%q%}_{%page%}.html',//规则主体
    'args' => 
    array (
      'q' => '[^\\/_]+',//q是搜索的关键字，支持正则匹配
      'page',//page是页码
    ),
    'only_match_page' => false,//为假表示可以匹配没有{%page%}参数的url
  );
  $zbp->RegRoute($route);
}

//ViewSearch函数系统已经写好了，所以只需要注入路由就可以实现搜索功能的伪静态化！

```

路由系统在匹配到规则后，向 call 所指定的函数 传入一个 array 数组，其格式如下

```php
function ViewSearch() {
    //获取路由系统传入参数，路由系统传入一个且只传一个含有各种匹配参数的数组
    $args = func_get_arg[0];

    $q = $args['q']; //获取查询字符串

    $page = $args['page']; //获取页面，如果有的话

    //得到该匹配成功的Route路由规则
    $route = $args['_route'];

    //可以打印出$args查看详情
    var_dupm($args);

/*
//该数组由posttype和匹配的各种参数和原始规则组成
array(4) {
  ["q"]=>
  string(7) "xxxxxxx"
  ["page"]=>
  int(1)
  ["posttype"]=>
  int(0)
  ["_route"]=>
  array(10) {
      //路由规则。。。
      //该段省略
  }
  }
*/
}
```

<!-- 需求 1 结束 -->

<!-- 需求 2 -->

### 例子 2(文章页专属下载页)

**假定需求 2：**

对于`{%host%}post/{%id%}.html`模式的访问，另外定义一条`{%host%}download/{%id%}.html`用于显示下载内容；

**向`ActivePlugin_demoPlugin()`函数内添加如下接口挂载；**

```php
Add_Filter_Plugin('Filter_Plugin_Zbp_PreLoad', 'demoPlugin_RegRoute');
```

**接口函数定义：**

```php
//注册一条属于文章页的下载页面，并挂在 Filter_Plugin_Zbp_PreLoad 接口
function demoPlugin_RegRoute()
{
  global $zbp;
  $route = array(
    // 默认取 0 即 article，建议显示设置，表示当前路由无论是单页还是列表都与该类型相关；
    // 可按需设置 $GLOBALS['posttype'] 内的其他值，还可以自行添加类型，或者设置为 null 表示不属于任何类型；
    'posttype' => 0, //0是文章
    // 路由类型 (rewrite 类型使用 route 规则进行匹配，从规则中取得参数并传入 call，不匹配将跳出本规则进入下一条)
    'type' => 'rewrite',
    // 路由名称，推荐格式：前缀_路由功能
    'name' => 'plugin_demoPlugin_download',
    // 路由调用的函数
    'call' => 'demoPlugin_ViewDownload',
    // 动态路由和伪静路由的原始规则 (必须)
    'urlrule' => '{%host%}download/{%id%}.html',
    // 从伪静规则匹配到的数组中取值传给 call 的参数 (示例为 array('id', 'page') or array('cate@alias', 'page') )
    'args' =>
    array(
      0 => 'post@id',
    ),
    'verify_permalink' => false, //1.7.1新增参数，false时不比对当前url与目标url是否相同
  );
  $zbp->RegRoute($route);
}
// 对于路由匹配到的访问，会调用这个函数
function demoPlugin_ViewDownload($arg)
{

  // $arg就是路由系统传入的数组参数，包含匹配到的参数和其它信息;
  var_dump($arg);

  $id = $arg["post"]; //获取文章的ID

  //显示下载页面
  //业务代码自行实现

}
```
<!-- 需求 2 结束 -->

<!-- 需求 3 -->

### 例子 3(文章页实现内容分页)

**假定需求 3：**

对文章内容分页，使用一条规则实现；

将`'{%host%}post/{%id%}_{%page%}.html'`改为`'{%host%}post/{%id%}_{%all%}.html'`，由`{%all}`匹配对应位置的内容；

**接口函数定义：**

```php
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
        'post@id',
        'all' => 'all|[0-9]+',
      ),
      'verify_permalink' => false,//不比对当前url与目标url是否相同
    );
  $zbp->RegRoute($route);
  return true;
}

function demoPlugin_ViewPost($arg)
{
  // $arg就是路由系统传入的数组参数，包含匹配到的参数和其它信息;
  var_dump($arg);

  // 从数组获取指定下标的值
  $id = $arg["post"]; //获取文章的ID
  $isAll = $arg["all"];

  if ($isAll == 'all') {
    // 全文获取
    // code
  } else {
    $page = $isAll;
    // 将文章内容分页后获取第 $page 页；
    // code
  }
}
```
<!-- 需求 3 结束 -->


<!-- 需求 4 -->

### 例子 4(路由规则实现跳转)

**假定需求 4：**

利用路由规则实现 301,302 跳转；

```php
//路由规则如下，请用$zbp->RegRoute()注入路由系统就可以实现了
//此路由规则type是默认规则‘default’，伪静模式或动态模式，都可以生效！

  $route = array(
    'posttype' => 0,
    'type' => 'default',
    'name' => 'plugin_redierct_to_baidu',
    'urlrule' => '{%host%}baidu.html',
    // redirect_to是http302跳转,如果需要301跳转，键名要写为redirect301_to
    'redirect_to' => 'https://www.baidu.com/', 
  );


//访问https://网站/baidu.html 就会跳转到 https://www.baidu.com/
```

<!-- 需求 4 结束 -->

## 1.6 及旧版

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
    $GLOBALS['hooks']['Filter_Plugin_ViewAuto_Begin']['demoPlugin_Rewrite'] = 
    PLUGIN_EXITSIGNAL_RETURN;
  }
}
```
