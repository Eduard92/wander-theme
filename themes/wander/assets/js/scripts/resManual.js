  
        function actualizarCampos(response) {
          console.log("Respuesta AJAX recibida:", response); // Verificar el contenido en consola
      
          if (!response || typeof response !== 'object') {
              console.error("La respuesta no es válida:", response);
              return;
          }
      
          if (response.success) {
              document.getElementById('descuento').value = response.descuento;
              document.getElementById('total').value = response.total;
          } else {
              alert("Cupón no válido");
              document.getElementById('descuento').value = "";
          }
      }    