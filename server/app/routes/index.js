'use strict';
var router = require('express').Router();
module.exports = router;

// /api/members
router.use('/members', require('./members'));
// /api/categories
router.use('/categories', require('./categories'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
