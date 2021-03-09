## 文件结构（插件）

以下基于通过「[创建应用](dev-app-start?id=创建应用 "创建应用")」生成的初始文件：

```conf
/path/zb_users/plugin/curPlugin
│  logo.png       [必需]图标，128x128；
│  plugin.xml     [必需]自述文件；
│  main.php       [可选]应用内置管理页，在创建插件时填写才会生成；
│  include.php    [可选]应用嵌入页，在创建插件时填写才会生成；
│
```

自动创建的文件最多只有上边四个，可依据需要自行创建需要的文件夹及文件：

```conf
│  function.php   [可选]根目录下除了这个外不建议放置额外的「*.PHP」文件；
│                      「function.php」放不下的，可以拆分后放置到「function」文件夹；
├─class           [可选]放置 class 定义文件，；
├─css             [可选]CSS 样式文件，前后台尽量分开；
├─script          [可选]JS 脚本目录，前后台尽量分开；
└─other           [可选]其他任意自定义文件夹及内容
```

## Hello Z-Blog

1. 使用`curPlugin`为「应用 ID」创建一个应用，
   - 「应用名称」填写「`第一个插件`」；
   - 其他信息保持默认；
2. **不需要额外创建文件**；
3. 使用下边代码「覆盖」「`include.php`」的内容；
   - 可直接点击「`Copy to clipboard`」按钮复制；
4. 「启用插件」后浏览任意「前台页面」即可查看效果；

```php
<?php
// 如果有其他 PHP 文件可以在这里引入，或者在需要的地方「按需要引入」
// require __DIR__ . "function.php";
// require __DIR__ . "class/db.php";
# 注册插件
RegisterPlugin("curPlugin", "ActivePlugin_curPlugin");
// 注册接口函数
function ActivePlugin_curPlugin()
{
  // 向名为'Filter_Plugin_Index_Begin'的接口注册函数
  Add_Filter_Plugin('Filter_Plugin_Index_Begin', 'curPlugin_HelloZBlog');
}
// 接口函数定义
function curPlugin_HelloZBlog()
{
  global $zbp;
  // 向前台页面的 <head></head> 内部插入内容
  $zbp->header .= "<script>alert(\"hello {$zbp->user->Name}\")</script>";
}
// 插件启用时调用
function InstallPlugin_curPlugin()
{
}
// 插件停用时调用
function UninstallPlugin_curPlugin()
{
}
```

