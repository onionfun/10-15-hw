const express = require('express');
const router = express.Router();
//const Photos and Views require models
const Users = require('../models/users');
const Photos = require('../models/photos')


router.get('/', async (req, res)=>{
    try{
        const allUsers = await Users.find({});
        res.render('users/index.ejs', {
            users:allUsers
        })
    }catch(err){
        res.send(err);
    }
    // Users.find({}, (err, foundUsers)=>{
    //     res.render('users/index.ejs', {users: foundUsers})
    });


router.get('/new', async (req, res)=> {
    try{
        const newUsers = await Users.find({});
        res.render('users/new.ejs', {
            users: newUsers
        })
    }catch(err){
        res.send(err);
    }
    // Users.find({}, (err, allUsers)=>{
    //     res.render('users/new.ejs',{
    //         users: allUsers
    //     });
    // });
});

router.post('/', (req, res)=>{
    Users.create(req.body, (err, createdUser)=>{
        res.redirect('/users')
    })
});


    router.get('/:id' , async (req, res) => {
        try {
            const users = await Users.findById(req.params.id);
            res.render('users/show.ejs', {users});
        } catch(err){
            res.send(err);
        }
    })

router.delete('/:id',async (req, res) => {
    try{
    const user = await Users.findOne({'photos._id':req.params.id});
    const photo = await Photos.findById(req.params.id);
    user.photos.id(req.params.id).remove();
    await Photos.findByIdAndDelete(req.params.id)
    await user.save()

    res.redirect('/users');
    }catch(err){
      res.send(err);
    }
    });
    //create and show the date on the page so when you click one thing it shows related data on the page, maybe deleting create, delete show
    
  //async whne this runs it keeps reading code until the call back function fires, that's the db response

///+++++    
module.exports = router;












// router.post('/', async (req, res) => {
//       try{
//           await User.findById(req.body.userId);
//           res.redirect('/users/index.ejs')
//       }catch(err){
//           res.send(err);
//       }
    // User.findById(req.body.userId, (err, createdUser) => {
    //     Photos.create(req.body, (err, createdPhoto)=>{
    //         foundUser.photos.push(createdPhoto);
    //         foundUser.save((err, data)=>{
    //             res.redirect('/users')
    //         });
    //     });
    // });

    //it's all been building up to delete
    //deleting photo, need to find user and elete it from their array
    //delete user need to look in mongo collection to delete all of the photos attached to it

// router.put('/:id', async (req, res) => {
//       try{
//         const foundUser = await User.findOne({"photos._id": req.params.id});
//         const foundPhotos = await Photos.findById(req.params.id); ///find me a user who has this photo in their stuff
//         res.render('show.ejs',{
//             users: foundUser,
//             photos: foundPhotos
//         })
//       }catch(err){
//         res.send(err)
// }
//     // Photos.findById(req.params.id, (err, foundPhotos) => {
//     //     Users.findOne({'articles._id': req.params.id}, (err, foundUsers)=>{
//     //         res.render('users/show.ejs', {
//     //             users: foundUsers,
//     //             photos: foundPhotos,
//     //         });
//     //     });
// });

//   router.delete('/:id', (req, res)=>{
//     Photos.findByIdAndRemove(req.params.id, (err, foundPhotos)=>{
//         Users.findOne({'users._id':req.params.id}, (err, foundUsers)=>{
//             foundUsers.photos.id(req.params.id).remove();
//             foundUsers.save((err, data)=>{
       
