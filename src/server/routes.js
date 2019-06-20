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

module.exports = function (Model) {
  const express = require('express');
  const routes = express.Router();

  routes.route('/').get(function (req, res) {
    Model.find((err, result) => handleMongoCallback(res, err, result));
  });

  routes.route('/export').post(function (req, res) {
    if (Array.isArray(req.body)) {
      Model.collection.deleteMany({}).then(() => {
        Model.collection.bulkWrite(
          createBulkOperations(req.body),
          (err) => handleMongoCallback(res, err, `${req.body.length} server(s) exported successfully`)
        );
      });
    } else {
      res.status(422).send('Unable to export empty list');
    }
  });

  routes.route('/clear').delete(function (req, res) {
    Model.collection.deleteMany(
      {},
      (err, result) => handleMongoCallback(res, err ? `Failed to delete server(s): ${err}` : err, `${result.deletedCount} record(s) removed successfully`)
    );
  });

  return routes;
};
