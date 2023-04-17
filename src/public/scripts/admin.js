
$(document).on('click', '#admin-students', function () {
    $("#displayHTML").load("student-list");
});
$(document).on('click', '#admin-courses', function () {
    $("#displayHTML").load("course-list");
});
$(document).ready(function () {
    const state = localStorage.getItem('state');
    if (state != null) {
        $("#displayHTML").load(state);
        localStorage.removeItem('state');
    }
})
