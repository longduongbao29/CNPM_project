
var studentID, courseID,
    deleteForm = document.forms['delete-form'],
    updateMarkForm = document.forms['modify-mark-form']
$('a[data-bs-toggle="modal"]').click(function () {
    studentID = $(this).attr('data-id');
});
$('a[data-bs-toggle="modify"]').click(function () {
    showModifyMark()
    studentID = $(this).attr('data-id');
})

$(document).ready(function () {
    courseID = $('a[data-bs-toggle="getID"]').attr('data-courseID');
})

$(document).on('click', '#delete-student-btn', function () {
    deleteForm.action = '/course/delete-student/' + studentID + '/' + courseID + '?_method=DELETE'
    deleteForm.submit()
});
function updateMark() {
    updateMarkForm.action = '/course/update-mark/' + studentID + '/' + courseID + '?_method=PUT'
    updateMarkForm.submit()
}
function showModifyMark() {
    var form = document.getElementById("modify-mark");
    form.style.display = "block";
}

function hideModifyMark() {
    var form = document.getElementById("modify-mark");
    form.style.display = "none";
}

$(document).on('click', '#delete-student-btn', function () {
    console.log('delete')
    deleteForm.action = '/course/delete-student/' + studentID + '/' + courseID + '?_method=DELETE'
    deleteForm.submit()
});