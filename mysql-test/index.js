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
const sql = 'select * from users';
connection.query(sql, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('res====>>>', res);
});

// 关闭连接
connection.end();

