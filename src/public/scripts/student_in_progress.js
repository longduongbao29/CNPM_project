
var studentID, courseID,
    deleteForm = document.forms['delete-form']
$('a[data-bs-toggle="done"]').click(function () {
    showInputMark()
    studentID = $(this).attr('data-id');
});

$('a[data-bs-toggle="modal"]').click(function () {
    studentID = $(this).attr('data-id');
    console.log(studentID);
});

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
            $("#inprogress").load("course-student/inprogress/" + courseId);

        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            alert('Lỗi khi xóa sinh viên: ' + error);

        }
    });


}
function markSubmit(event) {
    event.preventDefault();
    const url = '/course/complete-course/' + studentID + '/' + courseID
    const formData = new FormData(document.forms['input-mark-form']);

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 
            $("#inprogress").load("course-student/inprogress/" + courseId);
            hideInputMark()

            let status = response.status
            if (status == 200) {
                alert('Thêm thành công');
            } else if (status == 402) {
                alert('Điểm không hợp lệ');
            }
        })
        .catch(error => {
            alert('Lỗi : ' + error);
        });
}

function addSubmit(event) {
    event.preventDefault();
    const url = '/course/add-student/' + courseID
    const formData = new FormData(document.forms['add-student-form']);

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 
            $("#inprogress").load("course-student/inprogress/" + courseId);
            hideAddStudentForm()

            let status = response.status
            if (status == 200) {
                alert('Thêm thành công');
            } else if (status == 400) {
                alert('Sinh viên đã tồn tại');
            }
            else if (status == 401) {
                alert('Không tìm thấy sinh viên');
            }
        })
        .catch(error => {
            alert('Lỗi : ' + error);
        });

}

function showInputMark() {
    var form = document.getElementById("input-mark");
    form.style.display = "block";
}

function hideInputMark() {
    var form = document.getElementById("input-mark");
    form.style.display = "none";
}

function showAddStudentForm() {
    var form = document.getElementById("add-student");
    form.style.display = "block";
}
function hideAddStudentForm() {
    var form = document.getElementById("add-student");
    form.style.display = "none";
}

