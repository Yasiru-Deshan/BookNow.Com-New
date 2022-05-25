const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const users = require('./routes/users');
const commentRoute = require("./routes/comment");
require("dotenv").config();
const cookieParser = require('cookie-parser')
const User = require('./models/user');
//theatre
const theatreRouts = require('./routes/theatre');
//cart
const cartRoutes = require('./routes/cart');
const movieRoutes = require('./routes/movies');
const creditCardRoutes = require('./routes/creditcard');


const port = process.env.PORT || 8070;


const app = express(); 

app.use(express.json());
app.use(cookieParser())
app.use(cors())



const urlEncodedParser = express.urlencoded({ extended: false });
app.listen(port, (error) => {
    if(error) console.log(error);
    console.log('Server listening to PORT '+ port);
});

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex: true})
    .then(() => {
    console.log('MongoDB connected');})
    .catch((error) => {
    console.log(error);})


//Comments
app.use("/api/comments", commentRoute);

// movie
app.use("/api/movies", movieRoutes);

//theatre
app.use("/api/theatre", theatreRouts);

//cart
app.use("/api/cart", cartRoutes);

//users
app.use("/api/users", users);

//creditcard
app.use("/api/creditcard",creditCardRoutes);


