(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
    }); // end of document ready
})(jQuery); // end of jQuery name space

$(function(){
  $("#password_check").keyup(function() {
      if($(this).val()!=$(".password").val()){
        $(this).get(0).setCustomValidity("Passwords Don't Match");
      }else{
        $(this).get(0).setCustomValidity("");
      }
    });
  });
