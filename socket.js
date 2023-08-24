/**
 * Create Websocket
 */
var app         = require('./app');
var http        = require('http');
var websocket   = require('ws');
var server      = http.createServer(app);
var socket      = new websocket.Server({server: server, path: '/users'});
const port      = 8080;
let client      = new Set();

socket.siteurl  = "ws://localhost:".concat(port);
socket.validate = (url, req) => {
    if(req.headers.upgrade.toLowerCase() !== "websocket") return "unauthorized";
    // else if(req.url !== url) return "invalid request url";
    console.log(req.url);
    return true;
};

socket.on('connection', function(ws, req) {
    // console.log(req.socket.remoteAddress + ' Connected to ' + req.url);
    let urls = new URLSearchParams(req.url.substring(req.url.indexOf('?')));

    if(urls.get('connect')) {
        console.log('connect' + urls.get('connect'));
        client.add({
            cws: ws,
            cid: urls.get('connect')
        });

    }else if(urls.get('target') && urls.get('from')) {
        console.log('from' + urls.get('from'));
        
        // socket.close();
        for(let cli of client) {
            if(cli.cid === urls.get('target')) {
                // ws.send('test');
                cli.cws.send(`Client ${urls.get('from')} connect with you`);
            }
        }

    } else {
        ws.close(1001, 'Sorry');
    }
});

server.listen(port);
server.on('error', (err) => {
    console.error(err);
});

server.on('listening', (val) => {
    console.log('Server listening on port: ' + port);
})




module.exports = socket;