const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // A library to help hash passwords

const saltRounds = 10; // the saltRound is a way of giving a random value, and should differ for each calculation

const AccountSchema = new mongoose.Schema({ // Each schema maps to a MongoDB collection
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

AccountSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    // hashing the password
    bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// method of what happens if the passwords are the same, a call back error is called
AccountSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model('Account', AccountSchema);
