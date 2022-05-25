const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema(

    {

        cardHoldersName:{
            type: String,
            required: true

        },
        cardNumber:{
            type: String,
            required: true,
            length: 16
        },

        cvv:{
            type: String,
            required: true
        },

        expireMonth:{
            type: String
        },
        expireYear:{
            type: Number
        },
        email:{
            type: String
        },
        mobile:{
            type: String
        },


    },

);

module.exports = mongoose.model("CreditCard", creditCardSchema);