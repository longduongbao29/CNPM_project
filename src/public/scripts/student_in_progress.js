
var studentID, courseID,
    deleteForm = document.forms['delete-form']
$('a[data-bs-toggle="done"]').click(function () {
    showInputMark()
    studentID = $(this).attr('data-id');
});

$('a[data-bs-toggle="modal"]').click(function () {
    studentID = $(this).attr('data-id');
    console.log(studentID);
});

$(document).ready(function () {
    courseID = $('a[data-bs-toggle="getID"]').attr('data-courseID');
})

$(document).on('click', '#delete-student-btn', function () {
    console.log('delete')
    deleteForm.action = '/course/delete-student/' + studentID + '/' + courseID + '?_method=DELETE'
    deleteForm.submit()
});
function markSubmit() {
    var form = document.forms['input-mark-form'];
    form.action = '/course/complete-course/' + studentID + '/' + courseID;
    form.submit();
}

function addSubmit() {
    var form = document.forms['add-student-form'];
    form.action = '/course/add-student/' + courseID;
    form.submit();
}

function showInputMark() {
    var form = document.getElementById("input-mark");
    form.style.display = "block";
}

function hideInputMark() {
    var form = document.getElementById("input-mark");
    form.style.display = "none";
}

function showAddStudentForm() {
    var form = document.getElementById("add-student");
    form.style.display = "block";
}
function hideAddStudentForm() {
    var form = document.getElementById("add-student");
    form.style.display = "none";
}

