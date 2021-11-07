# 自定义数据类型及数据库建表



## 定义数据结构


**新增数据结构是对全局变量`$table`,`$datainfo`数组的项目添加**

```php
#表名
$table['Custom'] = '%pre%plugin_custom';
#注意表名必须加上%pre%可以区分同一数据库中的不同的程序所生成的表

#表结构
$datainfo['Custom'] = array(
  'ID' => array('cu_ID','integer','',0),
  'Content' => array('cu_Content','string',250,''),
  'LogID' => array('cu_logid','integer','',0)
);

#表结构$datainfo声明结构如下
array('属性名' => array('字段名', '类型', '长度参数（根据类型定义）', '默认值'));

#简单演示常用类型的声明：
// int数字
array('ID', 'integer', '', 0),
// tinyint
array('Type', 'integer', 'tinyint', 0),
// boolean布尔值
array('EndTime', 'boolean', '', false),
// char
array('Value', 'char', 10, ''),
// 250长度的字符串
array('Title', 'string', 250, ''),
// 长文本
array('Content', 'string', '', ''),
```

## 创建数据类

**自定义数据类型是创建一个继承自系统的`Base`类的新类**
```php
#定义了一个最基本的Custom类，可以在这个类里扩展自己的方法
class Custom extends Base
{
    public function __construct()
    {
        global $zbp;
        parent::__construct($zbp->table['Custom'], $zbp->datainfo['Custom'], __CLASS__);
    }
}
```

## 创建数据库的数据表

**创建数据表，一般是在应用的安装函数进行数据库表的存在判断及创建**
```php
function InstallPlugin_应用ID()
{
  global $zbp;
  #判断是否已创建，否则新建数据表
  if(!$zbp->db->ExistTable($GLOBALS['table']['Custom']))
  {
    $s = $zbp->db->sql->CreateTable($GLOBALS['table']['Custom'], $GLOBALS ['datainfo']['Custom']);
    $zbp->db->QueryMulit($s);
  }
}

#PS:应用卸载时可根据自身需求来删除数据表或保留所创建的数据表
```

## 自定义类型的CURD操作

**新增一条数据**
```php
#
```
**更新一条数据**
```php
#
```
**删除一条数据**
```php
#
```
**查询单条数据**
```php
#
```
**查询多条数据**
```php
#
```
***主程序1.7.2版新增的查询方法***
```php
#
```