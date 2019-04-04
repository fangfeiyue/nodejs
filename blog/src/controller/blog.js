const { executeSql } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }
  
  sql += 'order by createtime desc';
  

  console.log(sql)

  return executeSql(sql);
};

const getDetail = (id) => {
  return {
    id: 1,
    title: 'a',
    createTime: 12121212,
    author: 'zhang'
  };
};

const newBlog = (blogData = {})=> {
  return {
    id: 4
  };
};

const updateBlog = (id, blogData = {}) => {
  console.log('update ....', id, blogData);
  return true;
};

const delBlog = (id) => {
  return true;
};

module.exports = {
  getList,
  delBlog,
  newBlog,
  getDetail,
  updateBlog
};
