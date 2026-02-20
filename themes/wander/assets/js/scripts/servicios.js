/**seccion nueva amenidades */

fechasSeleccionadas = {};

serviciosExtra.forEach(extra => {

if(extra.tipo == 'amenidades' ){
   // extrasInput('#extras-days-max-'+serviciosExtra.id, '#extras-days-min-'+serviciosExtra.id, '#dias-ds-'+serviciosExtra.id);
   // extrasInput('#extras-cant-max-'+serviciosExtra.id, '#extras-cant-min-'+serviciosExtra.id, '#cantidad-ct-'+serviciosExtra.id);
    //extrasInput('#extras-days-max-'+serviciosExtra.id, '#extras-days-min-'+serviciosExtra.id, '#dias-ds-'+serviciosExtra.id);
    fechasSeleccionadas[extra.id] = {};
    const checkboxes = document.getElementsByName('fecha-ct-'+extra.id+'[]');
    const agregarButton = document.getElementById(extra.slug);
/**/




    $.each(serviciosGuardados, function(index, value) {
      let x = {};
      fechasSeleccionadas[index] = value;

  }); 

  if (!(extra.id in fechasSeleccionadas)) {
      fechasSeleccionadas[extra.id] = {}; // Crear un objeto vacío si no existe
  }
      checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          if (this.checked) {
              fechasSeleccionadas[extra.id][this.value] = this.value;
              if (agregarButton.checked) {
                  actionAct(extra,'addCant');
              }
          console.log(`Checkbox con valor ${this.value} marcado.`);
          // Realiza aquí cualquier acción que necesites
          } else {
              if (agregarButton.checked) {
                  actionAct(extra,'removeCant');
              }

              if (Object.keys(fechasSeleccionadas[extra.id]).length == 1 && agregarButton.checked) {
                  addCar(extra);
                  agregarButton.checked = false;
                              }
             
              delete fechasSeleccionadas[extra.id][this.value];

         // console.log(`Checkbox con valor ${this.value} desmarcado.`);
          // Realiza aquí cualquier acción que necesites
          }

       //   console.log(fechasSeleccionadas); // Mostrar el objeto actualizado en la consola
          actualizarVisibilidadBoton(extra.id,this.value); // Actualizar visibilidad del botón

      });
      
      });
  }
});


function actualizarVisibilidadBoton(id,key) {
  const agregarButton = document.getElementById('btnAmeni'+id);

  //const agregarButton = document.getElementById('botonAmidades'+extra.id)


  if (Object.keys(fechasSeleccionadas[id]).length > 0) {
      agregarButton.style.display = 'block';
  } else {
      agregarButton.style.display = 'none';
  }
}

/* fin seccion amenidades */



var posicion = 0;
window.addEventListener('scroll', (e) => {
    var _sumary = document.getElementById("sumary");
    if (!_sumary) return; // salir si no existe

posicion = window.scrollY;
//console.log(posicion);
 if($(window).width() > 1701){

if(posicion > 150){
    _sumary.style.top = '210px';

}
if(posicion > 170){
    _sumary.style.top = '170px';

}
if(posicion > 190){
    _sumary.style.top = '130px';

}
if(posicion > 210){
    _sumary.style.top = '90px';

}if(posicion > 230){
    _sumary.style.top = '50px';

}
if(posicion > 250){
    _sumary.style.top = '10px';

}
if(posicion  <150){
    _sumary.style.top = '250px';

}}}
);

