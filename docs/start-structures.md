# 文件结构

```plain
Z-BlogPHP
│  index.php 首页
│  search.php 搜索
│  feed.php RSS输出
│  readme.txt 程序说明
│
├─zb_install 安装入口（安装完成后可删除）
│  │  index.php
│  │
│  └─language
│          en.php
│          zh-cn.php
│          zh-tw.php
│
├─zb_system 系统文件夹
│  ├─admin 后台管理
│  ├─api API处理
│  ├─css 后台CSS
│  ├─defend 系统保留文档
│  ├─function 系统核心
│  ├─image 系统图片
│  ├─script 系统JavaScript
│  └─xml-rpc xml-rpc通信组件
└─zb_users 用户文件夹
    ├─avatar 头像存放
    ├─cache 缓存文件夹
    │  └─compiled 模板编译缓存
    ├─data 数据库存放（SQLite）
    ├─emotion 表情图片
    ├─language 语言
    ├─logs 日志记录
    ├─plugin 插件目录（预装插件以实际为准）
    │  ├─AppCentre
    │  ├─Gravatar
    │  ├─LinksManage
    │  ├─STACentre
    │  └─UEditor
    ├─theme 主题目录（这里是三款默认主题）
    │  ├─default
    │  │  ├─include
    │  │  ├─language
    │  │  ├─script
    │  │  ├─style
    │  │  └─template
    │  ├─tpure
    │  │  ├─include
    │  │  ├─language
    │  │  ├─plugin
    │  │  ├─script
    │  │  ├─style
    │  │  └─template
    │  └─Zit
    │      ├─include
    │      ├─language
    │      ├─script
    │      ├─style
    │      └─template
    └─upload 附件存放
```
