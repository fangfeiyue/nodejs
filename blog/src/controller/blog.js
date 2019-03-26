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

module.exports = {
  getList,
  getDetail
};
