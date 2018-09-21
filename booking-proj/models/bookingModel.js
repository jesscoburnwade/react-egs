var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
    rid:Number,
    tid:Number,
    gid:Number,
    sid:Number,
    date:Date
});

module.exports = mongoose.model('Booking', bookingSchema);