$(window).resize(function(){


let _sumary = document.getElementById("sumary");
    if (!_sumary) return; // salir si no existe

if($(window).width() < 1700){
 // console.log($(window).width());
  _sumary.classList.remove("AddOnTripSummary__container__jBFXq");
  _sumary.classList.add("TripSummary__tripSummaryContainer__tfg6M");
  
}else if($(window).width() > 1701){


  //console.log($(window).width());
  _sumary.classList.remove("TripSummary__tripSummaryContainer__tfg6M");
  _sumary.classList.add("AddOnTripSummary__container__jBFXq");

}

});

 window.onload = function () {
    let _sumary = document.getElementById("sumary");
    if (!_sumary) return; // salir si no existe

if($(window).width() < 1700){
  //console.log($(window).width());
  _sumary.classList.remove("AddOnTripSummary__container__jBFXq");
  _sumary.classList.add("TripSummary__tripSummaryContainer__tfg6M");
  
}else if($(window).width() > 1701){


  //console.log($(window).width());
  _sumary.classList.remove("TripSummary__tripSummaryContainer__tfg6M");
  _sumary.classList.add("AddOnTripSummary__container__jBFXq");

}

  let objetivo = document.getElementById('car_total'); 
  let objetivo2 = document.getElementById('car_subtotal');
        let objetivo3 = document.getElementById('totalBarra'); 

  let objetivoIva = document.getElementById('car_impuestos');  
  const contentExtras = document.getElementById('contExtras');
//console.log(serviciosGuardados);

Object.keys(serviciosGuardados).forEach(e => {
  //let extra = serviciosExtra.find( serv => serv.id == e);
  let extra = serviciosExtra.find( serv => serv.id == e);
    let checkbox =document.getElementById(extra.slug);
  
  if(checkbox.checked) {
            checks[extra.slug] = '1';
          
            let it ;
            let div = document.createElement("div");
          
            div.setAttribute("class", "LineItem__tripSummaryItem__+xfgvd");
          
            div.setAttribute("id", "car_item_"+extra.slug);

            if(extra.ubicacion_id == ubicacion && extra.disponible == 1 ){
           //   console.log(extra);

                if(extra.tipo == "kit" || extra.tipo == "extended"  || extra.tipo == "hospedaje" ){

                  price = extra.precio_sab;

                    it = '<dt class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ extra.slug+'">'+ extra.nombre+'</dt>'
                          +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ extra.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';
                  }
                  else {
                   let data = serviciosGuardados[e];
                    let cantht =document.getElementById("cantidad-ct-"+extra.id);
                    let daysht =document.getElementById("dias-ds-"+extra.id);
                    cantht.value = data.cantidad;
                    daysht.value = data.dias;


                    let cant =data.cantidad;
                    let days =data.dias;
             //       console.log('dias: '+days)
                    if(days == undefined || days == '')
                       days = 1;
                     //  console.log('dias: '+days)

                    //days = parseInt(days.value);
                    //cant = parseInt(cant.value);

                    price = (cant * days)*extra.precio_sab;
                //    console.log(price);

                  it = '<dt class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ extra.slug+'">'+extra.nombre+'</dt>'
                      +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ extra.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';

                }

                div.innerHTML = it;
                contentExtras.appendChild(div);

                subtotal = parseInt(subtotal) + parseInt(price);
                total = subtotal*1.16;
                iva = subtotal*.16;
          }
        }
  });

  /*serviciosExtra.forEach(extra => {

    let chek =!! document.getElementById(extra.slug);

        if(chek == true){

          let checkbox =document.getElementById(extra.slug);

     
          if(checkbox.checked) {
              checks[extra.slug] = '1';
            
              let it ;
              let div = document.createElement("div");
            
              div.setAttribute("class", "d-flex justify-content-between ");
            
              div.setAttribute("id", "car_item_"+extra.slug);

              if(extra.ubicacion_id == ubicacion && extra.disponible == 1 ){
                console.log(extra);

                  if(extra.tipo == "kit" ){

                    price = extra.precio_sab;

                      it = '<p class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ extra.slug+'">'+ extra.nombre+'</p>'
                            +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ extra.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';
                    }
                    else {
                    console.log('extra');
                      let cant =document.getElementById("cantidad-ct-"+extra.id).value;
                      let days =document.getElementById("dias-ds-"+extra.id).value;
                      days = parseInt(days);
                      cant = parseInt(cant);

                      price = (cant * days)*extra.precio_sab;
                      console.log(price);

                    it = '<p class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ extra.slug+'">'+extra.nombre+'</p>'
                        +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ extra.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';

                  }

                  div.innerHTML = it;
                  contentExtras.appendChild(div);

                  subtotal = parseInt(subtotal) + parseInt(price);
                  total = subtotal*1.16
            }
          }
      }

    

  });*/

  objetivoIva.innerHTML = parseInt(iva).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });


  objetivo2.innerHTML = parseInt(subtotal).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
  
    if(objetivo3){
                objetivo3.innerHTML = total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
    }


  objetivo.innerHTML = total.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
  
}

