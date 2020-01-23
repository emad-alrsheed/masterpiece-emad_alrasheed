var express = require('express');
var User = require("../models/users");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    var userMap = [];
    users.forEach(function(user) {
      userMap.push(user);
    });
    res.send(userMap);  
  });
});


router.get('/:id', function(req, res, next) {
  var id = req.params['id'];
  User.findOne({_id: id}, function(err, user) {
    if(err){
      res.sendStatus(404);
    }else{
      res.send(user);
    } 
  });
});


router.post('/', function(req, res, next) {
  var user = new User(req.body);
  user.save()
  return res.json(user);
});


router.delete('/:id', function(req, res, next){
  var id = req.params["id"];
  User.findById(id, function(err, user){
    if(error){
      res.sendStatus(404);
    }else{
      user.remove();
      res.sendStatus(204);
    }
  });  
});


router.put('/:id', function (req, res){
  var id = req.params["id"];
  User.findOneAndUpdate({_id: id}, req.body, function(err){
    if(err)
      res.sendStatus(403);
    else
      res.sendStatus(202);
  });
});

module.exports = router;
