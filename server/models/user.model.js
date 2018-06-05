const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type: String, unique: true, lowercase: true},
    thumbnail: String,
    email: {type: String, unique: true, lowercase: true},
    password: String,
    isOnline: Boolean,
    socketId: String
});

/*
* Encrypt the password with bcrypt
*/
UserSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    });
});


/*
* Compare the password from the DB with the user's inputed password
*/
UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const model = mongoose.model('User', UserSchema);

module.exports = model;
module.exports.UserSchema = UserSchema;