# 常见问题

## 密码重置

Z-BlogPHP 密码找回工具：

[https://bbs.zblogcn.com/thread-83419.html](https://bbs.zblogcn.com/thread-83419.html "Z-BlogPHP密码找回工具-程序发布-ZBlogger技术交流中心")

「- -」「- -」「- -」「- -」「- -」

## 固定域名出错不能登入

- 使用空间面板的文件管理或者 FTP 修改文件：`path/zb_users/c_option.php`；
- **增加**项目：
  ```php
  'ZC_PERMANENT_DOMAIN_FORCED_DISABLE' => true,
  ```
1.7.2 以下版本的键名为 ZC_PERMANENT_DOMAIN_WHOLE_DISABLE
- 保存后即可恢复使用；

[path](terms/path.md ':include')

**注：如果是 1.6.0 之前的版本，请覆盖 1.6.0 及之后的程序包（`zb_system`）。**

「- -」「- -」「- -」「- -」「- -」

## 明确需要指定域名使用

- 使用空间面板的文件管理或者 FTP 修改文件：`path/zb_users/c_option.php`；
- 配置项：
  ```php
  'ZC_PERMANENT_DOMAIN_FORCED_URL' => "https://www.newdomin.site/",
  ```

[path](terms/path.md ':include')

**注：如果是 1.6.0 之前的版本，请覆盖 1.6.0 及之后的程序包（`zb_system`）。**

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

## 禁用 root 管理员用户
root 级管理员拥有系统最高权限，可以上传应用，导出应用，删除应用，root 级管理员不能禁用，但可以让 root 级管理员的 root 权限被取消

在 「Z-BlogPHP 1.7.2」起，可以使用如下三种方法实现：

> 0. 最简单和快捷的方式就是启用`应用中心客户端`的安全模式

> 1. 修改 c_system_base.php，在其中加入代码

`define('ZBP_PRESET_DISABLE_ROOT', 1);`

> 2. 修改 nginx 的配置文件，在 `location ~ \.php$ {}` 加入代码，并重启 nginx

`fastcgi_param  ZBP_PRESET_DISABLE_ROOT        1;`

> 3. 修改 php-fpm 的配置文件 conf，加入代码，并重启 php-fpm

`env[ZBP_PRESET_DISABLE_ROOT]=1`