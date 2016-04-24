$(document).ready(function () {
    // this is the id of the form
    $("#youtubeEditForm").submit(function (e) {
        console.log('yoloswgagg');
        var url = "/youtubeplayer/edit"; // the script where you handle the form input.

        $.ajax({
            type: "GET"
            , url: url
            , data: $("#youtubeEditForm").serialize(), // serializes the form's elements.
            success: function (data) {
                var url = "https://www.youtube.com/embed/videoseries?list="+data.newUrl;
                $("#youtubePlayer").attr("src", url);
                $('#youtubeEditModal').closeModal();
                Materialize.toast('Youtube player edited', 3000, 'rounded');
            }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
});