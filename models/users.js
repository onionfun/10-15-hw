const mongoose = require('mongoose');
const Photos = require('./photos');

const usersSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        password: {type:String, required: true},
        photos: [Photos.schema]
    })
module.exports = mongoose.model('User', usersSchema);