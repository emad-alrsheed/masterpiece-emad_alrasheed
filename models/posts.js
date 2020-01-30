var mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    creation_date: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
    author: String,
    comments: [CommentSchema],
    content: String,
    title: String,
    creation_date: { type: Date, default: Date.now }
});
  
const Post = mongoose.model('Post', PostSchema);
  
module.exports = Post;