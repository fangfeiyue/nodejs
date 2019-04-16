const { 
  getList,
  newBlog,
  delBlog,
  getDetail,
  updateBlog
} = require('../controller/blog');
const { ErrorModel, SuccessModal } = require('../model/resModel');

const loginCheck = (req) => {
  const { username } = req.session;
  console.log('username', username);
  if (!username){
    return Promise.resolve(
      new ErrorModel('未登录')
    );
  }
};

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const id = req.query.id;
  const path = url&&url.split('?')[0];

  // 获取博客列表
  if (method == 'GET' && path == "/api/blog/list") {
    let { author, keyword, isAdmin } = req.query;

    if (isAdmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        return loginCheckResult;
      }

      // 强制查询自己的博客
      author = req.session.username;
    }

    return getList(author, keyword).then(listData => {
      return new SuccessModal(listData);
    });

    // const listData = getList(author, keyword);
    // return new SuccessModal(listData);
  }

  // 获取博客详情
  if (method == 'GET' && path == '/api/blog/detail') {
    const { id } = req.query;
    // const detailData = getDetail(id);
    // return new SuccessModal(detailData);

    // const loginCheckResult = loginCheck(req);
    // if (loginCheckResult) {
    //   return loginCheckResult;
    // }

    return getDetail(id).then(data => {
      return new SuccessModal(data);
    });
  }

  // 新建一篇博客
  if (method == 'POST' && path == '/api/blog/new') {
    // const data = newBlog(req.body);
    // return new SuccessModal(data);

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    
    req.body.author = req.session.username;
    console.log('req',req.body)
    return newBlog(req.body).then(data => {
      return new SuccessModal(data);
    });
  }

  // 更新一篇博客
  if (method == 'POST' && path == '/api/blog/update') {
    // const data = updateBlog(id, req.body);

    // if (data) {
    //   return new SuccessModal(req.body);
    // }else {
    //   return new ErrorModel('博客更新失败');
    // }

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    return updateBlog(id, req.body).then(data => {
      return data ? new SuccessModal(data) : new ErrorModel('博客更新失败');
    })
  }

  // 删除一篇博客
  if (method == 'POST' && path == '/api/blog/del') {
    // const data = delBlog(id);
    // if (data) {
    //   return new SuccessModal(data);
    // }else {
    //   return new ErrorModel('删除博客失败');
    // }

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    return delBlog(id, req.session.username).then(data => {
      return data ? new SuccessModal(data) : new ErrorModel('博客删除失败');
    });
  }
};

module.exports = handleBlogRouter;
// https://dev.mysql.com/downloads/workbench