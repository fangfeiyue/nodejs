const fs = require('fs');
const path = require('path');
const readLine = require('readline');

const filePath = path.resolve(__dirname, '../../logs/access.log');
const readStream = fs.createReadStream(filePath);
const readline = readLine.createInterface({
  input: readStream
})

let totalNum = 0;
let chromeNum = 0;

readline.on('line', lineData => {
  if (!lineData) return;

  totalNum++;
  
  if (lineData.split(' -- ')[2].includes('Chrome')) chromeNum++;
});

readline.on('close', (err, data) => {
  console.log('Chrome占比为', (chromeNum / totalNum * 100).toFixed(2) + '%');
});
