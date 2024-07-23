# 常见问题（应用开发）

## 注意事项速查表

> 应用审议群：836912740

1. **开发模式下不报错很重要：「[启用开发模式](books/dev-05-start?id=开发模式 "启用开发者模式")」；**
2. **对于需要用户点链接或提交表单触发，进而对数据或文件产生影响的，除必要的用户权限验证外，应另外加入 CSRF Token 验证；「[CSRF Token 验证](books/dev-15-plugin?id=csrf-相关-「重要」 "CSRF Token 验证")」**
3. 自定义函数名、类名应以「应用 ID」开头或结尾，使用`_`分隔，建议放在开头；
4. 自建表命名：`plugin_appID_表名` 或 `theme_appID_表名`，表前缀由系统自动附加；
5. 自建模块命名：`plugin_appID_模块名` 或 `theme_appID_模块名`，这样管理起来更方便；
7. 站内链接或路径须全部使用绝对地址：
     - PHP：`$zbp->host`、`$zbp->path`，也有专门的全局变量；
     - JS：`bloghost`；
8. 对于服务器端发起的网络请求，请优先使用自带的`Network`；「[Network 参考](https://bbs.zblogcn.com/thread-102975.html#486171 "Network 参考")」
9. 类似`.gitignore`，可以使用`zbignore.txt`对不需要打包进`zba`的文件进行排除；「[zbignore.txt 参考](https://bbs.zblogcn.com/thread-102780.html "zbignore.txt 参考")」
10. **理论上，「你」并没有在应用中自带`jQuery`必要；**
11. 编辑器相关的插件要考虑通用性；
    - [Neditor 编辑器](https://app.zblogcn.com/?id=1379 "Neditor 编辑器")
    - [Editor.md 编辑器](https://app.zblogcn.com/?id=1408 "Editor.md 编辑器")
    - [iceEditor-前后端编辑器](https://app.zblogcn.com/?id=8400 "iceEditor-前后端编辑器")
12. 1.7 起，要求主题模板内的`HTML`「应当在当前文件内闭合」；「[不要跨文件闭合 HTML 标签](https://bbs.zblogcn.com/thread-101310.html#484040 "不要跨文件闭合 HTML 标签")」
13. 在「公共头部」「公共尾部」模板内应各自放置`{$header}`或`{$footer}`标签；「[示例 - 主入口模板 - 主题开发](books/dev-10-theme?id=%e7%a4%ba%e4%be%8b "示例 - 主入口模板 - 主题开发")」
14. 尽量「定制」字体图标而不是引入一整套；
15. 要考虑用户站点上可能并没有你写死的数据调用；
16. 除版权标识及注释外，不要在模板内写死各种和你有强关联的东西；
17. 主题内「Z-Blog 版权标识」最速调用：`Powered By {$zblogphphtml}`；
18. `CSS`和`JavaScript`应尽可能采取外部引用而不是写在`HTML`内，`style=""`属性同理；
19. 按新规范写代码：
     - 比如放弃 `var` 关键字，使用 `let` 或 `const`；
     - `link:css`、`script:js` 弃用非必要属性；
     - `<link rel="stylesheet" href="style.css">`；
     - `<script src="script.js"></script>`；
     - VSCode 直接红色波浪线提示的过时写法；
20.  正则中使用`.*?`很不科学，请使用否定匹配，例如`[^>]*`或`[^"]*`；另外：
     - `'/abc/i'`——`i`修饰符为忽略大小写；
     - `'/中文/u'`——`u`修饰符用于匹配中文等；
     - 参考「[\[开发者\]正则表达式相关专贴-开发者中心](https://bbs.zblogcn.com/thread-101713.html "\[开发者\]正则表达式相关专贴-开发者中心")」
     - 参考「[PHP: 正则表达式模式中可用的模式修饰符 - php.net](https://www.php.net/manual/zh/reference.pcre.pattern.modifiers.php "PHP: 正则表达式模式中可用的模式修饰符 - php.net")」
21.  logo，favicon，二维码等「替代性」文件不要走附件机制，尤其是不要捆绑编辑器上传；另外应利用`zbignore.txt`防止更新时被覆盖；参考「[配置图片上传](https://bbs.zblogcn.com/thread-101310.html#485997 "【开发者】大概算是进阶建议贴-开发者中心")」「[zbignore.txt 参考](https://bbs.zblogcn.com/thread-102780.html "zbignore.txt 参考")」
22.  前台「站内链接」默认当前页打开；
     - 仅限「关于」「后台管理/登录」等少数情形可以例外；
23.  在保存配置执行后，强烈建议用`$zbp->SetHint('good'); Redirect('./main.php');`而不是`$zbp->ShowHint('good');`；

## 程序员的自我修养

- 编辑器推荐「[Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code - Code Editing. Redefined")」「[简体中文语言包](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans "Chinese (Simplified) Language Pack for Visual Studio Code - Visual Studio Marketplace")」，其他编辑请确保有相应功能或插件；
- 重点推荐的插件及功能：
  - PHP 代码补全及检查：「[PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client "PHP Intelephense - Visual Studio Marketplace")」；
  - 字面意思：「[Format HTML in PHP](https://marketplace.visualstudio.com/items?itemName=rifi2k.format-html-in-php "Format HTML in PHP - Visual Studio Marketplace")」；
  - 代码风格规范：「[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig "EditorConfig for VS Code - Visual Studio Marketplace")」——参考下方「[附注 - EditorConfig](#附注-editorconfig "附注 - EditorConfig")」；
  - 英文单词拼写检查：「[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker "Code Spell Checker - Visual Studio Marketplace")」；
- 次要：
  - 代码格式化：「[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode "Prettier - Code formatter - Visual Studio Marketplace")」；
  - 快速生成 PHP 注释：「[PHP DocBlocker](https://marketplace.visualstudio.com/items?itemName=neilbrayfield.php-docblocker "PHP DocBlocker - Visual Studio Marketplace")」；
  - 替代默认的文件图标：「[VSCode Great Icons](https://marketplace.visualstudio.com/items?itemName=emmanuelbeziat.vscode-great-icons "VSCode Great Icons - Visual Studio Marketplace")」；
- 有个名词叫「代码片段」——「[参考链接](https://bbs.zblogcn.com/thread-101310.html#484331 "参考链接 - 代码片段")」；
- 给开发人员的 字体：「[JetBrains Mono](https://www.jetbrains.com/zh-cn/lp/mono/ "JetBrains Mono: A free and open source typeface for developers | JetBrains: Developer Tools for Professionals and Teams")」；

### 附注 - EditorConfig

`zb_users/theme`、`zb_users/plugin` 各放一份，文件名：`.editorconfig`；

```ini
# editorconfig.org
root = true
[*]
charset = utf-8
# 空格 或 tab 缩进
indent_style = space
# 缩进数量
indent_size = 2
# 换行符
end_of_line = lf
# 自动剔除行尾空格
trim_trailing_whitespace = true
# 文件结尾插入空行
insert_final_newline = true
```
