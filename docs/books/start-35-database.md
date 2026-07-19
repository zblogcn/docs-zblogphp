# 数据字典

## zbp_post 文章内容表

| 字段名 | 说明 |
| --- | --- |
| log_ID | 序号，即文章 ID |
| log_CateID | 所属分类 ID |
| log_AuthorID | 作者 ID |
| log_Tag | 文章标签 |
| log_Status | 文章或页面状态：0 公开，1 草稿，2 审核 |
| log_type | 文章和页面类型：0 文章，1 页面 |
| log_Alias | 别名 |
| log_istop | 文章是否置顶：0 不置顶，1 全局置顶 |
| log_IsLock | 文章或页面是否允许评论：0 允许，1 禁止 |
| log_Title | 标题 |
| log_Intro | 摘要 |
| log_Content | 内容 |
| log_PostTime | 创建时间 |
| log_CommNums | 评论数量 |
| log_ViewNums | 浏览数量 |
| log_Template | 文章模板 |
| log_Meta | 自定义附加字段 |

## zbp_category 文章分类表

| 字段名 | 说明 |
| --- | --- |
| cate_ID | 序号，即分类 ID |
| cate_Name | 分类名称 |
| cate_Order | 分类排列顺序 |
| cate_Type | 分类类型 |
| cate_Count | 分类文章数量 |
| cate_Alias | 别名 |
| cate_Intro | 介绍 |
| cate_RootID | 根分类 ID |
| cate_ParentID | 父分类 ID |
| cate_Template | 分类列表模板 |
| cate_LogTemplate | 分类文章模板 |
| cate_Meta | 自定义附加字段 |

## zbp_member 用户表

| 字段名 | 说明 |
| --- | --- |
| mem_ID | 序号，即用户 ID |
| mem_Guid | 注册邀请码 |
| mem_Level | 用户级别：会员等级说明详解 |
| mem_Status | 用户状态：0 正常，1 审核，2 禁用 |
| mem_Name | 名称 |
| mem_Password | 密码 |
| mem_Email | 邮箱 |
| mem_HomePage | 网址 |
| mem_IP | 注册 IP 地址 |
| mem_PostTime | 注册时间 |
| mem_Alias | 别名 |
| mem_Intro | 简介 |
| mem_Articles | 文章记录 |
| mem_Pages | 页面记录 |
| mem_Comments | 评论记录 |
| mem_Uploads | 附件记录 |
| mem_Template | 用户模板 |
| mem_Meta | 自定义附加字段 |

## zbp_module 侧边模块表

| 字段名 | 说明 |
| --- | --- |
| mod_ID | 序号，即模块 ID |
| mod_Name | 模块名称 |
| mod_FileName | 模块文件名 |
| mod_Content | 模块内容代码 |
| mod_SidebarID | 模块所在侧边栏的序号 |
| mod_HtmlID | 模块最外层 div 的 id |
| mod_Type | 模块类型 |
| mod_MaxLi | 最大条目数 |
| mod_Source | 模块来源：系统模块、自定义模块 |
| mod_IsHideTitle | 是否隐藏模块标题 |
| mod_Meta | 自定义附加字段 |

## zbp_tag 文章标签表

| 字段名 | 说明 |
| --- | --- |
| tag_ID | 序号，即标签 ID |
| tag_Name | 标签名称 |
| tag_Order | 标签排列顺序 |
| tag_Type | 标签类型 |
| tag_Count | 标签文章数量 |
| tag_Alias | 别名 |
| tag_Intro | 介绍 |
| tag_Template | 标签列表模板 |
| tag_Meta | 自定义附加字段 |

## zbp_comment 文章评论表

| 字段名 | 说明 |
| --- | --- |
| comm_ID | 序号，即评论 ID |
| comm_LogID | 评论所属文章 ID |
| comm_IsChecking | 是否在审核状态 |
| comm_RootID | 评论根 ID |
| comm_ParentID | 评论父 ID |
| comm_AuthorID | 评论提交者 ID |
| comm_Name | 评论者名称 |
| comm_Email | 评论者邮箱 |
| comm_HomePage | 评论者网址 |
| comm_Content | 评论内容 |
| comm_PostTime | 评论时间 |
| comm_IP | 评论者 IP 地址 |
| comm_Agent | 评论者客户端 UA 信息 |
| comm_Meta | 自定义附加字段 |

## zbp_config 系统、主题和插件配置表

| 字段名 | 说明 |
| --- | --- |
| conf_ID | 序号 |
| conf_Name | 主题和插件名称 |
| conf_value | 主题和插件相关配置信息 |

## zbp_upload 附件表

| 字段名 | 说明 |
| --- | --- |
| ul_ID | 序号，即附件 ID |
| ul_AuthorID | 上传用户 ID |
| ul_Size | 文件大小 |
| ul_Name | 文件生成名称 |
| ul_SourceName | 文件原名 |
| ul_MimeType | 文件类型 |
| ul_PostTime | 上传时间 |
| ul_DownNums | 下载次数 |
| ul_LogID | 附件所属文章 ID |
| ul_Intro | 说明 |
| ul_Meta | 自定义附加字段 |