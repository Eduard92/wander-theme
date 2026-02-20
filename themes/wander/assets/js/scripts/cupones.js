function aplicar(){
  // event.preventDefault();
let cupon = document.getElementById('promoCode').value;
      //document.getElementById('aplicarCupon').disabled  = true;
      //document.getElementById('promoCode').disabled  = true;

$.request('onAplicar',{
 data: {cupon: cupon},
success: function(data) {

  let divCupon=  document.getElementById("divCupon");

   this.success(data).done(function() {
     console.log(data);

    if(data.estatus == true){
      document.getElementById('promoCode').readOnly  = true;
      divCupon.style.display = "flex";
      document.getElementById('cuponDesc').innerHTML= data.cupon+' - ' +data.descuentoPorcentaje +' %';
      //let descuento = totalHospedaje * data.descuento/100;
      document.getElementById('cuponDescMoney').innerHTML= '- '+ data.descuento ;


     // let nvoTotal = (totalHospedaje - descuento) + totalServicios

      //let nvoIva = nvoTotal *.16;

      const precioElement = document.getElementById('montoIva');
      precioElement.innerHTML = '$ ' + data.nvoIva.toLocaleString();


      const precioFinal = document.querySelector('.precioFinal');
     // let totalFinal = parseInt(nvoTotal)+parseInt(nvoIva);
      precioFinal.innerHTML = 'TOTAL $ ' +data.totalFinal.toLocaleString()+' MXN';

      totalFinal = data.totalFinal; // actualizamos variable global


      precioElement.innerHTML = '$ ' + data.nvoIva.toLocaleString();

      const aplicarCupon = document.getElementById('aplicarCupon');
      const quitarCupon = document.getElementById('quitarCupon');

      document.getElementById('aplicarCupon').style.display = 'none';
      document.getElementById('quitarCupon').style.display = 'inline';

      const codeError = document.getElementById('codeError');
      codeError.innerHTML = '';

      const codeOk = document.getElementById('codeOk');
      codeOk.innerHTML = 'Cupón aplicado correctamente';
 
    }else{
      const codeError = document.getElementById('codeError');
     // let totalFinal = parseInt(nvoTotal)+parseInt(nvoIva);
     codeError.innerHTML = 'El cupón de descuento no es valido';
     document.getElementById('promoCode').value = '';

      //document.getElementById('aplicarCupon').disabled  = false;
      //document.getElementById('promoCode').disabled  = false;    
      document.getElementById('promoCode').readOnly  = false;

    }
   });
}
}

);


}

function quitar(){
  // event.preventDefault();
let cupon = document.getElementById('promoCode').value;
      //document.getElementById('aplicarCupon').disabled  = true;
      //document.getElementById('promoCode').disabled  = true;

$.request('onEliminarCupon',{
success: function(data) {

  let divCupon=  document.getElementById("divCupon");

   this.success(data).done(function() {

    if(data.estatus == true){

      divCupon.style.display = "none";
      document.getElementById('cuponDesc').innerHTML= '';
      document.getElementById('cuponDescMoney').innerHTML= '' ;


      const precioElement = document.getElementById('montoIva');
      precioElement.innerHTML = '$ ' + data.iva.toLocaleString();


      const precioFinal = document.querySelector('.precioFinal');
      precioFinal.innerHTML = 'TOTAL $ ' +data.total.toLocaleString()+' MXN';
      
      totalFinal = data.total; // actualizamos variable global


      const aplicarCupon = document.getElementById('aplicarCupon');
      const quitarCupon = document.getElementById('quitarCupon');

      document.getElementById('aplicarCupon').style.display = 'inline';
      document.getElementById('quitarCupon').style.display = 'none';

      const codeError = document.getElementById('codeError');
      codeError.innerHTML = '';

      const codeOk = document.getElementById('codeOk');
      codeOk.innerHTML = '';
      //document.getElementById('aplicarCupon').disabled  = false;
      //document.getElementById('promoCode').disabled  = false;    

      document.getElementById('promoCode').value = '';

      document.getElementById('promoCode').readOnly  = false;


    }
   });
}
}

);


}