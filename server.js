const http = require('http');
const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const cors = require('cors');

const itemsRouter = require('./routes/items');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/items', itemsRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = http.createServer(app);

const port = (process.env.PORT || 5000);

server.listen(port);

console.debug('Server listening on port ' + port);

module.exports=app;
