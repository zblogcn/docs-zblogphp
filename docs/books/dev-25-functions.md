# 函数列表

Z-BlogPHP 封装了众多辅助函数，文件路径为：「[zb_system/function/c_system_common.php](https://github1s.com/zblogcn/zblogphp/blob/master/zb_system/function/c_system_common.php "zb_system/function/c_system_common.php - GitHub1s") 」←此链接可直接在线查看；

还有一些在`zb_system/function/c_system_function.php`，不过除了前两个外不太需要自行调用；

本章节会介绍一些相对常用的，具体定义可在文件中搜索查看。

## GetList()

通过 GetList 可以获取自定义的文章列表，如指定分类的最新文章、置顶文章等等；

```php
$result = GetList(array('count'=>10)) //返回array(Post类型) 或是 空array()
```

array 参数如下
```php
array(
  'count' => 10, //（可省略）
  'cate' => 1, //（可省略）
  'auth' => 2, //（可省略）
  'date' => '2020-1', //（可省略）
  'tags' => 'abc', //（可省略）
  'search' => 's', //（可省略）
  //以下是原$option 参数的 key 键
  'post_type' => null, //指定查询 Post 表的类型 （可省略）
  'post_status' => null, //指定查询 Post 表的状态 （可省略）
  'only_ontop' => false, //指定全是置顶 （可省略）
  'only_not_ontop' => false, //指定全不是置顶 （可省略）
  'has_subcate' => false, //指定包含子孙目录 （可省略）
  'is_related' => false, //指定查询相关文章 （可省略）
  'order_by_metas' => false, //指定按 Metas 值排序输出结果 （可省略）
  'random' => 5, //指定抽取 5 篇 Post 表的记录 （可省略）
  'where_custom' => array(array('=', 'log_Template', '')), //自定义 where
  'order_custom' => array('log_ViewNums' => 'DESC', 'log_CommNums' => 'ASC'), //自定义 order
)
```

## GetPost()

通过 GetPost 可以获取指定的文章或页面或是其它类型的 Post 表的数据；

```php
//返回id为10的Post对象实例，如果没有就返回一个空的Post对象实例
$post = GetPost(array('id'=>10)) //返回object(Post类型)
```

array 参数如下
```php
array(
  'id' => 10, //指定 ID（可省略）
  'title' => 'abc', //指定 Post 标题（可省略）
  'alias' => 'cba', //指定 Post 别名（可省略）
  'titleoralias' => 'ddd', //指定 Post 标题 or 别名（可省略）
  'idorname' => 'fff', //指定 Post 的 ID 或标题 or 别名（可省略）
  //以下是原$option 参数的 key 键
  'post_type' => null, //指定查询 Post 表的类型 （可省略）
  'post_status' => null, //指定查询 Post 表的状态 （可省略）
  'only_article' => false, //指定是查找文章 （可省略）
  'only_page' => false, //指定是查找页面 （可省略）
  'where_custom' => array(array('=', 'log_Template', '')), //自定义 where
  'order_custom' => array('log_CommNums' => 'ASC'), //自定义 order
)
```

## GetVars()

- 可快速获取 `GET`/`POST`/`COOKIE` 等传值；
- 不存在时将默认返回`null`，无需`isset($_GET['act'])`判断；
- 可通过第三个可选参数决定默认返回值；
- 其实第二个参数大小写不敏感，但是不知道为什么习惯上还是大写；

```php
$act = GetVars("act", "GET");
$name = GetVars("name", "POST");
$password = GetVars("password", "COOKIE", "12345678");
```

## GetValueInArray()

- 从数组中获取指定键值的元素；(可以省去了 isset 判断)
- 内部封装了所需键值是否存在的判断，不存在时返回第三个参数；
- 第三个参数可省，默认值为 `null`；

```php
  $siteInfos = array(
    "url" => "https://docs.zblogcn.com/php/",
    "git" => "https://github.com/zblogcn/docs-zblogphp",
    "engine" => "docsify",
  );
  $siteUrl = GetValueInArray($siteInfos, "url", "");
  //或是
  $siteUrl = GetValueInArray($siteInfos, 'url');
  echo $siteUrl;
  // https://docs.zblogcn.com/php/
```

## GetImagesFromHtml()

从 HTML 中获取所有图片；

参数及返回值；

```php
// @param  string $html
// @return array
```

## 访问来源信息

```php
// IP
GetGuestIP();
// HTTP_USER_AGENT
GetGuestAgent();
// 访问来源 URL
GetRequestUri();
```

## 获取空间环境信息

此处部分信息会在初始化时赋值给常量，可直接使用，见「`zb_system\function\c_system_base.php`」

```php
// 系统信息概览
var_dump(GetEnvironment());
// string(73) "WINNT10.0; IIS10.0; PHP7.4.21x64; mysqli5.7.23; curl7.70.0; OpenSSL1.1.1k"

// 以下是其他相关函数

// 请求协议
GetScheme($_SERVER)

// web 服务 - Nginx / Apache / IIS
GetWebServer()

// 操作系统
GetSystem()

// PHP 版本
GetPHPVersion()

```

## 加密函数

**`1.7.3 开始支持`**

### AES 对称加密函数

```php
// 加密函数
zbp_encrypt($data, $password, $additional = null, $type = null)
# $data 原文string
# $password 密码
# $additional 附加认证数据(可设为null)
# $type 可以指定类型为 aes256gcm, aes256cbc, sm4

// 解密函数
zbp_decrypt($data, $password, $additional = null, $type = null)
# $data 待解密的string

# 注意：
# aes256gcm 需要openssl扩展实现 (PHP >= 7.1.0)
# aes256cbc 需要mcrypt或openssl扩展实现
# sm4 需要openssl扩展实现 (PHP >= 7.2.0)

# 推荐使用 aes256gcm
# 如果不指定$type则会自动判断，依次尝试使用aes256gcm>aes256cbc
```

```php
//aes加解密函数使用示范
$endata = zbp_encrypt('原文字符串', '12345', 'abc', 'aes256gcm');

$dedata = zbp_decrypt($endata, '12345', 'abc', 'aes256gcm');

var_dump($dedata);// string(15) "原文字符串"
```

### RSA 非对称加密函数
```php
// RSA非对称公钥加密函数
zbp_rsa_public_encrypt($data, $public_key_pem, $key_length = 2048)
# $data 原文string
# $public_key_pem 公钥pem字符串
# $key_length 密钥长度默认2048

// RSA非对称公钥解密函数
zbp_rsa_public_decrypt($data, $public_key_pem, $key_length = 2048)
# $data 待解密的string

// RSA非对称私钥加密函数
zbp_rsa_private_encrypt($data, $private_key_pem, $key_length = 2048)
# $private_key_pem 私钥pem字符串

// RSA非对称私钥解密函数
zbp_rsa_private_decrypt($data, $private_key_pem, $key_length = 2048)
```

```php
//rsa函数使用示范
$rsa_config = array(
     'digest_alg' => 'sha512',
     'private_key_bits' => 2048,
     'private_key_type' => OPENSSL_KEYTYPE_RSA,
);
//创建公私钥
$res = openssl_pkey_new($rsa_config);
//获取私钥
openssl_pkey_export($res, $private_key);
//获取公钥
$public_key = openssl_pkey_get_details($res)['key'];

//使用私钥加密
$endata = zbp_rsa_private_encrypt('原文字符串', $private_key);
//使用公钥解密
$dedata = zbp_rsa_public_decrypt($endata, $public_key);
var_dump($dedata);// string(15) "原文字符串"

//使用公钥加密
$endata = zbp_rsa_public_encrypt('原文字符串', $public_key);
//使用私钥解密
$dedata = zbp_rsa_private_decrypt($endata, $private_key);
var_dump($dedata);// string(15) "原文字符串"

```

## common.php 函数简介

### HTTP 服务器及系统检测函数

#### 获取 Scheme
`GetScheme`($array)

#### 获取服务器
`GetWebServer`() 

#### 获取操作系统
`GetSystem`()

#### 获取 PHP 解析引擎
`GetPHPEngine`()

#### PHP Version
`GetPHPVersion`()

#### 获取当前网站地址
`GetCurrentHost`($blogpath, &$cookiesPath)

#### 设置 http 状态头
`SetHttpStatusCode`($number, $force = false)

#### 用 script 标签进行跳转
`RedirectByScript`($url)

#### 302 跳转
`Redirect302`($url)

#### http 302 跳转
`Redirect`($url)

#### 301 跳转
`Redirect301`($url)

#### 输出 Http404
`Http404`()

#### 输出 Http500
`Http500`()

#### 输出 Http503
`Http503`()

#### 设置 304 缓存头
`Http304`($filename, $time)

#### 获取客户端 IP
`GetGuestIP`()

#### 获取客户端 Agent
`GetGuestAgent`()

#### 获取请求来源 URL
`GetRequestUri`()

#### 获取请求 Script Name
`GetRequestScript`()

#### 获取指定时区名
`GetTimeZoneByGMT`($z)

#### 获得系统信息
`GetEnvironment`($more = false)

#### 拿到后台的 CSP Heaeder
`GetBackendCSPHeader`()

#### 检查移动端
`zbp_is_mobile`()

#### 检查移动端
`CheckIsMobile`()

#### 通过 URL 获取远程页面内容
`GetHttpContent`($url)

### 文件及目录处理函数

#### 自动加载类文件
`AutoloadClass`($className)

#### 管理自动加载类文件的目录
`AddAutoloadClassDir`($dir, $prepend = false)

#### 通过文件获取应用 URL 地址
`plugin_dir_url`($file)

#### 通过文件获取应用目录路径
`plugin_dir_path`($file)

#### 获取目录下文件夹列表(递归)
`GetDirsInDir_Recursive`($dir)

#### 获取目录下指定类型文件列表(递归)
`GetFilesInDir_Recursive`($dir, $type)

#### 获取当前目录下文件夹列表
`GetDirsInDir`($dir)

#### 获取当前目录下指定类型文件列
`GetFilesInDir`($dir, $type)

#### 获取文件后缀名
`GetFileExt`($f)

#### 获取文件权限
`GetFilePermsOct`($f)

#### 获取文件权限（字符表达格式）
`GetFilePerms`($f)

#### 删除文件 BOM 头
`RemoveBOM`($s)

#### 检查重复加载的
`CheckIncludedFiles`($file)

### 数组处理类函数

#### 获取$_GET, $_POST 等数组的参数值
`GetVars`($name, $type = 'REQUEST', $default = null)

#### 从一系列指定的环境变量获得参数值
`GetVarsFromEnv`($name, $source = '', $default = '')

#### 解析 env:设置项目读取环境变量获得参数值
`GetOptionVarsFromEnv`($value)

#### 拿到 ID 数组 by List 列表
`GetIDArrayByList`($array, $keyname = null)

#### 判断数组是否已经有$key，如果没有就 set 一次$default
`Array_Isset`(&$array, $key, $default)

#### 数组 转 对象
`array_to_object`($arr)

#### 对象 转 数组
`object_to_array`($obj)

### 字符串处理类函数

#### 分割 string 并取某项数据
`SplitAndGet`($string, $delimiter, $n = 0)

#### 删除连续空格
`RemoveMoreSpaces`($s)

#### 向字符串型的参数表加入一个新参数
`AddNameInString`($s, $name)

#### 从字符串型的参数表中删除一个参数
`DelNameInString`($s, $name)

#### 在字符串参数值查找参数
`HasNameInString`($s, $name)

#### 验证字符串是否符合正则表达式
`CheckRegExp`($source, $para)

#### 获取 UTF8 格式的字符串的子串
`SubStrUTF8_Start`($sourcestr, $start)

#### 获取 UTF8 格式的字符串的子串
`SubStrUTF8`($sourcestr, $cutlength)

#### ZBP 版获取 UTF8 格式的字符串的子串
`Zbp_SubStr`($sourcestr, $start)

#### ZBP 版 StrLen
`Zbp_StrLen`($string)

#### ZBP 版 Strpos
`Zbp_Strpos`($haystack, $needle, $offset = 0)

#### ZBP 版 Stripos
`Zbp_Stripos`($haystack, $needle, $offset = 0)

#### 截取 HTML 格式的 UTF8 格式的字符串的子串
`SubStrUTF8_Html`($source, $length)

#### 获得一个只含数字字母和-线的 string
`FilterCorrectName`($s)

#### 确认一个对象是否可被转换为 string
`CheckCanBeString`($obj)

#### 实现 utf84mb4 的过滤
`utf84mb_filter`(&$sql)

#### 清除一串代码内所有的 PHP 代码
`RemovePHPCode`($code)

#### 中文与特殊字符友好的 JSON 编码
`JsonEncode`($arr)

#### UCS-2BE 转 UTF-8，解决 JSON 中文转码问题
`Ucs2Utf8`($matchs)
 
### HTML 文本处理转换类函数
### URL 判断处理类函数
### SWoole 及 Workerman 相关函数
### zbp 加密解密函数
### 错误输出及记录函数
### 系统其它类函数
### 安全检测判断类函数