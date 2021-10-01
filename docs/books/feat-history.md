# 版本历史

> 创建本页时，我们正在尝试用 `docsify` 重写文档，当前（2021-01-16）正式版本号为 `1.6.6`；
>
> 相关：[Z-Blog 开发大事记](https://www.zblogcn.com/about/ "Z-Blog开发大事记")

# 1.7

- 1.7.1 Tenet
  - 模板类能更好的支持多套模板
  - 现在删除用户默认不删除其文章和评论
  - 对 API 进行了完善
  - 继续调整和完善了路由系统
  - Config 类,Metas 类,Post 类等进行了修复和改进

- 1.7.0 Tenet [详细](https://blog.zblogcn.com/2021/02/08/117/ "1.7.0 Tenet")
  - update. 「链式 SQL」增加更多方法；
  - feat. API；「[API 文档](books/dev-api-design "API文档")」
  - feat. 字体图标；「[Z-Blog icons demo](https://static.zblogcn.com/image/icon/demo.html "Z-Blog icons demo")」
  - feat. 内置缩略图基类；「[zblogcn/zblogphp/search?q=Thumb](https://github.com/zblogcn/zblogphp/search?q=Thumb "Search · Thumb")」
  - feat. 新的 url 路由机制；
  - feat. 文章编辑器接口增加`barBtn`；「[zblogcn/zblogphp/search?q=barBtn](https://github.com/zblogcn/zblogphp/search?q=barBtn "Search · barBtn")」
  - feat. 文章编辑器接口增加`ready`；「[zblogcn/zblogphp/search?q=ready](https://github.com/zblogcn/zblogphp/search?q=barBtn "Search · ready")」

# 1.6
- 1.6.8
  - update 支持了 1.7.0 的全新的 Config 类的数据结构
  - fix. 修复了 1.6.7 升级 1.7.0 后再退回 1.6.7 时会出现严重的 config 表数据错误
- 1.6.6 [详细](https://blog.zblogcn.com/2020/12/01/115/ "1.6.6")
  - fix. 针对 `PHP 7+` 的数据库连接改进；
  - feat. `PHP 8.0` 支持；
  - update.`cmd.php` 内增加 `ZBP_IN_CMD` 常量；
- 1.6.5 [详细](https://blog.zblogcn.com/2020/09/01/113/ "1.6.5")
  - fix. `xml-rpc` 接口 Bug 修复；
  - fix. 「Tag」重复创建修复；
  - update. 搜索结果排序支持（接口）；
  - update. 验证码；
  - update. `SQLite`命名前缀规范（新装）；
  - update. 「config」调整（1.7 准备）；
