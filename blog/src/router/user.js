const { loginCheck } = require('../controller/user');
const { ErrorModel, SuccessModal } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const { method, url } = req;
  console.log(url);
  const path = url.split('?')[0];

  // 登录
  if (method == 'POST' && path == '/api/user/login') {
    const data = loginCheck();
    if (data) {
      return new SuccessModal(data);
    }else {
      return new ErrorModel('登录失败');
    }
  }
};

module.exports = handleUserRouter;
