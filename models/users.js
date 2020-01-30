var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    specialization: {type: String, enum: ['computer science', 'biology', 'economics']},
    institution: String
});


UserSchema.methods.verifyPassword = function(password, callback){
    if(this.password == password){
        callback(null, true);   
    }else{
        callback("Wrong Password", null);
    }
}

const User = mongoose.model('User', UserSchema);
  
module.exports = User;