## 获取用户信息

### 接口功能
获取用户详细信息

### 接口地址
- `https://example.com/zb_system/api.php?mod=member&act=get`

### 请求方式
- GET / POST

### 是否需要鉴权
- 是

### 请求参数
| 参数名 | 类型 | 必须 | 说明 |
| ------ | ---- | ---- | ---- |
| `id`   | int  | 是   | 用户 `id` |

### 返回 data 参数说明
| 参数名 | 类型 | 说明 |
| ------ | ---- | ---- |
| `member` | object | 用户信息 |
| `member.ID` | int | 用户 `id` |
| `member.Level` | int | 用户等级 |
| `member.Status` | int | 用户状态 |
| `member.Name` | string | 用户名 |
| `member.Email` | string | 邮箱 |
| `member.HomePage` | string | 用户主页 |
| `member.CreateTime` | int | 创建时间 |
| `member.PostTime` | int | 发布时间 |
| `member.UpdateTime` | int | 更新时间 |
| `member.Alias` | string | 别名 |
| `member.Intro` | string | 简介 |
| `member.Articles` | int | 文章数 |
| `member.Pages` | int | 页面数 |
| `member.Comments` | int | 评论数 |
| `member.Uploads` | int | 附件数 |
| `member.Template` | string | 模板 |
| `member.Url` | string | 用户链接 |
| `member.Avatar` | string | 用户头像 |
| `member.StaticName` | string | 静态别名 |

### 返回示例
```json
{
    "member": {
        "ID": "1",
        "Level": "1",
        "Status": "0",
        "Name": "admin",
        "Email": "admin@example.com",
        "HomePage": "",
        "CreateTime": "0",
        "PostTime": "1108116916",
        "UpdateTime": "0",
        "Alias": "",
        "Intro": "",
        "Articles": "10",
        "Pages": "1",
        "Comments": "20",
        "Uploads": "30",
        "Template": "index",
        "Url": "https://example.com/?auth=1",
        "Avatar": "https://example.com/zb_users/avatar/0.png",
        "StaticName": "admin"
    }
}
```

### 备注说明
- 返回参数仅列出了「[登录和鉴权](books/api-05-design?id=%e9%80%9a%e7%94%a8%e8%bf%94%e5%9b%9e%e6%a0%bc%e5%bc%8f "通用返回格式")」中 `data` 内的参数，其他参数说明见通用返回格式