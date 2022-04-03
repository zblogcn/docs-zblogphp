## comment 评论管理 API

| act 方法  | 请求方式    | 参数                                                    | 鉴权               |
| --------- | ---------- | ------------------------------------------------------- | ----------------- |
| `get`     | GET / POST | `获取指定 id 的评论`                             | 无需鉴权   |
|           |            |参数 `id`: 为评论的 id 值
| `post`    | POST       | `发布评论`                                     | 需鉴权   |
|           |            |POST 参数：附：**「示例 1」**
| `delete`  | GET / POST | `删除评论`                                      | 需鉴权   |
|           |            |参数 `id`: 为评论的 id 值
| `list`    | GET / POST | `列出评论`                                      | 管理模式需鉴权   |
|           |            |参数 manage:进入管理模式                          |例：&manage=1
| `check`   | GET / POST | `审核评论`                                      | 需鉴权   |
|           |            |参数 `id`: 为评论的 id 值
|           |            |参数 `ischecking`: 审核状态                       |例：&ischecking=1，审核中
| `batch`   | POST       | `批量处理评论`                                   | 需鉴权   |
|           |            |参数 `all_del``all_pass``all_audit`表示全部删除，通过，审核中 |例：&all_pass=1
|           |            |参数 $_POST['id']:要批量处理的评论的 ID 表单数组
|

**示例 1**：

<details>
<summary>post 发布评论的$_POST参数示范：（点击展开）</summary>

```php
$_POST['LogID'] 评论对应的文章ID
$_POST['Name'] 评论者名字
$_POST['ReplyID'] 回复评论的ID
$_POST['Email'] 评论者电邮
$_POST['HomePage'] 评论者网站
$_POST['Content'] 评论正文

```

</details>