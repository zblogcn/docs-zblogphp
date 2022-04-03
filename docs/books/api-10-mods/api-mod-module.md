## module 模块与侧栏管理 API


| act 方法        | 请求方式    | 参数                                            | 鉴权               |
| --------------- | ---------- | ---------------------------------------------- | ----------------- |
| `get`           | GET / POST | `获取指定 id 的模块`                             | 无需鉴权   |
|                 |            | `id` 为模块的 id 值
| `post`          | POST       | `编辑或新建模块`                                 | 需鉴权   |
|                 |            |POST 参数：附：**「示例 1」**
| `delete`        | GET / POST | `删除模块`                                      | 需鉴权   |
|                 |            | `id` 为模块的 id 值
| `list`          | GET / POST | `列出模块`                                      | 无需鉴权   |
| `set_sidebar`   | POST       | `设置侧栏`                                      | 需鉴权   |
| `list_sidebar`  | GET / POST | `列出指定的侧栏`                                 | 需鉴权   |
|                 |            | `id` 为侧栏的 id 值(1-9)
|

**示例 1**：

<details>
<summary>post 新建或编辑模块的$_POST参数示范：（点击展开）</summary>

```php
$_POST['ID'] 为 0 是新建
$_POST['FileName'] 模块的唯一标识符，起名需符合文件名规则
$_POST['HtmlID'] 模块的HTML的id
$_POST['MaxLi'] 模块内li标签最大数量
$_POST['IsHideTitle'] 是否隐藏模块的标题
$_POST['Type'] 模块的类别，为div或ul
$_POST['Content'] 模块的内容
$_POST['NoRefresh'] 锁定模块的内容不让程序更改
```

</details>