const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    username: String,
	content: String, 
	date: Date
});

const SharedContentSchema = new Schema({
    username: String,
    thumbnail: String,
    content: String,
    date: Date,
	comments: [CommentSchema]
});

const model = mongoose.model('sharedContent', SharedContentSchema);

module.exports = model;