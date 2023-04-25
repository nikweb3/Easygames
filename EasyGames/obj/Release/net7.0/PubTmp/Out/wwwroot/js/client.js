$(document).ready(function () {
    $('#myTable').DataTable();
});

function viewTransactions(clientId) {
    $.ajax({
        url: '/Client/Transactions',
        type: 'GET',
        data: { clientId: clientId },
        success: function (result) {
            window.location.href = '/Client/Transactions?clientId=' + clientId;
        },
        error: function (xhr, status, error) {
            
        }
    });
}
