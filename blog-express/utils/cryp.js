const crypto = require('crypto');
const SECRET_KEY = 'wJLJKe2lk2JLJ34334lk2hg2i4p';

function md5(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

function generatePassword(password) {
  return md5(`password=${password}&key=${SECRET_KEY}`);
}

module.exports = {
  generatePassword
};
