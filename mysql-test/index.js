const mysql = require('mysql');

// 创建连接对象
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: 8889,
  database: 'myblog'
});

// 开始连接
connection.connect();

// 执行sql语句
// const sql = 'select * from users';
// const sql = 'update users set realname="历史" where username="lisi"';
const sql = "insert into blogs(title, content, createtime, author) values('标题D', '内容C', 1111111, '你猜')";
connection.query(sql, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});

// 关闭连接
connection.end();

