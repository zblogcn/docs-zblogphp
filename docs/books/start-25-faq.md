# 常见问题

## 密码重置

Z-BlogPHP 密码找回工具：

[https://bbs.zblogcn.com/thread-83419.html](https://bbs.zblogcn.com/thread-83419.html "Z-BlogPHP密码找回工具-程序发布-ZBlogger技术交流中心")

「- -」「- -」「- -」「- -」「- -」

## 明确需要指定域名使用

- 使用空间面板的文件管理或者 FTP 修改文件：`path/zb_users/c_option.php`；
- 配置项：
  ```php
  'ZC_PERMANENT_DOMAIN_FORCED_URL' => "https://www.newdomin.site/",
  ```

[path](terms/path.md ':include')

**注：如果是 1.6.0 之前的版本，请覆盖 1.6.0 及之后的程序包（`zb_system`）。**

**注2：ZC_PERMANENT_DOMAIN_ENABLE => true是开启了固定域名，然后可以在后台设置更改固定域名**

**注3：ZC_PERMANENT_DOMAIN_FORCED_URL 的意义为 直接开启固定域名功能并直接指定指定域名**

「- -」「- -」「- -」「- -」「- -」

## 固定域名出错不能登入

- 使用空间面板的文件管理或者 FTP 修改文件：`path/zb_users/c_option.php`；
- **删除**项目或是更改为正确的域名：
  ```php
  'ZC_PERMANENT_DOMAIN_FORCED_URL' => "https://出错不能登录的域名/",
  #ZC_PERMANENT_DOMAIN_FORCED_URL 的意义为 开启固定域名功能并直接指定固定域名
  #如果你直接指定了固定域名，那就需要删除这个设置，或是更改为正确的域名
  ```
  或是**删除**项目：
  ```php
  'ZC_PERMANENT_DOMAIN_ENABLE' => true,
  #ZC_PERMANENT_DOMAIN_ENABLE 的意义为 开启固定域名功能，然后可以在后台设置固定域名
  #删除这个项目后，ZBP系统就会自动识别判断域名
  ```

[path](terms/path.md ':include')

**注：如果是 1.6.0 之前的版本，请先升级到 1.6.0**

「- -」「- -」「- -」「- -」「- -」

## 用户等级划定

```php
'user_level_name' => array(
    '1' => '管理员',
    '2' => '网站编辑',
    '3' => '作者',
    '4' => '协作者',
    '5' => '评论者',
    '6' => '游客',
),

```

「- -」「- -」「- -」「- -」「- -」

## Emoji 表情支持

对于 MySQL ，其`utf8`并非标准的`UTF-8`。在 `5.5.3` 之后新增了`utf8mb4`来解决这个问题；

「Z-BlogPHP 1.7.0」起将默认使用`utf8mb4`编码创建数据表；

对于现有数据库，可按如下操作进行修改：

> 1. 进入「`phpMyAdmin`」或其他数据库管理工具；
> 2. 选择相应数据库，（默认为「`结构`」视图）；
> 3. 点击「`操作`」选项卡，更改「`排序规则`」为`utf8mb4_general_ci`；
> 4. 点击「`执行`」即可应用到所有表和所有表列字段！

「- -」「- -」「- -」「- -」「- -」

## 强制开启 Debug 调试模式

常规开启调试模式是在后台设置中进行，在后台设置的全局设置里打开“调试模式”并保存即可。

如果网站程序出错，不能进入后台进行设置，那么在 1.7.2 及更高版本可以在这样设置：

修改`zb_system\function\c_system_base.php`，取消第 22 行代码的注释状态后保存；

```php
// defined('ZBP_DEBUGMODE') || define('ZBP_DEBUGMODE', true);
// 修改为 ↓↓
defined('ZBP_DEBUGMODE') || define('ZBP_DEBUGMODE', true);
```

「- -」「- -」「- -」「- -」「- -」

## 隐藏的错误查看

即使开启调试模式，有些错误也不会在页面内抛出；

默认情况下，前后台的页面源码的结尾会有如下样式的注释，

```html
<!--193.14 ms , 7 queries , 4042kb memory , 0 error-->

<!--109.38 ms , 6 queries , 1561kb memory , 6 errors-->
```

具体错误（如果不为 0 时）记录在：`zb_users\logs\`文件夹内；

该文件夹内的文件可直接清空，然后重复访问操作重新记录最新日志以方便排查；

「- -」「- -」「- -」「- -」「- -」

## 禁用 root 管理员用户

root 级管理员拥有系统最高权限，可以上传应用，导出应用，删除应用，root 级管理员不能禁用，但可以让 root 级管理员的 root 权限被取消

> 0. 启用`应用中心客户端`的安全模式

禁止上传安装新应用及导出应用和系统更新，这是最简单和快捷的方式

在 「Z-BlogPHP 1.7.2」起，可以使用以下三种方法实现：

> 1. 修改 c_system_base.php，在其中加入代码

`define('ZBP_PRESET_DISABLE_ROOT', 1);`

> 2. 修改 php-fpm 的配置文件 conf，加入代码，并重启 php-fpm

`env[ZBP_PRESET_DISABLE_ROOT]=1`

> 3. 修改 nginx 的配置文件，在 `location ~ \.php$ {}` 加入代码，并重启 nginx

`fastcgi_param  ZBP_PRESET_DISABLE_ROOT  1;`
