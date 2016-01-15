'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

//read all
router.get('/', function(req, res, next){
	User.find().exec()
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	User.create(req.body).exec()
	.then(function(result){
		res.status(201).send(result);
	});
});

//read one
router.get('/:userId', function(req, res, next){
	User.findOne({ _id: req.params.userId } ).exec()
	.then(function(result){
		res.send(result);
	});
});

//update
router.put('/:userId', function(req, res, next){
	var updatedUser = new User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		streetName: req.body.street,
		city: req.body.city,
		zipCode: req.body.zip,
		state: req.body.state
	})

	var upsertUser = updatedUser.toObject();
	delete updatedUser._id;

	User.update({ _id: req.params.userId}, upsertUser, {upsert: true}, function(err) {
		if(!err){
			res.status(200).send();
		} else {
			console.error(err);
			res.status(404).send();
		}
	});


});

//delete
router.delete('/:userId', function(req, res, next){
	User.findOne({ _id: req.params.userId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});

module.exports = router;
