$(function () {
  $('input').css('margin-right', '10px');
  const dic = [];
  $(':checkbox').change(function () {
    if (this.prop('checked') == true) {
      dic.push($(this).attr('data-id'));
    } else {
      dic.pop($(this).attr('data-id'));
    }
  });
  const name = [];
  $(':checkbox').change(function () {
    if (this.prop('checked') == true) {
      name.push($(this).attr('data-name'));
    } else {
      name.pop($(this).attr('data-name'));
    }
    if ($.isEmptyObject(name)) {
      $('.amenities h4').html('&nbsp');
    } else {
      $('.amenities h4').text(Object.values(name).join(', '));
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
