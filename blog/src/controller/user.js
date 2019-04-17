const { executeSql, escape } = require('../db/mysql');

const loginCheck = (userName='zhangsan', password='123') => {
  // if (userName == 'zhangsan' && password == '123') {
  //   return true;
  // }

  // return false;

  userName = escape(userName);
  password = escape(password);

  const sql = `select username, realname from users where username=${userName} and password=${password}`;
  
  console.log(sql)

  return executeSql(sql).then(data => {
    return data[0] || {};
  });
};

module.exports = {
  loginCheck
};
