# 常见问题

## 密码重置

Z-BlogPHP 密码找回工具：

[https://bbs.zblogcn.com/thread-83419.html](https://bbs.zblogcn.com/thread-83419.html "Z-BlogPHP密码找回工具-程序发布-ZBlogger技术交流中心")

「- -」「- -」「- -」「- -」「- -」

## 固定域名出错不能登入

- 使用空间面板的文件管理或者 FTP 修改文件：`path/zb_users/c_option.php`；
- **增加**项目：
  ```php
  'ZC_PERMANENT_DOMAIN_WHOLE_DISABLE' => true,
  ```
- 保存后即可恢复使用；

[path](terms/path.md ':include')

**注：如果是 1.6.0 之前的版本，请覆盖 1.6.0 及之后的程序包（`zb_system`）。**

「- -」「- -」「- -」「- -」「- -」

## 明确需要指定域名使用

- 使用空间面板的文件管理或者 FTP 修改文件：`path/zb_users/c_option.php`；
- 配置项：
  ```php
  'ZC_PERMANENT_DOMAIN_WHOLE_DISABLE' => false,
  'ZC_PERMANENT_DOMAIN_FORCED_URL' => "https://www.newdomin.site/",
  ```

[path](terms/path.md ':include')

**注：如果是 1.6.0 之前的版本，请覆盖 1.6.0 及之后的程序包（`zb_system`）。**

「- -」「- -」「- -」「- -」「- -」

## 用户等级划定

```php
'user_level_name' => array(
    '1' => '管理员',
    '2' => '网站编辑',
    '3' => '作者',
    '4' => '协作者',
    '5' => '评论者',
    '6' => '游客',
),

```

「- -」「- -」「- -」「- -」「- -」
