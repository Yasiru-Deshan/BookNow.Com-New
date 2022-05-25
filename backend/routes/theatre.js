const router = require('express').Router();
const Theatre = require('../models/theatre');

//New theatre

router.post('/', async(req,res) =>{
    const newTheatre = new Theatre(req.body);
    try{
        const savedTheatre = await newTheatre.save();
        res.status(201).json(savedTheatre);
    }catch(err){
        res.status(500).json(err);
    }
});

//Update theatre

router.put('/:id', async (req,res) =>{
    try{
        const updatedTheatre = await Theatre.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedTheatre);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete a theatre
router.delete('/:id', async (req, res) => {
	try {
		await Theatre.findByIdAndDelete(req.params.id);
		res.status(200).json('The theatre has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET a theatre

router.get('/find/:id', async (req, res) => {
	try {
		const theatre = await Theatre.findById(req.params.id);
		res.status(200).json(theatre);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL theatres

router.get('/all', async (req, res) => {
	try {
		const theatre = await Theatre.find();
		res.status(200).json(theatre.reverse());
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;