const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect();

function executeSql (sql){
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

module.exports = {
  executeSql
};