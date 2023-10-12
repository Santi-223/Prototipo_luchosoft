
/*---API COMPRAS*-----------------------------------------------*/

let url = 'https://consumirapileidy.onrender.com/api/compras'



const listaCompras = async () => {
   let respuesta = ''
   let body = document.getElementById('contenidoCompras')

   // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro

   let urlAPI = url;

   //url: Es la url de la api.
   //Al deslpegarla en el servidor colocar la api del servidor
   fetch(urlAPI, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then(function (data) {
         let listaCompras = data.compra //Capturar el array devuelto por la api

         // Limpia la tabla antes de agregar datos nuevos
         table.clear().draw();


        
         datos =
            listaCompras.map(function (compra) {//Recorrer el array
               let estado = ""
               if (compra.estado_compra == false) {
                  estado = "fas fa-toggle-off iconos toggle-icon gris"
               } else {
                  estado = "fas fa-toggle-on iconos toggle-icon"
               }
              
               if (compra.estado_compra == true) {
                  estado_nuevo = false;
               } else {
                  estado_nuevo = true;
               }
               respuesta += `<tr><td>${compra.id_compra}</td>` +
                  `<td>${compra.nombre_compra}</td>` +
                  `<td>${compra.total_compra}</td>` +
                  `<td>${compra.fecha_compra}</td>` +
                  `<td>${compra.insumos}</td>` +
                  `<td>${compra.proveedor}</td>` +
                  `<td>
                            <i class="${estado}"></i>
                        </td>`+
                  `</tr>`
            })

         // Agrega los datos a la tabla y redibuja la tabla
         table.rows.add($(respuesta)).draw();
      })
}

const cambiarEstadoCompra = async (id_compra, estado_nuevo) => {

   try {

      let compra = {
         id_compra: id_compra,
         estado_compra: estado_nuevo
      }

      const response = await fetch(url, {
         method: 'PUT',
         mode: 'cors',
         body: JSON.stringify(compra),
         headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if (response.ok) {
         const json = await response.json();
         Swal.fire({
            title: json.msg,
            icon: 'success',
            showCancelButton: false, // Evita que aparezca el botón "Cancelar"
            confirmButtonText: 'OK',
         }).then((result) => {
            if (result.isConfirmed) {
               // El usuario hizo clic en "OK"
               window.location.href = 'gestionCompras.html'; // Redireccionar después del clic en OK
            }
         });
      } else {
         alert("Error al cambiar el estado de la compra.");
      }
   } catch (error) {
      console.error("Error de red:", error);
   }
}

function consultarCompra(busqueda) {
   let urlAPI = url;
   // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
   if (busqueda) {
      urlAPI += `?id_compra=${encodeURIComponent(busqueda)}`;
   }

   fetch(urlAPI, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then((resp) => resp.json())
      .then(function (data) {
         let compra = data.compra[0]; // Suponiendo que obtienes una sola compra

         // Llenar los campos del formulario con los datos del cliente
         document.getElementById('idCompra').value = compra.idCompra;
         document.getElementById('nombreCompra').src = compra.nombreCompra;
         document.getElementById('precioCompra').src = compra.precioCompra;
         document.getElementById('fechaCompra').value = compra.fechaCompra;
      })
      .catch(function (error) {
         console.error('Error al obtener el detalle compra:', error);
      });
}


function validarCamposAgregar() {
   // Obtén los valores de los campos de entrada
   let id_compra = document.getElementById('idCompra').value;
   let nombre_compra = document.getElementById('nombreCompra').value;
   let fecha_compra = document.getElementById('fechaCompra').value;
   let total_compra = document.getElementById('precioCompra').value;
   let proveedor = document.getElementById('proveedor').value;



   // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
   if (id_compra === "" || nombre_compra === "" || total_compra === "" ||fecha_compra === ""||proveedor==="" ) {
      // Utiliza SweetAlert para mostrar una alerta de error
      Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Por favor, completa todos los campos correctamente.',
      });
   } else {
      // Todos los campos son válidos, llama a la función registrar compra
      registrarCompra();
   }
}

const registrarCompra = async () => {
   let id_compra = document.getElementById('idCompra').value;
   let nombre_compra = document.getElementById('nombreCompra').value;
   let fecha_compra = document.getElementById('fechaCompra').value;
   let total_compra = document.getElementById('precioCompra').value;
   let proveedor = document.getElementById('proveedor').value;

   let compra = {
      id_compra: id_compra,
      nombre_compra: nombre_compra,
      fecha_compra: fecha_compra,
      estado_compra: true,
      total_compra: total_compra,
      proveedor:proveedor


   }

   fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(compra),//Convertir el objeto _compra  a un JSON
      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then(json => {
         //alert(json.msg)//Mensaje que retorna la API
         console.log(json)
         if (json.msg == "Inserción exitosa") {
            Swal.fire({
               title: json.msg,
               icon: 'success',
               showCancelButton: false, // Evita que aparezca el botón "Cancelar"
               confirmButtonText: 'OK',
            }).then((result) => {
               if (result.isConfirmed) {
                  // El usuario hizo clic en "OK"
                  window.location.href = 'gestionCompras.html'; // Redireccionar después del clic en OK
               }
            });
         } else {
            Swal.fire({
               title: json.msg,
               icon: 'error',
               showCancelButton: false, // Evita que aparezca el botón "Cancelar"
               confirmButtonText: 'OK',
            }).then((result) => {
               if (result.isConfirmed) {
                  // El usuario hizo clic en "OK"
                  window.location.href = 'gestionCompras.html'; // Redireccionar después del clic en OK
               }
            });
         }
      })
}

