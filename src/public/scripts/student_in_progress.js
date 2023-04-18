$('a[data-bs-toggle="done"]').click(function () {
    showInputMark()
    const studentID = $(this).attr('data-id');
    console.log(studentID)

});
function showInputMark() {
    var form = document.getElementById("input-mark");
    form.style.display = "block";
}

function hideInputMark() {
    var form = document.getElementById("input-mark");
    form.style.display = "none";
}


