$(function() {
  var editor = new MediumEditor("#post-body", {
    placeholder: {
      text: "",
      hideOnClick: true
    }
  });

  //publish
  $(".publish-button").on("click", function(e) {
    e.preventDefault();
    $("p.error").remove();
    $("input").removeClass("error");

    var data = {
      title: $("#post-title").val(),
      body: $("#post-body").html()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/post/add"
    }).done(function(data) {
      if (!data.ok) {
        console.log(data);
        // $(".login h2").after('<p class="error">' + data.error + "</p>");
        // if (data.fields) {
        //   data.fields.forEach(function(item) {
        //     $("input[name=" + item + "]").addClass("error");
        //   });
        // }
      } else {
        // $(".login h2").after('<p class="success">Отлично!</p>');
        // $(location).attr("href", "/");
      }
    });
  });
});
