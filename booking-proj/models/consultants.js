var mongoose = require('mongoose');

var consultantSchema = mongoose.Schema({
    _id:Number,
    name:String,
    gid:Number
});

module.exports = mongoose.model('consultant', consultantSchema);