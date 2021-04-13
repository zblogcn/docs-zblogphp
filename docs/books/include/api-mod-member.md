## member

| act 方法 | 请求方式   | 参数                                                | 鉴权 |                      |
| -------- | ---------- | --------------------------------------------------- | ---- | -------------------- |
| login    | POST       | `username`, `password`；`password`建议使用 MD5 值； |      |
| post     | POST       | `Member`定义字段                                    | 必须 |
| get      | GET / POST | 用户 `id`                                           | 必须 |
| delete   | GET / POST | 用户 `id`                                           | 必须 |
| list     | GET / POST | `level`, `status`,                                  | 必须 |
| get_auth | GET / POST |                                                     | 必须 | 用于查看当前用户权限 |

`act=list`方法共通参数见：[约束与过滤](books/dev-api-design?id=约束与过滤 "约束与过滤")；

此处`login`操作返回的「鉴权 Token」将用于后续需要「鉴权」的请求，见「[权限认证](books/dev-api-design?id=权限认证 "权限认证")」；
