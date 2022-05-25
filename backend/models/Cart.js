const mongoose = require('mongoose');
const CartSchema = mongoose.Schema({
    movieId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MovieItem'
	},
    theatreId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre'
    },
    movieName:{
        type: String
    },
    theatreName:{
        type: String
    },
    tickets:{
        type: Number
    },
    img:{
        type: String
    },
    year:{
        type: String
    },
    genre:{
        type: String
    },
    time:{
        type: String
    },
    date:{
        type: String
    }
});

module.exports = mongoose.model('Cart',CartSchema)