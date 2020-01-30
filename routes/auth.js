var express = require('express');
var User = require("../models/users");
const jwt = require('jsonwebtoken')

var router = express.Router();


router.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}, function(err, user){
        if(!user){
            return res.sendStatus(401);
        }else{
            user.verifyPassword(password, function(err, same){
                if(err){
                    return res.sendStatus(401);
                }else{
                    var payload = {email};
                    var secret = req.app.get('secret');
                    const token = jwt.sign(payload, secret, {expiresIn: '1h'});
                    res.cookie('token', token, { httpOnly: true })
                    .sendStatus(200);
                }
            })
        }
    });
});


module.exports = router;