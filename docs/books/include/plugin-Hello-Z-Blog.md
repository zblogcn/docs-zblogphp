## Hello Z-Blog

1. 使用`demoPlugin`为「应用 ID」创建一个应用，
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
RegisterPlugin("demoPlugin", "ActivePlugin_demoPlugin");
// 注册接口函数
function ActivePlugin_demoPlugin()
{
  // 向名为'Filter_Plugin_Index_Begin'的接口注册函数
  Add_Filter_Plugin('Filter_Plugin_Index_Begin', 'demoPlugin_HelloZBlog');
}
// 接口函数定义
function demoPlugin_HelloZBlog()
{
  // 注意，在函数中使用变量 $zbp 前应进行全局声明
  global $zbp;
  // 向前台页面的 <head></head> 内部插入内容
  $zbp->header .= "<script>alert(\"hello {$zbp->user->Name}\")</script>";
  // 读取插件配置项
  $InstallTime = $zbp->Config('demoPlugin')->InstallTime;
  $zbp->header .= "<script>alert(\"「demoPlugin」插件首次启用时间为 {$InstallTime}\")</script>";
}
// 插件启用时调用
function InstallPlugin_demoPlugin()
{
  global $zbp;
  $InstallTime = date('Y-m-d H:i:s');
  // 判断配置项是否存在
  // $zbp->HasConfig('插件ID'); //return bool
  if (!$zbp->HasConfig('demoPlugin')) {
    $zbp->Config('demoPlugin')->version = 1;
    $zbp->Config('demoPlugin')->InstallTime = $InstallTime;
    $zbp->SaveConfig('demoPlugin');
  }
}
// 插件关闭时调用
function UninstallPlugin_demoPlugin()
{
  // 存在相应开关选项并且状态为开启时，删除当前插件配置
  // $zbp->Config('插件ID')->HasKey('配置名'); //return bool
  if ($zbp->Config('demoPlugin')->HasKey('DelConfig') && $zbp->Config('demoPlugin')->DelConfig == 1) {
    $zbp->DelConfig('demoPlugin');
  }
}
```

## 注册及接口挂载

Z-BlogPHP 系统的插件是采用主动插入方式来通知系统。所以必须在「`include.php`」文件中调用`RegisterPlugin`函数才能让插件进入系统的插件体系。

```php
// 注册插件
RegisterPlugin("插件ID","ActivePlugin_插件ID");
```
然后在`ActivePlugin_插件ID`中完成「**大部分**」接口的挂载；

```php
// 具体的接口挂接
function ActivePlugin_插件ID() {
  Add_Filter_Plugin('API名称','执行代码（函数）');
}
```
**注：可按需在挂载接口前进行判断；也可在接口 A 内部挂载接口 B。**


## 「启用 / 停止 / 更新」插件时执行

可按如下示例定义函数，将在插件执行对应操作时自动调用；

```php
function InstallPlugin_插件ID(){}
function UninstallPlugin_插件ID(){}
function UpdatePlugin_插件ID(){}
// 旧版兼容
function 插件ID_Updated(){UpdatePlugin_插件ID();}
```

## 插件状态判断

```php
// 插件未启用直接退出本页面（一般用于配置页面）
if (!$zbp->CheckPlugin('插件ID')) {$zbp->ShowError(48);die();}
```

## 插件配置数据存取

「[Hello Z-Blog](books/dev-app-plugin?id=hello-z-blog "Hello Z-Blog")」中已有相应用例，以下为逐条讲解；

「配置项」的「值」可以是`数字`、`字符串`、`数组`；对于`PHP 对象`，理论上需要能够被序列化，实际使用中建议转为`JSON`保存；

1、设置并保存配置选项

```php
$zbp->Config('插件ID')->配置名 = 值;
$zbp->SaveConfig('插件ID');
```

2、读取配置选项

```php
$s = $zbp->Config('插件ID')->配置名;
echo $s;
```

3、判断配置选项是否已创建

```php
$zbp->HasConfig('插件ID'); //return bool
```

4、判断配置选项某一键值是否存在

```php
$zbp->Config('插件ID')->HasKey('配置名'); //return bool
```

5、删除配置

停用插件时可以选择删除配置项，通常我们建议保留配置以备下次重新启用，或者提供专门的开关选项由用户确认删除；

```php
$zbp->DelConfig('插件ID');
```

<!-- docs\books\include\plugin-Hello-Z-Blog.md -->
