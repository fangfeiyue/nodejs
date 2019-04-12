const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

let SESSION_DATA = {};

const setCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
};

const parseSession = (userId) => {
  // if (userId){
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   } 
  // } else {
  //   userId = `${Date.now()}_${Math.random()}`;
  //   console.log('userid ', userId);
  //   SESSION_DATA[userId] = {}
  // }
  // return SESSION_DATA[userId];

  if (!SESSION_DATA[userId]) {
    SESSION_DATA[userId] = {};
  }
  return SESSION_DATA[userId];
};

const isSetCookie = (userId) => {
  if (!userId) return true;
  return false;
};

const setCookie = (res, userId) => {
  res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`);
};

const parseCookie = (cookieStr='') => {
  cookie = {};
  cookieStr.split(';').forEach(element => {
    if(!element) return;
    const arr = element.split('=');
    const key = arr[0].trim();
    const value = arr[1].trim();
    cookie[key] = value;
  });

  return cookie;
};

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

  // 解析cookie
  req.cookie = parseCookie(req.headers.cookie);

  // 解析session
  const userId = req.cookie.userid || `${Date.now()}_${Math.random()}`;
  console.log('userId ', req.cookie.userid, `${Date.now()}_${Math.random()}`)
  req.session = parseSession(userId);

  // 处理post data
  // res.end('hello world');
  getPostData(req).then(postData => {
    // blog路由
    req.body = postData;
    
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(data => {
        if (isSetCookie()) setCookie(res, userId);

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
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData));
    //   return;
    // }

    // user路由promise写法
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (isSetCookie()) setCookie(res, userId);

        if (userData){
          res.end(JSON.stringify(userData));
        }
      });
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
