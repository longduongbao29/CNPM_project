var courseId;
var deleteForm = document.forms['delete-form']
var editForm = document.forms['edit-form']
var addCourseForm = document.forms['add-course-form']

function addCourse(event) {
    event.preventDefault();
    const url = '/store-course'
    const formData = new FormData(addCourseForm);

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 
            alert('Thêm thành công');
            $("#displayHTML").load("course-list");

        })
        .catch(error => {
            alert('Lỗi : ' + error);
        });


}

function deleteCourse(event) {
    event.preventDefault();
    $.ajax({
        type: 'DELETE',
        url: '/' + courseId + '/delete-course',
        success: function (data) {
            // Xử lý kết quả trả về nếu có
            alert('Xóa khóa học thành công');
            $("#displayHTML").load("course-list");
            var style = document.createElement('style');
            style.textContent = '.modal-backdrop { display: none; }';
            document.head.appendChild(style);

        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            alert('Lỗi khi xóa khóa học: ' + error);
            var style = document.createElement('style');
            style.textContent = '.modal-backdrop { display: none; }';
            document.head.appendChild(style);
        }
    });
}

function editCourse(event) {
    event.preventDefault();
    const url = '/' + courseId + '/update-course'
    const formData = new FormData(editForm);

    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 
            alert('Sửa thành công');
            $("#displayHTML").load("course-list");
        })
        .catch(error => {
            alert('Lỗi : ' + error);
        });
}


$('a[data-bs-toggle="modal"]').click(function () {
    courseId = $(this).data('id');
});


function showAddCourseForm() {
    var form = document.getElementById("add-course-form");
    form.style.display = "block";
}
function hideAddCourseForm() {
    var form = document.getElementById("add-course-form");
    form.style.display = "none";
}


$('a[data-bs-toggle="view"]').click(function () {
    courseId = $(this).data('id');

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Phản hồi trả về là dữ liệu JSON, chúng ta có thể giải mã và sử dụng dữ liệu đó để hiển thị trên form
            var courseData = JSON.parse(xhr.responseText);

            // Hiển thị dữ liệu sinh viên trên form (ví dụ, sử dụng jQuery để điền dữ liệu vào các trường input)
            $('#edit-course_ID').val(courseData.course_ID);
            $('#edit-course_name').val(courseData.course_name);
            $('#edit-course_credits').val(courseData.course_credits);
            $('#edit-num_of_lessons').val(courseData.num_of_lessons);
            $('#edit-teacher_name').val(courseData.teacher_name);
            $('#edit-num_of_pupils').val(courseData.num_of_pupils);
            $('#edit-room').val(courseData.room);
            $('#edit-date_time').val(courseData.date_time);
            var form = document.getElementById("edit-course-form");
            form.style.display = "block";

            // ...

        }
    };
    xhr.open('GET', '/course/' + courseId, true);

    xhr.send();

    // Ngăn chặn trình duyệt tải lại trang khi nút xem được nhấp
    return false;



})
function hideEditCourseForm() {
    const formEdit = document.getElementById("edit-form");
    const inputs = formEdit.querySelectorAll('input');
    const editBtn = document.getElementById("edit-submit");
    inputs.forEach(input => {
        input.setAttribute('disabled', true);
    });
    editBtn.style.display = "none";
    var form = document.getElementById("edit-course-form");
    form.style.display = "none";

}

function showEditBtn() {
    const formEdit = document.getElementById("edit-form");
    const inputs = formEdit.querySelectorAll('input');
    const editBtn = document.getElementById("edit-submit");
    inputs.forEach(input => {
        input.removeAttribute('disabled', true);
    });
    editBtn.style.display = "block"
}

$('a[data-bs-toggle="entryclass"]').click(function () {
    courseId = $(this).data('id');
    $("#displayHTML").load("course-info/" + courseId);
});