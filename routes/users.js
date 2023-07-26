var express = require('express');
var router  = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // if(!req.session.userid) res.redirect('/');    
    
    res.render('index', { title: 'Live Chat App' });
});

module.exports = router;
