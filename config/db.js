var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogtracker');

module.exports = mongoose;