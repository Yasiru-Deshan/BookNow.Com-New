const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String },
		img: { type: String },
		imgTitle: { type: String },
		imgSm: { type: String },
		trailer: { type: String },
		video: { type: String },
		year: { type: String },
		limit: { type: Number },
		genre: { type: String },
		cast1:{ type: String },
		cast2:{ type: String },
		cast3:{ type: String },
		cast4:{ type: String },
		director:{ type: String},
		isSeries: { type: Boolean, default: false },
		likes:{
            type: Array,
            default: [],
        },
	},
	{ timestamps: true }
);

module.exports = Movie = mongoose.model('Movie', MovieSchema);
