const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('请求开始。。。', req.method, req.url);
  next();
});

app.use((req, res, next) => {
  // 假设这里处理cookie
  req.cookie = {
    userId = '123'
  };

  next();
});

app.use((req, res, next) => {
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    };
    next();
  }, 2000);
});

app.use('/api', (req, res, next) => {
  console.log('处理api路由');
  next();
});

app.get('/api', (req, res, next) => {
  console.log('get api 路由');
  next();
});

app.post('/api', (req, res, next) => {
  console.log('post /api 路由');
  next();
});

const loginCheck = (req, res, next) => {
  setTimeout(() => {
    console.log('模拟登陆失败');
    res.json({
      error: -1,
      msg: '登陆失败'
    });
  });
};

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie');
  res.json({
    errno: 0,
    data: req.cookie
  });
});

app.post('/api/get-post-data', (req, res, next) => {
  console.log('post /api/get-post-data');
  res.json({
    errno: 0,
    data: req.body
  });
});

app.use((req, res, next) => {
  console.log('处理404');
  res.json({
    errno: -1,
    msg: '404 not found'
  });
});

app.listen(3000, () => console.log('3000 port'));

