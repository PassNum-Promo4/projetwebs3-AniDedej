/*exports = module.exports = function(io) {
    // Set socket.io listeners.
    io.on('connection', (socket) => {
        console.log('a user connected');

        // On conversation entry, join broadcast channel
        socket.on('enter conversation', (conversation) => {
            socket.join(conversation);
            // console.log('joined ' + conversation);
        });

        socket.on('leave conversation', (conversation) => {
            socket.leave(conversation);
            // console.log('left ' + conversation);
        })

        socket.on('new message', (conversation) => {
            io.sockets.in(conversation).emit('refresh messages', conversation);
        });

        socket.on('disconnect', () => {
            //console.log('user disconnected');
        });
    });
}*/

const socketIo = require('socket.io');
const Message = require('../models/message.model');
const User = require('../models/user.model');
const Conversation = require('../models/conversation.model');
const SharedContent = require('../models/sharedContent.model');

const users = [];
const connUsers = [];
const connections = [];

let chatRoom = '';
const initialize = (server) => {
    const io = socketIo(server);
    io.on("connection", (socket) => {
        connections.push(socket);
        console.log('a user connected');

        socket.on('user', (user) => {
            User.findOne({ username: user.username }, (err, currUser) => {
                if (err) throw err;

                if (currUser) {
                    currUser.isOnline = true;
                    currUser.socketId = socket.id;
                    currUser.save((err, user) => {
                        if (err) throw err;
                        connUsers.push(user);
                        io.emit('connected-user', user);
                    });
                }
            });
        });

        socket.on('new-shared', (data)=> {
            User.findOne({ username: data.username }, function (err, user) {
                if (err) return next(err);

                if (user) {
                    let sharedContent = new SharedContent(data);
                    sharedContent.thumbnail = user.thumbnail;
                    sharedContent.save(function (err, sharedCnt) {
                        if (err) return next(err);
                        io.emit('sharedContent', sharedCnt);
                    });
                }
            });
        });

        socket.on('remove-shared', (data) => {
            SharedContent.findOneAndRemove({ _id: data._id }, function (err, content) {
                if (err) return next(err);
                io.emit('removed-shared',content);
            })
        });

        socket.on('edit-shared', (data) => {
            User.findOne({ username: data.username }, function (err, user) {
                if (err) return next(err);

                if (user) {
                    SharedContent.findOneAndUpdate({ username: user.username, _id: data._id }, data, function (err) {
                        if (err) return next(err);
                        io.emit('updated-shared', data);
                    });
                }
            });
        });

        socket.on('new-comment', (data) => {
            SharedContent.findOne({ _id: data.sharedContentId }, function (err ,sharedContent) {
                if (sharedContent) {
                    let comment = data.comment;
                    sharedContent.comments.push(comment);
                    sharedContent.save((err, sharedContent) => {
                        if (err) console.log(err);
                        io.emit('comment', sharedContent.comments[sharedContent.comments.length - 1]);
                    });
                }
            });
        });

        socket.on('remove-comment', (data) => {
            SharedContent.findOne({ _id: data.sharedContentId }, function (err, content) {
                if (err) throw err;

                if (content) {
                    if (content.comments) {
                        for (let i = 0; i < content.comments.length; i++) {
                            if(content.comments[i]._id.toString() === data.comment._id.toString()) {
                                content.comments.splice(i, 1);
                                content.save((err) => {
                                    if (err) throw err;
                                    io.emit('removed-comment', data);
                                });
                            }
                        }
                    }
                }
            });
        });

        socket.on('edit-comment', (data) => {
            SharedContent.findOne({ _id: data.sharedContentId }, function (err, content) {
                if (err) return next(err);

                if (content) {
                    if (content.comments) {
                        for (let i = 0; i < content.comments.length; i++) {
                            if(content.comments[i]._id.toString() === data.comment._id.toString()) {
                                content.comments[i].content = data.comment.content;
                                content.save((err) => {
                                    if (err) throw err;
                                    io.emit('updated-comment', data);
                                });
                            }
                        }
                    }
                }
            });
        });

        socket.on('new-conversation', (data) => {
            User.findOne({ username: data.user1 }, (err, user) => {
                if (err) throw err;

                console.log(chatRoom);

                if (user) {
                    Conversation.findOne({ $or:[{name: user._id + '-' + data.user2._id }, {name: data.user2._id + '-' + user._id }] }, (err, conversation) => {
                        if (err) throw err;

                        if (conversation) {
                            chatRoom = conversation.name;
                            socket.join(chatRoom);
                            socket.emit('conversationErr', { message: 'Conversation already in database', conversation: conversation });
                        } else {
                            const newConversation = new Conversation({
                                participants: [user, data.user2],
                                name: user._id + '-' + data.user2._id
                            });

                            chatRoom = newConversation.name;

                            if (newConversation) {
                                newConversation.save();
                                socket.join(chatRoom);
                                console.log(newConversation.participants[0].username + ' and ' + newConversation.participants[1].username + ' started a conversation');
                                io.in(newConversation.name).emit('started-conversation', newConversation);
                            }

                            if (chatRoom) {
                                console.log('its true');
                                socket.join(chatRoom);
                            }
                        }
                    });
                }
            });
        });
        socket.on('new-message', (data) => {
            Conversation.findOne({ _id: data.conversationId }, (err, conversation) => {
                if (err) throw err;

                if (conversation) {
                    const newMessage = Message(data);

                    if (newMessage) {
                        newMessage.save();

                        console.log('a new message was saved');

                        io.in(conversation.name).emit('sended-message', newMessage);
                    }
                }
            });
        });

        socket.on('disconnect', () => {
            User.findOne({ socketId: socket.id }, (err, connUser) => {
                if (err) throw err;
                if (connUser) {
                    connUser.isOnline = false;
                    connUser.socketId = '';
                    connUser.save((err, user) => {
                        if (err) throw err;
                        connUsers.push(user);
                        io.emit('disconnected-user', user);
                    });
                }
            });
            socket.leave(chatRoom, () => {
                console.log('left the room');
            });
            console.log('user disconnected');
        });
    });
};

module.exports = initialize;








