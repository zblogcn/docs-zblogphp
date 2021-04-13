# 常见问题（API）

## Apache 获取不到 Authorization 头信息

修改`.htaccess`文件，添加如下信息：

> RewriteRule .* - [env=HTTP_AUTHORIZATION:%{HTTP:Authorization},last]
