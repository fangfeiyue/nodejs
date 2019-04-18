const fs = require('fs');
const path = require('path');

const readFile = (fileName) => {
  const filePath = path.resolve(__dirname, './files', fileName);
  console.log(filePath);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};

// readFile('a.json').then(res => readFile(res.next)).then(res => readFile(res.next));

const asynReadFile = async function () {
  try {
    const rs1 = await readFile('a.json');
    console.log(rs1);
    const rs2 = await readFile(rs1.next);
    console.log(rs2);
    const rs3 = await readFile(rs2.next);
    console.log(rs3);
    console.log('4');
  } catch (err) {
    console.log('捕获错误异常', err);
  }
};

asynReadFile();

/**
 asyn await要点
 1.await后面可以追加promise对象，获取resolve的值
 2.await必须包裹在async函数里面
 3.async函数执行返回的也是一个promise对象
 4.try-catch截获promise中reject的值
 */
