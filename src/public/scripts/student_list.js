

var studentId;
var deleteForm = document.forms['delete-form']
var editForm = document.forms['edit-form']

$(document).on('click', '#admin-add-student', function () {
    localStorage.setItem('state', 'student-list');
});
$('a[data-bs-toggle="modal"]').click(function () {
    studentId = $(this).data('id');
});
$(document).on('click', '#btn-delete', function () {
    deleteForm.action = '/' + studentId + '?_method=DELETE'
    deleteForm.submit()
    localStorage.setItem('state', 'student-list');
});
$(document).on('click', '#edit-submit', function () {
    editForm.action = '/' + studentId + '?_method=PUT'
    editForm.submit()
    localStorage.setItem('state', 'student-list');
});

function showAddStudentForm() {
    var form = document.getElementById("add-student-form");
    form.style.display = "block";
}
function hideAddStudentForm() {
    var form = document.getElementById("add-student-form");
    form.style.display = "none";
}


$('a[data-bs-toggle="view"]').click(function () {
    studentId = $(this).data('id');

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Phản hồi trả về là dữ liệu JSON, chúng ta có thể giải mã và sử dụng dữ liệu đó để hiển thị trên form
            var studentData = JSON.parse(xhr.responseText);

            // Hiển thị dữ liệu sinh viên trên form (ví dụ, sử dụng jQuery để điền dữ liệu vào các trường input)
            $('#edit-studentID').val(studentData.studentID);
            $('#edit-name').val(studentData.name);
            $('#edit-course_class').val(studentData.course_class);
            $('#edit-date_of_birth').val(studentData.date_of_birth.slice(0, 10));
            $('#edit-sex option[value="' + studentData.sex + '"]').prop('selected', true);
            $('#edit-address').val(studentData.address);
            $('#edit-email').val(studentData.email);
            $('#edit-phone_number').val(studentData.phone_number);
            $('#edit-image').val(studentData.image);
            var form = document.getElementById("edit-student-form");
            form.style.display = "block";

            // ...

        }
    };
    xhr.open('GET', '/student/' + studentId, true);

    xhr.send();

    // Ngăn chặn trình duyệt tải lại trang khi nút xem được nhấp
    return false;



})
function hideEditStudentForm() {
    const formEdit = document.querySelectorAll("form input");
    const editBtn = document.getElementById("edit-submit");
    var form = document.getElementById("edit-student-form");
    form.style.display = "none";
    formEdit.forEach(input => {
        input.setAttribute('disabled', true);
    });
    editBtn.style.display = "none";
}

function showEditBtn() {
    const formEdit = document.querySelectorAll("form input");
    const editBtn = document.getElementById("edit-submit");
    formEdit.forEach(input => {
        input.removeAttribute('disabled');
    });
    editBtn.style.display = "block"
}