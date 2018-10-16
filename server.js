const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');

const usersController = require('./controller/contUsers');
const photosController = require('./controller/contPhotos');
// make sure to require this before our controller
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
//midware
app.use('/users', usersController);
app.use('/photos', photosController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.listen(3000, () => {
  console.log('listening on port 3000');
})
