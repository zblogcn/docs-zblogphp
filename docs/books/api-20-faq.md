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

## Apache 获取不到 Authorization 头信息

修改`.htaccess`文件，添加如下信息：

> RewriteRule .* - [env=HTTP_AUTHORIZATION:%{HTTP:Authorization},last]
