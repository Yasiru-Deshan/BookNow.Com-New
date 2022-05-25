// const mongoose = require('mongoose');

// const User = mongoose.model('User', new mongoose.Schema({
//     name:
//     {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     },
//     email:
//     {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 255,
//         unique: true
//     },
//     password:
//     {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 1024
//     },
//     isAdmin:
//     { type: Boolean
//     }
// }));



// exports.User = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//Create Schema
const Userschema = new Schema({

    username:{
        type: String,
        required: true,
        min: 3,
        max: 15
        },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum : ['user','admin'],
        required: true
    },
    

    date:{
        type: Date,
        default: Date.now
    },

    cartItems: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Cart'
    }],

    creditCards:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard'
    }]


});

Userschema.pre('save', function(next){
      if(!this.isModified('password'))
        return next();

      bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
          return next(err);
        this.password = passwordHash;
        next();  
      });
});

Userschema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
          return cb(err);
        else{
            if(!isMatch)
               return cb(null,isMatch);
            return cb(null,this);   
        }  
    })
}

module.exports = User = mongoose.model('User',Userschema); 