$(function() {
    let site_url = window.location.origin;
    $('#form-login').on('submit', function(event) {
        event.preventDefault();
        
        $.ajax({
            url: site_url,
            type: 'POST',
            dataType: 'json',
            data: $('#form-login').serialize(),
            success: function(resp) {
                Swal.fire(
                    resp.heading,
                    resp.message,
                    (resp.success)? 'success' : 'error'
                ).then(function() {
                    if(resp.success) {
                        location.href = '/users';
                    };
                })
            }
        })
    });
});