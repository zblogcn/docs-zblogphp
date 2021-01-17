# 接口列表

为了应对各种各样的扩展需求，Z-BlogPHP 提供了几类插件接口供开发者使用，简要说明如下：

- **「管理页面」输出类**：这一类接口一般用于在后台现有管理页面中添加按钮或者扩展选项内容

  | 接口                                    | 说明           |
  | --------------------------------------- | ------------- |
  | Filter_Plugin_Admin_ArticleMng_SubMenu	| 文章管理子菜单  |
  | filter_plugin_admin_pagemng_submenu	| 页面管理子菜单  |
  | filter_plugin_edit_begin	| 文章页面编辑页开始接口  |
  | filter_plugin_edit_end	| 文章页面编辑页结束接口  |
  | filter_plugin_edit_response	| 文章页面编辑1号输出接口  |
  | filter_plugin_edit_response2	| 文章页面编辑2号输出接口  |
  | filter_plugin_edit_response3	| 文章页面编辑3号输出接口  |

- **「接管系统」方法类**：这一类接口一般用于接管按钮点击后发生的事情

  | 接口                                    | 接口参数           | 说明           |
  | --------------------------------------- | ------------- | ------------- |
  | Filter_Plugin_PostArticle_Core	| article |文章提交的核心接口  |
  | Filter_Plugin_PostArticle_Succeed	| article | 文章编辑成功的接口  |
  | Filter_Plugin_DelArticle_Succeed	| article | 文章删除成功的接口  |
  | Filter_Plugin_PostPage_Core	| article | 	页面编辑的核心接口  |
  | Filter_Plugin_PostPage_Succeed		| article | 	页面编辑成功的接口  |
  | Filter_Plugin_DelPage_Succeed	| article | 	页面删除成功的接口  |
  | Filter_Plugin_Post_Call	| post,method,args | Post类的魔术方法接口  |
- **「前台页面」输出类**：在网页内容输出到浏览器前进行变更或追加，包括额外引入样式、脚本。
- **「数据写入」处理类**：在文章、评论等数据提交的过程中，具体又分为：
  - **Core**：在数据提交前介入，可用于过滤提交的数据内容。
  - **Succeed**：在数据提交成功后介入，可用于数据提交后的事件处理，如更新自定义模块数据等。
- **「魔术方法」扩展类**：用于扩展系统类中的可用方法
- **「流程/事件」监听类**：严格来说，全部接口都是「监听」，监听接口本身被触发，然后执行指定的操作，或者对接口传递的数据进行处理。
  - 除「魔术方法」外，前三种是类别其实是以「功能目的」来划分的，也只是较常用的三种。
<!-- - 所以这个分类有啥意义.jpg -->
