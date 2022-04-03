## upload 附件管理 API

| act 方法  | 请求方式    | 参数                                                    | 鉴权               |
| --------- | ---------- | ------------------------------------------------------- | ----------------- |
| `get`     | GET / POST | `获取指定 id 的附件`                             | 需鉴权   |
|           |            |参数 `id`: 为附件的 id 值
| `post`    | POST       | `编辑或发布附件`                                 | 需鉴权   |
|           |            |附：**「示例 1」**
| `delete`  | GET / POST | `删除附件`                                      | 需鉴权   |
|           |            |参数 `id`: 为附件的 id 值
| `list`    | GET / POST | `列出附件`                                      | 需鉴权   |
|           |            |参数 manage:进入管理模式                          |例：&manage=1
|           |            |参数 author_id:列出用户 ID 为 author_id 下的附件
|           |            |参数 post_id:列出 post_id 文章下的附件

**示例 1**：
<summary>post 提交新的附件：（点击展开）</summary>

客户端或小程序 POST 提交上传文件到 mod=upload&act=post

提交成功后 json($upload) 对象

提交失败后返回 false

</details>