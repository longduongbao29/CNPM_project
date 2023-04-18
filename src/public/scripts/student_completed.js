$('a[data-bs-toggle="modify"]').click(function () {
    showModifyMark()
    const studentID = $(this).attr('data-id');
    console.log(studentID)

});
function showModifyMark() {
    var form = document.getElementById("modify-mark");
    form.style.display = "block";
}

function hideModifyMark() {
    var form = document.getElementById("modify-mark");
    form.style.display = "none";
}

