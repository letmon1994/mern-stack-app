const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Account = require('./models/Account');
const withAuth = require('./middleware');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();

const secret = 'secret_should_not_be_in_git';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// const mongo_uri = 'mongodb://localhost/react_ca2';
const mongo_uri = 'mongodb+srv://RyanL:RyanL@ca2cluster-gm29r.mongodb.net/react_ca2?retryWrites=true';
// const mongo_uri = 'mongodb+srv://RyanL:manu98765%40@ca2-gm29r.mongodb.net/test';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

// retrieve all user (player) objects from my  DB
app.get('/api/users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// retrieve player with specific ID from DB
app.get('/api/users/:id', (req, res) => {
  User.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// delete player with specific ID from DB
app.delete('/api/users', withAuth, (req, res) => {
  User.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// create new player based on info supplied in request body
app.post('/api/users', withAuth, (req, res) => {
  // create a player user object using the Mongoose model and the data sent in the POST
  const user = new User(req.body);
  // save this object to the DB
  user.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

// update player based on info supplied in request body
app.put('/api/users',  withAuth, (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a player matching this ID and update their details
  User.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

app.get('/', function(req, res) {
  // res.sendFile delivers files, index.html and whats in the public folder
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new Account({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      // 500 code means there was an error
      res.status(500).send('Error registering new user please try again.');
    } else {
      // 200 code means OK
      res.status(200).send('Welcome');
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  // for validating the email and password when logging in
  Account.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      // 500 error code means "Internal Server Error"
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      // error code 401 means "Unauthorized"
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          // 500 error code means "Internal Server Error"
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          // error code 401 means "Unauthorized"
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            // the token expires every hour in the session
            expiresIn: '1h'
          });
          // cookie is given and http is set to true in the console, under applications
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

// get a token and send the status code 200 which means it was "OK"
app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

// even when logged out, the cookie is still kept
app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

app.listen(process.env.PORT || 8080);
