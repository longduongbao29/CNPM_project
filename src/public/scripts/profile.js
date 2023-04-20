function showChangePassword() {
    var form = document.getElementById("change-password");
    form.style.display = "block";
}

function hideChangePassword() {
    var form = document.getElementById("change-password");
    form.style.display = "none";
}

function changePassword(event) {
    event.preventDefault();

    const url = '/change-password'
    const formData = new FormData(document.forms['change-password-form']);

    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            // Xử lý response tại đây 
            let status = response.status
            if (status == 200) {
                alert('Sửa mật khẩu thành công')
            }
            else if (status == 401) {
                alert('Mật khẩu mới không khớp')
            }
            else if (status == 402) {
                alert('Mật khẩu hiện tại không đúng')
            }
            $("#displayHTML").load("profile");
        })
        .catch(error => {
            alert('Lỗi : ' + error);
        });
}