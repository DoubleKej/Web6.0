const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  id: {type: Number, required: true},
  name: {type: String, default: '', unique: true},
  userName: {type: String},
  password: {type: String},
  email: {type: String}
});

module.exports = mongoose.model('users', userSchema);
