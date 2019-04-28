const mysql      = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');
const connection = mysql.createConnection(MYSQL_CONFIG);
 
connection.connect();

function executeSql(sql) {
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
  executeSql,
  escape: mysql.escape
};
