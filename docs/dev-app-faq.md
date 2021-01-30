# 常见问题（应用开发）

## 常见错误速查表

- 自定义函数名、类名应以「应用 ID」开头或结尾，使用`_`分隔，建议放在开头；
- 自建表命名：`plugin_appID_表名` 或 `theme_appID_表名`，表前缀由系统自动附加；
- 站内链接或路径须全部使用绝对地址：
  - PHP：`$zbp->host`、`$zbp->path`，也有专门的全局变量；
  - JS：`zbp.bloghost`；
- 对于服务器端发起的网络请求，请使用自带的`Network`；「[Network 参考](https://bbs.zblogcn.com/thread-102975.html#486171 "Network 参考")」
