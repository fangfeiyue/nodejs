const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    let postData = '';
    if (req.method != 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    req.on('data', chunk => {
      postData += chunk.toString();
    });

    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  // 解析query
  req.query = querystring.parse(req.url.split('?')[1]);
  // 处理post data
  // res.end('hello world');
  getPostData(req).then(postData => {
    // blog路由
    req.body = postData;
    
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(data => {
        res.end(JSON.stringify(data));
      });
      return;
    }
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }

    // user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }

    // 未命中路由，返回404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  }).catch(err => {
    console.log(err);
  });
};
module.exports = serverHandle;
