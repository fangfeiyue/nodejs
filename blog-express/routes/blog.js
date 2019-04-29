const express = require('express');
const router = express.Router();
const {
  getList,
  delBlog,
  newBlog,
  getDetail,
  updateBlog,
} = require('../controller/blog');
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
router.get('/detail', async function(req, res, nex) {
  const result = await getDetail(req.query.id);
  res.json(
    new SuccessModel(result)
  );
});

module.exports = router;
