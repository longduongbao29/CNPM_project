$(document).ready(function () {
    $('#admin-students').click(function () {
        $.ajax({
            url: '/student-list',
            method: 'GET',
            success: function (data) {
                document.getElementById('displayHTML').innerHTML = data;
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

$(document).on('click', '#admin-add-student', function () {
    // Xử lý sự kiện click ở đây
    $.ajax({
        url: '/add-student',
        method: 'GET',
        success: function (data) {
            document.getElementById('displayHTML').innerHTML = data;
        },
        error: function (error) {
            console.log(error);
        }
    });
});