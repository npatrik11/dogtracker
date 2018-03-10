var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    }
});

var Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;