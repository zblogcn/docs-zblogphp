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

## Emoji 表情支持

对于 MySQL ，其`utf8`并非标准的`UTF-8`。在 `5.5.3` 之后新增了`utf8mb4`来解决这个问题；

「Z-BlogPHP 1.7.0」起将默认使用`utf8mb4`编码创建数据表；

对于现有数据库，可按如下操作进行修改：

> 1. 进入「`phpMyAdmin`」或其他数据库管理工具；
> 1. 选择相应数据库，（默认为「`结构`」视图）；
> 2. 点击「`操作`」选项卡，更改「`排序规则`」为`utf8mb4_general_ci`；
> 3. 点击「`执行`」即可应用到所有表和所有表列字段！

「- -」「- -」「- -」「- -」「- -」
