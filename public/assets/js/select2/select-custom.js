$(document).ready(function () {
    $('.select2-enable').select2({
        placeholder: "Select option",
        width: '100%',
        minimumResultsForSearch: Infinity  // Disable search bar
    });
});
// modal slect2 
$(document).ready(function () {
    $('.select2-modal').select2({
        placeholder: "Select option",
        width: '100%',
        minimumResultsForSearch: Infinity,      
        dropdownParent: $('#deactive-host')   
    });
});
$('#filterModal').on('shown.bs.modal', function () {

    let $modal = $(this);
    $modal.find('.modal-select').each(function () {
        if ($(this).data('select2')) {
            $(this).select2('destroy');
        }
    });
    $modal.find('.modal-select').select2({
        placeholder: "Select option",
        width: "100%",
        minimumResultsForSearch: Infinity,
        dropdownParent: $modal.find('.modal-content')  // perfect fix
    });

});


