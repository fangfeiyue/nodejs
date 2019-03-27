const { 
  getList,
  newBlog,
  delBlog,
  getDetail,
  updateBlog
} = require('../controller/blog');
const { ErrorModel, SuccessModal } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const id = req.query.id;
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
    const data = newBlog(req.body);
    return new SuccessModal(data);
  }

  // 更新一篇博客
  if (method == 'POST' && path == '/api/blog/update') {
    const data = updateBlog(id, req.body);

    if (data) {
      return new SuccessModal(req.body);
    }else {
      return new ErrorModel('博客更新失败');
    }
  }

  // 删除一篇博客
  if (method == 'POST' && path == '/api/blog/del') {
    const data = delBlog(id);
    if (data) {
      return new SuccessModal(data);
    }else {
      return new ErrorModel('删除博客失败');
    }
  }
};

module.exports = handleBlogRouter;
