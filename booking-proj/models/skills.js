var mongoose = require('mongoose');

var skillsSchema = mongoose.Schema({
    _id:Number,
    skill:String
});

module.exports = mongoose.model('skill', skillsSchema);