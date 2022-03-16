# 链式 SQL 操作

**仅页面内容仅适用于「1.7 及更高版本」！**

-----------


## 基本概念

演示一：

```php
// 使用链式语法生成 SQL 语句
$sql = $zbp->db->sql->get()
                    ->select($zbp->table['Post'])
                    ->where(array('=', 'log_ID', "1"))
                    ->sql;
// 执行 SQL 语句并返回结果
$array = $zbp->db->Query($sql);
print_r($array);
```

演示二：

```php
// 链式读法中直接返回查询结果
$array = $zbp->db->sql->get()
                      ->select('zbp_comment')
                      ->count(array('comm_ID'=>'num'))
                      ->query;
print_r($array);
```

演示三：

对于以下方法或函数，其`$select`或者`$sql`参数均可以代入「sql 链式对象」：

- `$zbp->GetPostList()`、`$zbp->GetCommentList()`、`$zbp->GetTagList()`等，其第一个参数为`$select`；
- `$zbp->GetListType()`、`$zbp->GetListOrigin()`；

```php
#先定义一个sql链对象，再获取结果
$posts = $zbp->GetPostList(
             $zbp->db->sql->get()->select($zbp->table['Post'])->where('=','log_CateID',1)
                          );
```

-----------


## SQL SELECT

一、**使用 select 指令**

```php
// 取category表所有的数据
$sql = $zbp->db->sql->get()->select('zbp_category')->sql;
$array = $zbp->GetListType('Category', $sql);
// 遍历数据输出等
foreach ($array as $a) {
    ...
}
```

SQL 语句输出：

```sql
SELECT * FROM zbp_category
```

二、**使用 selectany 和 from 指令组合**

```php
//取category表的ID字段数组
$sql = $zbp->db->sql->get()->selectany('cate_ID')->from('zbp_category')->sql;
$array = $zbp->db->query($sql);
```

SQL 语句输出：

```sql
SELECT cate_ID FROM zbp_category
```

-----------


## SQL WHERE 子句

取 ID 为 1 的文章

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(array('=', 'log_ID', "1"))
                           ->sql;
$articles = GetListType('Post', $sql);

// where(array('=', 'log_ID', "1")) = 可以换成<>,LIKE,>=,<= 等等
```

SQL 语句输出：

```sql
SELECT * FROM zbp_post WHERE log_ID = '1'
```

**重要：如果非要在`where`中拼接字符串请一定用`addslashes`转义单引号：**

```php
where('​log_Title LIKE \'%' . addslashes('字符串') . '%\'')
```

--------------------------------


### AND 运算符

连续调用`where()`方法即可实现`AND`查询：

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(array('=', 'log_Status', "1"))
                           ->where(array('=', 'log_Type', "0"))
                           ->sql;
$articles = GetListType('Post', $sql);
```

```sql
SELECT * FROM zbp_post WHERE log_Status = '1' AND log_Type = '0'
```

```php
// where 还可以先定义一个数组
$w = array();
$w[] = array('=', 'log_Type' ,'0');
$w[] = array('=', 'log_AuthorID' ,'1');
$w[] = array('=', 'log_CateID' ,'2');
// 作为参数使用
->where($w)
```

### OR 运算符

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(
                               array('or',
                                   array(
                                       array('log_ID', '1'),
                                       array('log_Title', '2'),
                                   ),
                               )
                           )
                           ->sql;
// 注意，此处的条件也可以写为->where('or',array('=', 'log_ID', '1'),array('=', 'log_Title', '2'))
```

```sql
SELECT * FROM zbp_post WHERE ((1 = 1) AND ( log_ID = '1' OR log_Title = '2' ) )
```

非缺省操作符：

```php
// 缺省操作符为 = ，也可使用其他操作符
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(
                               array('or',
                                   array(
                                       array('<>', 'log_ID', '1'),
                                       array('LIKE', 'log_Title', '2'),
                                   ),
                               )
                           )
                           ->sql;
```

```sql
SELECT * FROM zbp_post WHERE ((1 = 1) AND ( log_ID <> '1' OR log_Title LIKE '2' ) )
```

### LIKE 操作符

一般用于搜索中，`search`和`like`的区别就是`search`会自动在字符两边加上`%`

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(array('search', 'log_Title', "Test"))
                           ->sql;
```

```sql
SELECT * FROM zbp_post WHERE ((1 = 1) AND ( (log_Title LIKE '%Test%') ) )
```

### IN 操作符

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(array('IN', 'log_ID', array(1, 2, 3, 4)))
                           ->sql
