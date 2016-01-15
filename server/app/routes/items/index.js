'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Item = require("../../../db/models/item");

//read all
router.get('/', function(req, res, next){
	Item.find().exec()
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	Item.create(req.body)
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

// itemName: { type: String, required: true },
// category: { type: String, required: true },
// price: { type: Number, min: 0, required: true },
// unit: { type: String, required: true },
// inventory: { type: Number, required: true },
// shortDescription: { type: [String], required: true },
// longDescription: {type: String}



//update
router.put('/:itemId', function(req, res, next){
	var updatedItem = new Item({
		itemName: 				req.body.itemName,
		category: 				req.body.category,
		price: 						req.body.price,
		unit: 						req.body.unit,
		inventory:  			req.body.inventory,
		shortDescription: req.body.shortDescription,
		longDescription: 	req.body.longDescription
	})

	var upsertData = updatedItem.toObject();

	delete upsertData._id;


	Item.update({ _id: req.params.itemId}, upsertData, {upsert: true}, function(err) {
		console.log(arguments)
		if(!err){
			console.log('FURK')
			return res.status(200).send();
		} else {
			console.error(err);
			return res.status(404).send();
		}
	});

});


//delete
router.delete('/:itemId', function(req, res, next){
	Item.findOne({ _id: req.params.itemId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});


module.exports = router;
