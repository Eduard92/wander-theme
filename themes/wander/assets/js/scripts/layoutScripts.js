//Scripts layoutScripts v1.0
mobiscroll.setOptions({
  locale: mobiscroll.localeEs,
  theme: 'material',
  themeVariant: 'light'
});
//console.log(1);
$(function () {
  var min = new Date();
  //max = new Date(min.getFullYear(), min.getMonth() + 6, min.getDate());
  let all;
  let adultVal;
  var vali;
    $('#range').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
    pages: 1,
    responsive: {
      medium: {
        pages: 2,
      },
    },
    // touchUi: true,
    min: min,
    minRange: 2,
    //maxRange: 8,
    showOuterDays: false,
    rangeStartLabel: 'Check-in',
    rangeEndLabel: 'Check-out',
    onPageLoading: function (event, inst) {
      var text = $('#locacion').attr('value');
      vali = (text.length == '') ? '' : text;
      var raiodbtn = $('input[name="adultos"]:checked').attr('value');
      adultVal = (raiodbtn == 1) ? 1 : raiodbtn;
        getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });
    },
    onCellClick: function (event, inst) {
      if(event.active == 'start'){
        event.firstDay
        inst.setOptions({
          invalid:   all,
        });
        getPrices2(event.date,adultVal, vali, function callback(bookings) {
        inst.setVal([event.date, null]);
          inst.setOptions({
            labels: bookings.labels,
            invalid:   bookings.invalid,
            valid:   bookings.valid
          });
          });
        }
      //}
    }
  });
    $('#range1').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
    pages: 1,
    responsive: {
      medium: {
        pages: 2,
      },
    },
    // touchUi: true,
    min: min,
    minRange: 2,
    //maxRange: 8,
    showOuterDays: false,
    rangeStartLabel: 'Check-in',
    rangeEndLabel: 'Check-out',
    onPageLoading: function (event, inst) {
      var text = $('#locacion').attr('value');
      vali = (text.length == '') ? '' : text;
      var raiodbtn = $('input[name="adultos"]:checked').attr('value');
      adultVal = (raiodbtn == 1) ? 1 : raiodbtn;
        getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });
    },
    onCellClick: function (event, inst) {
      if(event.active == 'start'){
        event.firstDay
        inst.setOptions({
          invalid:   all,
        });
        getPrices2(event.date,adultVal, vali, function callback(bookings) {
        inst.setVal([event.date, null]);
          inst.setOptions({
            labels: bookings.labels,
            invalid:   bookings.invalid,
            valid:   bookings.valid
          });
          });
        }
      //}
    }
  });
 /*
   $('#rangeBooking').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
      dateFormat: 'DD MMM',
  
  // 📦 VALOR ENVIADO EN EL POST
  returnFormat: 'DD/MM/YYYY',
    pages: 1,
    responsive: {
      medium: {
        pages: 2,
      },
    },
    // touchUi: true,
    min: min,
    minRange: 2,
    //maxRange: 8,
    showOuterDays: false,
    rangeStartLabel: 'Check-in',
    rangeEndLabel: 'Check-out',
    onPageLoading: function (event, inst) {
      var text = $('#locacion').attr('value');
      vali = (text.length == '') ? '' : text;
      var raiodbtn = $('input[name="adultos"]:checked').attr('value');
      adultVal = (raiodbtn == 1) ? 1 : raiodbtn;
        getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });
    },
    onCellClick: function (event, inst) {
      if(event.active == 'start'){
        event.firstDay
        inst.setOptions({
          invalid:   all,
        });
        getPrices2(event.date,adultVal, vali, function callback(bookings) {
        inst.setVal([event.date, null]);
          inst.setOptions({
            labels: bookings.labels,
            invalid:   bookings.invalid,
            valid:   bookings.valid
          });
          });
        }
      //}
    }
  });
 */
  var clickCount = 0;

