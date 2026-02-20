// Funciones Generales
var $menuMobile = $('#mm'),
  $botnoMobile = $('#openMenuMobile'),
  $dataAttr = $('[data-menu-expand]');
function menuMobile() {
  var elDato = $dataAttr.attr('data-menu-expand');
  // console.log(elDato);
  switch (elDato) {
    case 'false':
      $menuMobile.attr('data-menu-expand', true);
      $botnoMobile.attr('data-menu-expand', true);
      $('body').addClass('bloquear');
      TweenMax.to($menuMobile, 0.3, { scale: 1.0, opacity: 1, ease: Power3.easeInOut, zIndex: 5, easeParams: [1.1, 0.7], force3D: true });
      break;
    case 'true':
      $menuMobile.attr('data-menu-expand', false);
      $botnoMobile.attr('data-menu-expand', false);
      $('body').removeClass('bloquear');
      TweenMax.to($menuMobile, 0.3, { scale: 1.2, opacity: 0, ease: Power3.easeInOut, zIndex: -1, easeParams: [1.1, 0.7], force3D: true });
      break;
    default:
      break;
  }
}

function WowData() {
  var wow = new WOW(
    {
      boxClass: 'wow',      // default
      animateClass: 'animated', // default
      offset: 0,          // default
      mobile: false,       // default
      live: true        // default
    })
  setTimeout(function () {
    wow.init();
  }, 1000);
}


//Funcion para Header Oculto
function isSafari() { return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor); }
function isChrome() { return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); }
function scrolMenu() {
  var c, currentScrollTop = 0,
    navbar = $('#headerGeneral');

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.outerHeight();

    currentScrollTop = a;

    if (c < currentScrollTop && a > b + b) {
      // navbar.addClass("scrollHUp");
      if (isSafari() || isChrome()) {
        navbar.css('-webkit-transform', 'translateY(-100%)');
      } else {
        navbar.css('transform', 'translateY(-100%)');
      }
    } else if (c > currentScrollTop && !(a <= b)) {
      // navbar.removeClass("scrollHUp");
      if (isSafari() || isChrome()) {
        navbar.css('-webkit-transform', 'translateY(0)');
      } else {
        navbar.css('transform', 'translateY(0)');
      }
    }
    c = currentScrollTop;
  });
}
function headScrolDown() {
  //WindowSrcoll
  $(window).on("scroll", function () {
    let headerPirn = $("#headerGeneral").outerHeight();
    let sumaHead = headerPirn;
    if ($(window).scrollTop() > sumaHead) {
      $("#headerGeneral").addClass("activeHead");
    } else {
      $("#headerGeneral").removeClass("activeHead");
    }
  });
}

var $isOpen = false,
  $overlay = $('.overlayGenerico'),
  $modalGen = $('#modalGen');
function effectsModal() {
  TweenMax.to($overlay, 0.1, { autoAlpha: 1 });
  TweenMax.fromTo($modalGen, 0.6, { top: '-300%' }, { delay: 0.2, top: "0%", ease: Power3.easeInOut, easeParams: [1.1, 0.7], force3D: true });
}
function abreModalID() {
  $('[data-open-modal]').click(function (e) {
    e.preventDefault();
    effectsModal();
  });
}
function closeModalID() {
  $('[data-close-modal]').click(function (e) {
    e.preventDefault();
    // $('.contentInfo').hide('fast');
    TweenMax.to($overlay, 0.1, { delay: 0.55, autoAlpha: 0 });
    TweenMax.to($modalGen, 0.55, { top: '300%', ease: Power3.easeInOut, force3D: true });
  });
}
function closeModForm() {
  $('[data-close-form]').click(function (e) {
    e.preventDefault();
    TweenMax.to($('#formOpen'), 0.1, { scale: 1.2, opacity: 0, ease: Power3.easeInOut, zIndex: -1, easeParams: [1.1, 0.7], force3D: true });
  });
}

function barForm() {
  var altura = $('.stickyForm').outerHeight();
  $('.contFormCal').css('height', altura + 'px');
  var stickyTop = $('.stickyForm').offset().top;
  // console.log('Offset top Sticky' + stickyTop);

  $(window).scroll(function () {
    var windowTop = $(window).scrollTop();
    // console.log('ScrollTop Window:' + windowTop);
 //      console.log('Offset top Sticky' + stickyTop);
// console.log($(".ctFrmSt").outerHeight() + $(".ctFrmSt").offset().top - $(".stickyForm").outerHeight() );
    if (stickyTop < windowTop || $(".ctFrmSt").outerHeight() + $(".ctFrmSt").offset().top - $(".stickyForm").outerHeight() < windowTop) {
      $('.stickyForm').css('position', 'fixed');
    } else {
      $('.stickyForm').css('position', 'absolute');
    }
  });
}

