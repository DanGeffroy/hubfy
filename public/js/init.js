(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
        bindLinks("#youtubeAddButton", callBackYoutube);
    }); // end of document ready
})(jQuery); // end of jQuery name space

function bindLinks(href, callBack) {
    $(href).click(function (event) {
        event.preventDefault();

        var url = $(this).attr('href');
        $.ajax({
            type: 'GET'
            , url: url
            , contentType: 'application/json'
            , success: callBack
        });
    });
};

function callBackYoutube(data) {
    if(data.status === "error"){
         Materialize.toast('Youtube player already on hub', 3000, 'rounded');
    }else{
        //refreshing
        location.reload();
    }
}