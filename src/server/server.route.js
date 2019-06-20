const express = require('express');
const serverRoutes = express.Router();

let Server = require('./server-model');

serverRoutes.route('/').get(function (req, res) {
  Server.find((err, result) => handleMongoCallback(res, err, result));
});

serverRoutes.route('/export').post(function (req, res) {
  if (Array.isArray(req.body)) {
    Server.collection.deleteMany({}).then(() => {
      Server.collection.bulkWrite(
        createBulkOperations(req.body),
        (err) => handleMongoCallback(res, err, `${req.body.length} server(s) exported successfully`)
      );
    });
  } else {
    res.status(422).send('Unable to export empty list');
  }
});

serverRoutes.route('/clear').delete(function (req, res) {
  Server.collection.deleteMany(
    {},
    (err, result) => handleMongoCallback(res, err ? `Failed to delete server(s): ${err}` : err, `${result.deletedCount} record(s) removed successfully`)
  );
});

function handleMongoCallback(res, err, message) {
  if (err) {
    res.status(400).send(message);
  } else {
    res.json(message);
  }
}

function createBulkOperations(servers) {
  return servers.map((server) => {
    return {
      'updateOne': {
        'filter': { 'id': server.id },
        'update': { $set: server },
        "upsert": true
      }
    };
  });
}

module.exports = serverRoutes;
