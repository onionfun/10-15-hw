const express    = require('express');
const mongoose = require('mongoose');
const app        = express();
const usersController = require('./controller/contUsers');
const photosController = require('./controller/contPhotos');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');
// make sure to require this before our controller
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
const Photos = require('./models/photos')
const Users = require('./models/users')
//midware
app.use('/users', usersController);
app.use('/photos', photosController);
// app.use('/cowboys', controller) //example

app.get('/', (req, res) => {
  res.render('index.ejs', {photos: Photos});
});


//our browser only allows post or get requests can only make a get or post requrest to server
//mthod override looks for query sting on action of the form in our middleware if the query string has put or delete request it routes it to the correct handler
//browser never sends put or delete, server intercepts it and re routes it
//Callback Hell

app.listen(3000, () => {
  console.log('listening on port 3000');
})
