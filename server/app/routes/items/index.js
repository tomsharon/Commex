'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Item = mongoose.model('Item');

//read all
router.get('/', function(req, res, next){
	Item.find().exec()
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	Item.create(req.body).exec()
	.then(function(result){
		res.status(201).send(result);
	});
});

//read one
router.get('/:itemId', function(req, res, next){
	Item.findOne({ _id: req.params.itemId } ).exec()
	.then(function(result){
		res.send(result);
	});
});

//update
router.put('/:itemId', function(req, res, next){
	Item.findOne({ _id: req.params.itemId } ).exec()
	.then(function(result){
		result = req.body;
		return result.save()
	})
	.then(function(updatedItem){
		res.status(200).send(updatedItem);
	})
});

//delete
router.delete('/:itemId', function(req, res, next){
	Item.findOne({ _id: req.params.itemId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});


module.exports = router;