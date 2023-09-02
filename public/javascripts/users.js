let url         = "ws://192.168.1.8:3000/users";
let my_id       = '';
let target      = '';
let chats       = {
    statusConnect: false,
    target: '',
    lastSession: Date.now() 
};

$(function() {
    sync();
    // my_id       = genereateID();    
    my_id        = $('#mytags').val();

    $('.contact').on('click', function(e) {
        chats.target  = $(this).data('tag');
        if(confirm("Connect to user?")) {
            $('#chats').html('');

            const wsChat = new WebSocket(url.concat("?target="+chats.target+"&from="+my_id));

            wsChat.onopen = function(event) {
                setTimeout(() => {
                    console.log('connected');
                    Swal.fire('Connection success', '', 'success');
                    chats.statusConnect = true;
                    chats.lastSession   = Date.now();
                    sync();
                    // $('#modalConnect').modal('hide');
                }, 1000);
            };

            wsChat.onmessage = function(event) {
                console.log(event.data);
                let resp = JSON.parse(event.data);

                if(resp?.status) {
                    let type = (resp?.user === my_id)? 'chat-me' : 'chat-from';
                    $('#chats').append(`<div class="${type}">${resp?.text}</div>`);
                }
            };

            wsChat.onerror = function(event) {
                Swal.close();
                alert("Failed connect to " + tags);
                chats.statusConnect = false;
                chats.lastSession   = Date.now();
                chats.target        = '';
            }


            $('#send_message').on('click', function(evt) {
                console.log(evt);
                if(!chats.statusConnect) {
                    Swal.fire('Failed', 'You are not connected with other user', 'error');
                }

                wsChat.send($('#message').val());
                $('#message').val('');
            })
        }
    })
})

function genereateID() {
    var length = 20,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function sync(code = '') {
    if(chats.statusConnect) {
        $('.chat-welcome').hide();
        $('.chat-view').show();
    } else {
        $('.chat-welcome').show();
        $('.chat-view').hide();
        // $('#form_send').hide();
        // $('#chats').html('<div class="start-chat">Klik user untuk memulai chat</div>');
    }
        
}