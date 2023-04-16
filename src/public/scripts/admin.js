
$(document).on('click', '#admin-students', function () {
    $("#displayHTML").load("student-list");
});
$(document).ready(function () {
    const state = localStorage.getItem('state');
    if (state != null) {
        $("#displayHTML").load(state);
    }
})
