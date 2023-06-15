# 自定义 API

**使用 API 模块里的接口可以很方便的扩展出自定义的 API**

本篇以`newapi`插件为例，扩展出一个`api模块`并定义一个`api命令`。

## 创建插件

插件 id 假定为`newapi`，其`include.php`文件内容如下

```php
RegisterPlugin("newapi","ActivePlugin_newapi");

#newapi_RegAPI函数挂在Filter_Plugin_API_Extend_Mods接口上
function ActivePlugin_newapi() {
    // ...
}
```
## 挂上接口，插入 API 模块文件

把`myapi.php`这个`api文件模块`插入进 API 系统，一个`api文件模块`内可包含多个`api`(`act`)


### 新版（1.7.3以后）写法
```php
# 直接在注册插件时操作
function ActivePlugin_newapi() {
    // ...
    ApiAddMod('newapi', __DIR__ . '/myapi.php');
}
```

### 老版写法
```php
#include.php里的newapi_RegAPI函数实现

function ActivePlugin_newapi() {
    Add_Filter_Plugin('Filter_Plugin_API_Extend_Mods', 'newapi_RegAPI');
}

#将插件目录下的myapi.php这个API实现文件以'newapi'为模块名插入进系统API里
function newapi_RegAPI() {
    return array('newapi' => __DIR__ . '/myapi.php');
}
```

## 定义 API 文件模块

在`myapi.php`这个自定义 api 模块里定义了一个 api 叫`helloworld`

`api函数名称`是有规律的，必须是`api_`打头，`注册模块名`居中，加一个`_`，再由`api命令名称`居末尾组合而成，这样 API 系统才能路由到此函数

```php
function api_newapi_helloworld() {
    //在函数里完成 权限验证 接收参数 并 验证参数
    $data = 'Hello world!';
	return array('data' => $data);
    //请注意：我们在示例里没有验证权限，只做了简单的返回数据
}
```
在使用 POST 方式提交数据到 api，必须在提交时传入 api 登录成功后返回的`token`（设 Authorization 请求头为'Bearer token 值'，抑或是在 POST 传入 input 表单，name 为'token'，value 为 token 值）

如果系统在`ApiTokenVerify()`里验证成功，就跳过 crsf_token 检查！否则 POST 提交会失败！

如果上述都不能实现，还可以通过挂 Filter_Plugin_API_VerifyCSRF_Skip 这个接口，将该 mod 的 api 加入跳过 CSRF 验证的数组中，代码如下：
```php
//挂上接口
Add_Filter_Plugin('Filter_Plugin_API_VerifyCSRF_Skip', 'newapi_IgnoreCSRF');

//将newapi的helloworld加入进跳过验证数组
function newapi_IgnoreCSRF(&$array) {
  $array[] = array('mod' => 'newapi', 'act' => 'helloworld');
}
```
## API 模块的白名单和黑名单

`$mods_allow 白名单`请慎用，启用`白名单`后，不在`白名单`的 mod 都将被拒绝

如果只想关闭某些模块，只需要对`$mods_disallow 黑名单`进行添加

白名单示范（新版）：

```php
# 直接在注册插件时操作
function ActivePlugin_newapi() {
    // ...
    ApiAddAllowMod('newapi');//允许newapi模块下的所有api
    ApiAddAllowMod('member', 'login');//允许member模块下的login
    //开启白名单后，除了newapi模块和member模块下的login外，其它的api都不能访问！
}
```

白名单示范（老版）：

```php
Add_Filter_Plugin('Filter_Plugin_API_CheckMods', 'newapi_CheckMods');

function newapi_CheckMods(&$mods_allow, &$mods_disallow) {
    $mods_allow[] = array('newapi' => '');//允许newapi模块下的所有api
    $mods_allow[] = array('member' => 'login');//允许member模块下的login
    //开启白名单后，除了newapi模块和member模块下的login外，其它的api都不能访问！
}
```


黑名单示范（新版）：

```php
# 直接在注册插件时操作
function ActivePlugin_newapi() {
    // ...
    ApiAddAllowMod('newapi', 'postdata');//禁用newapi模块下的postdata
    ApiAddAllowMod('system');//禁用system模块下所有的api
    //开启黑名单后，没有在禁用范围里的api都可以被访问！
}
```

黑名单示范（老版）：

```php
Add_Filter_Plugin('Filter_Plugin_API_CheckMods', 'newapi_CheckMods');

function newapi_CheckMods(&$mods_allow, &$mods_disallow) {
    $mods_disallow[] = array('newapi' => 'postdata');//禁用newapi模块下的postdata
    $mods_disallow[] = array('system' => '');//禁用system模块下所有的api
    //开启黑名单后，没有在禁用范围里的api都可以被访问！
}
```

## 访问 API

**API 访问地址:**

https://`测试网站`/zb_system/api.php?mod=`newapi`&act=`helloworld`

其中，`mod`参数是模块名，`act`参数是 api 命令名称

下面是返回的数据内容：
```json
{
    "code":200,
    "message":"OK",
    "data":"Hello world!",
    "error":null,
    "runtime":{"time":"31.89","query":4,"memory":-1100}
}
```
「- -」「- -」「- -」「- -」「- -」

***本篇内容所用代码需要由主程序 1.7.1.2990 版本及更高版本实现***