/**
 * Create Websocket
 */
var app         = require('./app');
var http        = require('http');
var websocket   = require('ws');
var server      = http.createServer(app);
var socket      = new websocket.Server({server: server, path: '/users'});
const port      = 8080;

socket.siteurl  = "ws://localhost:".concat(port);
socket.validate = (url, req) => {
    if(req.headers.upgrade.toLowerCase() !== "websocket") return "unauthorized";
    // else if(req.url !== url) return "invalid request url";
    console.log(req.url);
    return true;
};

socket.on('connection', function(ws, req) {
    console.log(req.socket.remoteAddress + ' Connected to ' + req.url);
});

server.listen(port);
server.on('error', (err) => {
    console.error(err);
});

server.on('listening', (val) => {
    console.log('Server listening on port: ' + port);
})




module.exports = socket;