/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongoose');

const config = require('./DB');
const serverModel = require('./model/server-model');
const controllerModel = require('./model/controller-model');
const routes = require('./routes');

mongo.Promise = global.Promise;
mongo.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected'); },
  (err) => { console.log(`Cannot connect to the database: ${err}`); }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(config.SERVER_ROOT, routes(serverModel));
app.use(config.CONTROLLER_ROOT, routes(controllerModel));
let port = process.env.port || 8080;

app.listen(port, function () {
  console.log('server listening on port: ' + port);
});
