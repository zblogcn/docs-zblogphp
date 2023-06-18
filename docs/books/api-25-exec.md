# 本地调用 API

## 本地调用 API  (1.7.3 支持)

1.7.3新增了 `ApiExecute` 函数，可以调用执行 `公共模块` 和 `私有模块` 的 API 并返回结果

函数定义：
```php
/**
 * API 执行.
 *
 * @param string      $mod (模块名)
 * @param string      $act (方法名)
 * @param array       $get (模拟$_GET参数)
 * @param array       $post (模拟$_POST参数)
 */
function ApiExecute($mod, $act, $get = array(), $post = array())
{...}
```

示例：
```php
$post = ApiExecute('post', 'get', array('id' => 2));
var_dump($post);
//调用post模块的get方法，输入GET参数id=2，并返回结果array(文章数据)
```

`ApiExecute` 函数的用处是在访问 API 时也能执行 `ApiExecute` 调用其它的 API，当然也可以在系统的其它地方调用

## 私有模块

`私有模块` 与 `公共模块` 的区别是 `公共模块` 可以被 api.php 路由访问和 `ApiExecute` 函数调用

`私有模块` 只能在系统里被 `ApiExecute` 函数调用，不会被 api.php 路由访问


## 加载和移除私有模块

一次添加指定目录下的私有模块， $modsdir 为私有模块所在目录
```php
ApiLoadPrivateMods($modsdir)
```

单个添加私有模块
```php
ApiAddMod($modname, $filename)
```

单个删除私有模块
```php
ApiRemovePrivateMod($modname)
```

