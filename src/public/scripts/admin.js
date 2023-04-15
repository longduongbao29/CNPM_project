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
    $("#displayHTML").load("add-student");
});

$(document).on('click', '#deleteModal', function () {
    var studentId;
    var deleteForm = document.forms['delete-form']
    var btnDel = document.getElementById('btn-delete')
    $('#deleteModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        studentId = button.data('id')
    })

    btnDel.onclick = function () {
        deleteForm.action = '/' + studentId + '?_method=DELETE'
        deleteForm.submit()
    }

});