$('#rangeBooking1').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
        startInput: '#entrada',
    endInput: '#salida',
    dateFormat: 'DD MMM',
    returnFormat: 'DD/MM/YYYY',
    pages: 1,
    responsive: {
        xsmall: {
            pages: 1,
            //display: 'full',
                        calendarType: 'month',
            calendarScroll: 'vertical',  // Scroll vertical en móvil
            calendarSize: 3,             // Muestra 3 meses seguidos

        },
        medium: {
            pages: 2,
        },
    },
    min: min,
    minRange: 2,
    showOuterDays: false,

    rangeStartLabel: 'Check-in',
    rangeEndLabel: 'Check-out',
    onChange: function (event, inst) {
        if (event.value && event.value.length === 2 && event.value[0] && event.value[1]) {
            const start = mobiscroll.formatDate('DD/MM/YYYY', event.value[0]);
            const end   = mobiscroll.formatDate('DD/MM/YYYY', event.value[1]);
            $('#range').val(start + ' - ' + end);
            clickCount = 2; // Rango completo, preparar para reinicio
        }
    },
    onPageLoading: function (event, inst) {
        var text = $('#locacion').attr('value');
        vali = (text.length == '') ? '' : text;
        var raiodbtn = $('input[name="adultos"]:checked').attr('value');
        adultVal = (raiodbtn == 1) ? 1 : raiodbtn;
        getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
            
            inst.setOptions({
                labels: bookings.labels,
                invalid: bookings.invalid
            });
            all = bookings.all;
        });
    },
    onCellClick: function (event, inst) {
        clickCount++;

        // Al tercer clic, reiniciar el rango
        if (clickCount >= 3) {
            clickCount = 1;
            inst.setVal([event.date, null]);
            inst.setActiveDate('start');
            $('#range').val('');
        }

        if (event.active == 'start') {
            inst.setOptions({
                invalid: all,
            });
            getPrices2(event.date, adultVal, vali, function callback(bookings) {
                inst.setVal([event.date, null]);
                inst.setOptions({
                    labels: bookings.labels,
                    invalid: bookings.invalid,
                    valid: bookings.valid
                });
            });
        }
    }
});
  
