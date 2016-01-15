'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

//read all
router.get('/', function(req, res, next){
	Order.find().exec()
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	Order.create(req.body)
	.then(function(result){
		res.status(201).send(result);
	});
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
	Order.findOne({ _id: req.params.orderId } ).exec()
	.then(function(result){
		result = req.body;
		return result.save()
	})
	.then(function(updatedOrder){
		res.status(200).send(updatedOrder);
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