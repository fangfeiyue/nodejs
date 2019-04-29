const redis = require("redis"),
      { REDIS_CONFIG } = require('../db/redis');
      redisClient = redis.createClient(REDIS_CONFIG);

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

function setRedisValue(key, value) {
  if (typeof value == 'object') value = JSON.stringify(value);
  redisClient.set(key, value, redis.print);
}

function getRedisValue(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err);
        return;
      }

      if (value == null) {
        reject(null);
        return;
      }

      try {
        resolve(JSON.parse(value));
      }catch(err) {
        reject(value);
      }
    });
  });
}

module.exports = {
  redisClient,
  getRedisValue,
  setRedisValue
};

