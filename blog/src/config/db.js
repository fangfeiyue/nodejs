const env = process.env.NODE_ENV;

let MYSQL_CONFIG = null;

if (env == 'dev') {
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'myblog'
  };
}

if (env == 'production') {
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'myblog'
  };
}

module.exports = {
  MYSQL_CONFIG
};