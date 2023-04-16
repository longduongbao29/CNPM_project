var studentId;
var deleteForm = document.forms['delete-form']
var btnDel = document.getElementById('btn-delete')


$('#deleteModal').on('shown.bs.modal', function (event) {
    console.log('yes')
    var button = $(event.relatedTarget)
    studentId = button.data('id')

})

btnDel.onclick = function () {
    console.log(studentId)
    deleteForm.action = '/' + studentId + '?_method=DELETE'
    deleteForm.submit()

}


$(document).on('click', '#add-student', function () {
    $('#displayHTML').load('add-student');
})
