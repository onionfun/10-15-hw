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
       
