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
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (response) {
      $.each(response, function (index, place) {
        const article = $('<article>').addClass('place_articles');
        const title = $('<h2>').text(place.name);
        const price = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
        const info = $('<div>').addClass('information');
        const maxGuests = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
        const rooms = $('<div>').addClass('number_of_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
        const bathrooms = $('<div>').addClass('number_of_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
        const description = $('<div>').addClass('description').text(place.description);
        info.append(maxGuests, rooms, bathrooms);
        article.append(title, price, info, description);
        $('.places').append(article);
      });
    },
  });
  /* 
  $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: '{}',
        dataType: 'json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                $('.places').append('<article><h2>' + place.name + '</h2>\
                    <div class="price_by_night"><p>$' + place.price_by_night + '</p>\
                    </div><div class="information"><div class="max_guest"><div class="guest_image"></div>\
                    <p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div>\
                    <p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div>\
                    <p>' + place.number_bathrooms + '</p></div></div>\
                    <div class="description"><p>' + place.description + '</p></div></article>');
            };
        }
    });
    */
});
