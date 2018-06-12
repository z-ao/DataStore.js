# 数据存储管理库
> 通过本地或内存储存实现,对sessionStorage、localStorage和Map封装,

## dataStore类下有三个对象
1. map(Map实例)
2. storage(localStorage)
3. session(sessionStorage)

## 存储目标
1. map主要存储用户信息的较为隐秘的数据
2. storage主要存储涉及需要本地存储且需要过期时间的数据, 想登录状态
3. session主要存储配置文件

## API
| 方法                  | 描述                                                                         |
|:--------------------:|-----------------------------------------------------------------------------|
|set(key, val, {exp})  |通过key, val储存数据,如果对象是localStorage可以设置exp(type:number)过期时间 单位/s|
|get(key)              |读取key对应的键值|
|has(key)              |返回一个布尔值，表示某个键是否存在|
|delete(key)           |删除某个键|
|clear()               |清除所有成员|
|keys()                |获取所有的键名遍历器|
|values()              |返回所有键值遍历器|
|entries()             |返回所有成员遍历器|