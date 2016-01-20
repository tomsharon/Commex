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
router.get('/', function(req, res, next){
	//if req.query is defined, fetch accordingly
	//else req.query is an empty object, so find all
	// Order.find(req.query).exec()
		Order.find(req.query).populate("items.item").populate("user")
		.then(function(results){
			res.send(results);
		});
});

//create
router.post('/', function(req, res){
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

	Order.findOne({ _id: req.params.orderId } ).populate("user").populate("items.item").exec()
	.then(function(result){
		res.send(result);
	});
});

//update
router.put('/:orderId', function(req, res, next){
	//Matt & Tom's Sunday
	//May be best practice for all PUT routes
  console.log('You are inside the put route')
	// Order.update({_id: req.params.orderId }, req.body, function(err) {
  //
	// 	if(!err){
  //     console.log('req params orderId', req.params.orderId);
	// 		res.status(200).send("Updated order successfully!");
	// 	} else {
  //     console.log(err);
	// 		res.status(401).send();
	// 	}
  // })
  Order.findById(req.params.orderId)
    .then(function(order) {
        console.log("THIS IS ORDER", order)
    }, function(err) {
        console.error(err)
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
