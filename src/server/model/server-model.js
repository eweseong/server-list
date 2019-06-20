const mongo = require('mongoose');

const VirtualMachineSchema = require('../schema/virtual-machine-schema');

module.exports = mongo.model('servers', VirtualMachineSchema, 'Servers');
