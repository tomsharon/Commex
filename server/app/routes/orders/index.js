'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

//read all
router.get('/', function(req, res, next){
	//if req.query is defined, fetch accordingly
	//else req.query is an empty object, so find all
	// Order.find(req.query).exec()
	console.log(req.query)
	Order.find(req.query).populate("items.item").populate("user")
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	Order.create(req.body)
	.then(function(result){
		res.status(201).send(result);
	})
	.then(null, function(error){
		res.send(error);
	})
});

//read one
router.get('/:orderId', function(req, res, next){
	Order.findOne({ _id: req.params.orderId } ).exec()
	.then(function(result){
		res.send(result);
	});
});

//update
router.put('/:orderId', function(req, res, next){
	//Matt & Tom's Sunday
	//May be best practice for all PUT routes
	Order.update({_id: req.params.orderId}, req.body, function(err) {
		if(!err){
			res.status(200).send("Updated order successfully!");
		} else {
			console.error(err);
			res.status(404).send();
		}
	})
});

//delete
router.delete('/:orderId', function(req, res, next){
	Order.findOne({ _id: req.params.orderId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});


module.exports = router;
