## app 应用管理 API

| act 方法  | 请求方式    | 参数                                                    | 鉴权               |
| --------- | ---------- | ------------------------------------------------------- | ----------------- |
| `get`     | GET / POST | `获取指定 type 和 id 的应用`                             | 需鉴权   |
|           |            | `type` 为 theme 或 plugin   
|           |            | `id` 为应用的 id 值
|
| `get_apps`| GET / POST | `获取所有的应用列表(含未激活的)`                               | 需鉴权   |
|
| `get_themes`| GET / POST | `获取所有的主题列表(含未激活的)`                               | 需鉴权   |
|
| `get_plugins`| GET / POST | `获取所有的插件列表(含未激活的)`                               | 需鉴权   |
|
| `set_theme`| POST      | `激活指定主题`                               | 需鉴权   |
|           |            |$_POST['id] `id` 为主题的 id 值
|           |            |$_POST['style] `style` 为主题的 style 名
|
| `enable_plugin`| POST      | `启用指定插件`                               | 需鉴权   |
|           |            |$_POST['id] `id` 为插件的 id 值
|
| `disable_plugin`| POST      | `禁用指定插件`                               | 需鉴权   |
|           |            |$_POST['id] `id` 为插件的 id 值
|