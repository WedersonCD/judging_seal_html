var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index');
});

router.get('/new_moment', function (req, res) {
    res.render('new_moment',req.query);
});

module.exports = router;