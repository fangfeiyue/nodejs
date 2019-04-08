const { executeSql } = require('../db/mysql');

const loginCheck = (userName='zhangsan', password='123') => {
  // if (userName == 'zhangsan' && password == '123') {
  //   return true;
  // }
  
  // return false;

  const sql = `select username, realname from users where username='${userName}' and password='${password}'`;
  return executeSql(sql).then(data => {
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  loginCheck
};
