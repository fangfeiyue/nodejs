var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { redisClient } = require('./db/redis');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const env = process.env.NODE_ENV;

if (env != 'production') {
  app.use(logger('dev'));
}else {
  // 如果文件路径不存在的话不会自动创建文件
  const filePath = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(filePath, {
    flags: 'a'
  });
  app.use(logger('combined', {
    stream: writeStream
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// redis
const sessionStore = new RedisStore({
  client: redisClient
});

app.use(session({
  secret: 'sdkk24kjls46l23k?@a3#d$22',
  cookie: {
    // maxAge: 24 * 60 * 60 * 1000
  },
  saveUninitialized: false,
  store: sessionStore
}));

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
