const http = require('http');
const express = require('express');

const itemsRouter = require('./routes/items');

const app = express();

app.use(express.json());

app.use('/items', itemsRouter);

app.use('/', function(req, res) {
  res.send('todo api works');
});

const server = http.createServer(app);

const port = 3000;

server.listen(port);

console.debug('Server listening on port ' + port);
