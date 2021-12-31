# NetWork 网络组件

Z-BlogPHP 自带的 NetWork 网络组件是从 1.0 版本就开始附带的自研组件。历经多年的开发打磨，欢迎大家使用。

NetWork 组件由 Network 工厂类和 3 个业务组件：Network__curl、Network__filegetcontents、Network__fsockopen 类，分别对应了 PHP 里的三种访问网络的方式。

使用 Network 工厂类创建网络操作组件时，默认的创建顺序是，如果 curl 扩展存在，就初始化 Network__curl；如果 allow_url_fopen 打开，fsockopen 存在，就初始化 Network__fsockopen；最后是返回 Network__filegetcontents。

**示例代码 1：GET 方法访问网页**

```php
//假定我们抓取so.com
$url = 'https://www.so.com/';

$http = 
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

**示例代码 3：设置 User-Agent 和 Cookie 头**

```php

$u = 'ZBlogPHP/173000';//user-agent
$c = ' name=' . urlencode('nobody');//cookies name 为nobody
$c .= ' password=' . urlencode('123456');//cookies password 为123456

//在send之前，设置setRequestHeader
$http->setRequestHeader('User-Agent', $u);
$http->setRequestHeader('Cookie', $c);

```