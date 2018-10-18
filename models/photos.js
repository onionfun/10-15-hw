const mongoose = require('mongoose');
const Users = require('./users');
const photosSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        url: {type:String, required: true}
    });
module.exports = mongoose.model('Photos', photosSchema);