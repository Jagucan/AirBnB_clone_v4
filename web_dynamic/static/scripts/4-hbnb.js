window.addEventListener('load', function () {
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
    $('button').click(function () {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: dic })
        }).done(function (data) {
            $('section.places').empty();
            for (let i = 0; i < data.length; ++i) {
              let html = '<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + ' Bathroom</div></div><div class="user"></div><div class="description">' + data[i].description + '</div></article>';
              $('.places').append(html);
            }
        });
    });
  });
  