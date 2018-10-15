const mongoose = require('mongoose');

const photosSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        url: {type:String, required: true}
    });
module.exports = photosSchema;