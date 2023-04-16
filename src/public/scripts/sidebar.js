
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");



searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})


function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/logout", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

});

toggle.addEventListener('click', function () {
    sidebar.classList.toggle("close");
});
