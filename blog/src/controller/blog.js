const getList = (author, keyword) => {
  return [{
    id: 1,
    title: 'a',
    createTime: 12121212,
    author: 'zhang'
  }, {
    id: 2,
    title: 'a',
    createTime: 12121212,
    author: 'zhang'
  }];
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
    id: 3
  };
};

module.exports = {
  getList,
  getDetail,
  newBlog,
};
