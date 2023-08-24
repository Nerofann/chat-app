var express     = require('express');
var router      = express.Router();
var socket      = require('../socket');
// const db    = require('../mysql');
var db;

let title       = "Live Chat App";
let siteUrlWS   = socket.siteurl;

/* GET users listing. */
router.get('/', function(req, res, next) {
    db = res.locals.db;
    // if(!req.session.userid) return res.redirect('/');    
    let query = `
        SELECT 
            tb_contact.c_id,
            a.fullname,
            a.tags,
            a.code
        FROM tb_contact
        JOIN tb_users a ON (tb_contact.c_other = a.id)
        WHERE tb_contact.c_self = (SELECT b.id FROM tb_users b WHERE code = '${req.session.userid}')
    `;
    db.query(query, function(err, result, fields) {
        if(err) throw err;

        res.render('index', { title: title, user: 'Client', contact: result, mytag: req.session.mytags});
    });
});


router.get('/c/:target', function(req, res, next) {
    // socket.on('connection', function(ws, reqws) {
    //     console.log(socket.validate(req.url, reqws));
    // })
    console.log('test');
    // res.render('index', {title: title, contact: []});
});

router.use(function(req, res, next) {
    res.render('404');
})



/**
 * Function Event listener
 */

module.exports = router;
