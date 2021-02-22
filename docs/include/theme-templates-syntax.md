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

  - 「[嵌入调用示例](/dev-app-theme?id=示例 "嵌入调用示例")」

- 嵌入模块内容

  `{module:navbar}` - 嵌入「`导航栏`模块」

  - 「模块」或者说「侧栏模块」，一般是指 **「后台管理」→`模块管理`** 中列出的项目；
  - `navbar`为「`导航栏`模块」的「filename(文件名)」，其他「模块」同理；

  **注：除`include`文件夹内的「文件模块」外其他模块其实是存在数据库的，另外不建议使用「文件模块」，主题更新时用户修改的内容会被覆盖。**
