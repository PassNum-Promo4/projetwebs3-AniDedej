const mongoose = require('mongoose');
const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const User = require('../models/user.model');


exports.getAllConversations = function (req, res, next) {
    // Only return one message from each conversation to display as snippet
    Conversation.find({}, (err, conversations) => {
        if (err) return next(err);
        res.json(conversations);
    });
};

exports.getMessages = (req, res, next) => {
    Message.find({}, (err, messages) => {
        if (err) return next(err);

        res.json(messages);
    });
};

exports.getMessagesOfConversation = (req, res, next) => {
    Conversation.findOne({ _id: req.params.conversationId }, (err, conversation) => {
        if (err) return next(err);
        if (conversation) {
            Message.find({ conversationId: conversation._id }, (err, messages) => {
                if (err) return next(err);

                res.json(messages);
            });
        }
    });
};

exports.getConversations = function (req, res, next) {
    // Only return one message from each conversation to display as snippet
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) return next(err);

        if (user) {
            Conversation.find( { name: { $regex: user._id } }, (err, conversations) => {
                if (err) return next(err);
                res.json(conversations);
            });
        }
    });
};

exports.getConversation = function (req, res, next) {

    Message.find({ conversationId: req.params.conversationId }, (err, messages) => {
        if (err) {
            res.send({error: err});
            return next(err);
        }
        res.status(200).json({conversation: messages});
    });
};

exports.newConversation = function(req, res, next) {

    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) return next(err);

        if (user) {
            Conversation.findOne({ name: user.username + '-' + req.body.from.username }, (err, conversation) => {
                if (err) return next(err);

                if (conversation) {
                    res.json({ message: 'Conversation already in database', conversation: conversation });
                } else {
                    const newConversation = new Conversation({
                        participants: [user, req.body.from],
                        name: user.username + '-' + req.body.from.username
                    });
                    if (newConversation) {
                        console.log('its ok');
                        newConversation.save();
                        res.json(newConversation);
                    }
                }
            });
        }
    });
};

exports.sendReply = function(req, res, next) {
    const reply = new Message({
        created: Date.now(),
        from: req.body.from,
        messageText: req.body.messageText,
        conversationId: req.params.conversationId
    });

    reply.save(function(err, sentReply) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }
        res.status(200).json({ message: 'Reply successfully sent!' });
        return(next);
    });
};