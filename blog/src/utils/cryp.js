const crypto = require('crypto');

const SECRET_KEY = 'wJLJKe2lk2JLJ34334lk2hg2i4p';

function md5 (content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

function generatePassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

module.exports = {
  generatePassword
};
