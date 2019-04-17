const fs = require('fs');
const path = require('path');

function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

function createWriteStream(fileName) {
  const fullFilePath = path.resolve(__dirname, '../../logs', fileName);
  const writeStream = fs.createWriteStream(fullFilePath, {flags: 'a'});
  return writeStream;
}

function writeAcessLog(log) {
  writeLog(createWriteStream('access.log'), log);
}

module.exports = {
  writeAcessLog
};
