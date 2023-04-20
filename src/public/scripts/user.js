$(document).on('click', '#home', function () {
    $("#displayHTML").load("home");
});
$(document).on('click', '#courses_in_progress', function () {
    $("#displayHTML").load("courses-in-progress");
});
$(document).on('click', '#timetable', function () {
    $("#displayHTML").load("timetable");
});
$(document).on('click', '#attendance', function () {
    $("#displayHTML").load("attendance");
});
$(document).on('click', '#mark', function () {
    $("#displayHTML").load("completed-courses");
});
$(document).on('click', '#profile', function () {
    $("#displayHTML").load("profile");
});

$(document).ready(function () {
    $("#displayHTML").load("home");
})