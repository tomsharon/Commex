'use strict';
var router = require('express').Router();
module.exports = router;

// /api/members
router.use('/members', require('./members'));
// /api/categories
router.use('/categories', require('./categories'));
// /api/orders
router.use('/reviews', require('./reviews'));
// /api/reviews
router.use('/orders', require('./orders'));
// /api/items
router.use('/items', require('./items'))
// /api/users
router.use('/users', require('./users'));
// /api/promos
router.use('/promos', require('./promos'));
// /api/admin
router.use('/admin', require('./admin'))
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
