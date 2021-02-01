# 函数列表

## GetList 函数

通过GetList可以获取自定义的文章列表，如指定分类的最新文章、置顶文章等等

<code php>
$result = GetList(array('count'=>10)) //返回array(Post类型) 或是 空array()
</code>

array参数如下
<code php>
array(
  'count' => 10, //（可省略）
  'cate' => 1, //（可省略）
  'auth' => 2, //（可省略） 
  'date' => '2020-1', //（可省略）
  'tags' => 'abc', //（可省略）
  'search' => 's', //（可省略）
  //以下是原$option参数的key键
  'post_type' => null, //指定查询Post表的类型 （可省略）
  'post_status' => null, //指定查询Post表的状态 （可省略）
  'only_ontop' => false, //指定全是置顶 （可省略）
  'only_not_ontop' => false, //指定全不是置顶 （可省略）
  'has_subcate' => false, //指定包含子孙目录 （可省略）
  'is_related' => false, //指定查询相关文章 （可省略）
  'order_by_metas' => false, //指定按Metas值排序输出结果 （可省略）
  'random' => 5, //指定抽取5篇Post表的记录 （可省略）
  'where_custom' => array(array('=', 'log_Template', '')), //自定义where
  'order_custom' => array('log_ViewNums' => 'DESC', 'log_CommNums' => 'ASC'), //自定义order
)
</code>

## GetPost 函数

通过GetPost 可以获取指定的文章或页面或是其它类型的Post表的数据

<code php>
//返回id为10的Post对象实例，如果没有就返回一个空的Post对象实例
$post = GetPost(array('id'=>10)) //返回object(Post类型)
</code>

array参数如下
<code php>
array(
  'id' => 10, //指定ID（可省略）
  'title' => 'abc', //指定Post标题（可省略）
  'alias' => 'cba', //指定Post别名（可省略） 
  'titleoralias' => 'ddd', //指定Post标题or别名（可省略）
  'idorname' => 'fff', //指定Post的ID或标题or别名（可省略）
  //以下是原$option参数的key键
  'post_type' => null, //指定查询Post表的类型 （可省略）
  'post_status' => null, //指定查询Post表的状态 （可省略）
  'only_article' => false, //指定是查找文章 （可省略）
  'only_page' => false, //指定是查找页面 （可省略）
  'where_custom' => array(array('=', 'log_Template', '')), //自定义where
  'order_custom' => array('log_CommNums' => 'ASC'), //自定义order
)
</code>