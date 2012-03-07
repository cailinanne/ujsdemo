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
    $('.article a').on('ajax:error', function(event, xhr, status, error) {
        alert("error: " + error);
    });

    // Handle the hide functionality
    $('.article a.hide').on('click', function(event) {
        event.preventDefault();
        $(this).parents('div.article').find('.details').empty();
        return false;
    });

    // JAVASCRIPT FOR THE NEW ARTICLE PAGE

    // Parse the JSON response and replace the <form> with the successfully created article
    $('form.new_article').on('ajax:success',function(event, data, status, xhr){
        $(this).replaceWith('<div>Title: ' + data.title + '</div>' +'<div>Body: ' + data.body + '</div>');
    });


    // Parse the JSON response and generate an unordered list of errors, then stick it inside
    // <div class="errors"> which is in our view template
    $('form.new_article').on('ajax:error',function(event, xhr, status, error){

        var responseObject = $.parseJSON(xhr.responseText), errors = $('<ul />');

        $.each(responseObject, function(index, value){
          errors.append('<li>' + index + ':' + value + '</li>');
        })

        $(this).find('.errors').html(errors);
    });

});