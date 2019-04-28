const express = require('express');
const router = express.Router();
const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;
  // loginCheck(username, password).then(loginResult => {
  //   if (loginResult.username) {
  //     req.session.username = loginResult.username;
  //     req.session.realname = loginResult.realname;
  //     res.json(
  //       new SuccessModel(loginResult)
  //     );
  //     return;
  //   }
  //   res.json(
  //     new ErrorModel('登录失败')
  //   );
  // });

  const data = await loginCheck(username, password);
  if (data.username) {
    req.session.username = data.username;
    req.session.realname = data.realname;
    res.json(
      new SuccessModel(data)
    );
    return;
  }
  res.json(
    new ErrorModel('登录失败')
  );
});

router.get('/login-test', function (req, res, next) {
  if (req.session.username) {
    res.json({
      err: 0,
      msg: '登录测试成功' + req.session.username
    });
    return;
  }

  res.json({
    err: -1,
    msg: '登录测试失败'
  });
});

module.exports = router;
