jQuery(document).ready(function($) {
  // jQuery.validator.setDefaults({
  //   debug: true,
  //   success: "valid"
  // });
  // F O R M U L A R I O  C A L E N D A R I O  H O M E 
  $("#calHome").validate({
      errorElement: "div",
      errorClass: "error-line",
      ignore: "",
      rules: {
        locacion: "required",
        entrada: "required",
        salida: "required",
        bedroom: "required",
        select_adulto: "required",
        select_nino: "required"
      },
      messages: {
        locacion: "<i class='fa fa-times'><i>",
        entrada: "<i class='fa fa-times'><i>",
        salida: "<i class='fa fa-times'><i>",
        bedroom: "<i class='fa fa-times'><i>",
        select_adulto: "<i class='fa fa-times'><i>",
        select_nino: "<i class='fa fa-times'><i>"
      }
      // submitHandler: function(form) {
        // console.log("enviar form");
        // var dataForm = $('#frmContacto').serialize();
        // if (grecaptcha.getResponse() == ''){
        //   $( '#reCaptchaError' ).html( '<p>Por favor, debes verificar el reCaptcha</p>' ).fadeOut(5000);
        // } else {
        // $.ajax({
        //   url: $urlSitio + 'contactoScript.php',
        //   type: 'POST',
        //   data: dataForm,
        //   beforeSend: function(xhr) {
        //     $('.btnSend').addClass('loadBtn');
        //   },
        //   complete: function(xhr, textstatus) {
        //     $('.btnSend').removeClass('loadBtn');
        //   },
        //   success: function(data) {
        //     console.log(data);
        //     $("#frmContacto").each (function(){
        //       this.reset();
        //     });
        //     $('#modalCongrats').removeClass('hideMo').addClass('showMo');
        //     setTimeout(function(){
        //       $('#modalCongrats').removeClass('showMo').addClass('hideMo');
        //     }, 5000);
        //     grecaptcha.reset();
        //   },
        //   error: function(e) {
        //     console.log(e);
        //   }
        // });
        // }
        // $.ajax({
        //   url: '/contactoScript.php',
        //   type: 'POST',
        //   data: dataForm,
        //   beforeSend: function(xhr) {
        //     $('.btnSend').addClass('loadBtn');
        //   },
        //   complete: function(xhr, textstatus) {
        //     $('.btnSend').removeClass('loadBtn');
        //   },
        //   success: function(data) {
        //     console.log(data);
        //     $("#frmContacto").each (function(){
        //       this.reset();
        //     });
        //     $('#modalCongrats').removeClass('hideMo').addClass('showMo');
        //     setTimeout(function(){
        //       $('#modalCongrats').removeClass('showMo').addClass('hideMo');
        //     }, 5000);
        //   },
        //   error: function(e) {
        //     console.log(e);
        //   }
        // });
      // }
    });



    $("#calHome-1").validate({
      errorElement: "div",
      errorClass: "error-line",
      ignore: "",
      rules: {
        entrada: "required",
        salida: "required",
        bedroom: "required",
        select_adulto: "required",
        select_nino: "required"
      },
      messages: {
        entrada: "<i class='fa fa-times'><i>",
        salida: "<i class='fa fa-times'><i>",
        bedroom: "<i class='fa fa-times'><i>",
        select_adulto: "<i class='fa fa-times'><i>",
        select_nino: "<i class='fa fa-times'><i>"
      }
    });





  // $('form#frmResumen').on('submit', function(event) {
  //   $('.nameResInp').each(function (i) {
  //     console.log(i);
  //     $(this).rules("add", {
  //       required: true,
  //       messages: {
  //         required: "<i class='fa fa-times'><i>",
  //       }
  //     });
  //   });
  // });

  $("#frmResumen").validate({
    ignore: false,
    errorElement: "div",
    errorClass: "error-line",
    validClass: "success text-success",
    highlight: function (element, errorClass) {
      //alert('em');
      // $(element).fadeOut(function () {
      // $(element).fadeIn();
      //});
    },
    rules: {
      email: "required",
      nombre_1: "required",
      dd_1: {
        required: true,
        number: true
      },
      mm_1: {
        required: true,
        number: true
      },
      aa_1: {
        required: true,
        number: true
      },
      telefono_1: {
        required: true,
        number: true
      },
      "edades[]": {
        required: true,
        number: true
      },
      "ninoedades[]": {
        required: true,
        number: true
      },
      resAcepto: "required",
      resDeslinde: "required",
      resMetodo: "required",
    },
    messages: {
      email: "<i class='fa fa-times'><i>",
      nombre_1: "<i class='fa fa-times'><i>",
      dd_1: {
        required: "<i class='fa fa-times'><i>",
        number: "<i class='fa fa-times'><i>"
      },
      mm_1: {
        required: "<i class='fa fa-times'><i>",
        number: "<i class='fa fa-times'><i>"
      },
      aa_1: {
        required: "<i class='fa fa-times'><i>",
        number: "<i class='fa fa-times'><i>"
      },
      telefono_1: {
        required: "<i class='fa fa-times'><i>",
        number: "<i class='fa fa-times'><i>"
      },
      "edades[]": {
        required: "<i class='fa fa-times'><i>",
        number: "<i class='fa fa-times'><i>"
      },
      "ninoedades[]": {
        required: "<i class='fa fa-times'><i>",
        number: "<i class='fa fa-times'><i>"
      },
      resAcepto: "<i class='fa fa-times'><i>",
      resDeslinde: "<i class='fa fa-times'><i>",
      resMetodo: "<i class='fa fa-times'><i>",

    },
    // submitHandler: function (form) {
    //   alert('Form Submitted');
    // },
    invalidHandler: function (e, validator) {
      for (var i = 0; i < validator.errorList.length; i++) {
        // console.log(validator.errorList[i].element);
        $(validator.errorList[i].element).parents('.panel-collapse.collapse').collapse('show');
        $('li.btnsNext .nB.show').removeClass('show');
        $('[data-btn-valid]').next().addClass('show');
      }
    }
  });

  $('#frmResumen input').on('change keyup blur', function () {
    if ($('#frmResumen').valid()) {
      $('button#resumen').prop('disabled', false);
      // $('li.btnsNext .nB.show').removeClass('show');
      // $('[data-btn-valid]').next().addClass('show');
    } else {
      $('button#resumen').prop('disabled', 'disabled');
    }
  });
});