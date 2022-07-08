# NetWork 网络组件

## 组件简介

Z-BlogPHP 自带的 `NetWork 网络组件`是从 1.0 版本就开始附带的自研组件。历经多年的开发打磨，欢迎大家使用。

NetWork 组件由 `Network 工厂类`和 3 个业务组件：`Network__curl`、`Network__filegetcontents`、`Network__fsockopen` 类，分别对应了 PHP 里的三种访问网络的方式。

使用 Network 工厂类创建网络操作组件时，默认的创建顺序是，如果 `curl` 扩展存在，就初始化 Network__curl；如果 `allow_url_fopen` 打开，`fsockopen` 存在，就初始化 Network__fsockopen；最后是返回 Network__filegetcontents。

## 组件方法简介

***工厂类的方法***

`Network::Create()` 按默认顺序创建并返回一个新的网络操作组件

`Network::Create('curl')` 创建并返回一个新的 Network__curl 网络操作组件

`Network::Create('fsockopen')` 创建并返回一个新的 Network__fsockopen 网络操作组件

`Network::Create('filegetcontents')` 创建并返回一个新的 Network__filegetcontents 网络操作组件

***业务组件的属性***

`responseText` 返回的数据

`responseHeader` 返回的 Http Header

`status` 返回的状态码

`statusText` 返回的状态码文本

***业务组件的方法***

`open($Method, $Url)` 打开 network 组件

`send($varBody = '')` network 组件发送连接

`setRequestHeader($bstrHeader, $bstrValue)` 设置请求 Header

`enableGzip()` 启用 Gzip 压缩

`setMaxRedirs($n)` 设置最大重定向次数

`addBinary($name, $entity)` 添加二进制文件上传

`addText($name, $entity)` 添加发送参数

`setTimeOuts($resolveTimeout, $connectTimeout, $sendTimeout, $receiveTimeout)` 设置超时

`getAllResponseHeaders()` 获取所有的响应头

`getResponseHeader($name)` 获取指定响应头

***以下是 1.7.2 新加入的方法***

`getStatusCode()` 获取响应代码

`getStatusText()` 获取完整的响应头

`getReasonPhrase()` 获取响应代码的解释

`getBody()` 获取响应正文

`getHeaders` 获取响应头数组

`getHeader($name)` 获取指定响应头

`hasHeader($name)` 判断指定响应头存在

## 简易使用方法

**示例代码 1：GET 方法访问网页**

```php
//假定我们抓取so.com
$url = 'https://www.so.com/';

$http = Network::Create();
$http->open('GET', $url);
$http->enableGzip();//打开gzpi
$http->setTimeOuts(120, 120, 0, 0);//设置超时
$http->send();

//获取访问后的正文
$txt = $http->responseText;

//获取HTTP响应代码
$code = $http->status;//正常访问为200
```
**示例代码 2：POST 方法访问网页**
```php
//假定我们向某页面提交登录
$url = 'https://test/login.php';

$data = array();
$data['username'] = '神马';
$data['password'] = md5('都是浮云');

$http = Network::Create();
$http->open('POST', $url);
$http->enableGzip();//打开gzpi
$http->setTimeOuts(120, 120, 0, 0);//设置超时
$http->send($data);

$txt = $http->responseText;
echo $txt;
```

**示例代码 3：设置 RequestHeader,User-Agent,Cookie 头**

```php

$u = 'ZBlogPHP/173000';//user-agent
$c = ' name=' . urlencode('nobody');//cookies name 为nobody
$c .= ' ;password=' . urlencode('123456');//cookies password 为123456

//在send之前，设置setRequestHeader
$http->setRequestHeader('User-Agent', $u);
$http->setRequestHeader('Cookie', $c);

```

## 高级使用方法

**示例代码 4：指定重定向次数**
```php
//NetWork组件默认重定向次数是0次，也就是遇到301，302就停
$url = 'https://test/http302.php';

$http = Network::Create();
$http->open('GET', $url);
//设定重定向次数是5次，说明最多可以重定向5次，可避免死循环。
//启用防跨站时，该功能将不会生效，例如宝塔的.user.ini文件
$http->setMaxRedirs(5);

$http->send();
```

**示例代码 5：上传文件**

```php
$url = 'https://test/upload.php';

$http = Network::Create('curl');//指定使用curl组件
$http->open('POST', $url);
$http->enableGzip();//打开gzpi
$http->setTimeOuts(120, 120, 0, 0);//设置超时

$http->addBinary('file', 'D:/www/web.config');//指定某个文件

$http->send();

echo $http->responseText;
//备注一下，1.7.2以下版本的filegetcontents和fsockopen，提交到自签证书的https网站有故障，1.7.2已修复了。
```

**示例代码 6：Network__curl 的特别用法**

```php
$http = Network::Create('curl');//指定使用curl组件
$http->open('GET', 'https://www.baidu.com/');

//众所周知curl有很多种设置，NetWork暴露出一个curl对象可供设置使用，需要在open()后send()之前。
if(is_object($http->ch)) {
    curl_setopt($http->ch, CURLOPT_URL, 'https://www.so.com/s');
}

$http->send();
```
