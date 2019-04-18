# nodejs
nodejs学习总结

Nodejs是一个js的运行环境

运行在服务器做为web server

运行在本地做为打包、构建工具

## nodejs和js的区别

### ECMAScript

定义了语法，写js和nodejs都必须遵守

变量定义、循环、判断、函数

原型和原型链、作用域和闭包、异步

不能操作DOM，不能监听click事件，不能发送ajax请求

不能处理http请求，不能操作文件，只有ECMAScript，几乎做不了任何实际的项目

### js

使用ECMAScript语法规范，外加Web API,缺一不可

DOM操作，BOM操作，事件绑定，Ajax等

两者结合，即可以完成浏览器端的任何操作

### nodejs

使用ECMAScript语法规范，外加nodejs API，缺一不可，处理http，处理文件等，两者结合可以玩昵称server端的操作。

## server端和前端的区别

server端可能会遭受各种恶意攻击和误操作，单个客户端可以意外挂掉，但是服务端不能。使用PM2做进程守候

客户端独占一个浏览器，内存和CPU都不是问题，server端要承载很多请求，CPU和内存都是稀缺资源，使用stream写日志，使用redis存session

前端也会参与写日志，但只是日志的发起方，不关心后续，server端要记录日志、存储日志、分析日志、前端不关心

server端要随时准备接受各种恶意攻击，前端则少很多，如：越权操作、数据库攻击等，登录验证，预防xss攻击和sql注入

产品发展速度快，流量可能会迅速增减，可以通过机器和服务拆分来承载大流量，集群和服务拆分

## http概述

DNS解析，建立TCP连接，发送http请求

server接收到http请求处理并返回

客户端接收到返回数据，处理数据（如渲染页面，执行js）

## 数据库的基本操作

show tables;
insert into users(username,`password`, realname) values('lisi', '123', '李四');
select * from users;
select id, username from users;
select * from users where username='zhangsan';
select * from users where username='zhangsan' and `password`='123';
select * from users where username='zhangsan' or `password`='123';
select * from users where username like '%zhang%';
select * from users where `password` like '%1%' order by id;
select * from users where `password` like '%1%' order by id desc;

update users set realname='李四2' where username='lisi';更新内容时报错，错误信息如下：

```
update users set realname='李四2' where username='lisi'	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.0020 sec
```
解决办法，执行如下语句SET SQL_SAFE_UPDATES=0;

删除某条数据
delete from users where username='lisi'


软删除


查询版本
select version();

### Cookie

存储在浏览器的一段字符串最大5kb

跨域不共享

格式如k1=v1因此可以存储结构化数据

每次发送http请求，会将请求域的cookie一起发送给server

sever可以修改cookie并返回给浏览器

浏览器中可以通过js修改cookie，有限制

### js操作cookie

查看
document.cookie获取cookie

修改

document.cookie='k1=100';

注意只能累加

httpOnly禁止前端修改cookie

## 从session到redis

1.进程内存有限，访问量国大，内存暴增怎么办？

2.正式线上运行是多进程，进程之间内存无法共享

cookie、session的区别：

1.cookie数据存放在客户的浏览器上，session数据放在服务器上。

2.cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗 考虑到安全应当使用session。

3.session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用COOKIE。

4.单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

5.所以建议：将登陆信息等重要信息存放为session、其他信息如果需要保留，可以放在cookie中


redis

webserver最常用的缓存数据库，数据存放在内存中

相比mysql访问速度快

但是成本更高，可存储的数据量更小

将webserver和redis拆分为两个单独的服务

双方都是独立的，都是可以扩展的，例如都扩展成集群

为什么session适用于redis？

session访问频繁，对性能要求极高

session可不考虑断电丢失数据的问题

sesssion数据量不会太大

安装

```
brew install redis
```

启动
```
redis-server
redis-cli
```

### nodejs连接redis

`npm i redis -S`

```
// index.js

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

client.set('myName', 'FangFeiyue', redis.print);
client.get('myName', (err, val) => {
  if (err) {
    console.log(err)
    return;
  }

  console.log('val', val);
  
  client.quit();
});
```

node index.js

### ngix

高性能的web服务器，开源免费

一般用于做静态服务、负载均衡

反向代理

简单使用

测试配置文件格式是否正确 `ngix -t`

启动nginx  `nginx`

重启nginx `nginx -s reload`

停止nginx `nginx -s stop`


mac下nginx路径/usr/local/etc/nginx/nginx.conf

## 日志

访问日志 - access log

自定义日志（包括自定义事件、错误记录等）

日志要存储到文件中？为何不存储到mysql中，为何不存储到redis中？

使用crontab拆分日志文件

## 安全

### sql注入

例子：登录sql注入

zhangsan' -- 

zhangsan';delete from users; -- 


mysql.escape(zhangsan' --  );

### xss攻击

攻击方式：在页面展示内容中掺杂js代码，以获取网页信息

预防措施：转换生成js的特殊字符

```
npm i xss -S

const xss = reqiure('xss');

const inputContent = xss(inputData);
```

### 密码加密

