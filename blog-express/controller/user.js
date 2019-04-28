const { executeSql, escape } = require('../db/mysql');
const { generatePassword }=  require('../utils/cryp');

const loginCheck = (userName, password) => {
  const sql = `select username, realname from users where username=${escape(userName)} and password='${generatePassword(escape(password))}'`;
  
  return executeSql(sql).then(loginData => {
    return loginData[0] || {};
  })
};

module.exports = {
  loginCheck
};

