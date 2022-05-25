const router = require("express").Router();
const Cart = require("../models/Cart")

//add to cart
 router.post('/addto', async(req,res)=>{

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
    try{
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);

    }catch(err){
        res.status(500).json(err);
    }
 })

  //get all cart Items
 router.get("/allbookings", async(req,res)=>{

     Cart.find().then((bookings)=>{
         res.json(bookings)
     }).catch((err)=>{
         console.log(err)
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

 module.exports = router;