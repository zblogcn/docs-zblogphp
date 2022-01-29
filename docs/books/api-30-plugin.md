# 调试插件

为了方便开发过程测试调试 API，提供部分软件 API 调试接口包

## Postman

1. 点击图标 [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/30716-b0da8114-734e-76eb-6112-5e2f92a6245e?action=collection%2Ffork&collection-url=entityId%3D30716-b0da8114-734e-76eb-6112-5e2f92a6245e%26entityType%3Dcollection%26workspaceId%3Dccc3a0a1-4d67-4292-818f-13eae69d02b6)
   ，将 Z-BlogPHP 的 API 包 Fork 到自己工作台。
2. `Fork` 可以在自己的 `Collection` 中看到名为 `Z-BlogPHP API` 的资源包。
3. 在资源包的设置中，切换到变量 `Variable` 选项，填写 `ZBLOGPHP_HOST`、`USERNAME`、`PASSWORD` 三个变量的值（填写在 `CURRENT VALUE` ）。
4. 在资源包各个模块下已经列出了所有操作方法（list、get、post、delete 等），直接选择后调试即可。
5. 调试时无需考虑鉴权 token ，资源包会自动处理，并附加上 token 进行请求。
