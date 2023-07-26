$(function() {
    let site_url = window.location.origin;

    const ws = new WebSocket('ws://localhost:3000/users');

    ws.onopen = function(event) {
        console.log('connected');
    };

    ws.onmessage = function(event) {
        console.log(event.data);
    };
});