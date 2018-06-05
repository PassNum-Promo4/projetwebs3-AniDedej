const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const SharedContent = require('../models/sharedContent.model');

exports.createUser = function (req, res, next) {
    let user = new User(req.body);

    User.findOne({ email: req.body.email.toLowerCase() }, function (err, existingUser) {
        User.findOne({ username: req.body.username.toLowerCase() }, function (err, existingUser) {
            if (existingUser) {
                res.json({
                    data: req.body.username || req.body.username.toLowerCase(),
                    message: "Username already exist !"
                });
            }
        });
        if (existingUser) {
            res.json({
                data: req.body.email,
                message: "already exist !"
            });
        } else {
            user.save((err, user) => {
                if (err) return next(err);

                sendToken(user, res);
            });
        }
    });
};

exports.getAllUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
};

/* GET all users listing. */
exports.getUsers = function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        if (users) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === req.params.username) {
                    users.splice(i, 1);
                    res.json(users);
                }
            }
        }
    });
};

exports.searchUsers = function (req, res, next) {
    User.find({ $or: [{ username: { $regex: req.body.value, $options: 'i' }}, { firstName: { $regex: req.body.value, $options: 'i' }}, { lastName: { $regex: req.body.value, $options: 'i' }}] }, (err, users) => {
        if (err) return next(err);

        if (users) {
            res.json(users);
        }
    });
};

exports.getLoggedUser = function (req, res) {
    User.findOne({ _id: req.user }, (err, user) => {
        res.json(user);
    });
};

exports.updateUser = function (req, res, next) {
    User.findOne({ _id: req.user }, (err, user) => {
        if (err) return next(err);

        if (user.username !== req.body.username.toLowerCase()) {
            User.findOne({ username: req.body.username.toLowerCase() }, function (err, existingUsername) {
                if (err) return next(err);

                if (existingUsername) {
                    if (user._id !== existingUsername._id) {
                        return res.json({
                            dataType: "Username",
                            data: req.body.username || req.body.username.toLowerCase(),
                            message: "already exist !"
                        });
                    }
                } else {
                    if (user.comparePasswords(req.body.currPassword)) {
                        user.firstName = req.body.firstName;
                        user.lastName = req.body.lastName;
                        user.username = req.body.username;
                        user.email = req.body.email;
                        user.password = req.body.newPassword;
                        user.save();
                        res.json(user);
                    } else {
                        if (!req.body.currPassword) {
                            user.firstName = req.body.firstName;
                            user.lastName = req.body.lastName;
                            user.username = req.body.username;
                            user.email = req.body.email;
                            user.save();
                            res.json(user);
                        } else {
                            return res.json({
                                dataType: "Password",
                                message: "The current password don't match!"
                            });
                        }
                    }
                }
            });
        } else {
            if (user.comparePasswords(req.body.currPassword)) {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = req.body.newPassword;
                user.save();
                res.json(user);
            } else {
                if (!req.body.currPassword) {
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.username = req.body.username;
                    user.email = req.body.email;
                    user.save();
                    res.json(user);
                } else {
                    return res.json({
                        dataType: "Password",
                        message: "The current password don't match!"
                    });
                }
            }
        }
    });
};

exports.logInUser = (req, res, next) => {
    User.findOne({ $or:[{ email: req.body.userNameOrEmail.toLowerCase() }, { username: req.body.userNameOrEmail.toLowerCase() }] }, function (err, existingUser) {
        if (err) return next(err);

        if (existingUser) {
            if (existingUser.comparePasswords(req.body.password)) {
                existingUser.isOnline = true;
                existingUser.save();
                sendToken(existingUser, res);
            } else {
                return res.json({
                    passNoSuccess: true,
                    message: "Password is incorrect !"
                });
            }
        } else {
            return res.json({
                userNoSuccess: true,
                message: req.body.userNameOrEmail + " does not exist in our database!"
            });
        }
    });
};

exports.logOutUser = (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return next(err);

        if (user) {
            user.isOnline = false;
            user.save();
            res.json(user);
        }
    });
};

exports.removeUser = (req, res, next) => {
    User.findOneAndRemove({ username: req.params.username }, (err, user) => {
        if (err) return next(err);

        res.json(user);
    })
}

exports.userUploadFile = (req, res, next) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) return next(err);

        if (user) {
            SharedContent.find({ username: user.username }, (err, contents) => {
                if (err) return next(err);
                user.thumbnail = req.file.filename;
                user.save();
                for (let i = 0; i < contents.length; i++) {
                    contents[i].thumbnail = user.thumbnail;
                    contents[i].save();
                }
                res.json(user.thumbnail);
            })
        }
    });
};

function sendToken(user, res) {
    let token = jwt.sign(user.id, '123abc1234');
    console.log(user);
    res.json({
        username: user.username,
        isOnline: user.isOnline,
        token
    });
}
