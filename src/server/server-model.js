const mongo = require('mongoose');

var Schema = mongo.Schema;

var StringType = { type: String };
var ServerSchema = new Schema({
  id: StringType,
  hostName: StringType,
  ip: StringType,
  owner: StringType,
  status: StringType,
  description: StringType
}, { collection: 'ServerList' });

module.exports = mongo.model('servers', ServerSchema);
