jQuery(function($) {

    // JAVASCRIPT FOR THE INDEX PAGE

    // Callback for rendering via JSON
    $('.article a[data-type=json]').on('ajax:success', function(event, data, status, xhr) {
        $(this).parents('div.article').find('.details').html('<div>Title: ' + data.title + '</div>' +'<div>Body: ' + data.body + '</div>');
    });

    // Callbacks for rendering via HTML
    $('.article a[data-type=html]').on('ajax:success', function(event, data, status, xhr) {
        $(this).parents('div.article').find('.details').html(data);
    });

    // Handle any AJAX errors (via JS, via JSON or via HTML)
    $('.article a').on('ajax:error', function(event, xhs, status, error) {
        alert("error: " + error);
    });

    // Handle the hide functionality
    $('.article a.hide').on('click', function(event) {
        event.preventDefault();
        $(this).parents('div.article').find('.details').empty();
        return false;
    });

});