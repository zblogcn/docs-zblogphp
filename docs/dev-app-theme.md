# 主题开发

## 文件结构

以下基于通过「[创建应用](dev-app-start?id=创建应用 "创建应用")」生成的初始文件：

```conf
/path/zb_users/theme/curTheme
│  screenshot.png [必需]缩略图 300*240像素, 横向；
│  theme.xml      [必需]自述文件；
│  main.php       [可选]应用内置管理页，在创建主题时填写才会生成；
│  include.php    [可选]应用嵌入页，在创建主题时填写才会生成；
│
├─compile         [废弃]旧版 z-blog 用于放置模板编译文件，可直接删除；
├─include         [可选]主题自带「文件模块」，使用{module:abc}「嵌入调用」该目录下的abc.php文件；
├─script          [可选]JS目录；
├─style           [必需]样式目录, 内存样式表及所需图片；
│      style.css  [必需]不限于这个文件名，一套主题也可以拥有多个样式（各自独立使用）；
│
├─css             [可选]并不会自动创建，用于不应该放在style文件夹中的样式内容；
└─template        [可选]用于存放模板文件；作为规范，确实是可选的，因为「保留模板机制」；
```


