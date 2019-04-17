const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method == 'GET') {
    const filePath = path.resolve(__dirname, 'data.txt');
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  }
});

server.listen(8004);