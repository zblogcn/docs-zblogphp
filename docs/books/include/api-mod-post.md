## post

| act 方法 | 请求方式   | 参数                                                     | 鉴权               |
| -------- | ---------- | -------------------------------------------------------- | ------------------ |
| post     | POST       | `Post`定义字段                                           | 必须               |
| get      | GET / POST | 文章 `id`                                                | 非公开文章需鉴权   |
| delete   | GET / POST | 文章 `id`                                                | 必须               |
| list     | GET / POST | `cate_id`, `tag_id`, `auth_id`, `type`, `date`, `manage` | 未鉴权请求数量受限 |

`act=list`方法共通参数见：[约束与过滤](dev-api-design?id=约束与过滤 "约束与过滤")

**注：对于 API 发布文章，额外提供一个`CateName`字段用以代替`CateID`指定分类，前提是存在以该字段值命名的分类；也可以使用`api.php`内的接口实现自动创建分类等操作；**
