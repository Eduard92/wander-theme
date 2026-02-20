(function ($) {
  $(window).on('load', function() {
    //Set Google maps 
    if ($('[data-id-map]').length > 0) {
      $('[data-id-map]').each(function (i) {
        var idThis = $(this).attr('id');
        var attr1 = $('#' + idThis + ' [data-mapa]').attr('id');
        map_custom(attr1, '#' + idThis);
      });
    }
  });

  function map_custom(mapId, idPar) {
    /* googleMaps Footer Map */
    var bluegray = "#768FAC"
    var wine = "#B95D82"
    var black = "#999996"
    var green = "#818C70"
    var yellow = "#CBB774"
    var gold = "#BDA86B"
    var orange = "#fda527"
    var red = "#EE2C46"

    var color = (wandertheme.style == 'elegant' && wandertheme.color.length == 0) ? gold : red; // set your map color here! (blue, black, green, yellow, purple, orange...)
    var saturation = 100;

    var point = wandertheme.color.length > 0 ? 'pointer-' + wandertheme.color : 'pointer-' + wandertheme.style;
    var pointerUrl = wandertheme.theme_path + '/assets/img/map/' + point + '.png'; // set your color pointer here! (pointer-blue/green/yellow/fucsia/purple/turquoise/red/orange.png)
    color = wandertheme.color.length > 0 ? wandertheme.color : color;
    switch (color) {
      case ('bluegray'):
        var color = bluegray;
        var saturation = 100;
        break;
      case ('black'):
        var color = black;
        var saturation = -100;
        break;
      case ('green'):
        var color = green;
        var saturation = 100;
        break;
      case ('yellow'):
        var color = yellow;
        var saturation = 100;
        break;
      case ('red'):
        var color = red;
        var saturation = 100;
        break;
      case ('turquoise'):
        var color = turquoise;
        var saturation = 100;
        break;
      case ('orange'):
        var color = orange;
        var saturation = 100;
        break;
      case ('purple'):
        var color = purple;
        var saturation = 100;
        break;
    } //end switch
    var styles = [
      {
        "featureType": "landscape",
        "stylers": [
          { "hue": "#000" },
          { "saturation": -100 },
          { "lightness": 40 },
          { "gamma": 1 }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          { "hue": color },
          { "saturation": saturation },
          { "lightness": 20 },
          { "gamma": 1 }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          { "hue": color },
          { "saturation": saturation },
          { "lightness": 20 },
          { "gamma": 1 }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          { "hue": color },
          { "saturation": saturation },
          { "lightness": 50 },
          { "gamma": 1 }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          { "hue": "#000" },
          { "saturation": -100 },
          { "lightness": 15 },
          { "gamma": 1 }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          { "hue": "#000" },
          { "saturation": -100 },
          { "lightness": 25 },
          { "gamma": 1 }
        ]
      }
    ];
    var locations = $(idPar + ' [data-mapa-count]');
    var $latlng;
    var drag;
    if ($(window).width() < 796) { drag = false; } else { drag = true; }

    $(idPar + ' [data-mapa-count]').each(function (i) {
      var idTipo = $(this).attr('id');
      if (i === 0) {
        $latlng = new google.maps.LatLng($('#' + idTipo).data('lati'), $('#' + idTipo).data('longi'));
      }
    });
    var options = {
      center: $latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      draggable: drag,
      scrollwheel: false,
      panControl: false, zoom: 8,
      styles: styles
    };


    var map = new google.maps.Map(document.getElementById(mapId), options);
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng($(idPar + ' [data-mapa-count="' + i + '"]').data('lati'), $(idPar + ' [data-mapa-count="' + i + '"]').data('longi')),
        map: map,
        icon: pointerUrl
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent($(idPar + ' [data-mapa-count="' + i + '"]').data('surcur'));
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  } // end wpgmappity_maps_loaded();
}(jQuery));