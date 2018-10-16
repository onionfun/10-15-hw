const express = require('express');
const router = express.Router();
//const Photos and Views require models
const Users = require('../models/users');

router.get('/', (req, res)=>{
    Users.find({}, (err, foundUsers)=>{
        res.render('users/index.ejs', {users: foundUsers})
    })
});
  
  router.get('/new', (req, res) => {
    res.render('users/new.ejs');
  });
  
  router.get('/:id',(req, res) => {
    Users.findById(req.params.id, (err, userFound) => {
      res.render('users/show.ejs', {
        user: userFound
      })
    });
  });
  
  
  router.get('/:id/edit', (req, res) => {
    Users.findById(req.params.id, (err, editUser) => {
      res.render('users/edit.ejs', {
        user: editUser
      });
    });
  });
  
  router.post('/', (req, res) => {
  
    User.create(req.body, (err, createdUser) => {
  
      if(err){
        console.log(err)
      } else {
        res.redirect('/users')
      }
    });
  
  });
  
  router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, (err, updateUsers) => {
      res.redirect('/users');
    });
  });
  
  router.delete('/:id', (req, res) => {
    Users.findOneAndDelete(req.params.id, (err, deleted) => {
      res.redirect('/users')
    })
  });
  
  
module.exports = router;