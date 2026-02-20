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
let inicia;
let final;

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
    minRange: 2,
    //maxRange: 8,
    showOuterDays: false,
    // rangeStartLabel: 'Check-in',
    // rangeEndLabel: 'Check-out',
    onInit: function (event, inst) {
       inicia = $startDate;
       final = $endDate;
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
          if (bookings.finalDisp === true) {
            inst.setVal([event.date, bookings.finalDate], true);
          }
          else{
            $('#noFechaDisponibleModal').modal('show');
            var start = new Date();

            inst.setTempVal([null, null]);
            inst.setActiveDate('start');

            //clic = 1;
        
            getPrices(start, function callback(bookings) {
              inst.setOptions({
                labels: bookings.labels,
                invalid: bookings.invalid,
                valid: bookings.valid
              });
             // invalids = bookings.invalid;
            });
        
          }

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
  // $('.inpText input[type="text"]').each(function () {
  //   console.log($(this).val());
  //   checkForInput(this);
  // });
  // $(document).on('change', '.inpInc__inputs button', function () {
  // console.log('Hola cambio' + $('#cantidad-ct-4').val());
  // checkForInput(this);
  // });

  // console.log('on change fired');
  // $('#cantidad-ct-4').on('change', function () {
  //   console.log('on change fired');
  // });
/*
  extrasInput('#extras-cant-max-4', '#extras-cant-min-4', '#cantidad-ct-4');
  extrasInput('#extras-days-max-4', '#extras-days-min-4', '#dias-ds-4');
  extrasInput('#extras-cant-max-5', '#extras-cant-min-5', '#cantidad-ct-5');
  extrasInput('#extras-days-max-5', '#extras-days-min-5', '#dias-ds-5');
  extrasInput('#extras-cant-max-18', '#extras-cant-min-18', '#cantidad-ct-18');
  extrasInput('#extras-days-max-18', '#extras-days-min-18', '#dias-ds-18');
*/
if(typeof  serviciosExtra != 'undefined'){


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

if(typeof  servicios != 'undefined'){


  servicios.forEach(servicios => {
    // console.log(servicios);

    if(servicios.tipo == 'actividad'){
      extrasInput('#extras-days-max-'+servicios.id, '#extras-days-min-'+servicios.id, '#dias-ds-'+servicios.id);
      extrasInput('#extras-cant-max-'+servicios.id, '#extras-cant-min-'+servicios.id, '#cantidad-ct-'+servicios.id);
      //extrasInput('#extras-days-max-'+servicios.id, '#extras-days-min-'+servicios.id, '#dias-ds-'+servicios.id);

    }
    if(serviciosExtra.tipo == 'alimentos' ){
      extrasInput('#extras-days-max-'+servicios.id, '#extras-days-min-'+servicios.id, '#dias-ds-'+servicios.id);
      extrasInput('#extras-cant-max-'+servicios.id, '#extras-cant-min-'+servicios.id, '#cantidad-ct-'+servicios.id);
      //extrasInput('#extras-days-max-'+serviciosExtra.id, '#extras-days-min-'+serviciosExtra.id, '#dias-ds-'+serviciosExtra.id);

    }
  });
}
  // Steps Reservar
  // $("#pasoResservas").children("div").steps({
  //   headerTag: "h3",
  //   bodyTag: "section",
  //   stepsOrientation: "horizontal",
  //   transitionEffect: "slideLeft",
  //   enableContentCache: true,
  //   autoFocus: true,
  //   saveState: true,
  //   startIndex: 5,
  //   onInit: function (event, currentIndex) {
  //     extrasInput('#extras-horse-plus', '#extras-horse-minus', '#horseDay');
  //     extrasInput('#extras-horseD-plus', '#extras-horseD-minus', '#dayH');
  //     extrasInput('#extras-bici-plus', '#extras-bici-minus', '#biciDay');
  //     extrasInput('#extras-biciD-plus', '#extras-biciD-minus', '#dayB');
  //   },
  //   labels: {
  //     cancel: "Cancelar",
  //     finish: "Finalizar",
  //     next: "Siguiente",
  //     previous: "Atrás",
  //     loading: "Cargando..."
  //   }
  // });
  // Calendario Reservar
  // var iniciaFecha = $startDate;
  // var finFecha = $endDate;
  // if (iniciaFecha.length != 0) {
  //   var inicia = $startDate;
  //   var final = $endDate;
  //   console.log(inicia + ' es mi fecha');
  //   $('#rangeDate').mobiscroll('setVal', [
  //     inicia,
  //     final,
  //   ]);
  // }
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

  var ubicacion = $WanderLoc;
  var huespedes = $capacidad;
  // console.log(ubicacion);

  mobiscroll.util.http.getJson('/fechaspaquete/' + d.getFullYear() + '/' + d.getMonth() + huespedes + ubicacion+'/'+paquete, function (bookings) {
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

    let finalDisp = false;

  var ubicacion = $WanderLoc;
  var huespedes = $capacidad;
  var noches = parseInt($noches);
  let limite;
  let finalDate = null;

  // console.log(ubicacion);

  mobiscroll.util.http.getJson('/fechaspaquete2/' + d.getFullYear() + '/' + d.getMonth()+ '/' + d.getDate() + huespedes + ubicacion +'/'+ paquete, function (bookings) {
    // mobiscroll.util.http.getJson('//trial.mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(), function (bookings) {
    for (var i = 0; i < bookings.length; ++i) {
      var booking = bookings[i],
        nd = new Date(booking.d);

        if (d.getFullYear() === nd.getFullYear() &&
        d.getMonth() === nd.getMonth() &&
        d.getDate() === nd.getDate()) {

          limite = new Date(d);
          limite.setDate(d.getDate() + noches);

        }


      if (booking.price > 0 && ((
                                limite.getFullYear() === nd.getFullYear() &&
                                limite.getMonth() === nd.getMonth() &&
                                limite.getDate() === nd.getDate()
                                )  || 
                                (d.getFullYear() === nd.getFullYear() &&
                                 d.getMonth() === nd.getMonth() &&
                                 d.getDate() === nd.getDate()  ) )
            ) {
        labels.push({
          start: nd,
          title: '$' + booking.price,
          textColor: '#818C70',
        }
        );
        valid.push(nd);
        if(
        limite.getFullYear() === nd.getFullYear() &&
        limite.getMonth() === nd.getMonth() &&
        limite.getDate() === nd.getDate()
        ){
          finalDisp = true;
          finalDate = nd;
        }

        

      } 
        else {
          invalid.push(nd);
        }
    }
    callback({ labels: labels , invalid:invalid, valid: valid, finalDisp: finalDisp, finalDate:finalDate});
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