var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    _id:Number,
    name:String
});

module.exports = mongoose.model('group', groupSchema);