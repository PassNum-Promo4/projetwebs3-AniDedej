const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    sharedContentId: String,
    comment: { username: String, content: String, date: Date }
});

const model = mongoose.model('comment', CommentSchema);

module.exports = model;