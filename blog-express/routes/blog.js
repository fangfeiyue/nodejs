const express = require('express');
const router = express.Router();
const {
  getList,
  delBlog,
  newBlog,
  getDetail,
  updateBlog,
} = require('../controller/blog');
const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.get('/list', function (req, res, next) {
  let { author, keyword, isAdmin } = req.query;

  if (isAdmin) {
    // 管理员界面
    if (req.session.username == null) {
      res.json(
        new ErrorModel('未登录')
      );
      return;
    }

    // 强制查询自己的博客
    author = req.session.username;
  }
 
  return getList(author, keyword).then(listData => {
    res.json(
      new SuccessModel(listData)
    );  
  });
});

// 博客详情
router.get('/detail', async function(req, res, next) {
  res.json(
    new SuccessModel(await getDetail(req.query.id))
  );
});

// 新建博客
router.post('/new', loginCheck, async function(req, res, next) {
  req.body.author = req.session.username;
  res.json(
    new SuccessModel(await newBlog(req.body))
  )
});

// 更新博客
router.post('/update', loginCheck, async (req, res, next) => {
  return await updateBlog(req.query.id, req.body) ? res.json(new SuccessModel('更新成功')) : res.json(new ErrorModel('更新博客失败'));
});

// 删除博客
router.post('/del', loginCheck, async function(req, res, next) {

})

module.exports = router;
