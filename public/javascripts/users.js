let url         = "ws://localhost:8080/users";
let my_id       = '';
let target      = '';

$(function() {
    // my_id       = genereateID();    
    my_id        = $('#mytags').val();
    const ws     = new WebSocket(url.concat("?connect="+my_id));
    
    $('.contact').on('click', function(e) {
        target  = $(this).data('tag');
        if(confirm("Connect to user?")) {

            const wsChat = new WebSocket(url.concat("?target="+target+"&from="+my_id));

            wsChat.onopen = function(event) {
                setTimeout(() => {
                    console.log('connected');
                    Swal.fire('Connection success', '', 'success');
                    // $('#modalConnect').modal('hide');
                }, 1000);
            };

            wsChat.onmessage = function(event) {
                console.log(event.data);
            };
        }
    });
});

function _chatTo(tags = false) {
    if(!tags) return alert('Failed');
    
    
    
    // wsChat.onopen = function(event) {

    //     setTimeout(() => {
    //         console.log('connected');
    //         Swal.fire('Connection success', '', 'success');
    //         // $('#modalConnect').modal('hide');
    //     }, 1000);
    // };
    
    // wsChat.onmessage = function(event) {
    //     console.log(event.data);
    // };

    // wsChat.onerror = function(event) {
    //     Swal.close();
    //     alert("Failed connect to " + tags);
    // }
}

function genereateID() {
    var length = 20,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
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