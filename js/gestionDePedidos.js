const url = 'https://apipedidos2.onrender.com/api/usuario'

$(document).ready(function() {
    $(".toggle-icon").click(function() {
      var $toggleIcon = $(this);
      var currentState = $toggleIcon.attr("data-state");


      if (currentState === "on") {
        $toggleIcon.removeClass("fa-toggle-on").addClass("fa-toggle-off");
        $toggleIcon.attr("data-state", "off");
      } else {
        $toggleIcon.removeClass("fa-toggle-off").addClass("fa-toggle-on");
        $toggleIcon.attr("data-state", "on");
      }
    });
  });

  const listarDatos = async(busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidotablapedidos')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?_id=${encodeURIComponent(busqueda)}`;
    }



        fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.pedidos //Capturar el array devuelto por la api

        table.clear();

        console.log(listaUsuarios)

        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta +=

            `<tr>
            <td>${usuario.idpedido}</td>`+
            `<td>${usuario.descpedido}</td>`+
            `<td>${usuario.preciopedido}</td>`+
            `<td>${usuario.fechapedido}</td>`+
            `<td>${usuario.productospedido}</td>`+
            `<td>${usuario.clientepedido}</td>`+
            `<td><i onclick="window.location.href='ActualizarPedidos.html?_id=${usuario._id}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
            <select id="estadoPedido" name="estadoPedido">
            <option value="En Proceso">En Proceso</option>
  <option value="pendiente">Pendiente</option>
  <option value="vendido">Vendido</option>
  <option value="entregado">Entregado</option>
  <option value="cancelado">Cancelado</option>
</select></td>`+

            `</tr>`
            
        })
        table.rows.add($(respuesta)).draw();
    })


    
}
const eliminar = (id) =>{

  let usuario = {
       _id: id
   }

       Swal.fire({
           title: '¿Estás seguro?',
           text: 'Esta acción no se puede deshacer',
           icon: 'warning',
           showCancelButton: true,
           confirmButtonText: 'Sí, eliminar',
           cancelButtonText: 'Cancelar'
         }).then((result) => {
           if (result.isConfirmed) {
              fetch(`${url}?_id=${usuario._id}`,  {
                  method: 'DELETE',
                  mode: 'cors',
                  body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
                  headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              
              
              .then((resp) => resp.json())
              .then(function (data) {
                  console.log('Usuario eliminado:', data);
                  listarDatos(); // Vuelve a cargar la lista después de eliminar
              })

             }})
             .catch(function (error) {
               // Maneja los errores
               console.error('Error al eliminar usuario:', error);
             })
 
             
     
     // Maneja la respuesta después de eliminar el usuario, por ejemplo, actualizando la tabla
   


};


function confirmarEliminacion() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f6f6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        resolve();
      } else {
        reject('La eliminación fue cancelada');
      }
    });
  });
}