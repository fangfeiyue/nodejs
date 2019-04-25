const mysql      = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect(MYSQL_CONFIG);

function executeSql(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (error) {
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
