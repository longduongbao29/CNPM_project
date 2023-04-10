var li_items = document.querySelectorAll(".side_bar_bottom ul li");
var side_bar_menu = document.querySelector(".side_bar_menu");
var wrapper = document.querySelector(".wrapper");

li_items.forEach(function (li_main) {
    li_main.addEventListener("click", function () {
        li_items.forEach(function (li) {
            li.classList.remove("active");
        })
        li_main.classList.add("active");
    })
})

side_bar_menu.addEventListener("click", function () {
    wrapper.classList.toggle("active");
});


$(document).ready(function () {
    $('#home').click(function () {
        $.ajax({
            url: '/home',
            method: 'GET',
            success: function (data) {
                $('#displayHTML').html(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

$(document).ready(function () {
    $('#courses_in_progress').click(function () {
        $.ajax({
            url: '/courses-in-progress',
            method: 'GET',
            success: function (data) {
                $('#displayHTML').html(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

$(document).ready(function () {
    $('#timetable').click(function () {
        $.ajax({
            url: '/timetable',
            method: 'GET',
            success: function (data) {
                $('#displayHTML').html(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

$(document).ready(function () {
    $('#attendance').click(function () {
        $.ajax({
            url: '/attendance',
            method: 'GET',
            success: function (data) {
                $('#displayHTML').html(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});


$(document).ready(function () {
    $('#mark').click(function () {
        $.ajax({
            url: '/completed-courses',
            method: 'GET',
            success: function (data) {
                $('#displayHTML').html(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
$(document).ready(function () {
    $('#profile').click(function () {
        $.ajax({
            url: '/profile',
            method: 'GET',
            success: function (data) {
                $('#displayHTML').html(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