```

```sql
SELECT * FROM zbp_post WHERE ((1 = 1) AND (log_ID IN ( '1' , '2' , '3' , '4' ) ) )
```

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(array('NOT IN', 'log_ID', '(1, 2, 3)'))
                           ->sql
```

```sql
SELECT * FROM zbp_post WHERE (log_ID NOT IN (1, 2, 3))
```

### BETWEEN 操作符

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(array('between', 'log_ID', "1", "3"))
                           ->sql
```

```sql
SELECT * FROM zbp_post WHERE (log_ID BETWEEN '1' AND '3')
```

### EXISTS 和 NOT EXISTS 操作符

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                ->where(array('exists', 'SELECT 1'))
                ->sql;
```

```sql
SELECT * FROM zbp_post WHERE EXISTS ( SELECT 1 )
```

### SQL 通配符

可用通配符：`%`、`_`、`[charlist]`、`[^charlist]`、`[!charlist]`

<!-- 后边的是正则么？ -->

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where(array('like', 'log_Title', "_aidu"))
                           ->sql;
```

```sql
SELECT * FROM zbp_post WHERE ((1 = 1) AND ( (log_Title LIKE '_aidu') ) )
```

-----------


## SELECT LIMIT

如果只给定一个参数，它表示返回最大的记录行数目，LIMIT n 等价于 LIMIT 0,n。

```php
$sql = $zbp->db->sql->get()->select($zbp->table['Post'])
                           ->limit(5)
                           ->sql;
```

```sql
SELECT * FROM zbp_post LIMIT 5
// 等于
SELECT * FROM zbp_post LIMIT 5 OFFSET 0
```

检索记录行从第 6 行开始，返回最多 10 行

```php
$sql = $zbp->db->sql->get()->select($zbp->table['Post'])
                           ->limit(5, 10)
                           ->sql;
```

```sql
SELECT * FROM zbp_post LIMIT 10 OFFSET 5
```

-----------


## SELECT DISTINCT

关键词 DISTINCT 用于返回唯一不同的值。

```php
$sql = $zbp->db->sql->get()->select($zbp->table['Post'])
                           ->distinct(array('log_Title'=>'t'), 'log_ID')
                           ->sql;
```

```sql
SELECT DISTINCT log_Title AS t,log_ID FROM zbp_post
```

-----------


## SQL ORDER BY

ORDER BY 语句用于根据指定的列对结果集进行排序。ORDER BY 语句默认按照升序对记录进行排序：

```php
$sql = $zbp->db->sql->get()->select($zbp->table['Post'])
                           ->orderBy(array('log_PostTime' => 'desc'), array('log_ID' => 'asc'))
                           ->sql;
```

```sql
SELECT * FROM zbp_post ORDER BY log_PostTime DESC, log_ID ASC
```

-----------


## SQL GROUP BY 语句

取出每一个作者的所有文章的总评论数：

```php
$sql = $zbp->db->sql->get()->select($zbp->table['Post'])
                           ->sum('log_CommNums')
                           ->groupBy('log_AuthorID')
                           ->sql;
```

```sql
SELECT SUM(log_CommNums) FROM zbp_post GROUP BY log_AuthorID
```

-----------


## SQL HAVING 子句

在 SQL 中增加 HAVING 子句原因是，WHERE 关键字无法与合计函数一起使用；

以下示例为取出分类下文章评论总数大于 100 的所有的分类：

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->column('log_CateID')
                           ->column('SUM(log_CommNums)')
                           ->groupby('log_CateID')
                           ->having(array('>', 'SUM(log_CommNums)', '100'))
                           ->sql;
```

```sql
SELECT log_CateID,SUM(log_CommNums) FROM zbp_post GROUP BY log_CateID HAVING SUM(log_CommNums) > 100
```

-----------


## SQL JOIN 连接(LEFT JOIN RIGHT JOIN,FULL JOIN,INNER JOIN)

```php
$sql = $zbp->db->sql->get()->selectany('log_ID')
                           ->from(array($zbp->table['Post']=>'p'))
                           ->leftjoin(array('zbp_postrelation'=>'pr'))
                           ->on('p.log_ID = pr.pr_PostID')
                           ->where('1 = 1')
                           ->sql;

// 这里只举例了 LEFT JOIN 联表查询，还分别给 2 个表分别设了别名
```

```sql
SELECT log_ID
FROM zbp_post AS p
LEFT JOIN zbp_postrelation AS pr
    ON p.log_ID = pr.pr_PostID
WHERE 1 = 1
```

```php
// 如果要在 Mysql 下使用 STRAIGHT_JOIN，请在链式 sql 加入 option 参数，
->option(array('straight_join' => true))
```

