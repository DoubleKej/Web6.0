const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  id: {type: Number, required: true},
  name: {type: String, default: '', unique: true},
  userName: {type: String},
  password: {type: String},
  email: {type: String}
});

userSchema.methods = {

    // Authenticate - check if the passwords are the same
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashed_password
    },

    // Tao salt
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },

    // Ma hoa password
    encryptPassword: function (password) {
        if (!password) return ''
            var encrypred
        try {
            encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
            return encrypred
        } catch (err) {
            return ''
        }
    }
}


module.exports = mongoose.model('users', userSchema);
