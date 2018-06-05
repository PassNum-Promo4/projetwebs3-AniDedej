const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    thumbnail: String,
    email: { type: String },
    isOnline: Boolean,
});

const MessageSchema = new Schema({
    created: { type: Date, required: true },
    from: { type: UserSchema, required: true },
    messageText: { type: String, required: true },
    conversationId: { type: String, required: true }
});

const model = mongoose.model('Message', MessageSchema);

module.exports = model;