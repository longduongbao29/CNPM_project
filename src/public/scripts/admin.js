
$(document).on('click', '#admin-students', function () {
    $.ajax({
        url: '/student-list',
        method: 'GET',
        success: function (data) {
            $('#displayHTML').html(data);
        },
        error: function (error) {
            console.log(error);
        }
    });

})


