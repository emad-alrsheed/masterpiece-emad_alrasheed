var express = require('express');
var Post = require("../models/posts");
const { withAuth } = require('../helpers');

console.log(withAuth)
var router = express.Router();

router.get('/', withAuth, function (req, res, next) {
    Post.find({}, function (err, posts) {
        var postMap = [];
        posts.forEach(function (post) {
            postMap.push(post);
        });
        res.send(postMap);
    });
});


router.post('/', withAuth, function (req, res, next) {
    var post = new Post(req.body);
    post.save()
    return res.json(post);
});

router.post('/:id/comments', withAuth, function (req, res) {
    var postId = req.params.id;
    console.log(req.body.body)
    Post.findByIdAndUpdate({ _id: postId },
        {
            $push: {
                "comments": {
                    body: req.body.body,
                    author: req.body.author,
                }
            }
        }, 
        function(err, user){
            if(err){
                return res.sendStatus(403);
            }else{
                return res.sendStatus(200);
            }
        }
    );
});

router.put("/:id", withAuth, function(req, res) {
    var id = req.params["id"];
    Post.findOneAndUpdate({ _id: id }, req.body, function (err) {
        if (err)
            res.sendStatus(403);
        else
            res.sendStatus(202);
    });
});

router.delete('/:id', withAuth, function(req, res, next) {
    var id = req.params["id"];
    Post.findById(id, function (err, post) {
        if (post) {
            post.remove();
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });

});

module.exports = router;