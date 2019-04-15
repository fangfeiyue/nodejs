const redis = require('redis');
const { REDIS_CONFIG } = require('../config/redis');

const client = redis.createClient(REDIS_CONFIG);
client.on('error', err => {
  console.log('error', err);
});

function setRedisValue(key, value) {
  if (typeof value == 'object') value = JSON.stringify(value);

  client.set(key, value, redis.print);
}

function getRedisValue(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        reject();
        return;
      }

      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(value));
      }catch (err) {
        resolve(value);
      }
    });
  });
}

module.exports = {
  setRedisValue,
  getRedisValue
};
