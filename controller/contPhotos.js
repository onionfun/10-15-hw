const express = require('express');
const router = express.Router();
//const Photos and Views require models
const Users = require('../models/users');
const Photos = require('../models/photos')

router.get('/', async (req, res)=>{
    try{
        const allPhotos = await Photos.find();
        res.render('photos/index.ejs', {
            photos: allPhotos
        })
    }catch(err){
        res.send(err);
    }
    });
//new photo
router.get('/new', async (req, res)=>{
    const foundUsers = await Users.find({})
    res.render('photos/new.ejs', {
    users: foundUsers
})
    
})

//linked
router.post('/', async (req, res, next)=>{
try{
    const newUser = await User.findById(req.body.userId);
    const newPhoto =  await Photo.create(req.body);
    //user has an array of photos
    newUser.photos.push(newPhoto)
    await newUser.save() //a db operation
    res.redirect('/photos')
}catch(err){
next(err);
} 
})

router.get('/:id', async (req, res)=>{
    try{
        const foundPhotos = await Photos.findById(req.params.id);
        const foundUsers = await Users.find({'user._id': req.params.id});
        res.render('user/show.ejs', {
            user: foundUsers,
            photos: foundPhotos
        })
    }catch(err){
        res.send(err)
    }
});

// router.delete('/:id', async (req, res) => {
//     try {
//         const user = await User.findOne({'photos._id': req.params.id});
//         const photo = await Photo.findById(req.params.id);
//         user.photos.id(req.params.id).remove();
//         await Photo.findByIdAndDelete(req.params.id);
//         await user.save();
//         res.redirect('/photos');
//     } catch(err){
//         res.send(err);
//     }
// })
router.delete('/:id', async (req, res) => {
    try{
    const users = await Users.findOne({'photos._id':req.params.id});
    const photo = await Photos.findById(req.params.id);
    //built in method to delete 
    user.photos.id(req.params.id).remove(); //<can replace the entire for loop above ^

    // for (let i = 0; i < photos.length; i++) {
    //     if(user.photo[i].id === photo.id){
    //        await user.photos.splice(i, 1) 
    //     }
    // } 
        await Photos.findByIdAndDelete(req.params.id)
        await users.save()
    //it's all been building up to delete
    //deleting photo, need to find user and elete it from their array
    //delete user need to look in mongo collection to delete all of the photos attached to it
        res.redirect('/users');
    }catch(err){
      res.send(err);
    }
    });




// router.post()
//mthod override only catches post requests
//create, show, delete user and photo from user

// router.post("/:id", (req, res) => {
//     Users.findById(req.params.id, (err, foundData)=> {
//         Photos.create(req.body, (err, newPhotos) => {
//             foundData.photos.push(newPhotos);
//             foundData.save((err,saved) => {
//                 res.redirect("/");
//             });
//         });
//     });
// });

//Form calls articles post route; articles post route takes req.body that the user put into the form and adds an Article object with that information to the articles collection, then redirects the user to the articles index, which should now show the new article in its for loop
//from the new route we look at the form and see its a method post, whenn we submit the form it goes to req.body, it goes to the post route
//once post route hit, model adds the form data to the collection and it renders
//model is how data gets added to the db
//seession is a cookie - strings of data stored on your computer the CLIENT is the BROWSER
//when we go to localhost 3000 the browser is the client and making a request to our server on our comp
//same as www.google.com making request to server to google.com so the get route is getting hit, the response is our index.ejs
//loading into the browers (client)
//request and response of the browser to the server
//sessions are cookies to trap info from the client, we can check to see if they're logged in and store that info
//we'll use it to track if they're logged in, obj stored on browser that cookie/session sent to server, server verifies, response is sending cookie back and saved on browser
//set up user model to store users coming into our app
//const userSchema = new mongoose.Schema({user: String, password: String});
//we weant to set up session middleware before our controllers because we'll use the sessons in the controllers
//app.use use the session object app.use(session({secret: "This is some random secret string", resave: false, saveUnitialized: false}));
//as our objects are sent back and forth, when our server getis back it uses secret string to unlockk and it's being sent back as a HASH, and gets unlocked for the session
//only save hash when we've made a change to it, instead of saving to db all the time
//session is being stored in express memory and our session restartes, only save when we've added property to our hash, like when someone logs in
//made author.js controller require controller in the server.js
//cookie sent back and forth from server to browers and back again, server checks and edits cookie and sends it back
//EVERY ROUTE IN APPLICATION you have a ttaced to req a new property called "session" in articles, in authors, all of them req.session
//router.get('/', (req, res)=>{req.session.anyProperty = "any value";})
//req.session.isLoggedIn = true; < it can be anything we want it to be
//login.ejs h1 is login form action="" method=""> input type = test name =username button type = submit</form>
/*
making a form submission and redirect to them to authors and check the session
req.session is coming from req.session, 
router.post('/login', (req, res)=>{
req.session.username = req.body.username;
req.session.login = true;
res.redirect('/authors');
})
what route servers up log in? /auth/login
console.log(req.session) every server restart needs to reinitialize the session
in articles controller
check to see if user is loggedin, if so allow them to edit, or redirect them to login page, telling them they need to be logged in
if(req.session.logged===true){author.findbyid(req.params.id, (err, editauthor)=> res.render(authors/login.ejs))}

how to inject information into render function: pass it into an object {photos: userPHotos} or {message: req.session.message} injecting message into our render function
if the user makes a request, the browser is making a request, if we're not logged in we get redirected and adding to the session available on every request and we cn inject that into our render function
restarts the session and clears all the properties we set on the session object
router.get('/logout', (req, res)=>{
req.session.destroy((err)=>{
    if(err){ res.send(err);} else{ res.redirecte('/auth/login')}
})
})
*/






// router.delete('/:id', (req, res)=>{
//     Users.find
// })

module.exports = router;