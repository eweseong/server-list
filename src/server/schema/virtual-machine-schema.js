const mongo = require('mongoose');

var Schema = mongo.Schema;

var StringType = { type: String };
var VirtualMachineSchema = new Schema({
  id: StringType,
  hostName: StringType,
  ip: StringType,
  owner: StringType,
  status: StringType,
  description: StringType
});

module.exports = VirtualMachineSchema;
