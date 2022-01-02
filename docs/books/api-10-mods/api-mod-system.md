## system 系统设置与管理 API

| act 方法  | 请求方式    | 参数                                                    | 鉴权               |
| --------- | ---------- | ------------------------------------------------------- | ----------------- |
| `basic_info`| GET / POST | `获取网站基本信息`                                 | 不需要   |
|           |            | PS：如果发送鉴权则会多返回系统语言包数组
|
| `get_info`| GET / POST | `获取网站高级信息`                                     | 需鉴权   |
|
| `misc_statistic`| GET / POST | `清空缓存并重新编译模板`                                     | 需鉴权   |
|           |            | PS：即后台的刷新缓存操作
|
| `misc_showtags`| GET / POST | `Misc获取常用tags`                                     | 需鉴权   |
|           |            |参数`type` = 0，即获取文章的常用 tags
|
| `get_setting`| GET / POST | `获取常用设置数组`                                     | 需鉴权   |
|           |            | 返回值：返回常用的 option 数组
|
| `save_setting`|  POST | `保存系统常用设置`                                     | 需鉴权   |
|           |            | 附：**「示例 1」**
|

**示例 1**：

<details>
<summary>get_setting 和 save_setting 可以返回或设置的 option 值：（点击展开）</summary>

```php
$GLOBALS['setting_keys'] = array(
    'ZC_BLOG_NAME',
    'ZC_BLOG_SUBNAME',
    'ZC_BLOG_COPYRIGHT',
    'ZC_TIME_ZONE_NAME',
    'ZC_BLOG_LANGUAGEPACK',
    'ZC_API_ENABLE',
    'ZC_XMLRPC_ENABLE',
    'ZC_DEBUG_MODE',
    'ZC_DEBUG_MODE_WARNING',
    'ZC_ADDITIONAL_SECURITY',
    'ZC_USING_CDN_GUESTIP_TYPE',
    'ZC_CLOSE_SITE',
    'ZC_DISPLAY_COUNT',
    'ZC_DISPLAY_SUBCATEGORYS',
    'ZC_PAGEBAR_COUNT',
    'ZC_SEARCH_COUNT',
    'ZC_SYNTAXHIGHLIGHTER_ENABLE',
    'ZC_COMMENT_TURNOFF',
    'ZC_COMMENT_AUDIT',
    'ZC_COMMENT_REVERSE_ORDER',
    'ZC_COMMENTS_DISPLAY_COUNT',
    'ZC_COMMENT_VERIFY_ENABLE',
    'ZC_UPLOAD_FILETYPE',
    'ZC_UPLOAD_FILESIZE',
    'ZC_ARTICLE_INTRO_WITH_TEXT',
    'ZC_ARTICLE_THUMB_SWITCH',
    'ZC_ARTICLE_THUMB_TYPE',
    'ZC_ARTICLE_THUMB_WIDTH',
    'ZC_ARTICLE_THUMB_HEIGHT',
    'ZC_MANAGE_COUNT',
    'ZC_POST_BATCH_DELETE',
    'ZC_DELMEMBER_WITH_ALLDATA',
    'ZC_CATEGORY_MANAGE_LEGACY_DISPLAY',
);
```
</details>
