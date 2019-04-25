const crypto = require('crypto');
const SECRET_KEY = 'JLsdkjl?W324fadsfLKJsdfP:E|}345}ad2s4fas1323';

function md5(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

function generatePassword(password) {
  return md5(`password=${password}&key=${SECRET_KEY}`);
}

module.exports = {
  generatePassword
};
