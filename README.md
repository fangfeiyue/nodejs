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




