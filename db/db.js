const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost/photos';
mongoose.connect(connectionString, {useNewUrlParser: true});

mongoose.connection.on('connected', ()=>{
    console.log(`connected to ${connectionString}`)
});

mongoose.connection.on('disconnected', ()=>{
    console.log(`disconnected from ${connectionString}`)
});

mongoose.connection.on('error', (err)=>{
    console.log(err)
});