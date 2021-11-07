# 自定义数据类型及数据库建表和CURD操作



## 定义数据结构


**新增数据结构是对全局变量`$table`,`$datainfo`数组的项目添加**

```php
#表名
$table['Custom'] = '%pre%plugin_custom';
#注意表名可自定义，但必须加上%pre%区分同一数据库中的不同的程序所生成的表

#表结构
$datainfo['Custom'] = array(
  'ID' => array('cu_ID','integer','',0),
  'Content' => array('cu_Content','string',250,''),
  'LogID' => array('cu_Logid','integer','',0)
);
#datainfo数组第一项，必须是'ID'，这是表的唯一自增序列
```

***数据表结构$datainfo声明结构如下***
```php
array('属性名' => array('字段名', '类型', '长度参数（根据类型定义）', '默认值'));

#简单演示常用类型的声明：
// int数字
array('ID', 'integer', '', 0),
// boolean布尔值
array('Check', 'boolean', '', false),
// char
array('Value', 'char', 10, ''),
// 最长250长度的字符串
array('Title', 'string', 250, ''),
// 不限长的文本字符串
array('Content', 'string', '', ''),
```

## 创建数据类型

**自定义数据类型是创建一个继承自系统的`Base`类的新类**
```php
#这里定义了一个最基本的Custom类，可以在这个类里扩展自己的方法
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

**创建数据表，在应用的include.php页面的安装函数进行数据库表的存在判断及创建**
```php
function InstallPlugin_应用ID()
{
  global $zbp;
  #判断是否已创建，否则新建数据表
  if(!$zbp->db->ExistTable($zbp->table['Custom']))
  {
    $s = $zbp->db->sql->CreateTable($zbp->table['Custom'], $zbp->datainfo['Custom']);
    $zbp->db->QueryMulit($s);
  }
}
#PS:应用卸载时可根据自身需求来删除数据表或保留所创建的数据表
```

## 自定义类型的CURD操作

**新增一条数据**
```php
  $c = new Custom();
  $c->Content = 'abc';
  $c->LogID = 123;
  $c->Save();
```
**更新一条数据**
```php
  $c = new Custom();
  if ($c->LoadInfoByID(1) == true) {
    $c->Content = '12345';
    $c->Save();
  }
```
**删除一条数据**
```php
  $c = new Custom();
  if ($c->LoadInfoByID(2) == true) {
    $c->Del();
  }
```
**查询单条数据**
```php
  $c = new Custom();
  $c->LoadInfoByID(123);
  #LoadInfoByID返回值为false即加载不成功
```
**查询多条数据**
```php
  #查询Custom表下符合2个条件的所有记录
  $w[] = array('=', $zbp->d['Custom']['LogID'][0], 123);//查询条件1，LogID值为123
  $w[] = array('=', $zbp->d['Custom']['Content'][0], 'abc');//查询条件2，Content值为abc
  $sql = $zbp->db->sql->Select($zbp->t['Custom'], array('*'), $w);
  $list = $zbp->GetListType('Custom', $sql);
  #结果$list为一个包含Custom对象的数组
```
***主程序1.7.2版新增的查询方法***

主程序1.7.2在定义Custom类成功后，自动生成了`ZBlogPHP类`下的3个读取加载Custom类的方法，分别是：
- GetCustomList($select = null, $where = null, $order = null, $limit = null, $option = null)
```php
  #查询Custom表下符合2个条件的所有记录
  //本次使用zbp的链式SQL操作组件
  $sql = $zbp->db->sql->get()
                      ->select($zbp->table['Custom'])
                      ->where(array('=', 'cu_Logid', '123'))//查询条件1，LogID为123
                      ->where(array('=', 'cu_Content', 'abc'))//查询条件2，Content值为abc
                      ->orderBy(array('cu_ID' => 'desc'))//排序按ID序号的倒序
                      ->sql;
  $list = $zbp->GetCustomList($sql);
  #如果取不到数据$list就返回一个空array()
```
- GetCustomByID($id)
```php
  #从数据库中读取单个的Custom实例
  $c = $zbp->GetCustomByID(111);
  #读取成功返回实例，不成功返回null
```
- GetCustomByArray($array, $field_name = 'ID')
```php
  #从数据库中查询ID值等于给定数组项目的Custom实例队列
  #如果是查询ID值，$field_name参数可以省略
  $list = $zbp->GetCustomByArray(array(1,3,5,666));
  #返回队列为一个Custom实例的数组（ID分别为1，3，5，666，如果ID存在的话）
```

介绍GetCustomByArray的一个隐藏的复杂用法

```php
  #设有一个posts文章数组，内有3个post实例对象，ID分别为1,2,13
  $posts = array(
    $zbp->GetPostByID(1),
    $zbp->GetPostByID(2),
    $zbp->GetPostByID(13),
  );
  #查询Custom数据表中LogID值等于posts里post实例ID值的Custom实例队列
  $list = $zbp->GetCustomByArray($posts, array('ID','LogID'));
  #返回队列为一个Custom实例的数组，它们的LogID都是1或2或13
```