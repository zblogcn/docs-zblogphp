# 常见问题（应用开发）

## 注意事项速查表

> 应用审议群：836912740

- **开发模式下不报错很重要：「[启用开发模式](books/dev-app-start?id=开发模式 "启用开发模板")」；**
- 自定义函数名、类名应以「应用 ID」开头或结尾，使用`_`分隔，建议放在开头；
- 自建表命名：`plugin_appID_表名` 或 `theme_appID_表名`，表前缀由系统自动附加；
- 站内链接或路径须全部使用绝对地址：
  - PHP：`$zbp->host`、`$zbp->path`，也有专门的全局变量；
  - JS：`zbp.bloghost`；
- 对于服务器端发起的网络请求，请优先使用自带的`Network`；「[Network 参考](https://bbs.zblogcn.com/thread-102975.html#486171 "Network 参考")」
- 类似`.gitignore`，可以使用`zbignore.txt`对不需要打包进`zba`的文件进行排除；「[zbignore.txt 参考](https://bbs.zblogcn.com/thread-102780.html "zbignore.txt 参考")」
- **理论上，「你」并没有在应用中自带`jQuery`必要；**
- 编辑器相关的插件要考虑通用性；
- 1.7 起，要求主题模板内的`HTML`「应当在当前文件内闭合」；「[不要跨文件闭合 HTML 标签](https://bbs.zblogcn.com/thread-101310.html#484040 "不要跨文件闭合 HTML 标签")」
- 尽量「定制」字体图标而不是引入一整套；
- 要考虑用户站点上可能并没有你写死的数据调用；
- 除版权标识及注释外，不要在模板内写死各种和你有强关联的东西；
- 主题内「Z-Blog 版权标识」最速调用：`Powered By {$zblogphphtml}`；
- `CSS`和`JavaScript`应尽可能采取外部引用而不是与写在`HTML`内，`style=""`属性同理；
- 正则中使用`.*?`很不科学，请使用否定匹配，例如`[^>]*`或`[^"]*`；另外：
  - `'/abc/i'`——`i`修饰符为忽略大小写；
  - `'/中文/u'`——`u`修饰符用于匹配中文等；
  - 参考「[\[开发者\]正则表达式相关专贴-开发者中心](https://bbs.zblogcn.com/thread-101713.html "\[开发者\]正则表达式相关专贴-开发者中心")」
  - 参考「[PHP: 正则表达式模式中可用的模式修饰符 - php.net](https://www.php.net/manual/zh/reference.pcre.pattern.modifiers.php "PHP: 正则表达式模式中可用的模式修饰符 - php.net")」
- logo，favicon，二维码等「替代性」文件不要走附件机制，尤其是不要捆绑编辑器上传；另外应利用`zbignore.txt`防止更新时被覆盖；参考「[配置图片上传](https://bbs.zblogcn.com/thread-101310.html#485997 "【开发者】大概算是进阶建议贴-开发者中心")」「[zbignore.txt 参考](https://bbs.zblogcn.com/thread-102780.html "zbignore.txt 参考")」
