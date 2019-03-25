const http = require('http');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  res.end('<h1>hello world</h1>');
});

server.listen(3000, () => {
  console.log('listeniing on 3000 port');
});
