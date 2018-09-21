var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    _id:Number,
    title:String,
    capacity:Number
});

module.exports = mongoose.model('room', roomSchema);