function addCar(i) {
  if (typeof i != 'object')
          item = JSON.parse(i);
  else
      item = i;


let slug = item.slug;
let article = item.nombre;
let price = item.precio_sab;
let objetivo = document.getElementById('car_total'); 
let objetivo3 = document.getElementById('totalBarra'); 
let objetivo2 = document.getElementById('car_subtotal'); 
let objetivoIva = document.getElementById('car_impuestos'); 


const contentExtras = document.getElementById('contExtras');

if(checks[slug] == '0'){

    checks[slug] = '1';
    let it ;
    let div = document.createElement("div");
    div.setAttribute("class", "LineItem__tripSummaryItem__+xfgvd");
    div.setAttribute("id", "car_item_"+slug);

    if(item.tipo == 'kit' || item.tipo == 'extended' || item.tipo == 'hospedaje'){
       it = '<dt class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ item.slug+'">'+ article+'</dt>'
            +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ item.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';
     // extras.push(item.nombre);
      
    }
    else if(item.tipo == 'amenidades'  ){

      let cant = document.getElementById("cantidad-ct-"+item.id).value;
      let days = Object.keys(fechasSeleccionadas[item.id]).length; //document.getElementById("dias-ds-"+item.id).value;
      // let fechas = document.getElementById("fechas-ds-"+item.id).value;
      price = (cant * days)*price;

      it = '<dt class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ item.slug+'">'+ article+'</dt>'
          +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ item.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';
      // extras.push(item.nombre);

      }
    else{
           
      let cant = document.getElementById("cantidad-ct-"+item.id).value;
      let days = document.getElementById("dias-ds-"+item.id).value;
    //  console.log('add dias: '+days)

      if(days == undefined || days == '')
        days = 1;
   //     console.log('add dias: '+days)

      days = parseInt(days);
       cant = parseInt(cant);
       
   //    console.log(days);
   //    console.log(cant);

      price = (cant * days)*price;
      console.log(price);

       it = '<dt class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ item.slug+'">'+article+'</dt>'
            +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ item.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';
            
      //extras.push(item.nombre);


    }


    div.innerHTML = it;
    contentExtras.appendChild(div);

    subtotal = parseInt(subtotal) + parseInt(price);
    total = subtotal*1.16;
    iva = subtotal*.16;

    objetivo.innerHTML = total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
      
    objetivo2.innerHTML = subtotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
    
    if(objetivo3){
                objetivo3.innerHTML = total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
    }

    objetivoIva.innerHTML = iva.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });objetivoIva

}else{
    checks[slug] = '0';

    let div = document.getElementById("car_item_"+slug);
    contentExtras.removeChild(div)

    if(item.tipo == 'kit' || item.tipo == 'extended' || item.tipo == 'hospedaje'){
          subtotal = parseInt(subtotal) - parseInt(price);
          total = subtotal*1.16;
          iva = subtotal*.16;

    }
    else if(item.tipo == 'amenidades'  ){

          let cant = document.getElementById("cantidad-ct-"+item.id).value;
          let days = Object.keys(fechasSeleccionadas[item.id]).length; //document.getElementById("dias-ds-"+item.id).value;
          // let fechas = document.getElementById("fechas-ds-"+item.id).value;
          price = (cant * days)*price;

          subtotal = parseInt(subtotal) - parseInt(price);
          total = subtotal*1.16;
          iva = subtotal*.16;

          //  it = '<dt class="LineItem__tripSummaryItemName__6xWJY" id="car_item_label_'+ item.slug+'">'+ article+'</dt>'
          //    +' <p class="LineItem__tripSummaryItemValue__EtrwN" id="car_item_price_'+ item.slug+'">'+parseInt(price).toLocaleString('en-US', {  style: 'currency',  currency: 'USD',})+'</p>';
          // extras.push(item.nombre);

          }

    else{
           
      let cant = document.getElementById("cantidad-ct-"+item.id).value;
      let days = document.getElementById("dias-ds-"+item.id).value;

      if(days == undefined || days == '')
        days = 1;

       days = parseInt(days);
       cant = parseInt(cant);
    
       
      price = (cant * days)*price;

      subtotal = parseInt(subtotal) - parseInt(price);
          total = subtotal*1.16;
        iva = subtotal*.16;

      
      
    }
    
    objetivo.innerHTML = total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
      
    objetivo2.innerHTML = subtotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });

    if(objetivo3){
                objetivo3.innerHTML = total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
    }


    objetivoIva.innerHTML = iva.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });objetivoIva


}


}

