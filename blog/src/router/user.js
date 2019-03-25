const handleUserRouter = (req, res) => {
  const { method, url } = req;
  console.log(url);
  const path = url.split('?')[0];

  // 登录
  if (method == 'POST' && path == '/api/user/login') {
    return {
      msg: '这是登录接口'
    };
  }
};

module.exports = handleUserRouter;
