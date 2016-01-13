'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');

//read all
router.get('/', function(req, res, next){
	Review.find().exec()
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	Review.create(req.body).exec()
	.then(function(result){
		res.status(201).send(result);
	});
});

//read one
router.get('/:reviewId', function(req, res, next){
	Review.findOne({ _id: req.params.reviewId } ).exec()
	.then(function(result){
		res.send(result);
	});
});

//update
router.put('/:reviewId', function(req, res, next){
	Review.findOne({ _id: req.params.reviewId } ).exec()
	.then(function(result){
		result = req.body;
		return result.save()
	})
	.then(function(updatedReview){
		res.status(200).send(updatedReview);
	})
});

//delete
router.delete('/:reviewId', function(req, res, next){
	Review.findOne({ _id: req.params.reviewId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});


module.exports = router;