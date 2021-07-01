const Redis = require('ioredis');
require('dotenv').config();

let client = null;

module.exports.init = async () => {
  client = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_URL,
    password: process.env.REDIS_PASS,
    lazyConnect: true
  });

  client
    .connect(() => {
      console.info('Redis connected');
    }).catch((err) => {
      console.info('Redis error', err);
      process.exit(1);
    });
};

module.exports.get = async (key) => {
  try {
    return {
      value: await client.get(key),
      ttl: await client.ttl(key)
    };
  } catch (err) {
    return null;
  }
};

module.exports.set = async (key, value) => client.set(key, value);

module.exports.del = async (key) => client.del(key);

module.exports.getAll = async () => {
 try {
   let result = [];
  await client.keys('*', (err, keys) => {
    if (err) {
      console.log(err);
      return null;
    }
    result = keys;
  });
  return result;
 } catch (err) {
  return null;
  }
};