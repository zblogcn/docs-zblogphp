# 配置管理

## 配置文件

正确安装 Z-BlogPHP 后会以如路径 `path/zb_users/c_option.php` 生成一份配置文件，记录有数据库连接信息等基础信息，进行空间迁移，数据库更换等操作时，可能需要手动修改此文件来完成操作。

[path](terms/path.md ':include')

## 后台登录

`host/zb_system/cmd.php?act=login` 会跳转到：`host/zb_system/login.php`

[host](terms/host.md ':include')

可以在 `网站设置` 选项中对站点进行设置管理；

**重要：`网站设置→全局设置→开发模式` ←在网站出现错误提示时可以启用该选项来排查；**

<br/>

## 先创建 c_option.php 后执行安装过程 (1.7.2 开始支持)

一般是在安装程序完成后会自动生成 c_option.php 配置文件在 `zb_users` 目录下

如何提前配置好 c_option.php 再执行安装过程？ 

需要在新建文件 `c_option.php` 加入 `'ZC_INSTALL_AFTER_CONFIG' => true` ,再填入其它的数据库配置,这样打开网站就会自动转入安装页面进行安装过程(前提是数据库配置正确能连接上)

```php
//c_option.php示例如下
return array (
  'ZC_INSTALL_AFTER_CONFIG' => true,
  'ZC_DATABASE_TYPE' => 'mysqli',
  'ZC_MYSQL_SERVER' => 'localhost',//数据库地址
  'ZC_MYSQL_USERNAME' => '账号名',
  'ZC_MYSQL_PASSWORD' => '账号密码',
  'ZC_MYSQL_NAME' => '数据库名',
  'ZC_MYSQL_CHARSET' => 'utf8mb4',
  'ZC_MYSQL_COLLATE' => 'utf8mb4_general_ci',
  'ZC_MYSQL_PRE' => 'zbp_',
  'ZC_MYSQL_ENGINE' => 'MyISAM',
  'ZC_MYSQL_PORT' => '3306',//数据库端口号
  'ZC_MYSQL_PERSISTENT' => false,
);
```
<br/>

## 从环境变量中读取数据库配置 (1.7.2 开始支持)

c_option.php 配置文件中参数的值为`getevn:环境变量名`，就会用 getenv 函数读取环境变量的值
```php
//c_option.php示例如下
<?php
return array (
  'ZC_DATABASE_TYPE' => 'mysqli',
  'ZC_MYSQL_SERVER' => 'getenv:DB_HOST',//环境变量名
  'ZC_MYSQL_USERNAME' => 'getenv:DB_USER',//环境变量名
  'ZC_MYSQL_PASSWORD' => 'getenv:DB_PASSWORD',//环境变量名
  'ZC_MYSQL_NAME' => 'getenv:DB_DATABASE',//环境变量名
  'ZC_MYSQL_PORT' => '3306',
  'ZC_MYSQL_CHARSET' => 'utf8mb4',
  'ZC_MYSQL_COLLATE' => 'utf8mb4_general_ci',
  'ZC_MYSQL_PRE' => 'zbp_',
  'ZC_MYSQL_ENGINE' => 'MyISAM',
  'ZC_MYSQL_PERSISTENT' => false,
);
```
那么 ZC_MYSQL_SERVER,ZC_MYSQL_USERNAME,ZC_MYSQL_PASSWORD,ZC_MYSQL_NAME,ZC_MYSQL_PORT 这 5 个参数的值就会从 `getenv('DB_HOST')` 等中获取

如果 `'ZC_MYSQL_SERVER' => 'env:DB_HOST'` 的话，ZC_MYSQL_SERVER 等参数的值就会从 `$_ENV['DB_HOST']` 全局数组中获取