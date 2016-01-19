'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
			res.status(401).end();
    }
};

var ensureAdmin = function (req, res, next) {
    if (req.user.isAdmin || req.user == undefined) {
			console.log('isAdmin')
        next();
    } else {
        res.status(401).end();
    }
};
//read all
router.get('/', ensureAuthenticated, function(req, res, next){
	//if req.query is defined, fetch accordingly
	//else req.query is an empty object, so find all
	// Order.find(req.query).exec()
	if(req.user.isAdmin){
		Order.find(req.query).populate("items.item").populate("user")
		.then(function(results){
			res.send(results);
		});
	} else {
		res.status(401).send('You should not be here');
	}
});

//create
router.post('/', ensureAuthenticated, function(req, res){
	Order.create(req.body)
	.then(function(result){
		res.status(201).send(result);
	});
});

//read one
router.get('/:orderId', ensureAuthenticated, function(req, res, next){

	Order.findOne({ _id: req.params.orderId } ).exec()
	.then(function(result){
		if(req.user._id == result.user || req.user.isAdmin){
			res.send(result);
		} else {
			req.status(401).send('You dont belong here');
		}
	});
});

//update
router.put('/:orderId', ensureAuthenticated, function(req, res, next){
	//Matt & Tom's Sunday
	//May be best practice for all PUT routes
	Order.findOne({_id: req.params.orderId}).exec()
	.then(function(order){
		if(order.user == req.user._id || req.user.isAdmin){
			Order.update({_id: req.params.orderId}, req.body, function(err) {
				if(!err){
					res.status(200).send("Updated order successfully!");
				} else {
					console.error(err);
					res.status(404).send();
				}
			})
		} else {
			res.status(401).send();
		}
	})
});

//delete
router.delete('/:orderId', ensureAdmin, function(req, res, next){
	Order.findOne({ _id: req.params.orderId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});


module.exports = router;
