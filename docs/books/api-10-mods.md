# 接口文档

API 地址模式：`https://example.com/zb_system/api.php?mod=<模块名>[&act=<行为名>][&其他...]`

- 对于各「API 模块」的`act=post`请求，其请求参数为`$GLOBALS['datainfo']`中与该模块对应的数据字段定义；
  - 参数字段名区分大小写；
  - 不需要提供全部字段值，比如「发布状态」「类型（文章/页面）」「置顶」等项目可以使用默认，而时间相关的字段则会初始为当前时间；
  - 除`Comment`和`Upload`外，`act=post`请求时`ID` 字段为必须指定，为 0 时新建，不为 0 且项目存在时则修改；
  - **注：可在「[zb_system/defend/datainfo.php](https://github1s.com/zblogcn/zblogphp/blob/HEAD/zb_system/defend/datainfo.php "datainfo.php")」文件中搜索查看`$GLOBALS['datainfo']`;**
- 各接口返回信息以实际为准，可参考「[通用返回格式](books/dev-api-design?id=通用返回格式 "通用返回格式")」。
- **对于「登录」操作以外的`POST`请求，一律需要设置鉴权；「[登录和鉴权](books/dev-api-design?id=权限认证 "登录和鉴权")」**
  - `GET`请求时仅在部分「功能模块」中的部分「只读操作」可以不设置鉴权，此外未鉴权请求频率或查询数量可能受限制；

以下将按「功能模块」进行详细说明。

[api-mod-member](api-10-mods/api-mod-member.md ':include')

[api-mod-post](api-10-mods/api-mod-post.md ':include')

[api-mod-app](api-10-mods/api-mod-app.md ':include')

[api-mod-category](api-10-mods/api-mod-category.md ':include')

[api-mod-comment](api-10-mods/api-mod-comment.md ':include')

[api-mod-module](api-10-mods/api-mod-module.md ':include')

[api-mod-system](api-10-mods/api-mod-system.md ':include')

[api-mod-tag](api-10-mods/api-mod-tag.md ':include')

[api-mod-upload](api-10-mods/api-mod-upload.md ':include')