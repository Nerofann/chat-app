var express     = require('express');
var router      = express.Router();
// const db    = require('../mysql');
var db;

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

        res.render('index', { title: 'Live Chat App', user: 'Client', contact: result});
    });
});

module.exports = router;
