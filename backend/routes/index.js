var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {

res.send('hello');
//  res.render('index', { title: 'Express' });
});

module.exports = router;
