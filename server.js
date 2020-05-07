const http = require('http');
const express = require('express');

const cors = require('cors');

const itemsRouter = require('./routes/items');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/items', itemsRouter);

app.use('/', function(req, res) {
  res.send('todo api works');
});

const server = http.createServer(app);

const port = 5000;

server.listen(port);

console.debug('Server listening on port ' + port);

module.exports=app;