function actionAct(i,action){
  if (typeof i != 'object')
          item = JSON.parse(i);
  else
      item = i;
//console.log(item);

let checkbox = document.getElementById(item.slug);
// console.log(checkbox);

if(checkbox.checked) {
      let cant = document.getElementById("cantidad-ct-"+item.id).value;
      let days = document.getElementById("dias-ds-"+item.id).value;
      let price = item.precio_sab;
      let objetivo = document.getElementById('car_total'); 
      let objetivo2 = document.getElementById('car_subtotal'); 
      let objetivo3= document.getElementById('totalBarra'); 
      let objetivoIva = document.getElementById('car_impuestos'); 

      if(days == undefined || days == '')
        days = 1;
       // console.log(days);
      //  console.log(cant);
      //  console.log(action);

      switch(action) {
          case 'addCant':
              cant = parseInt(cant) +1;
              //days = parseInt(days);.
              subtotal = parseInt(subtotal) + parseInt(price);
              break;
          case 'removeCant':
              if(cant > 1){
                cant = parseInt(cant) - 1;
               //days = parseInt(days);.
               subtotal = parseInt(subtotal) - parseInt(price); 
              }             
              break;
          case 'addDay':
                cant = parseInt(cant);
                days = parseInt(days) + 1;   
                subtotal = parseInt(subtotal) +( parseInt(price)*parseInt(days));              

              break;
          case 'removeDay':
              if(days > 1){
                cant = parseInt(cant);
                days = parseInt(days) - 1;   
                subtotal = parseInt(subtotal) +( parseInt(price)*parseInt(days));   
              }                           
            break;
        }
              price = (cant * days)*price;
              total = subtotal*1.16
              iva = subtotal*.16;


    let div = document.getElementById("car_item_price_"+item.slug);
              div.innerHTML = parseInt(price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'});

    objetivo.innerHTML = total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
      
    objetivo2.innerHTML = subtotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
  
      if(objetivo3){
                objetivo3.innerHTML = total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
    }

    objetivoIva.innerHTML = iva.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'});//total.toLocaleString('es', { style: 'currency', currency: 'USD' });
    


  } else {
    console.log('Ahora está desmarcado');
  }

}


    function send(){
        
              
        if(objLayer.cabana != ''){
        
            dataLayer.push({'wander': null }); 
            dataLayer.push({'event': 'Paso_5',
                                'wander': {
                                    'serviciosExtra' : objLayer.serviciosExtra
                                    }
                        });
        }
        
                                                
                                                
    }


 $(document).ready(function() {



        $(".description-container").each(function() {
            var description = $(this).find(".expandable-description");
            var link = $(this).find(".read-more-link");
    
            // Si la descripción rebasa la altura máxima, mostrar el enlace
            if (description[0].scrollHeight > description.innerHeight()+1) {
                link.show();
            } else {
                link.hide();
            }
    
            // Manejar el clic en el enlace
            link.click(function() {
                description.toggleClass("expanded");
                if (description.hasClass("expanded")) {
                    link.text("Leer menos");
                } else {
                    link.text("Leer más");
                }
            });
        });
        
    });
    