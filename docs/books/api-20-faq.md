# 常见问题（API）

## 输出自定义的 JSON 格式 (1.7.2 支持)

系统 API 默认输出 code,data,error,message 字段的 JSON 内容

如何输出自定义字段内容？例如输出 errno,msg 字段:

```php
//在api输出函数内这样定义返回数组

$array['errno'] = 0;
$array['msg'] = 'success';
$array['data']['isConsumed'] = 2;

return array('json' => $array);
```

## 输出 XML 格式等其它格式的数据 (1.7.2 支持)

系统 API 默认输出都是 JSON 格式，如何输出其它格式的数据:

```php
//在api输出函数内这样定义返回数组$array

$array['raw'] = '<xml><errno>0</errno><msg>ok</msg><data>xml info</data></xml>';
$array['raw-type'] = 'text/xml';

return $array;
```

## 匿名访问(POST 方式提交) API 时跳过 csrf_token 验证
如果定义了一个 `newapi/submit` api 给非登录用户 POST 使用，需要在 api 的 url 后，附带上 `csrf_token` ，如果不使用 csrf_token

则需要 使用接口设置略过 csrf_token 校验
```php
Add_Filter_Plugin('Filter_Plugin_API_VerifyCSRF_Skip', 'newapi_IgnoreCSRF');

function newapi_IgnoreCSRF(&$array)
{
  $array[] = array('mod' => 'newapi', 'act' => 'submit');
}
```

## Apache 获取不到 Authorization 头信息

修改`.htaccess`文件，添加如下信息：

> RewriteRule .* - [env=HTTP_AUTHORIZATION:%{HTTP:Authorization},last]
