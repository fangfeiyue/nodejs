const xss = require('xss');
const { executeSql } =  require('../db/mysql');

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;

  if (author) sql += `and author='${author}' `;
  if (keyword) sql += `and title like '%${keyword}%'`;
  
  sql += 'order by createtime desc';
  
  return await executeSql(sql);
};

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return (await executeSql(sql))[0];
};

const newBlog = async (blogData = {}) => {
  const { author } = blogData;
  const createTime = Date.now();
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const sql = `insert into blogs(title, content, author, createTime) values('${title}', '${content}', '${author}', ${createTime})`;

  return {
    id: (await executeSql(sql)).insertId
  };
};

const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `update blogs set title='${title}', content='${content}' where id='${id}'`;
  return (await executeSql(sql)).affectedRows > 0 ? true : false;
};

const delBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and autor='${author}'`;
  return (await executeSql(sql)).affectedRows > 0 ? true : false;
};

module.exports = {
  getList,
  delBlog,
  newBlog,
  getDetail,
  updateBlog
};