const express = require('express')
const router = express.Router()
const Alumni = require('../models/alumni')
let nodemailer = require('nodemailer')
var passport = require('passport')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'atest6533@gmail.com',
        pass: '6ukQevHQmDumc7W'
    }
})

var mailOptions = {
    from: 'atest6533@gmail.com',
    to: 'jamesjose03@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

//To retrieve the list
router.get('/alumni', function(req,res){
    res.send({type:'GET'})
})

//To add to the db
router.post('/signup', function(req,res,next){
    Alumni.create(req.body).then(function(alumni){
        res.send(alumni)
    }).catch(next)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 


})

router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.get('/logout',  function(req, res, next) {
    req.logout()
})

// To update the db
router.put('/alumni/:id', function(req,res){
    Alumni.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(alumni){
        res.send(alumni)
    })

})

//To delete value in the db
router.delete('/alumni/:id', function(req,res){
    Alumni.findByIdAndRemove({_id: req.params.id}).then(function(alumni){
        res.send(alumni)
    })
    //console.log(req.params.id)
    res.send({type:'DELETE'})
})

module.exports = router