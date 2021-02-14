# 函数列表

## GetList 函数

通过 GetList 可以获取自定义的文章列表，如指定分类的最新文章、置顶文章等等

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

## GetPost 函数

通过 GetPost 可以获取指定的文章或页面或是其它类型的 Post 表的数据

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
