const { getList, getDetail } = require('../controller/blog');
const { ErrorModel, SuccessModal } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const path = url&&url.split('?')[0];

  // 获取博客列表
  if (method == 'GET' && path == "/api/blog/list") {
    const { author, keyword } = req.query;
    const listData = getList(author, keyword);
    return new SuccessModal(listData);
  }

  // 获取博客详情
  if (method == 'GET' && path == '/api/blog/detail') {
    const { id } = req.query;
    const detailData = getDetail(id);
    return new SuccessModal(detailData);
  }

  // 新建一篇博客
  if (method == 'POST' && path == '/api/blog/new') {
    return {
      msg: '这是新建博客的接口'
    };
  }

  // 删除一篇博客
  if (method == 'POST' && path == '/api/blog/del') {
    return {
      msg: '这是删除博客的接口'
    };
  }
};

module.exports = handleBlogRouter;
