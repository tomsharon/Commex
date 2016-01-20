'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Promo = mongoose.model('Promo');

//read all
router.get('/', function(req, res, next){
	Promo.find().exec()
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	Promo.create(req.body)
	.then(function(result){
		res.status(201).send(result);
	});
});

//read one
router.get('/:promoId', function(req, res, next){
	Promo.findOne({ _id: req.params.promoId } ).exec()
	.then(function(result){
		res.send(result);
	});
});

//update
router.put('/:promoId', function(req, res, next){
	var updatedPromo = new Promo({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		streetName: req.body.street,
		city: req.body.city,
		zipCode: req.body.zip,
		state: req.body.state
	})

	var upsertPromo = updatedPromo.toObject();
	delete updatedPromo._id;

	Promo.update({ _id: req.params.promoId}, upsertPromo, {upsert: true}, function(err) {
		if(!err){
			res.status(200).send();
		} else {
			console.error(err);
			res.status(404).send();
		}
	});


});

//delete
router.delete('/:promoId', function(req, res, next){
	console.log(req.params);
	Promo.findOne({ _id: req.params.promoId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});

module.exports = router;