// FX Tooltip Header
function infoHead() {
  // var $modal = $('#mod-info');
  // var tl = new TimelineMax({paused:true});
  // tl.staggerTo("#mod-info li", 0.2, {autoAlpha:1}, 0.2,0.3); 
  // TweenMax.set($modal, { autoAlpha: 0, y: 20 })
  // var $animation = TweenMax.to($modal, 0.30, { autoAlpha: 1, y: 0,  ease: Circ.easeOut}).reversed(true);
  // $('[data-tooltip]').click(function (e) {
  //   e.preventDefault();
  //   var idAttr = $(this).data('tooltip');
  //   $(this).toggleClass('activeMod');
  //   toggleInfo($animation);
  //   if($(this).hasClass('activeMod')) {
  //     tl.play().timeScale(1);
  //   } else {
  //     tl.reverse().timeScale(3);
  //   }
  // });

  $('[data-tooltip]').each(function (i, valor) {
    var valorId = $(this).data('tooltip');

    var $modal = $(valorId);
    var tl = new TimelineMax({ paused: true });

    tl.staggerTo(valorId + ' .commentsNoti', 0.2, { autoAlpha: 1 }, 0.2, 0.3);
    TweenMax.set($modal, { autoAlpha: 0, y: 20 })
    var $animation = TweenMax.to($modal, 0.30, { autoAlpha: 1, y: 0, ease: Circ.easeOut }).reversed(true);

    $('[data-tooltip="' + valorId + '"]').click(function (e) {
      e.preventDefault();
      $(this).toggleClass('activeMod');
      toggleInfo($animation);
      if ($(this).hasClass('activeMod')) {
        tl.play().timeScale(1);
      } else {
        tl.reverse().timeScale(3);
      }
    });
  })
}
function toggleInfo(anim) {
  anim.reversed(!anim.reversed());
}

function socialesBtn() {
  $('[data-card-id]').each(function () {
    var idx = $(this).data('card-id');
    console.log(idx);
    // Facebook
    var fbIdBtn = $('div[data-card-id="' + idx + '"] .soc-fb'),
      fbBtnurl = fbIdBtn.attr('data-uri'),
      fbBtntitle = fbIdBtn.attr('data-title'),
      fbBtnexc = fbIdBtn.attr('data-exc');

    fbIdBtn.attr({
      // app_id=3053442388215903 falta le app id
      href: "http://www.facebook.com/share.php?app_id=3053442388215903&sdk=joey&u=" + fbBtnurl + "&title=" + fbBtntitle,
      onclick: "javascript:window.open(this.href,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"
    });
    // Twitter
    var twIdBtn = $('div[data-card-id="' + idx + '"] .soc-tw'),
      twBtnurl = twIdBtn.attr('data-uri'),
      twBtntitle = twIdBtn.attr('data-title'),
      twBtnexc = twIdBtn.attr('data-exc'),
      strTW = 'PromoDromoMX';

    twIdBtn.attr({
      href: "https://twitter.com/share?url=" + twBtnurl + "&via=" + strTW + "&text=" + twBtntitle,
      onclick: "javascript:window.open(this.href,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"
    });
    // WhatsApp
    var waIdBtn = $('div[data-card-id="' + idx + '"] .soc-wa'),
      waBtnurl = waIdBtn.attr('data-uri');

    waIdBtn.attr({
      href: "whatsapp://send?text=" + waBtnurl
    });
  });

}

function modalSearch() {
  var $idSearch = $('#searchField');
  $('[data-search-open]').click(function (e) {
    e.preventDefault();
    $idSearch.addClass('isShow');
    $('.overlaySearch').fadeIn(800);
    $('#buscar').focus();
  });
  $('[data-label="Cerrar"]').click(function (e) {
    e.preventDefault();
    $idSearch.removeClass('isShow');
    $('.overlaySearch').fadeOut(800);
  });
}

// Load window
$(window).on('load', function () {
  // scrolMenu();
  // headScrolDown();
  WowData();
  // socialesBtn();
});

jQuery(document).ready(function($){
  // menuMobile();
  abreModalID();
  closeModalID();
  // closeModForm();
  WowData();

  $('#md').clone().prependTo('#contListMenu').removeAttr('id').show();
  TweenMax.to($('#mm'), 0, { scale: 1.2, opacity: 0, zIndex: -1, force3D: true });

  $('#contListMenu ul li a.menuIemHover').on('click', function(e) {
    // e.preventDefault();
    var $mobileId = $('#mm'),
      $btnId = $('#openMenuMobile');

    $mobileId.attr('data-menu-expand', false);
    $btnId.attr('data-menu-expand', false);
    $('body').removeClass('bloquear');
    TweenMax.to($mobileId, 0.3, { scale: 1.2, opacity: 0, ease: Power3.easeInOut, zIndex: -1, easeParams: [1.1, 0.7], force3D: true });
  });

  $('[data-btn-frm]').click(function (ev) {
    ev.preventDefault();
    var attr = $($(this).data('btn-frm'));
    // console.log(attr);
    $('[data-frm]').not(attr).hide();
    attr.show();
  });

  $('[data-login]').click(function (e) {
    e.preventDefault();
    var loginId = $(this).attr('data-login');
    console.log(loginId);
    $(loginId).addClass('isShow');
  });
  $('[data-login-close]').click(function (e) {
    e.preventDefault();
    var logoutId = $(this).attr('data-login-close');
    $(logoutId).removeClass('isShow');
  });

});