$('#rangeBooking').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
      // 👀 SOLO VISUAL
  dateFormat: 'DD MMM',
  
  // 📦 VALOR ENVIADO EN EL POST
  returnFormat: 'DD/MM/YYYY',
    pages: 1,
    //responsive: {
      //medium: {
        //pages: 2,
    //  },
     
    //},
    responsive: {
        xsmall: {
            pages: 1,
            display: 'full',  // pantalla completa en móvil
        calendarType: 'month',
        calendarScroll: 'vertical',
        calendarSize: 3,  // Más meses disponibles
        
            //     pages: 'auto',    // Ajustar según espacio
         // Muestra 3 meses seguidos
        },
        medium: {
            pages: 2,
        },
    },
    // touchUi: true,
    min: min,
    minRange: 2,
    //maxRange: 8,
    showOuterDays: false,
    rangeStartLabel: 'Check-in',
    rangeEndLabel: 'Check-out',
    onChange: function (event, inst) {
  if (event.value && event.value.length === 2 && event.value[0] && event.value[1]) {
      const start = mobiscroll.formatDate('DD/MM/YYYY', event.value[0]);
      const end   = mobiscroll.formatDate('DD/MM/YYYY', event.value[1]);
      // 📦 VALOR REAL PARA EL POST
      $('#range').val(`${start} - ${end}`);
    }
  },
    onPageLoading: function (event, inst) {
      var text = $('#locacion').attr('value');
      vali = (text.length == '') ? '' : text;
      var raiodbtn = $('input[name="adultos"]:checked').attr('value');
      adultVal = (raiodbtn == 1) ? 1 : raiodbtn;
        getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });
    },
    onCellClick: function (event, inst) {
      if(event.active == 'start'){
        event.firstDay
        inst.setOptions({
          invalid:   all,
        });
        getPrices2(event.date,adultVal, vali, function callback(bookings) {
        inst.setVal([event.date, null]);
          inst.setOptions({
            labels: bookings.labels,
            invalid:   bookings.invalid,
            valid:   bookings.valid
          });
          });
        }
      //}
    }
    });
    
    
    
    
  $('#picker').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
    startInput: '#entrada',
    endInput: '#salida',
    // calendarType: 'month',
    pages: 1,
    responsive: {
      medium: {
        pages: 2,
      },
    },
    // touchUi: true,
    min: min,
    minRange: 2,
    //maxRange: 8,
    showOuterDays: false,
    rangeStartLabel: 'Check-in',
    rangeEndLabel: 'Check-out',
    onPageLoading: function (event, inst) {
      var text = $('#locacion').attr('value');
      vali = (text.length == '') ? '' : text;
      var raiodbtn = $('input[name="adultos"]:checked').attr('value');
      adultVal = (raiodbtn == 1) ? 1 : raiodbtn;
      // console.log(raiodbtn);
   //   if($(window).width() > 767){
        getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });
     //   }
       /* getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });*/
    },
    onCellClick: function (event, inst) {
    //  if($(window).width() > 767){
      if(event.active == 'start'){
        event.firstDay
        inst.setOptions({
          invalid:   all,
        });
        getPrices2(event.date,adultVal, vali, function callback(bookings) {
        inst.setVal([event.date, null]);
     //   inst.setActiveDate('start');
          inst.setOptions({
            labels: bookings.labels,
            invalid:   bookings.invalid,
            valid:   bookings.valid
          });
          });
        }
      //}
    }
  });
  $('#picker1').mobiscroll().datepicker({
    controls: ['calendar'],
    select: 'range',
    startInput: '#entrada1',
    endInput: '#salida1',
    // calendarType: 'month',
    pages: 1,
    responsive: {
      medium: {
        pages: 2,
      },
    },
    // touchUi: true,
    min: min,
    minRange: 2,
    //maxRange: 8,
    showOuterDays: false,
    rangeStartLabel: 'Check-in',
    rangeEndLabel: 'Check-out',
    onPageLoading: function (event, inst) {
      var text = $('#locacion').attr('value');
      vali = (text.length == '') ? '' : text;
      var raiodbtn = $('input[name="adultos"]:checked').attr('value');
      adultVal = (raiodbtn == 1) ? 1 : raiodbtn;
      // console.log(raiodbtn);
   //   if($(window).width() > 767){
        getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });
     //   }
       /* getPrices(event.firstDay, adultVal, vali, function callback(bookings) {
          inst.setOptions({
            labels: bookings.labels,
            invalid: bookings.invalid
          });
          all = bookings.all;
        });*/
    },
    onCellClick: function (event, inst) {
    //  if($(window).width() > 767){
      if(event.active == 'start'){
        event.firstDay
        inst.setOptions({
          invalid:   all,
        });
        getPrices2(event.date,adultVal, vali, function callback(bookings) {
        inst.setVal([event.date, null]);
     //   inst.setActiveDate('start');
          inst.setOptions({
            labels: bookings.labels,
            invalid:   bookings.invalid,
            valid:   bookings.valid
          });
          });
        }
      //}
    }
  });
  // Slider Home
  $('.slide-principal').slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    dots: true,
    arrows: false
    // prevArrow: $('#prevslideHomeMain'),
    // nextArrow: $('#nextslideHomeMain'),
  });
  // Slider Experiencia
  $('.slideExperiencia').slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    dots: false,
    arrows: false
    // prevArrow: $('#prevslideHomeMain'),
    // nextArrow: $('#nextslideHomeMain'),
  });
  // Slider actividades
  $('.slideAcividades').slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    dots: false,
    arrows: false
    // prevArrow: $('#prevslideHomeMain'),
    // nextArrow: $('#nextslideHomeMain'),
  });
  $('.slideCenterCabins').slick({
   /* false: true,*/
    autoplay: true,
    dots:true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    //centerPadding: '10px',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          variableWidth: false,
          arrows:false,
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding:'15px',
        }
      }
    ]
  });
  // Slider Testimonials
  $('.slideTestimonials').slick({
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
    // Slider newCabanas
    $('.slidenewCabanas').slick({
      dots: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      centerMode: true,
      slidesToScroll: 1,
      //variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
              arrows:false,
              centerMode: true,
              slidesToShow: 1,
              slidesToScroll: 1,
             centerPadding:'30px',
            }
        }
      ]
    });
        // Slider newCabanas
        $('.slidenewCabUb').slick({
          dots: false,
          autoplay: true,
          infinite: true,
          speed: 300,
          slidesToShow: 5,
          centerMode: true,
          slidesToScroll: 1,
          //variableWidth: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                  arrows:false,
                  centerMode: true,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                 centerPadding:'40px',
                }
            }
          ]
        });
        // Slider newCabanas
        $('.slidenewCabanasUb').slick({
          dots: false,
          autoplay: true,
          infinite: true,
          speed: 300,
          slidesToShow: 5,
          centerMode: true,
          slidesToScroll: 1,
          //variableWidth: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                  arrows:false,
                  centerMode: true,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                 centerPadding:'45px',
                }
            }
          ]
        });
    $('.slideninstalaciones').slick({
      /*dots: false,
      infinite: true,
      speed: 300,
      autoplay: true,
      arrows: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,*/
      dots: false,
      autoplay: true,
      infinite: true,
      speed: 200,
      slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 1,
      //variableWidth: true,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
            breakpoint: 576 ,
            settings: {
            //  fade: true,
            arrows:false,
             // dots:true,
              centerMode: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding:'30px',
            }
        }
      ]
    });
    $('.slidenPasos').slick({
      /*dots: false,
      infinite: true,
      speed: 300,
      autoplay: true,
      arrows: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,*/
      dots: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 1,
      //variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.slideActividades').slick({
      dots: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 1,
      //variableWidth: true,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576 ,
          settings: {
            dots:true,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
            centerPadding:'15px',
          }
      }
      ]
    });
    $('.slideBlog').slick({
      dots: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 1,
      //variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
            settings: {
             /* fade: true,*/
              /*dots:true,*/
              centerMode: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:false,
              centerPadding:'15px',
          }
        }
      ]
    });
    // Slider servicios Ubicaciones 
    $('.sliderSerUbi').slick({
      dots: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      centerMode: true,
      slidesToScroll: 1,
      //variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            arrows:false,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding:'40px',
          }
        }
      ]
    });
  //BackToTop
  var btn = $('#button');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });
  // Condición para home y formulario de Reserva
  if ($('.adult-minus').length == 1) {
    // Modals Options form
    var minus_A = document.querySelector(".adult-minus")
    var add_A = document.querySelector(".adult-plus");
    var quantity_A = document.querySelector("#select_adulto");
    var cantidad_A = document.querySelector(".boxListHuesped__count--adulto");
    const minimum = 0;
    var i = 1;
    minus_A.addEventListener("click", function () {
      if (quantity_A.value <= minimum) {
        minus_A.disabled = true;
        i = 1;
        return; // return to avoid decrementing
      } else {
        minus_A.disabled = false;
        --i;
      }
      quantity_A.value--;
      cantidad_A.innerHTML = i;
    });
    add_A.addEventListener("click", function () {
      if (quantity_A.value > minimum) {
        minus_A.disabled = false;
        i++;
      }
      quantity_A.value++;
      cantidad_A.innerHTML = i;
    });
    var minus_N = document.querySelector(".nino-minus")
    var add_N = document.querySelector(".nino-plus");
    var quantity_N = document.querySelector("#select_nino");
    var cantidad_N = document.querySelector(".boxListHuesped__count--nino");
    const minimumN = 0;
    var iN = 1;
    minus_N.addEventListener("click", function () {
      if (quantity_N.value == 1) {
        console.log('activa');
        minus_N.disabled = true;
        iN = 1;
        return; // return to avoid decrementing
      } else {
        minus_N.disabled = false;
        --iN;
      }
      quantity_N.value--;
      cantidad_N.innerHTML = iN;
    });
    add_N.addEventListener("click", function () {
      if (quantity_N.value > minimumN) {
        minus_N.disabled = false;
        iN++;
      }
      quantity_N.value++;
      cantidad_N.innerHTML = iN;
    });
  }
  modalTools('huesped');
  modalTools('huesped1');
  // modalTools('rooms');
  $('[data-input-home]').click(function () {
    // console.log('entra');
    if ($('#huesped').hasClass('isShow')) {
      $('#huesped').removeClass('isShow');
    }
  });
  $('[data-input-home1]').click(function () {
    // console.log('entra');
    if ($('#huesped1').hasClass('isShow')) {
      $('#huesped1').removeClass('isShow');
    }
  });
  // Checked Add value
  $('.inputHuespedHome__opt > input:radio').change(function () {
    var valorR = $(this).val(),
      datosB = $('[data-option="huesped"]');
    if ($(this).is(":checked")) {
      datosB.addClass('activeHues');
      $('#huesRes').html('<p>'+valorR+' Adulto(s)</p>');
    }
  });
  $('.inputHuespedHome__opt1 > input:radio').change(function () {
    var valorR = $(this).val(),
      datosB = $('[data-option="huesped1"]');
    if ($(this).is(":checked")) {
      datosB.addClass('activeHues');
      $('#huesRes1').html('<p>'+valorR+' Adulto(s)</p>');
    }
  });
  // Selector personalizado
  selectorPer('#navOpcionform', '#openOpsForms');
  selectorPerPop('#navOpcionform1', '#openOpsForms1');
  // Slider Cabanas Reserva
