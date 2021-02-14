# 接口文档

API 地址模式：`https://example.com/zb_system/api.php?mod=<模块名>[&act=<行为名>][&其他...]`

- 对于各接口模块的`act=post`请求，其请求参数为`$GLOBALS['datainfo']`中与该模块对应的数据字段定义；
  - 参数字段名区分大小写；
  - 不需要提供全部字段值，比如「发布状态」「类型（文章/页面）」「置顶」等项目可以使用默认，而时间相关的字段则会初始为当前时间；

<!-- - 对于标有「CSRF」的项目，需要额外提供`csrf_token`进行验证；
  - 生成方式待补充； -->

- 各接口返回信息以实际为准，可参考「[通用模板](dev-api-common-template "通用模块")」。

以下将按「功能模块」进行详细说明。

[api-mod-post](include/api-mod-post.md ':include')
