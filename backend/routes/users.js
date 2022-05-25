const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");
const keys = require('../config/keys');
const passport = require('passport');
const passportConfig = require('../passport');
const Cart = require("../models/Cart");
const Movie = require("../models/Movie")

const signToken = userID =>{
    return JWT.sign({
       iss : "dsproject",
       sub : userID
    }, "dsproject", {expiresIn : "1h"});
}


// router.post('/reg', async(req,res)=>{

  

//     let user = await User.findOne({ name: req.body.name });
//     if(user) return res.status(400).send('User already registered.');

//     user = new User({
        
//         name: req.body.name,
//         password: req.body.password
//     });

//     await user.save();

//     res.send(user);
// });

// router.post('/bt/register', (req,res)=>{
//     User.findOne({ email: req.body.email })
//     .then(user =>{
//         if(user){
//             return res.status(400).json({email: 'Email already exists'});
//         }else{
//             const newUser = new User({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password,
//                 isAdmin: req.body.isAdmin
//             });

//             bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash(newUser.password, salt, (err, hash) =>{
//                   if(err) throw err;
//                   newUser.password = hash;
//                   newUser.save()
//                   .then(user => res.json(user))
//                   .catch(err => console.log(err));
//                 })
//             })
//         }
//     })
// })

// router.post('/bt/login', (req,res)=>{
//     const email = req.body.email;
//     const password = req.body.password;
//     const id = req.body.id;

//     User.findOne({email})
//     .then(user =>{
//         if(!user){
//             return res.status(404).json({email: 'User not found'});
//         }

//         bcrypt.compare(password, user.password).then(isMatch => {
//             if(isMatch){
//                 res.json({ msg : 'Success' });
              
//                 const accessToken = 
// 		{ id: user.id, name: user.name, isAdmin: user.isAdmin }; // CreatJWT accesstoken

//         // Sign Token
//         jwt.sign(
//           accessToken,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: 'Bearer ' + token
//             });
//           }
//         );

//             }else{
//                 return res.status(400).json({ password: 'Password incorrect' });
//             }
//         })
//     })
// })

// const verify = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if(authHeader){
//         const token = authHeader.split("")[1];

//         jwt.verify(token, "mySecretKey", (err, user) => {
//             if(err){
//                 return res.status(403).json("Token is not valid");
//             }

//             req.user = user; 
//             next();
//         }); 
//     }else{
//         res.status(401).json("You are not authenticated!");
//     }    
// }

// router.delete("/bt/del/:userId", verify, (req,res) =>{
//     if(req.user.id === req.params.userId || req.user.isAdmin){
//         res.status(200).json("User has been deleted.");
//     }else{
//         res.status(403).json("You are not allowed to delete this user");
//     }
// })

// router.post('/log', async (req,res) =>{
//     const { name, password } = req.body;
    
//     let user = await User.findOne((u) => {
//         return u.name === name && u.password === password;
//     });
//     if(user){
//          const accessToken = jwt.sign(
//         {   id: user.id, isAdmin: user.isAdmin },
//             "mySecretKey"
//         );
//          res.json({
//              name: user.name,  
//              isAdmin: user.isAdmin,
//              accessToken,
//          });
//     }else{
//         res.status(400).json("Username or password is incorrect!");
//     }
// });

//USER REGISTRATION
router.post('/register',(req,res)=>{
    const { username,password,role} = req.body;
    User.findOne({username},(err,user) =>{
        if(err)
          res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
          res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
        else{
            const newUser = new User({username,password,role});
            newUser.save(err=>{
                if(err)
                  res.status(500).json({message : {msgBody : "Error has occured 2", msgError: true}});
                else
                  res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}}) ; 
            })
        }  
  })
});

//USER LOGIN
router.post('/login',passport.authenticate('local', {session : false}), (req,res)=>{
     if(req.isAuthenticated()){
         const {_id,username,role} = req.user;
         const token = signToken(_id);
         res.cookie('access_token',token,{httpOnly: true, sameSite:true});
         res.status(200).json({isAuthenticated : true,user : {username,role}});
     }
})

//USER LOGOUT

router.get('/logout',passport.authenticate('jwt', {session : false}), (req,res)=>{
     res.clearCookie('access_token');
     res.json({user:{username : "", role:""}, success : true})
})

//add to cart
 router.post('/addto', passport.authenticate('jwt',{session : false}), async(req,res)=>{

    const newBooking = new Cart({
        movieId: req.body.movieId,
        theatreId: req.body.theatreId,
        movieName: req.body.movieName,
        theatreName: req.body.theatreName,
        tickets: req.body.tickets,
        img: req.body.img,
        year: req.body.year,
        genre: req.body.genre,
        time: req.body.time,
        date: req.body.date

    })

    //const newBooking = new Movie(req.body);

 newBooking.save(err=>{
   if(err)
         res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
   else {

        req.user.cartItems.push(newBooking);
        req.user.save(err=>{
            if(err)
               res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else   
             //const savedBooking = await newBooking.save();
            // cartItems.updateOne({ $push :{cartItems : [newBooking]}})
             res.status(200).json(newBooking);
        })
    }
})
 })

 //GET ALL CART ITEMS
router.get('/cartall',passport.authenticate('jwt',{session : false}), (req,res)=>{
    User.findById({_id : req.user._id}).populate('cartItems').exec((err,document)=>{
        if(err)
          res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({cartItems : document.cartItems, authenticated : true})
        }  
    })
}) 

//DELETE CART ITEM-Cancel booking
router.delete('/delete/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('The Booking has been canceled...');
    } catch (err) {
        res.status(500).json(err);
    }
});

//ADD CREDITCARD
router.post('/',passport.authenticate('jwt',{session : false}), async (req, res) => {

      const newCard = new CreditCard({
                cardHoldersName: req.body.cardHoldersName,
                cardNumber: req.body.cardNumber,
                cvv: req.body.cvv,
				expireMonth: req.body.expireMonth,
				expireYear: req.body.expireYear,
				email: req.body.email,
				mobile: req.body.mobile
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newCard.cardNumber, salt, (err, hash) =>{
                  if(err) throw err;
                  newCard.cardNumber = hash;
                })
            })

            newCard.save(err=>{
            if(err)
              res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else {

              req.user.creditCards.push(newCard);
              req.user.save(err=>{
            if(err)
               res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else   
             //const savedBooking = await newBooking.save();
            // cartItems.updateOne({ $push :{cartItems : [newBooking]}})
             res.status(200).json(newCard);
        })
    }
})

});

//ADMIN AUTHENTICATION

router.get('/admin',passport.authenticate('jwt',{session : false}), (req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}})
    }
    else
        res.status(403).json({message : {msgBody : 'You are not an admin', msgError : true}})
}) 

router.get('/authenticated',passport.authenticate('jwt',{session : false}), (req,res)=>{
   const {username,role} = req.user;
   res.status(200).json({isAuthenticated : true, user : {username,role}});

}) 


module.exports = router;