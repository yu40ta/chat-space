$(function() {
  $('.form').on('submit', function(e) {
    e.preventDefault();
    message = $('.form__message').val();
    console.log(message);
  });
});
