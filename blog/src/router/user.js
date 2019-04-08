const { loginCheck } = require('../controller/user');
const { ErrorModel, SuccessModal } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const { method, url } = req;
  const path = url.split('?')[0];

  // 登录
  if (method == 'POST' && path == '/api/user/login') {
    // const data = loginCheck();
    // if (data) {
    //   return new SuccessModal(data);
    // }else {
    //   return new ErrorModel('登录失败');
    // }

    // promise
    const { username, password } = req.body;
    return loginCheck(username, password).then(data => {
      if (data) {
        // 设置cookie httpOnly不允许前端更改cookie
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly`);

        return new SuccessModal(data);
      }else {
        return new ErrorModel('用户登录失败');
      }
    });
  }
  console.log('path',path);
  if (method == 'GET' && path == '/api/user/login-test') {
    const { username } = req.cookie;
    if (username){
      return Promise.resolve(
        new SuccessModal('登录验证成功')
      );
    }
    return Promise.resolve(
      new ErrorModel('登录验证失败')
    );
  }
};

module.exports = handleUserRouter;
