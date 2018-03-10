var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds161148.mlab.com:61148/dogtracker');

module.exports = mongoose;