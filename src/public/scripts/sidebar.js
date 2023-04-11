
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";

    }
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


$(document).ready(function () {
    $("#displayHTML").load("home");
});
function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/logout", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}