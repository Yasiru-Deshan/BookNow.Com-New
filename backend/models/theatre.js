const mongoose = require('mongoose');

const TheatreSchema = new mongoose.Schema(
    {
        name:{ type: String, required: true },
        city:{ type: String },
        email:{ type: String},
        mobile:{ type: String},
        show1:{type: String},
        show2:{type: String},
        show3:{type: String}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Theatre', TheatreSchema);