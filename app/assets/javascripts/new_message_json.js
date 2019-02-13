$(document).on('turbolinks:load',function(){
  function buildSendMessageHTML(message){
  var image = `${message.image}` != 'null' ?
  `<img src='${message.image}'>` : ``
  var html  = `<div class='message'>
                 <div class='upper-message'>
                   <div class='upper-message__user-name'>
                     ${message.user_name}
                   </div>
                   <div class='upper-message__date'>
                     ${message.created_at}
                   </div>
                 </div>
                 <div class='lower-message'>
                   <p class='lower-message__content'>
                     ${message.content}
                   </p>
                   <div class='lower-message__image'>
                     ${image}
                   </div>
                 </div>
               </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildSendMessageHTML(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      $('input[type=file]').val('');
    })
    .fail(function(){
      alert('エラー：メッセージを入力してください');
      $('.form__submit').prop('disabled', false);
    })
  });

  setInterval(messageUpdate, 5000);

  function messageUpdate(){
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      if($('.messages')[0]){
        var message_id = $('.messages').last().data('id');
      } else {
        var message_id = 0
      }
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(new_message){
        console.count(setInterval);
        console.log(new_message);
        new_message.forEach(function(message){
          var html = buildSendMessageHTML(message);
          $('.messages').append(html);
        })
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }
  }
});
