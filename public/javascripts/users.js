let url = "ws://localhost:8080/users"; 
$(function() {

});

function _chatTo(tags = false) {
    if(!tags) return alert('Failed');
    
    const wsChat = new WebSocket(url.concat("?target="+tags+"&type=chat"));
    wsChat.onopen = function(event) {
        console.log('connected');
    };

    wsChat.onerror = function(event) {
        alert("Failed connect to " + tags);
    }
}
// function _loadContact() {
//     const wsContact = new WebSocket(url.concat("?request=getContact"));
//     wsContact.onopen = function(event) {
//         console.log('connected');
//     };

//     wsContact.onerror = function(event) {
//         alert("Failed connect to server");
//     }
// }