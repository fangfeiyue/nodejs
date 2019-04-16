const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { setRedisValue, getRedisValue } = require('./src/db/redis');

let SESSION_DATA = {};
let needSetCookie = false;

const parseRedis = (userId) => {
  return getRedisValue(userId).then(res => {
    if (!res) {
      needSetCookie = true;
      setRedisValue(userId, {});
      return {};
    }else {
      needSetCookie = false;
      return res;
    }
  });
};

const setCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
};

const parseSession = (userId) => {
  if (!SESSION_DATA[userId]) {
    needSetCookie = true;
    SESSION_DATA[userId] = {};
  }else {
    needSetCookie = false;
  }
  return SESSION_DATA[userId];
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
  req.sessionId = userId;
  console.log('req.sessionId', req.sessionId);
  
  // 用redis代替了session
  // req.session = parseSession(userId);

  parseRedis(userId).then(sessionData => {
    req.session = sessionData;
    
    return getPostData(req);
  }).

  // req.session = parseRedis(userId);

  // 处理post data
  // res.end('hello world');
  // getPostData(req).
  then(postData => {
    // blog路由
    req.body = postData;
    
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(data => {
        if (needSetCookie) setCookie(res, userId);

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
        if (needSetCookie) setCookie(res, userId);

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
