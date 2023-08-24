var express     = require('express');
var router      = express.Router();
// var db          = require('../mysql');
const requestIp = require('request-ip');
var crypto      = require('crypto');
const { body, validationResult } = require("express-validator");
var session;
var db; 

// const generateCode = (length = 10) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     let result  = '';

//     // Create an array of 32-bit unsigned integers
//     const randomValues = new Uint32Array(length);
    
//     // Generate random values
//     crypto.getRandomValues(randomValues);
//     randomValues.forEach((value) => {
//         result += characters.charAt(value % charactersLength);
//     });
//     return result;
// };

// const createHash = (password, salt) => {
//     var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 

//     return hash;
// };

/* GET home page. */
router.get('/', function(req, res, next) {
    db  = res.locals.db;
    session = req.session;
    if(session.userid) return res.redirect('/users');
    
    res.render('login', { title: 'Login to Application', message: req.flash()});
    
}).post(
    '/', 
    body('username', "Empty username").trim().isLength({ min: 1 }).escape(), 
    body('password', "Empty Password").trim().isLength({ min: 1 }).escape(), 
    (req, res) => {
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(200).json({
                success: false,
                heading: 'Failed',
                message: 'Please fill Username and Password'
            });
        }

        let query = `SELECT * FROM tb_users WHERE username='${req.body.username}' AND password='${req.body.password}'`; 
        db.query(query, (err, result, fields) => {
            if(err) throw err;
            
            if(result.length == 0) {
                return res.status(200).json({
                    success: false,
                    heading: 'Failed',
                    message: 'Username and password not registered'
                });
            }

            session         = req.session;
            session.userid  = result[0].code;
            session.mytags  = result[0].tags;
            let new_ip      = requestIp.getClientIp(req);

            if(result[0].ip_address != new_ip) {
                db.query(`UPDATE tb_users SET ip_address='${new_ip}' WHERE id=${result[0].id}`, (err, result, fields) => {
                    if(err) throw err;
                });
            }

            return res.status(200).json({
                success: true,
                message: "Login successfull",
                heading: "Success"
            });
        });
    }
);

module.exports = router;
