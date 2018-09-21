var mongoose = require('mongoose');

var trainerSkillsSchema = mongoose.Schema({
    tid:Number,
    sid:Number
});

module.exports = mongoose.model('trainer-skill', trainerSkillsSchema);