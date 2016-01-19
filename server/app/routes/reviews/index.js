'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

//read all
router.get('/', function(req, res, next){
	console.log(req.session)
	Review.find().exec()
	.then(function(results){
		res.send(results);
	})
	.then(null, next);
});

//create
router.post('/', function(req, res, next){
	if(!req.session.passport.user){
		res.status(401).send()
	}else{
		req.body.reviewAuthor = req.session.passport.user
		Review.create(req.body)
		.then(function(result){
			res.status(201).send(result);
		})
		.then(null, next);
	}
});

//read one
router.get('/:reviewId', function(req, res, next){
	console.log(req.session)
	Review.find({reviewProduct: req.params.reviewId})
	.then(function(result){
		res.send(result);
	})
	.then(null, next);
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
