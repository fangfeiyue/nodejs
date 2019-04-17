const fs = require('fs');
const path = require('path');

// 两个文件名
const filePath1 = path.resolve(__dirname, 'data.txt');
const filePath2 = path.resolve(__dirname, 'data-back.txt');

// 读取文件的stream对象
const readStream = fs.createReadStream(filePath1);

// 写入文件的stream对象
const writeStream = fs.createWriteStream(filePath2);

// 执行拷贝，通过pipe
readStream.pipe(writeStream);

readStream.on('data', chunk => {
  console.log(chunk.toString());
});

// 数据读取完成
readStream.on('end', () => {
  console.log('拷贝完成');
});


