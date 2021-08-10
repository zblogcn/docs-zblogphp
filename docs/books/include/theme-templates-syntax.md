## 模板书写

### 描述信息（可选）

- 模板内注释语法（推荐）

  放在模板文件第一行：

  ```conf
  {* Template Name:「模板用途描述」 *}
  ```

  可以同时声明模板类型（针对「主入口模板」）：

  ```conf
  {* Template Name: 首页及列表页 * Template Type: index|list *}
  ```

  **注：「描述信息」和「类型声明」的必要性仅体现在`同一「页面类型」有多个「入口模板」可供用户选择`时的选项输出，或者`针对不同「页面类型」细化建立了不同的模板文件`。对于后者需要自行实现判断调用，或引导用户选择设置。**

  **重要：在`{}`内部，`*`与其他内容之间要有空格；**

  ```conf
  - index           首页
  - list            列表页
    - author
    - category
    - date
    - tag
  - single          单页面（含文章与页面）
    - article
    - page
  - search          搜索
  - 404             404
  - none            显示设置隐藏
  ```

- 1.7.0 以后支持 template.json 配置

  <details>
  <summary>template.json示例：（点击展开）</summary>

  ```json
  {
      "id": "主题ID",
      "templates": [
          {
              "filename": "index",
              "type": "list",
              "name": "列表自动模板"
          },
          {
              "filename": "single",
              "type": "single",
              "name": "文章/单页自动模板"
          }
      ]
  }
  ```
  </details>

### 嵌入调用

- 嵌入模板文件

  `{template:hearder}` - 嵌入模板文件 hearder.php 的文件内容。

  - 「[嵌入调用示例](#%e7%a4%ba%e4%be%8b "嵌入调用示例")」

- 嵌入模块内容

  `{module:navbar}` - 嵌入「`导航栏`模块」

  - 「模块」或者说「侧栏模块」，一般是指 **「后台管理」→`模块管理`** 中列出的项目；
  - `navbar`为「`导航栏`模块」的「filename(文件名)」，其他「模块」同理；

  **注：除`include`文件夹内的「文件模块」外其他模块其实是存在数据库的，另外不建议使用「文件模块」，主题更新时用户修改的内容会被覆盖。**


### 模板标签

在「[模板文件示例](#%e7%a4%ba%e4%be%8b "模板文件示例")」示例中使用了`{$language}`和`{$type}`两个语法标签，称为「变量输出标签」或「模板标签」，实际会编译为`<?php echo $language;?>`和`<?php echo $type;?>`来输出对应变量的值；

在 Z-BlogPHP 模板中，可通过`{$var}`、`{$obj.a}`来输出「文本或数字类型」的「变量或对象属性」，其中后者会编译为`<?php echo $obj->a;?>`；

**系统内定义的「模板标签列表」请点击右边链接查看：「[Z-BlogPHP 模板标签手册](./../../markup/ "Z-BlogPHP 模板标签手册")」；**

**注：**
1. 部分标签只能在特定的页面类型（`$type`取值）或上下文中才能使用；
2. `{module:navbar}`可视为`{$modules["navbar"].Content}`的简写语法；
3. 除系统标签外，可通过「接口机制」或「原生 PHP 语法<sup>①</sup>」自定义或修改作为标签输出的变量；

→①：[模板内使用 PHP](#%e6%a8%a1%e6%9d%bf%e5%86%85%e4%bd%bf%e7%94%a8-php "模板内使用 PHP")；

### 模板内使用 PHP

在相应内容输出前，可以使用如下语法额外对数据进行处理；

```php
{php}
// 这里可以写原生 PHP；
$myVar = "变量值";
{/php}
<p>输出一个自定义变量：{$myVar}</p>
<p>当前 Z-BlogPHP 版本是：{$version}</p>
```
