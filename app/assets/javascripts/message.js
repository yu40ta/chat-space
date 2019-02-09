$(function() {
  $('.form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      datatype: "json",
      processData: false,
      contentType: false
    });
  });
});
