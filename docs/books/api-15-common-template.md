# API 通用模板

<!-- 感觉不太需要？？？ -->

## 请求

POST `https://example.com/zb_system/api.php`

### Headers

以下简称“通用请求头”：

| 参数            | 示例值                                | 说明                 |
| --------------- | ------------------------------------- | -------------------- |
| Content-Type    | application/json; charset=utf-8       | 客户端发送的内容类型 |
| Accept-Encoding | gzip, deflate                         | 客户端接受的压缩算法 |
| User-Agent      | Mozilla/5.0                           | -                    |
| Accept-Language | zh-cn                                 | 客户端接受的语言代码 |
| Authorization   | Bearer emhvdXppc2h1LTJjZjMwOWM3ODA... | 鉴权 Token           |

### Cookies

以下简称“通用请求 Cookies”：

| 键        | 示例值     | 域          | 路径 | 过期 |
| --------- | ---------- | ----------- | ---- | ---- |
| addinfo   | xxxxxxxxxx | example.com | /    | -    |
| http304ok | 1          | example.com | /    | -    |
| timezone  | 8          | example.com | /    | -    |

### Body

无

## 响应

### Headers

以下简称“通用响应头”：

| 参数             | 示例值                          | 说明               |
| ---------------- | ------------------------------- | ------------------ |
| Content-Type     | application/json; charset=utf-8 | 响应内容的类型     |
| Content-Encoding | gzip                            | 响应使用的压缩算法 |
| Date             | Sun, 23 Feb 2020 07:03:41 GMT   | 响应的时间         |

### Cookies

无

### Body

以下简称“通用响应体”。

根据客户端的身份验证以及服务端的状态返回内容。

例如：

```json
{
  "code": 200,
  "message": "OK",
  "data": {},
  "error": null
}
```

`data` 内容由具体的接口决定，一些常见的范例如下：

如，某个用于添加内容的接口。

`message` 传递相应消息，内容无规定。

`data` 返回对象实体。

其他操作以此类推。

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "comment": {
      "ID": 9,
      "LogID": "3",
      "IsChecking": false,
      "RootID": 0,
      "ParentID": 0,
      "AuthorID": 0,
      "Name": "访客",
      "Content": "Test comment",
      "Email": "test@example.com",
      "HomePage": "https://example.com",
      "PostTime": 1610195920
    }
  },
  "error": null
}
```

```json
{
  "code": 500,
  "message": "操作失败！",
  "data": null,
  "error": null
}
```
