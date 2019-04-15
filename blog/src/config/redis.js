let REDIS_CONFIG = null;
const env = process.env.NODE_ENV;

if (env == 'development') {
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  };
}

if (env == 'production') {
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  };
}

module.exports = {
  REDIS_CONFIG
};
