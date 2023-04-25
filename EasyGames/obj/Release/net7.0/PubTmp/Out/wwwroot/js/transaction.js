$(document).ready(function () {

    $('#myTable').DataTable();

    var transactionID = "";

    $("#addTransactionBtn").click(function () {
        $("#addTransactionModal").modal("show");
    });

    $("#editbutton").click(function () {
        $("#editCommentModal").modal("show");
    });

    $('#editCommentModal .btn-close').click(function () {
        $('#editCommentModal').modal('hide');
    });

    var commentInput = $("#commentInput");
    var saveCommentBtn = $("#saveCommentBtn");
    var editCommentModal = $("#editCommentModal");

    $(".edit-comment-btn").click(function () {
        
        var comment = $(this).closest("tr").find(".comment").text();

        transactionID = $(this).data("transactionid");


        commentInput.val(comment);

        
        editCommentModal.modal("show");
    });

    saveCommentBtn.click(function () {
        debugger
        var updatedComment = commentInput.val();

        $.ajax({
            url: "/Client/UpdateTransaction",
            type: "POST",
            data: {
                comment: updatedComment,
                transactionID: transactionID
            },
            success: function (response) {

                $("#editCommentModal").modal("hide");

                var toast = `
                    <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="10000">
                        <div class="d-flex">
                            <div class="toast-body">
                                Transaction updated successfully.
                            </div>
                            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                        `;

                $("#toastContainer").append(toast);

                var toastEl = $("#toastContainer .toast").last();
                var toast = new bootstrap.Toast(toastEl.get(0));
                toast.show();


                setTimeout(function () {
                    location.reload();
                }, 2000);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
               
            }
        });
    });

    $("#addTransactionForm").submit(function (e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: "/Client/AddTransaction",
            type: "POST",
            data: formData,
            success: function (result) {

                $("#addTransactionModal").modal("hide");
                
                var toast = `
                    <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="10000">
                        <div class="d-flex">
                            <div class="toast-body">
                                Transaction added successfully.
                            </div>
                            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                        `;

                $("#toastContainer").append(toast);

                var toastEl = $("#toastContainer .toast").last();
                var toast = new bootstrap.Toast(toastEl.get(0));
                toast.show();


                setTimeout(function () {
                    window.location.href = '/Client/Index';
                }, 2000);
            },
            error: function (xhr, status, error) {
                
            }
        });
    });

});

function addNewTransaction() {
    alert("working");
}