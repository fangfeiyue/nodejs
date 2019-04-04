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

  return executeSql(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id=${id}`;
  return executeSql(sql).then(rows => {
    return rows[0];
  });
};

const newBlog = (blogData = {})=> {
  const { title, content, author } = blogData;
  const createTime = Date.now();
  const sql = `
    insert into blogs (title, content, author, createTime) values('${title}', '${content}', '${author}', ${createTime})
  `;
  return executeSql(sql).then(insertData => {
    return {
      id: insertData.insertId
    };
  });
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
