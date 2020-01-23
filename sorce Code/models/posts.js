var mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body: String
});

const PostSchema = new mongoose.Schema({
    comments: [CommentSchema],
    content: String,
    title: String
});
  
const Post = mongoose.model('Post', PostSchema);
  
module.exports = Post;