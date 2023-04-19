
var studentID, courseID,
    deleteForm = document.forms['delete-form'],
    updateMarkForm = document.forms['modify-mark-form']
$('a[data-bs-toggle="modal"]').click(function () {
    studentID = $(this).attr('data-id');
});
$('a[data-bs-toggle="modify"]').click(function () {
    showModifyMark()
    studentID = $(this).attr('data-id');
})

$(document).ready(function () {
    courseID = $('a[data-bs-toggle="getID"]').attr('data-courseID');
})

function deleteStudent(event) {
    event.preventDefault();
    $.ajax({
        type: 'DELETE',
        url: '/course/delete-student/' + studentID + '/' + courseID,
        success: function (data) {
            // Xử lý kết quả trả về nếu có
            alert('Xóa sinh viên thành công');
            $("#completed").load("course-student/completed/" + courseId);
            document.getElementById('#deleteModal').setAttribute('aria-hidden', 'true');
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            alert('Lỗi khi xóa sinh viên: ' + error);
            document.getElementById('#deleteModal').setAttribute('aria-hidden', 'true');
        }
    });
}
function updateMark(event) {
    event.preventDefault();
    const url = '/course/update-mark/' + studentID + '/' + courseID;
    const formData = new FormData(updateMarkForm);

    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 
            alert('Sửa thành công');
            $("#completed").load("course-student/completed/" + courseId);
            hideModifyMark()
        })
        .catch(error => {
            alert('Lỗi khi sửa điểm: ' + error);
        });
}

function showModifyMark() {
    var form = document.getElementById("modify-mark");
    form.style.display = "block";
}

function hideModifyMark() {
    var form = document.getElementById("modify-mark");
    form.style.display = "none";
}

