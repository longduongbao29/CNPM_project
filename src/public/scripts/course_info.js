$(document).on('click', '#back', function () {
    $("#displayHTML").load("course-list");
});

var btn = document.querySelector('.btn-link'); // Lấy phần tử có class là 'btn-link'
var courseId = btn.getAttribute('data-id'); // Lấy giá trị của thuộc tính 'data-id'

$(document).ready(function () {
    $("#inprogress").load("course-student/inprogress/" + courseId);
})
$('a[data-bs-toggle="inprogress"]').click(function () {
    $("#inprogress").load("course-student/inprogress/" + courseId);
});
$('a[data-bs-toggle="completed"]').click(function () {
    $("#completed").load("course-student/completed/" + courseId);
});