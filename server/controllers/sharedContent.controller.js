const mongoose = require('mongoose');
const SharedContent = require('../models/sharedContent.model');
const User = require('../models/user.model');

/* GET sharedContents listing. */
exports.getAll = function (req, res, next) {
    SharedContent.find(function (err, sharedContents) {
        if (err) {
            return next(err);
        } else {
            res.json(sharedContents);
        }
    });
};

exports.getByUsername = function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) return next(err);
        if (user) {
            SharedContent.find({ username: user.username }, function (err, contents) {
                if (err) return next(err);
                res.json(contents);
            })
        }
    });
};

exports.AddByUsername = function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) return next(err);

        if (user) {
            let sharedContent = new SharedContent(req.body);
            sharedContent.save(function (err) {
                if (err) return next(err);
                res.json(sharedContent);
            });
        }
    });
};

exports.editByUsername = function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) return next(err);

        if (user) {
            SharedContent.findOneAndUpdate({ username: user.username, _id: req.body._id }, req.body, function (err) {
                if (err) return next(err);
                res.json(req.body);
            });
        }
    });
};

exports.removeById = function (req, res, next) {
    SharedContent.findOneAndRemove({ _id: req.params._id }, function (err, content) {
        if (err) return next(err);

        res.json(content);
    })
};

/* GET sharedContents Comments listing. */
exports.getCommentsById = (req, res) => {
    SharedContent.findOne({ _id: req.params.id }, (err, post) => {
        if (err) console.log(err);
        res.json(post);
    });
};

exports.addCommentById = function (req, res) {
    SharedContent.findOne({ _id: req.params.id }, function (err ,sharedContent) {
        if (sharedContent) {
            let comment = req.body;
            sharedContent.comments.push(comment);
            sharedContent.save((err) => {
                if (err) console.log(err);
                res.json(comment);
            });
        }
    });
};