var mongoose = require('mongoose');

var trainerSchema = mongoose.Schema({
    _id:Number,
    name:String
});

module.exports = mongoose.model('trainer', trainerSchema);