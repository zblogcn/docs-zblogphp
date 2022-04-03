## tag 标签管理 API

| act 方法  | 请求方式    | 参数                                                    | 鉴权               |
| --------- | ---------- | ------------------------------------------------------- | ----------------- |
| `get`     | GET / POST | `获取指定 id 的标签`                             | 无需鉴权   |
|           |            |参数 `id`: 为附件的 id 值
| `post`    | POST       | `编辑或发布标签`                                 | 需鉴权   |
| `post`    | POST       |POST 参数：附：**「示例 1」**
| `delete`  | GET / POST | `删除标签`                                      | 需鉴权   |
|           |            |参数 `id`: 为附件的 id 值
| `list`    | GET / POST | `列出标签`                                      | 管理模式需鉴权   |
|           |            |参数 manage:进入管理模式                          |例：&manage=1
|

**示例 1**：

<details>
<summary>post 新建或编辑标签的$_POST参数示范：（点击展开）</summary>

```php
$_POST['ID'] 为 0 是新建
$_POST['Alias'] 标签的别名 
$_POST['Intro'] 标签的简介
$_POST['Template'] 标签的模板,默认为空
```

</details>