const CreditCard = require('../models/CreditCard')
const router = require('express').Router();
const bcrypt = require('bcryptjs');


//Add New Credit Card
router.post('/', async (req, res) => {

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
                  newCard.save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
                })
            })

});

//Get Credit Card

module.exports = router;