-----------


## UNION, UNION ALL 操作符

当使用 UNION 时，MySQL 会把结果集中重复的记录删掉，而使用 UNION ALL ，MySQL 会把所有的记录返回，且效率高于 UNION。

```php
$sql = $zbp->db->sql->get()->union(
                              $zbp->db->sql->get()->select('zbp_table')->sql,
                              $zbp->db->sql->get()->select('zbp_table2')->sql
                           )
                           ->sql;
```

```sql
SELECT * FROM zbp_table UNION SELECT * FROM zbp_table2
```

-----------


## SQL 别名

这是一个使用表别名和字段别名的例子：

```php
$sql = $zbp->db->sql->get()->select(array($zbp->table['Post']=>'p'))
                           ->column(array('log_ID'=>'id'))
                           ->column('log_Type AS type')
                           ->sql;
```

```sql
SELECT log_ID AS id,log_Type AS type FROM zbp_post AS p
```

-----------


## USEINDEX FORCEINDEX IGNOREINDEX

**注：本指令是 mysql 专用的，分别是使用索引，强制使用索引，跳过索引**

```php
$sql = $zbp->db->sql->get()->select($zbp->table['Post'])
                           ->useindex('zbp_log_TPISC', 'zbp_log_VTSC')
                           ->sql;
```

```sql
SELECT * FROM zbp_post USE INDEX ( zbp_log_TPISC ,zbp_log_VTSC )
```

-----------


## SQL INSERT INTO 语句

```php
$sql = $zbp->db->sql->get()->insert($zbp->table['Post'])
                           ->data(array('log_Title' => 'test','log_Type' => '0'))
                           ->sql;
```

```sql
INSERT INTO zbp_post (log_Title,log_Type) VALUES ( 'test' , '0' )
```

-----------


## SQL UPDATE 语句

```php
$sql = $zbp->db->sql->get()->update($zbp->table['Post'])
                           ->where('=', 'log_ID', 1)
                           ->data(array('log_Title' => 'test','log_Type' => '1'))
                           ->sql;
```

```sql
UPDATE zbp_post SET log_Title = 'test', log_Type = '1' WHERE log_ID = '1'
```

-----------


## SQL DELETE 语句

```php
$sql = $zbp->db->sql->get()->delete($zbp->table['Post'])
                           ->where('=', 'log_ID', 1)
                           ->sql;
```

```sql
DELETE FROM zbp_post WHERE log_ID = '1'
```

-----------


## CREATE 数据库，表，索引

### CREATE DATABASE

可以在 mysql 和 pgsql 下创建数据库：

```php
$sql = $zbp->db->sql->get()->create()->database('zbp')->ifnotexists()->sql;
```

```sql
CREATE DATABASE IF NOT EXISTS zbp
```

### CREATE TABLE

这里的例子只是 sql 链用法的展示，实际上我们已经把 sql 链的方法包装好了，用$zbp->db->CreateTable 方法会更便捷。

创建一个表，先定义数据结构：

```php
$tableData = array(
    'a' => array('a', 'integer', '', 0, '主ID'),
    'i' => array('i', 'boolean', '', false),
    'k' => array('k', 'string', 250, ''),
    'o' => array('o', 'string', 'longtext', '', '备注为某字段'),
    'r' => array('r', 'float', '', ''),
);
$sql = $zbp->db->sql->get()->create('zbp_table')
                            ->data($tableData)
                            ->option(array('engine' => 'InnoDB'))
                            ->option(array('charset' => 'utf8mb4'))
                            ->option(array('collate' => 'utf8mb4_general_ci'))
                            ->sql;
$zbp->db->query($sql);
echo $sql;
```

SQL 语句输出：

```sql
CREATE TABLE IF NOT EXISTS zbp_table ( a int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID', i tinyint(1) NOT NULL DEFAULT '0', k varchar(250) NOT NULL DEFAULT '', o longtext NOT NULL COMMENT '备注为某字段', r float NOT NULL DEFAULT 0, PRIMARY KEY (a) ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1
```

**备注：可以指定表的引擎和字符集，如果不指定则从 option 文件读取系统的配置**

### CREATE INDEX

```php
$sql = $zbp->db->sql->get()->create($zbp->table['Post'])
  ->index(
    array('zbp_post_index_stt'=>array('log_Status','log_Type','log_Tag'))
  )
  ->sql;
```

```sql
CREATE INDEX zbp_post_index_stt ON zbp_post ( log_Status , log_Type , log_Tag )
```

-----------


## DROP 数据库，表，索引

