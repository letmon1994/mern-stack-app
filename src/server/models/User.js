const mongoose = require('mongoose');

// Each schema maps to a MongoDB collection
const UserSchema = mongoose.Schema({
  fName: String,
  lName: String,
  image: String,
  gender: String,
  nationality: String,
  foot: String,
  teamName: String,
  position: String,
  age: String
});

module.exports = mongoose.model('User', UserSchema);
