const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'data.txt');

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log(err);
    return err;
  }

  console.log(data.toString());
});

fs.writeFile(filePath, '生死有命富贵在天', { flag: 'a'}, err => {
  if (err) {
    console.log(err);
    return;
  }
});

// 判断文件是否存在
fs.exists(filePath, err => {
  console.log(err ? '存在' : '不存在');
})
