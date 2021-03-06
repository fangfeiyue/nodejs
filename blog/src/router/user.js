const { loginCheck } = require('../controller/user');
const { ErrorModel, SuccessModal } = require('../model/resModel');
const { setRedisValue } = require('../db/redis');

const setCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
};

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
    // const { username, password } = req.query;
    return loginCheck(username, password).then(data => {
      if (data.username) {
        // 设置cookie httpOnly不允许前端更改cookie
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${setCookieExpires()}`);
        req.session.username = data.username;
        req.session.realname = data.realname;
        
        setRedisValue(req.sessionId, req.session);

        return new SuccessModal(data);
      }else {
        return new ErrorModel('用户登录失败');
      }
    });
  }

  // if (method == 'GET' && path == '/api/user/login-test') {
  //   // const { username } = req.cookie;
  //   const { username } = req.session;
  //   if (username){
  //     return Promise.resolve(
  //       new SuccessModal({
  //         session: req.session
  //       })
  //     );
  //   }
  //   return Promise.resolve(
  //     new ErrorModel('登录验证失败')
  //   );
  // }
};

module.exports = handleUserRouter;
