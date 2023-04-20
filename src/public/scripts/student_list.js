var studentId;
var deleteForm = document.forms['delete-form']
var editForm = document.forms['edit-form']
var addStudentForm = document.forms['add-student-form']

function addStudent(event) {
    event.preventDefault();
    const url = '/store-student'
    const formData = new FormData(addStudentForm);

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 

            if (response.status == 200) {
                alert('Thêm thành công');
            }
            else if (response.status == 402) {
                alert('Sinh viên đã tồn tại');
            }
            else {
                alert('Lỗi đảm bảo MÃ SỐ SINH VIÊN phải là chuỗi số có độ dài 8')
            }
            $("#displayHTML").load("student-list");


        })
        .catch(error => {
            alert('Lỗi : ' + error);
        });


}

$('a[data-bs-toggle="modal"]').click(function () {
    studentId = $(this).data('id');
});
function deleteStudent(event) {
    event.preventDefault();
    $.ajax({
        type: 'DELETE',
        url: '/' + studentId + '/delete-student',
        success: function (data) {
            // Xử lý kết quả trả về nếu có
            alert('Xóa sinh viên thành công');
            $("#displayHTML").load("student-list");
            var style = document.createElement('style');
            style.textContent = '.modal-backdrop { display: none; }';
            document.head.appendChild(style);

        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            alert('Lỗi khi xóa sinh viên: ' + error);
            var style = document.createElement('style');
            style.textContent = '.modal-backdrop { display: none; }';
            document.head.appendChild(style);
        }
    });
}

function editStudent(event) {
    event.preventDefault();
    const url = '/' + studentId + '/update-student'
    const formData = new FormData(editForm);

    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 
            if (response.status == 200) {
                alert('Sửa thành công');
            }
            else if (response.status == 401) {
                alert('Lỗi : Mã số sinh viên phải dài 8 ký tự')
            }
            $("#displayHTML").load("student-list");


        })
        .catch(error => {
            alert('Lỗi : ' + error);
        });
}

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
    const formEdit = document.getElementById("edit-form");
    const inputs = formEdit.querySelectorAll('input');
    const editBtn = document.getElementById("edit-submit");
    inputs.forEach(input => {
        input.setAttribute('disabled', true);
    });
    const selectedInput = formEdit.querySelector('select');
    selectedInput.setAttribute('disabled', true);
    editBtn.style.display = "none";
    var form = document.getElementById("edit-student-form");
    form.style.display = "none";

}

function showEditBtn() {
    const formEdit = document.getElementById("edit-form");
    const inputs = formEdit.querySelectorAll('input');

    const editBtn = document.getElementById("edit-submit");
    inputs.forEach(input => {
        input.removeAttribute('disabled', true);
    });
    const selectedInput = formEdit.querySelector('select');
    selectedInput.removeAttribute('disabled', true);
    editBtn.style.display = "block"
}