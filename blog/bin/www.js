const http = require('http');
const PORT = 8000;
const serverHandle = require('../app');
const servere = http.createServer(serverHandle);

servere.listen(PORT, () => console.log('server is running at 3000 port'));
