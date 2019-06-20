const mongo = require('mongoose');

const VirtualMachineSchema = require('../schema/virtual-machine-schema');

module.exports = mongo.model('controllers', VirtualMachineSchema, 'Controllers');
