
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

function saveDarkmode(state) {
    localStorage.setItem('darkmode', state);
}

function getDarkmode() {
    return localStorage.getItem('darkmode');
}
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        saveDarkmode('dark')
        modeText.innerText = "Light mode";
    } else {
        saveDarkmode('light')
        modeText.innerText = "Dark mode";

    }


});

function saveSidebarState(state) {
    localStorage.setItem('sidebarState', state);
}

// Lấy trạng thái của thanh sidebar từ localStorage
function getSidebarState() {
    return localStorage.getItem('sidebarState');
}
// Lưu trạng thái của thanh sidebar vào localStorage khi người dùng click vào nút mở hoặc đóng thanh sidebar
toggle.addEventListener('click', function () {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains('close')) {
        saveSidebarState('close');
    } else {
        saveSidebarState('open');
    }
});

// Lấy trạng thái của thanh sidebar từ localStorage và áp dụng nó cho thanh sidebar khi trang được tải lại
window.addEventListener('load', function () {
    var darkmode = getDarkmode();
    console.log(darkmode);
    if (darkmode === 'dark') {
        body.classList.add("dark");
    }
    else {
        body.classList.remove("dark");
    }

    var sidebarState = getSidebarState();

    if (sidebarState === 'close') {
        sidebar.classList.add('close');
    } else {
        sidebar.classList.remove('close');
    }


});