### DROP DATABASE

```php
$sql = $zbp->db->sql->get()->drop()->database('zbp')->sql;
```

```sql
DROP DATABASE zbp
```

### DROP TABLE

```php
$sql = $zbp->db->sql->get()->drop()->table('zbp_table2')->ifexists()->sql;
```

```sql
DROP TABLE IF EXISTS zbp_table2
```

### DROP INDEX

```php
$sql = $zbp->db->sql->get()->drop('zbp_table')->index('zbp_table_id')->sql;
```

```sql
DROP INDEX zbp_table_id ON zbp_table
```

-----------


## ALTER 修改 添加 字段

### 添加字段

```php
$sql = $zbp->db->sql->get()->ALTER("zbp_post")
->ADDCOLUMN('log_IsHide integer NOT NULL DEFAULT \'0\'')
->ADDCOLUMN('log_CreateTime', 'integer NOT NULL DEFAULT \'0\'')
->ADDCOLUMN('log_Note', 'text', 'NOT NULL')
->sql;
// ADDCOLUMN 内的参数可以写成一个，也可以写成多个
```

```sql
ALTER TABLE zbp_post ADD COLUMN log_IsHide integer NOT NULL DEFAULT '0' ,ADD COLUMN log_CreateTime integer NOT NULL DEFAULT '0' ,ADD COLUMN log_Note text NOT NULL
```

### 修改字段

**注：只有 mysql 和 pgsql 支持，sqlite 不能修改字段；**

```php
$sql = $zbp->db->sql->get()->ALTER("zbp_post")
->ALTERCOLUMN('log_IsHide INTEGER NOT NULL DEFAULT \'0\'')
->sql;
```

```sql
# mysql 生成
ALTER TABLE zbp_post MODIFY log_IsHide INTEGER NOT NULL DEFAULT '0'
# pgsql 生成
ALTER TABLE zbp_post ALTER COLUMN log_IsHide INTEGER NOT NULL DEFAULT '0'
```

### 删除字段

```php
$sql = $zbp->db->sql->get()->ALTER("zbp_post")
->DROPCOLUMN('log_IsHide')
->DROPCOLUMN('log_CreateTime')
->DROPCOLUMN('log_Note')
->sql;
```

```sql
ALTER TABLE zbp_post DROP COLUMN log_IsHide ,DROP COLUMN log_CreateTime ,DROP COLUMN log_Note
```

-----------


## SQL 统计函数 AVG,COUNT,MIN,MAX,SUM

在这里我们仅以 COUNT 做为例子，取出每一个作者的文章总数并分组显示：

```php
$sql = $zbp->db->sql->get()->select($zbp->table['Post'])
                           ->column('log_AuthorID')
                           ->count('log_ID')
                           ->where(array('=', 'log_Type' ,'0'))
                           ->groupBy('log_AuthorID')
                           ->sql;
```

```sql
SELECT log_AuthorID, COUNT(log_ID) FROM zbp_post WHERE log_Type = '0' GROUP BY log_AuthorID
```

-----------


## SQL 随机取记录

1.7 里新增了随机读取的功能，同时支持三种数据库

这里举例随机取 5 篇文章：

```php
$sql = $zbp->db->sql->get()->select("zbp_post")
                           ->where('=','log_Type',0)
                           ->random(5)
                           ->sql;
```

```sql
-- mysql 生成的 sql
SELECT *
FROM zbp_post
WHERE log_Type = '0'
        AND log_ID >=
    (SELECT FLOOR( RAND() * (
        (SELECT MAX(log_ID)
        FROM `zbp_post`)-
            (SELECT MIN(log_ID)
            FROM `zbp_post`)) +
                (SELECT MIN(log_ID)
                FROM `zbp_post`))) LIMIT 5

-- pgsql 和 sqlite 生成的 sql
SELECT * FROM zbp_post WHERE log_Type = '0' ORDER BY Random() LIMIT 5
```

使用 GetList 函数随机获取文章的方法：

```php
GetList(null,null,null,null,null,null,array('random'=>5));

// 1.7 以更高版本的GetList加以改进了
GetList(array('random'=>4,'cate'=>1)); // 获取分类1下的随机4篇文章
```

-----------


## SQL 事务处理

- BEGIN 开始一个事务
- ROLLBACK 事务回滚
- COMMIT 事务确认

```php
// 开始一个事务
$zbp->db->sql->get()->transaction('begin')->query;
// 中间sql处理
// 提交事务
$zbp->db->sql->get()->transaction('commit')->query;
```

```sql
BEGIN;
COMMIT;
```
