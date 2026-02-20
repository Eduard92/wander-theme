//Scripts scriptRerservar v1.0
mobiscroll.setOptions({
  locale: mobiscroll.localeEs,
  theme: 'auto',
  themeVariant: 'light'
});

$(function () {
  // calendarRes();
  // $(window).resize(function () {
  //   calendarRes();
  // });

  // console.log('carga calendario');

  var min = new Date();
  //  max = new Date(min.getFullYear(), min.getMonth() + 6, min.getDate());
  let all;
//  let clic = 1;

  $('#rangeDate').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
    startInput: '#start-input',
    endInput: '#end-input',
    display: 'inline',
    dateFormat: 'DD/MM/YYYY',
    calendarType: 'month',
    pages: 1,
    responsive: {
      medium: {
        pages: 2,
      },
    },
    // pages: 2,
    touchUi: true,
    min: min,
    minRange: 1,
    //maxRange: 8,
    showOuterDays: false,
    // rangeStartLabel: 'Check-in',
    // rangeEndLabel: 'Check-out',
    onInit: function (event, inst) {
      var inicia = $startDate;
      var final = $endDate;
      var today = new Date();
      // var year = today.getFullYear();
      inst.setVal([
        inicia,
        final
      ], true);
      // console.log(today + 'Siiii');
      getPrices(today, function callback(bookings) {
        inst.setOptions({
          labels: bookings.labels,
          invalid:   bookings.invalid,
          valid:   bookings.valid
        
        });
     //   invalids = bookings.invalid;
     all = bookings.all;

      });
    },
    onPageLoading: function (event, inst) {
      // console.log(event.firstDay);
      getPrices(event.firstDay, function callback(bookings) {
        inst.setOptions({
          labels: bookings.labels,
          invalid:   bookings.invalid,
          valid:   bookings.valid
        
        });
        all = bookings.all;
      });
    },
    onCellClick: function (event, inst) {
      if(event.active == 'start'){

        inst.setOptions({
          invalid:   all,

        });
       // inst.setTempVal([event.date, null]);
       // inst.setActiveDate('start');

        getPrices2(event.date, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid:   bookings.invalid,
            valid:   bookings.valid

          });

       //   clic = 2;
        });
      }

    }

  });


  $('#limpiar').click(function (e) {
    e.preventDefault();
    var insta = $('#rangeDate');

    var cal = insta.mobiscroll('getInst');
    // var start = getTempVal()[0];
    var start = new Date();
    // console.log(start);
    // cal.getVal();
    cal.setTempVal([start, null]);
    // cal.setOptions({
    //   select: 'range',
    //   min: ''
    // });
    // insta.val('');
    cal.setActiveDate('start');
    // return false;
    cal.setTempVal([null, null]);
    //clic = 1;

    getPrices(start, function callback(bookings) {
      cal.setOptions({
        labels: bookings.labels,
        invalid: bookings.invalid,
        valid: bookings.valid
      });
     // invalids = bookings.invalid;
    });
  });

  // Slide para fechas y cabinas disponibles
  $('.slide-dates').slick({
    dots: false,
    autoplay: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 800,
    arrows: true,
    prevArrow: $('#prevSlideDate'),
    nextArrow: $('#nextSlideDate'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $('#ctLocTabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
    // console.log('Primero');
    // $('[data-slide-city-loc]').slick("setPosition", 0);
    $('[data-slider]').slick("setPosition", 0);
  });
  $('#accSelCabinState').on('shown.bs.tab', function () {
    // console.log('Primero');
    // $('[data-slide-city-loc]').slick("setPosition", 0);
    $('[data-slider]').slick("setPosition", 0);
  });
  $('[data-slide-city-loc]').each(function (i, data) {
    var idxL = $(this).attr('id');
    var incr = i + 1;
  //  console.log(idxL);
    $('#' + idxL).slick({
      dots: false,
      autoplay: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      speed: 800,
      arrows: true,
      prevArrow: $('#prevSlideCard-' + incr),
      nextArrow: $('#nextSlideCard-' + incr),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('#accCity').on('show.bs.collapse shown.bs.collapse hide.bs.collapse hidden.bs.collapse', function (e) {
      e.stopPropagation();
      // console.log('Segundo');
      // console.log(accId);
      $('#' + idxL).slick('refresh');
      // $('[data-slider]').slick("setPosition", 0);
    });
  });
  // Slider Cabanas Reserva
  $('[data-slider]').each(function (key, item) {
    // console.log('#prevSlideRes-' + item.id);
    var i = key + 1;
    $('#'+item.id).slick({
      fade: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 800,
      arrows: true,
      dots: true,
    //  prevArrow: $('#prevSlideRes-' + item.id),
    //  nextArrow: $('#nextSlideRes-' + item.id),
    });
  });
  $('.accSlideCabinsGroup').each(function (i, item) {
    var panelId = $(this).attr('id');
    var inc = i + 1;
    // console.log(inc);
    $('#' + panelId).on('show.bs.collapse shown.bs.collapse hide.bs.collapse hidden.bs.collapse', function (e) {
      e.stopPropagation();
      // console.log('panel-' + panelId);
      // $('#' + panelId + '-' + inc).slick("setPosition", 0);
      $('[data-slider]').slick("setPosition", 0);
    });
  });
  // Slide Cabins Fechas
  $('[data-slider-cabins]').each(function (key, item) {
    // console.log(key + 1, item);
    var i = key + 1;
    $('#cabin-' + i).slick({
      fade: true,
      autoplay: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 800,
      arrows: true,
      dots: true,
    //  prevArrow: $('#prevCabinDate-' + i),
     // nextArrow: $('#nextCabinDate-' + i),
    });
  });

  $('[data-check-btn]:checked + label').text('Seleccionado');
  $('[data-check-btn]').each(function () {
    var idCh = $(this).attr('id');
    // console.log(idCh);
    $('#' + idCh).click(function () {
      $('[data-check-btn] + label').text('Seleccionar');
      if (this.checked) {
        $(this).next().text('Seleccionado');
      }
    });
  });
  $('[data-add-extras]:checked + label').text('Agregado');
  $('[data-add-extras]').each(function () {
    var idCh = $(this).attr('id');
    // console.log(idCh);
    $('#' + idCh).click(function () {
      // console.log('boton extra');
      // var id = $(this.id);
      $('[data-add-extras="' + idCh + '"] + label').text('Agregar');
      if (this.checked) {
        $('[data-add-extras="' + idCh + '"] + label').text('Agregado');
        // console.log(id);
        // $(this).next().text('Agregado');
        // $('#' + idCh + ' + label').text('Agregado');
        // $(this).text('Agregado');
      }
    });
  });
  $('[data-btn-valid]').click(function () {
    // console.log('esto con click');
    $('li.btnsNext .nB.show').removeClass('show');
    $(this).next().addClass('show');
  });

if(typeof  serviciosExtra != 'undefined'){

if (Array.isArray(serviciosExtra)) {

  serviciosExtra.forEach(serviciosExtra => {
    // console.log(serviciosExtra);

    if(serviciosExtra.tipo == 'actividad' ){
      extrasInput('#extras-days-max-'+serviciosExtra.id, '#extras-days-min-'+serviciosExtra.id, '#dias-ds-'+serviciosExtra.id);
      extrasInput('#extras-cant-max-'+serviciosExtra.id, '#extras-cant-min-'+serviciosExtra.id, '#cantidad-ct-'+serviciosExtra.id);
      //extrasInput('#extras-days-max-'+serviciosExtra.id, '#extras-days-min-'+serviciosExtra.id, '#dias-ds-'+serviciosExtra.id);

    }
    if(serviciosExtra.tipo == 'alimentos' ){
      extrasInput('#extras-days-max-'+serviciosExtra.id, '#extras-days-min-'+serviciosExtra.id, '#dias-ds-'+serviciosExtra.id);
      extrasInput('#extras-cant-max-'+serviciosExtra.id, '#extras-cant-min-'+serviciosExtra.id, '#cantidad-ct-'+serviciosExtra.id);
      //extrasInput('#extras-days-max-'+serviciosExtra.id, '#extras-days-min-'+serviciosExtra.id, '#dias-ds-'+serviciosExtra.id);

    }
  });
}
}

if (typeof window.servicios !== 'undefined') {


// Verificar si 'servicios' es un array antes de usar forEach
if (Array.isArray(servicios)) {
  servicios.forEach(servicio => { // Cambio 'servicios' a 'servicio' en el callback

    if (servicio.tipo === 'actividad') {
      extrasInput('#extras-days-max-' + servicio.id, '#extras-days-min-' + servicio.id, '#dias-ds-' + servicio.id);
      extrasInput('#extras-cant-max-' + servicio.id, '#extras-cant-min-' + servicio.id, '#cantidad-ct-' + servicio.id);
    }

    if (servicio.tipo === 'alimentos') { // Corrige el uso de 'servicio' en lugar de 'serviciosExtra'
      extrasInput('#extras-days-max-' + servicio.id, '#extras-days-min-' + servicio.id, '#dias-ds-' + servicio.id);
      extrasInput('#extras-cant-max-' + servicio.id, '#extras-cant-min-' + servicio.id, '#cantidad-ct-' + servicio.id);
    }
  });
} 

}


  $('#todas').change(function(){
    // console.log('listo el checkbox es uno');
    let iden = $('#formDataRes1');
    if ($(this).is(":checked")) {
      iden.addClass('disabledContent');
      iden.attr('data-reservations', true);
    } else {
      iden.removeClass('disabledContent');
      iden.attr('data-reservations', false);
    }
  });
});

function getPrices(d, callback) {
  var invalid = [],
   valid = [],
   labels = [],
   all = [];

    
  var ubicacion = (typeof $WanderLoc !== 'undefined') ? $WanderLoc : null;
  var huespedes = $capacidad;
  // console.log(ubicacion);

  mobiscroll.util.http.getJson('/fechas/' + d.getFullYear() + '/' + d.getMonth() + huespedes + ubicacion, function (bookings) {
    // mobiscroll.util.http.getJson('//trial.mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(), function (bookings) {
    for (var i = 0; i < bookings.length; ++i) {
      var booking = bookings[i],
        d = new Date(booking.d);

      if (booking.price > 0) {
        labels.push({
          start: d,
          title: '$' + booking.price,
          textColor: '#818C70',
        });
        valid.push(d);

      } else {
        invalid.push(d);
      }
      all.push(d);
    }
    callback({ labels: labels, invalid: invalid, valid: valid, all:all });
  }, 'jsonp');
}


function getPrices2(d, callback) {
  var invalid = [],
  valid = [],
    labels = [];

  var ubicacion = (typeof $WanderLoc !== 'undefined') ? $WanderLoc : null;
  var huespedes = $capacidad;
  // console.log(ubicacion);

  mobiscroll.util.http.getJson('/fechas2/' + d.getFullYear() + '/' + d.getMonth()+ '/' + d.getDate() + huespedes + ubicacion, function (bookings) {
    // mobiscroll.util.http.getJson('//trial.mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(), function (bookings) {
    for (var i = 0; i < bookings.length; ++i) {
      var booking = bookings[i],
        d = new Date(booking.d);

      if (booking.price > 0) {
        labels.push({
          start: d,
          title: '$' + booking.price,
          textColor: '#818C70',
        }
        );
        valid.push(d);
      } 
        else {
          invalid.push(d);
        }
    }
    callback({ labels: labels , invalid:invalid, valid: valid});
  }, 'jsonp');
}


function extrasInput(id, idx, cant) {
  var valor = $(cant).val();
  var x = valor;
  // console.log(valor + 'Personas');
  $(id).click(function () {
    $(cant).attr('value', ++x);
    if($(cant).val() > 1) {
      $(idx).removeClass('disabled');
    }
  });
  $(idx).click(function () {
   // console.log($(cant).val());
    if ($(cant).val() <= 1) {
      // console.log('Aquí bloqueas');
      $(idx).addClass('disabled');
    } else {
      $(cant).attr('value', --x);
    }
  });
}

function checkForInput(ele) {
  const $label = $(ele);

  if ($(ele).val().length > 0) {
    $label.addClass('input-has-value');
  } else {
    $label.removeClass('input-has-value');
  }
}


function wizardButton() {
  var altura = $('.descReservar').outerHeight();
  $('.steps').css('height', altura + 'px');
  var stickyTop = $('.descReservar').offset().top * 2;
  // console.log('Offset top Sticky' + stickyTop);

  $(window).scroll(function () {
    var windowTop = $(window).scrollTop();
    // console.log('ScrollTop Window:' + windowTop);
    if (stickyTop < windowTop && $(".actions").outerHeight() + $(".actions").offset().top - $(".descReservar").outerHeight() > windowTop) {
      $('.actions').css('position', 'fixed');
      $('.actions').css('top', 'unset');
      $('.actions').css('bottom', '0');
    } else {
      $('.actions').css('position', 'absolute');
      $('.actions').css('top', '102px');
      $('.actions').css('bottom', 'inherit');
    }
  });
}

// Load window
$(window).on('load', function(){
  // Ancho Ventana
  let x = $('.descReservar').length

  if (x == 1){
    const ancho = $(window).width();
    if(ancho >= 768) {
      wizardButton();
    }

  }
});


selectorPer('#navOpcionform', '#openOpsForms');


function selectorPer(id, btn) {
  var $modal = $(id);
  var tl = new TimelineMax({ paused: true });
  tl.staggerTo(id + " ul li", 0.1, { autoAlpha: 1 }, 0.1);
  TweenMax.set($modal, { autoAlpha: 0, y: 20, zIndex: -1 });
  var $animation = TweenMax.to($modal, 0.30, { autoAlpha: 1, y: 0, zIndex: 4, ease: Circ.easeOut }).reversed(true);
  $(btn).click(function (e) {
    e.preventDefault();
    $(this).toggleClass('activeMod');
    toggleInfo($animation);
    if ($(this).hasClass('activeMod')) {
      tl.play();
      console.log('Abre');
    } else {
      tl.reverse();
    }
  });
  // cambia texto
  let envol = $(id + ' ul li a.activo');
  let tetxInit = envol.text();
  if (tetxInit.length != '') {
    $('#textChange').text(tetxInit);
  }
  $(id + ' ul li a').click(function (e) {
    e.preventDefault();
    let texto = $(this).text();
    let valores = $(this).data('valor');
    $('#textChange').text(texto);
    $('#locacion').val(valores);
  });
  $(id + ' ul li a.btnFormContact').click(function(e){
    e.preventDefault();
    toggleInfo($animation);
    if ($(btn).hasClass('activeMod')) {
      tl.play().timeScale(1);
      $(btn).removeClass('activeMod');
    } else {
      tl.reverse().timeScale(3);
    }
    $(btn).addClass('activeRes');
  });
  $('[data-close-ubic]').on('click', function(ev){
    ev.preventDefault();
      if ($('.collOpenForm').hasClass('activeMod')) {
      toggleInfo($animation);
      tl.reverse();
      $(btn).removeClass('activeMod');
    }
  });
}


function selectSiteNavBar(id){
  $('#loadingModal').show();
  //var selectedValue = $(this).val(); // Obtener el valor seleccionado

  $.request('getCabanas::onCabanasBooking', {
    data: {
      id: id
    },
    update: {
      'cabanas': '#accSelCabinState'
    },
    complete: function() {
      $('#loadingModal').hide();
    }
  });
  };