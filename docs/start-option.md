# 配置管理

## 配置文件

正确安装Z-Blog后会以如路径`path/zb_users/c_option.php`生成一份配置文件，记录有数据库连接信息等基础信息，进行空间迁移，数据库更换等操作时，可能需要手动修改此文件来完成操作。

[path](terms/path.md ':include')

## 后台登录

`host/zb_system/cmd.php?act=login` 会跳转到：`host/zb_system/login.php`

[host](terms/host.md ':include')

可以在`网站设置`选项中对站点进行设置管理；

**重要：`网站设置→全局设置→开发模式`←在网站出现错误提示时可以启用该选项来排查；**

**重要：`固定网站域名`这一开关选项请无视，将来的版本将会移除，因为对于大部分用户来说并不必要，反而可能引发问题**
