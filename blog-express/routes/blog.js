const express = require('express');
const router = express.Router();
const {
  getList,
  // delBlog,
  // newBlog,
  // getDetail,
  // updateBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.get('/list', function (req, res, next) {
  let { author, keyword, isAdmin } = req.query;

  // if (isAdmin) {
  //   // 管理员界面
  //   const loginCheckResult = loginCheck(req);
  //   if (loginCheckResult) {
  //     return loginCheckResult;
  //   }

  //   // 强制查询自己的博客
  //   author = req.session.username;
  // }
 
  return getList(author, keyword).then(listData => {
    res.json(
      new SuccessModel(listData)
    );  
  });
});

module.exports = router;
