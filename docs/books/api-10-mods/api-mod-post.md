## post 文章管理 API

| act 方法 | 请求方式   | 参数                                                     | 鉴权               |
| -------- | ---------- | ------------------------------------------------------- | ----------------- |
| get      | GET / POST | 文章 `id`                                                | 非公开文章需鉴权   |
| post     | POST       | `Post`定义字段                                           |必须               |
|          |            |$_POST['ID'] 为 0 是新建
|          |            |$_POST['Title']
|          |            |$_POST['Alias']
|          |            |$_POST['Type'] 为 0 是文章，1 是 page 页面
|          |            |$_POST['AuthorID']
|          |            |$_POST['CateID'] 如果没有提供 CateID,可提供 CateName
|          |            |$_POST['Intro']
|          |            |$_POST['Content'] 
|          |            |$_POST['Tag']
|          |            |$_POST['PostTime']
|          |            |$_POST['Status']
| delete   | GET / POST | 文章 `id`                                                | 必须               |
| list     | GET / POST | `cate_id`, `tag_id`, `auth_id`, `type`, `date`, `manage` | 未鉴权请求数量受限为每页面展示数量 |
|          |            |                                                          |已鉴权有后台管理权限为后台每页面展示数量 |
`act=list`方法共通参数见：[约束与过滤](books/dev-api-design?id=约束与过滤 "约束与过滤")

**注：对于 API 发布文章，额外提供一个`CateName`字段用以代替`CateID`指定分类，前提是存在以该字段值命名的分类；也可以使用`api.php`内的接口实现自动创建分类等操作；**
