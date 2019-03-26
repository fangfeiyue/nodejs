const fs = require('fs');
const path = require('path');

function getFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, 'files', fileName);

  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(JSON.parse(data.toString()));
  });
}

getFileContent('a.json', aData => {
  console.log(aData);
  getFileContent(aData.next, bData => {
    console.log(bData);
    getFileContent(bData.next, cData => {
      console.log(cData);
    });
  });
});

function getFileContentByPromise(fileName) {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return err;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
}

getFileContentByPromise('a.json').then(aData => {
  console.log(aData);
  return getFileContentByPromise('b.json');
}).then(bData => {
  console.log(bData);
  return getFileContentByPromise('c.json');
}).then(cData => {
  console.log(cData);
});
