var express = require('express');
var Post = require("../models/posts");
var router = express.Router();

router.get('/', function(req, res, next) {
    Post.find({}, function(err, posts) {
      var postMap = [];
      posts.forEach(function(post) {
        postMap.push(post);
      });
      res.send(postMap);  
    });
  });


router.post('/', function(req, res, next) {
    var post = new Post(req.body);
     post.save()
    return res.json(post);
  });

  router.post('/:id/comments', function(req, res, next){
  });

//   router.delete('/:id', function(req, res, next){
//     var id = req.params["id"];
//     post.findById(id, function(err, user){
//       post.remove();
//     });  
//     res.sendStatus(204);
//   });

//   router.put('/', function (req, res) {
//     var id = req.params["id"];
//     post.find(id ,function(err,postr)){
//       post.update();
      
//     });


// };
  
module.exports = router;