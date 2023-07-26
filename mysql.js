const mysql = require('mysql');
const db    = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatws'
}); 

db.connect(function(err){
    if(err) throw err;
    console.log('Database connected success');
});

module.exports = db;