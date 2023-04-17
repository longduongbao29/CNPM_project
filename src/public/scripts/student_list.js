
$(document).on('click', '#admin-add-student', function () {
    localStorage.setItem('state', 'student-list');
});
var studentId;
var deleteForm = document.forms['delete-form']
$('a[data-bs-toggle="modal"]').click(function () {
    studentId = $(this).data('id');
});
$(document).on('click', '#btn-delete', function () {
    deleteForm.action = '/' + studentId + '?_method=DELETE'
    deleteForm.submit()
    localStorage.setItem('state', 'student-list');
});