'use strict';
var router = require('express').Router();
module.exports = router;

// /api/members
router.use('/members', require('./members'));
// /api/categories
router.use('/categories', require('./categories'));
// /api/reviews
router.use('/reviews', require('./reviews'));
// /api/orders
router.use('/orders', require('./orders'));
// /api/items
router.use('/items', require('./items'))
// /api/users
router.use('/users', require('./users'));
// /api/promos
router.use('/promos', require('./promos'));
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});