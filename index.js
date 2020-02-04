const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/api')
const passport = require('passport')
var session = require("express-session")
const expressValidator = require('express-validator');

const app = express()

mongoose.connect('mongodb+srv://admin:4P8dgJJCXdfw53A@cluster0-mzerq.mongodb.net/test?retryWrites=true&w=majority')
mongoose.Promise = global.Promise
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); 

app.use('/api',routes)

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
})

//Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));//Express validator middleware
  /*app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;
  
      while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  }));*/

//Passport config

//Passport middleware


app.listen(process.env.port||4000, function() {
    console.log('listening for requests')
})