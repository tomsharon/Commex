'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Item = mongoose.model('Item');

router.get('/:itemId', function(req, res, next){
	Item.findOne({ _id: req.params.itemId} ).exec()
	.then(function(result){
		res.send(result);
	});
});
module.exports = router;