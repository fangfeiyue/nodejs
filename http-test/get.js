const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const url = req.url;
  req.query = querystring.parse(url.split('?')[1]);
  console.log(req.query);
  res.end(JSON.stringify(req.query));
});

server.listen(3000, () => console.log('server is running at 3000'));