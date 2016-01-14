var Item = require("../../../db/models/item");

var router = require('express').Router();
module.exports = router;

// router.get('/secret-stash', ensureAuthenticated, function (req, res, next) {...}
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

// /api/categories/
router.get("/", function(req, res, next) {
	Item.find()
		.then(function(allItems) {
			res.status(200).json(allItems);
		})
		.then(null, next)
})

// /api/categories/categoryName
router.get("/:categoryName", function(req, res, next) {
	console.log(req.params)
	Item.find({ category: req.params.categoryName})
		.then(function(categoryItems) {
			res.status(200).json(categoryItems);
		})
		.then(null, next)
})

// /api/categories/categoryName/itemId
router.get("/:categoryName/:itemId", function(req, res, next) {
	Item.findById(req.params.itemId)
		.then(function(item) {
			res.status(200).json(item);
		})
		.then(null, next)
})