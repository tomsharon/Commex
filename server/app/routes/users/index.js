'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = require("../../../db/models/user");

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() || req.user.isAdmin) {
        next();
    } else {
        res.status(401).end();
    }
};

var ensureAdmin = function(req, res, next){
	if (req.user.isAdmin){
		next();
	} else {
		res.status(401).end();
	}
}

//read all
router.get('/', ensureAdmin, function(req, res, next){
	User.find().exec()
	.then(function(results){
		res.send(results);
	});
});

//create
router.post('/', function(req, res, next){
	User.create(req.body)
	.then(function(result){
		res.status(201).send(result);
	});
});

//read one
router.get('/:userId', function(req, res, next){
	if(req.user._id == req.params.userId || req.user.isAdmin){
		User.findOne({ _id: req.params.userId } ).exec()
		.then(function(result){
			res.send(result);
		});
	} else {
		res.status(401).send()
	}
});

//update
router.put('/:userId', ensureAuthenticated, function(req, res){
  User.findOne({_id: req.params.userId}).exec()
  .then(function(user){
    if(req.user._id == req.params.userId || req.user.isAdmin){
      User.update({ _id: req.params.userId}, req.body, function(err) {
        if(!err){
          res.status(200).send();
        } else {
          console.error(err);
          res.status(404).send();
        }
      });
    } else {
      res.status(401).send()
    }
  })
});

//delete
router.delete('/:userId', ensureAdmin, function(req, res){
	User.findOne({ _id: req.params.userId } ).remove().exec()
	.then(function(result){
		res.sendStatus(200);
	});
});

module.exports = router;
