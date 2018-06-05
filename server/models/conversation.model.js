const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const UserSchema = require('./user.model').UserSchema;

const UserSchema = new Schema({
    username: { type: String },
    thumbnail: String,
    email: { type: String },
    isOnline: Boolean,
});

const ConversationSchema = new Schema({
    participants: { type: [UserSchema], required: true, unique: false },
    name: { type: String, required: true, unique: false }
});

const model = mongoose.model('Conversation', ConversationSchema);

module.exports = model;