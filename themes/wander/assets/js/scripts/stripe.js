        const stripe = Stripe(publicApi);
        let formularioEnviado = false;
      // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 3
      const elements = stripe.elements(options);
      
      // Create and mount the Payment Element
      const paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');


      const form = document.getElementById('payment-form');
      let btn_pagar = document.getElementById("btn_pagar");


          
        function showErrorToast() {
          const toast = document.getElementById('error-toast');
          toast.style.display = 'block';
          setTimeout(() => {
            toast.style.display = 'none';
          }, 10000); // Oculta después de 10 segundos
        }
        
        function closeErrorToast() {
          document.getElementById('error-toast').style.display = 'none';
        }
             
          
          
       function showExitToast() {
          const toast = document.getElementById('exit-toast');
          toast.style.display = 'block';
          setTimeout(() => {
            toast.style.display = 'none';
          }, 10000); // Oculta después de 10 segundos
        }
        
        function closeExitToast() {
          document.getElementById('exit-toast').style.display = 'none';
        }
                
             
      window.addEventListener('load', function() {
            setTimeout(function() {
                // Aquí va el evento que quieres ejecutar
                showExitToast()
                // Puedes reemplazar console.log con tu propia función o código
            }, 60000); // 60000 milisegundos = 60 segundos = 1 minuto
        });
              
               
     let popupMostrado = false;

       document.addEventListener('mouseleave', function (e) {
               if (e.clientY <= 0 && !popupMostrado && !formularioEnviado) { // if (e.clientY <= 0 && !popupMostrado) {
                  e.preventDefault();
                  e.returnValue = '';

                console.log('Saliste');
                showExitToast();
                //  mostrarPopup();
                }
        });
              
       document.addEventListener('visibilitychange', function () {
                  if (document.visibilityState === 'hidden' && !formularioEnviado) {
                     showExitToast();

                    navigator.sendBeacon('/test/salio', JSON.stringify({ reserva: reserva }));

                    // Esto puede ser interpretado como "salida"
                  }
                });


        window.addEventListener('beforeunload', function(event) {

            if (!formularioEnviado) {
              navigator.sendBeacon('/test/salio', JSON.stringify({ reserva: reserva }));
              showExitToast();                     
              event.preventDefault(); // Necesario en algunos navegadores
              event.returnValue = ''; // Esto activa la advertencia de salida
    
            }
            });
            
            
            
              
      form.addEventListener('submit', async (event) => {

        btn_pagar.style.visibility = "hidden";
       // fbq('track', 'InitiateCheckout');



        event.preventDefault();
        
        
        /// validar si existe ya una pagada antes para evitar duplicidad//
          try {
                const response = await fetch('https://wandercabins.mx/pagoDuplicado?reserva='+reserva, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        
                const result = await response.json();
        
                // Evaluar el resultado
                if (result.duplicado === true) {
                    // Mostrar mensaje de error y salir
                    console.error('Reserva duplicada.');
                    
                    const messageContainer = document.querySelector('#error-message');
                    messageContainer.textContent = result.message;
            
                            
                    setTimeout(() => {
                       window.location.href = "https://wandercabins.mx"; // Reemplaza con la URL a donde deseas redirigir
                      }, 5000);
            
            
                    return; // Detener la ejecución
                }
            } catch (error) {
                
                showErrorToast();
                console.error('Error al realizar el POST:', error);
                btn_pagar.style.visibility = "visible"; // Reaparecer el botón
                return; // Detener la ejecución
            }
            
          /// fin  validar si existe ya una pagada antes para evitar duplicidad//
          
          
        formularioEnviado = true;

        const {error} = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: success_url
          },
        });
      
        if (error) {
            btn_pagar.style.visibility = "visible";
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
 
          if(error.code == 'incomplete_email' ||  error.code == 'incomplete_name' ||  error.code =='incomplete_number' ||  error.code =='incomplete_expiry' ||  error.code =='incomplete_cvc'||  error.code == 'invalid_number'){ 
            //console.log('error')
            showErrorToast();
            
          }
          else if(error.payment_intent.status == 'succeeded'){
                          window.location.href = success_url;

          }
          else {
            const messageContainer = document.querySelector('#error-message');
            messageContainer.textContent = error.message;
            showErrorToast();

            }
         
         formularioEnviado = false;

        }
        else{    
                window.location.href = success_url;
            }
        

      });