/*never store a plain text password
hasing will always come up with the same thing from the same user
even the time it takes to respond to a login request it gives information
bcrypt's strength is how long it takes to 
take the password they gave us in the form and turn it into a hash that we store in our database
hash and compare, the hash is different even if the password is the same
a "salt" 
take in the password, take random digits and letters and given to it
salt first letters and # before the "." and then the hash- decrypt it and take off the first 4 digits
everybody gets one salt stored in the password in the database
Username: <input type "text" name="username">
Password:<input type "text" name="username">


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
require('./db/db');
const User = require()
const bcrypt = require

app.use(methodOverride("_method"));
app.use(bodyParser({urlencoded: true}))
app.use(morgan('short'))
app.use(session({
    saveUninitialized: false,
    secret: "bosco",
    
}))

const userController = require('./controllers/userController');
app.use('/users', userController);

cannot post /login= form action is /user/login and change in the router as well
require models if you get an empty object in the html
must require bcrypt to get the functions it can do
hash to create the hash, compare to see if they are same password
in controller
async
router.post('/', async (req, res)=>{
    try{
const hashedPassword = await bcrypt.hash(req.body.password, 12);
console.log(hashedPassword);
const newUserObj = {
    username: req.body.username,
    password: hashedPassword
}
const newUser = await User.create()
    }catch(err){
        res.send('/users')
    }
})


app.listen(3000, () => {
    console.log('running')        
})
    
One model must be users
sign in and log in functionality
Clean
users coffees reviews - models
username
password
reviews belong to coffees and users
no one cares who uploads coffee
users onlly track reviews created
coffees
name
reviews have text and rating
belongs to coffee and has a user id
coffee has a list of reviews
users have reviews created
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Review = require('../models/reviews')

// future loggedIn function goes here

how to connect the currently logged in person to what they're doing
reviewmodel.js theres an object id 
ref what the model refers to
store the info in one place and everyone has an id to where it is?
redirect doesn't take in variables, just res.render

we have the reviews form on the reviews and the cofffee page, partials- a small snipit of tmeplate to be pasted anywhere
and will get rendered with the template, nice to put into a nav bar instead of making changes to each different page, slap the partial link on the template and youonly have to change that one link
reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}] - the reviews will be in an array of ids called Reviews
NEED:
USER + another model
User
REview
YOU REVIEW OTHER USERS!
I don't know

userController.js
router.get('/', async (res, req) => {
    // try + catch goes here
    try {
        const foundUser = await User.findById(req.session.userId);
        res.render('user/index.ejs,{
            user:foundUser
        })
                        
    }catch(err){
        res.send(err);

    }
    res.render('user/index.ejs', {
        user: foundUser,
        reviews: Review       
    });
    // if not logged in, make them log in
})

router.get('/new', async (res, req) => {
    res.render('user/new.ejs', {

    });
})

// user edit route
router.get('/edit', async (res, req) => {
    try {
        console.log("ROUTE WORKS");
                
    }catch(err){
        res.send(err)                
    }
});

// Delete Route
router.delete('/:id', async (res, req) => {
    try{
        const user = User.findByIdAndDelete(req.b)
    } catch {
        
    }    
})

router.get('/new', async(req, res) => {
    try{
        //send template a list of all the coffees

    res.render('reviews/new.ejs')
    }catch(err)
})

module.exports = router;








user login registration
nwe route in reviews contorller nends template a list of all the coffees for the dropdown 
sending that template a list of all the coffees

reviewController.js
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Coffee = require('../models/coffees');
const Review = require('../models/reviews');


router.get('/', async (req,res) => {
    try {
        const reviews = await Review.find({});
        res.render('reviews/index.ejs', {
            reviews: Review
        })
    } catch(err){
        res.send(err);
    }                          
})

router.get('/new', async (req, res, next) => {
    try {
        const coffees = await Coffee.find({});
        res.render('reviews/new.ejs', {
            coffees: coffees
        })
    }catch(err){
        next(err)
    };
});


module.exports = router;









PARTIALS npm install express ejs express-partials
const partials = require('express-partials') - not necessary there's built in partials support in ejs
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
res.render('index.ejs')
})



<%- include('partials/navbar')%> in index.ejs - changes to the navbar will go everywhere
template path just like any other

<%- include('partials/navbar', {'var': 'value'})%>
single - renders html
double = escapes any script tags, considered regular text always output to the page with =
























