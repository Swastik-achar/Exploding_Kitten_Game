const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const initRoutes = require('./routes');
const RedisService = require('./service/RedisService');

require('dotenv').config();
const app = express();

app.use(cors({credentials: false, origin: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));
console.log('Initializing routes');
initRoutes(app);

const server = http.Server(app);

server.listen(process.env.PORT, async () => {
  console.info(`Server running on: http://localhost:${process.env.PORT}`);

  try {
    await RedisService.init();
  } catch (err) {
    console.error(`Server startup failed: ${err}`);
    process.exit(1);

  }

});
