# 配置管理

## 配置文件

正确安装 Z-BlogPHP 后会以如路径 `path/zb_users/c_option.php` 生成一份配置文件，记录有数据库连接信息等基础信息，进行空间迁移，数据库更换等操作时，可能需要手动修改此文件来完成操作。

[path](terms/path.md ':include')

## 后台登录

`host/zb_system/cmd.php?act=login` 会跳转到：`host/zb_system/login.php`

[host](terms/host.md ':include')

可以在 `网站设置` 选项中对站点进行设置管理；

**重要：`网站设置→全局设置→开发模式` ←在网站出现错误提示时可以启用该选项来排查；**

**重要：`固定网站域名` 这一开关选项请无视，将来的版本将会移除，因为对于大部分用户来说并不必要，反而可能引发问题**

## 从环境变量中读取数据库配置 (1.7.2 开始支持)

c_option.php 配置文件中设置了 `'ZC_DATABASE_CONFIG' => 'getenv'`，就会用 getevn 函数读取环境变量的值
```php
//示例如下
<?php
  'ZC_DATABASE_CONFIG' => 'getenv',
  'ZC_DATABASE_TYPE' => 'mysqli',
  'ZC_MYSQL_SERVER' => 'DB_HOST',
  'ZC_MYSQL_USERNAME' => 'DB_USER',
  'ZC_MYSQL_PASSWORD' => 'DB_PASSWORD',
  'ZC_MYSQL_NAME' => 'DB_DATABASE',
  'ZC_MYSQL_PORT' => '3306',
  'ZC_MYSQL_CHARSET' => 'utf8mb4',
  'ZC_MYSQL_COLLATE' => 'utf8mb4_general_ci',
  'ZC_MYSQL_PRE' => 'zbp_',
  'ZC_MYSQL_ENGINE' => 'MyISAM',
  'ZC_MYSQL_PERSISTENT' => false,
);
```
那么 ZC_MYSQL_SERVER,ZC_MYSQL_USERNAME,ZC_MYSQL_PASSWORD,ZC_MYSQL_NAME,ZC_MYSQL_PORT 这 5 个参数的值就会从 `getenv('DB_HOST')` 等中获得

如果 `'ZC_DATABASE_CONFIG' => 'evn'` 的话，ZC_MYSQL_SERVER 等参数的值就会从 `$_ENV` 全局数组中获得