$('[data-slider]:visible').each(function (key, item) {
    if (item.id) {
        $('#' + item.id).slick({
            fade: true,
            autoplay: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 800,
            arrows: true,
            dots: true,
            // prevArrow: $('#prevSlideRes-' + item.id),
            // nextArrow: $('#nextSlideRes-' + item.id),
        });
    }
});
});
// Load window
$(window).on('load', function(){
let movil = false;
let pagina;
if (window.location.pathname.includes("/ubicacion/")) {
  console.log("La página actual contiene 'ubicacion' en la URL.");
  pagina = 'locations';
} 
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) 
      movil = true;
  // Ancho Ventana
  if ($('.stickyForm').length == 1){
    const ancho = $(window).width();
    if(pagina == 'locations'){
      var altura = $('.stickyForm').outerHeight();
      $('.contFormCal').css('height', altura + 'px');
     // var stickyTop = $('.stickyForm').offset().top * 1.5;
     //  console.log('Offset top Sticky' + stickyTop);
       var hero = document.getElementById('hero-sec');
       var contFormCal = document.getElementById('contFormCal');
       var stickyTop = hero.clientHeight + contFormCal.clientHeight;
      $(window).scroll(function () {
        var elementToHide = document.getElementById('contentForm');
        var windowTop = $(window).scrollTop();
        var formResLocation = document.getElementById('contFormCal-1');
         if(ancho >= 520){
                    if (stickyTop < windowTop || $(".ctFrmSt").outerHeight()   < windowTop) {
                      $('.contFormCal').css('height', altura + 'px');
                    formResLocation.style.display = "block";
                    $('.stickyForm').css('position', 'fixed');
                    elementToHide.style.display = "none";
                    if(movil == true){
                      barMovil.style.display = "block";
                      $('.stickyForm').css('position', 'absolute');
                    }
                  } else {
                    $('.contFormCal').css('height', '0px');
                    formResLocation.style.display = "none";
                    $('.stickyForm').css('position', 'absolute');
                    elementToHide.style.display = "block";
                      barMovil.style.display = "none";
                  }
        }
        else{
        //if (stickyTop < windowTop || $(".ctFrmSt").outerHeight() + $(".ctFrmSt").offset().top - $(".stickyForm").outerHeight() < windowTop) {
        //if (stickyTop < windowTop || $(".ctFrmSt").outerHeight()   < windowTop) {
            if (0 < windowTop ||0   < windowTop) {
              $('.contFormCal').css('height', altura + 'px');
          formResLocation.style.display = "none";
          $('.stickyForm').css('position', 'fixed');
          elementToHide.style.display = "none";
          if(movil == true){
            barMovil.style.display = "block";
            $('.stickyForm').css('position', 'absolute');
          }
        } else {
          $('.contFormCal').css('height', '0px');
          formResLocation.style.display = "none";
          $('.stickyForm').css('position', 'absolute');
          elementToHide.style.display = "block";
            barMovil.style.display = "none";
        }
      }
      });
  }
  else if(ancho >= 520) {//768
      barForm();
    }
    else{
      var altura = $('.stickyForm').outerHeight();
      $('.contFormCal').css('height', altura + 'px');
      var stickyTop = $('.stickyForm').offset().top * 1.5;
      // console.log('Offset top Sticky' + stickyTop);
      $(window).scroll(function () {
        var windowTop = $(window).scrollTop();
          if (stickyTop < windowTop || $(".ctFrmSt").outerHeight() + $(".ctFrmSt").offset().top - $(".stickyForm").outerHeight() < windowTop) {
            if(movil == true){
              barMovil.style.display = "block";
              $('.stickyForm').css('position', 'absolute');
            }
          } else {
            barMovil.style.display = "none";
            $('.stickyForm').css('position', 'absolute');
          }
      });
    }
    $(window).resize(function () {
      if($(this).width() >= 768) {
        barForm();
      } 
    });
  }
});
function getPrices(d, adultos, idx, callback) {
  var invalid = [],
   valid = [],
   labels = [],
   all = [];
  // console.log(idx);
  // console.log(adultos);
  var cabin = '/' + idx;
  var huespedes;
  if (adultos === 1) {
    var huespedes = '/' + 1;
  } else {
    var huespedes = '/' + adultos;
  }
  // var huespedes = '/' + 0;
  // var huespedes = '/' + 0;
  mobiscroll.util.http.getJson('/fechas/' + d.getFullYear() + '/' + d.getMonth() + huespedes + cabin, function (bookings) {
  // mobiscroll.util.http.getJson('/fechas/' + d.getFullYear() + '/' + d.getMonth() + '/' + idx, function (bookings) {
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
function getPrices2(d, adultos, idx, callback) {
  var invalid = [],
  valid = [],
    labels = [];
    var cabin = '/' + idx;
    var huespedes;
    if (adultos === 1) {
      var huespedes = '/' + 1;
    } else {
      var huespedes = '/' + adultos;
    }
  mobiscroll.util.http.getJson('/fechas2/' + d.getFullYear() + '/' + d.getMonth()+ '/' + d.getDate() + huespedes + cabin, function (bookings) {
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
function modalTools(id) {
  var dataOption = $('[data-option="' + id + '"]');
  var ctID = $('#' + id);
  $(dataOption).click(function (e) {
    e.preventDefault();
    ctID.addClass('isShow');
  });
  $('#close-' + id).click(function (e) {
    e.preventDefault();
    ctID.removeClass('isShow');
  });
}
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
function selectorPerPop(id, btn) {
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
    $('#textChange1').text(tetxInit);
  }
  $(id + ' ul li a').click(function (e) {
    e.preventDefault();
    let texto = $(this).text();
    let valores = $(this).data('valor');
    $('#textChange1').text(texto);
    $('#locacion1').val(valores);
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

function formatMoney(amount) {
    return Number(amount).toLocaleString('en-US');
}

function toggleInfo(anim) {
  anim.reversed(!anim.reversed());
}
function calcularBanner(){
  var formReserva = document.getElementById('contFormCal').clientHeight;
  var imagen = document.getElementById('hero-sec').clientHeight;
  var banerCupon = document.getElementById('banerCupon').clientHeight;
  var alturaPantalla = window.innerHeight;
  // Asigna nuevas alturas en porcentaje
  //var nuevaAlturaForm = 30; // Porcentaje
  //var nuevaAlturaImagen = 40; // Porcentaje
  //var nuevaAlturaBanerCupon = 30; // Porcentaje
  // Calcula las nuevas alturas en píxeles
  ///var nuevaAlturaFormPx = (nuevaAlturaForm / 100) * alturaPantalla;
  let altura = banerCupon + formReserva
  var nuevaAlturaImagenPx =alturaPantalla - altura ;
  // var nuevaAlturaBanerCuponPx = (nuevaAlturaBanerCupon / 100) * alturaPantalla;
  // Asigna las nuevas alturas
  // document.getElementById('contFormCal').style.height = nuevaAlturaFormPx + "px";
  document.getElementById('hero-sec').style.height = nuevaAlturaImagenPx + "px";
  // document.getElementById('banerCupon').style.height = nuevaAlturaBanerCuponPx + "px";
  var images = document.getElementsByClassName('sliderImage');
  var sliderVideo = document.getElementById('sliderVideo');
  var contHeroSlide__slider = document.getElementsByClassName('contHeroSlide__slider');
  if(sliderVideo){
   // contHeroSlide__slider.style.height = nuevaAlturaImagenPx+'px';
   sliderVideo.style.height = nuevaAlturaImagenPx+'px';
  }
  for (var i = 0; i < contHeroSlide__slider.length; i++) {
    var img = contHeroSlide__slider[i];
    img.style.width = '100%';
    img.style.height = nuevaAlturaImagenPx+'px';
  }
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.style.width = '100%';
    image.style.height = nuevaAlturaImagenPx+'px';
  }
}
function calcularBannerUbicacion(){
  var location = document.getElementById('contFormCal').clientHeight;
  var imagen = document.getElementById('hero-sec').clientHeight;
  var banerCupon = document.getElementById('banerCupon').clientHeight;
  var alturaPantalla = window.innerHeight;
  // Asigna nuevas alturas en porcentaje
  //var nuevaAlturaForm = 30; // Porcentaje
  //var nuevaAlturaImagen = 40; // Porcentaje
  //var nuevaAlturaBanerCupon = 30; // Porcentaje
  // Calcula las nuevas alturas en píxeles
  ///var nuevaAlturaFormPx = (nuevaAlturaForm / 100) * alturaPantalla;
  let altura = banerCupon + location
  var nuevaAlturaImagenPx =alturaPantalla - altura ;
  // var nuevaAlturaBanerCuponPx = (nuevaAlturaBanerCupon / 100) * alturaPantalla;
  // Asigna las nuevas alturas
  // document.getElementById('contFormCal').style.height = nuevaAlturaFormPx + "px";
  document.getElementById('hero-sec').style.height = nuevaAlturaImagenPx + "px";
  // document.getElementById('banerCupon').style.height = nuevaAlturaBanerCuponPx + "px";
  var images = document.getElementsByClassName('sliderImage');
  var sliderVideo = document.getElementById('sliderVideo');
  var contHeroSlide__slider = document.getElementsByClassName('contHeroSlide__slider');
  if(sliderVideo){
   // contHeroSlide__slider.style.height = nuevaAlturaImagenPx+'px';
   // sliderVideo.style.height = nuevaAlturaImagenPx+'px';
    sliderVideo.style.height = 'auto';
  }
  for (var i = 0; i < contHeroSlide__slider.length; i++) {
    var img = contHeroSlide__slider[i];
    img.style.width = '100%';
    img.style.height = nuevaAlturaImagenPx+'px';
  }
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.style.width = '100%';
    image.style.height = nuevaAlturaImagenPx+'px';
  }
}
