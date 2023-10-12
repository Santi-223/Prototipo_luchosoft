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

//const url = 'https://backendapi-2t9z.onrender.com/api/usuarios'
const url = 'https://rolesxd.onrender.com/api/usuario'

const listarDatos = async(busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidotabla')
    //url: Es la url de la api.
    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?_id=${encodeURIComponent(busqueda)}`;
    }
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.permisos //Capturar el array devuelto por la api
        table.clear().draw();

        console.log(listaUsuarios)

        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            
            respuesta +=

            `<tr>
            <td>${usuario.idrol}</td>`+
            `<td>${usuario.nombrerol}</td>`+
            `<td>${usuario.descrol}</td>`+
            `<td>${usuario.permisosrol}</td>`+
            `<td><i class="fa-solid fa-pen-to-square iconosRojos" onclick="window.location.href='ActualizarRoles.html?_id=${usuario._id}'"></i>
             <i class="fas fa-toggle-on toggle-icon "></td>`+
            `</tr>`
            
        })
        table.rows.add($(respuesta)).draw();
    })
}
const registrar = async()=>{

    

    let idrol= document.getElementById('idrol').value;
    let nombrerol = document.getElementById('nombrerol').value
    let descrol = document.getElementById('descrol').value
    
    let caracteres = /^[a-zA-Z0-9_.-ñÑ' 'áéíóúÁÉÍÓÚ]+$/;
    

if (idrol==="" || nombrerol==="" || descrol==="") {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        timer: 3000
    });

} else if (!caracteres.test(nombrerol) || !caracteres.test(descrol)){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese caracteres válidos.',
        timer: 3000
        
    });

}

else {

    let _idrol = document.getElementById('idrol').value;
    let _nombrerol = document.getElementById('nombrerol').value;
    let _descrol = document.getElementById('descrol').value;
        let usuario = {
            idrol:_idrol,
            nombrerol: _nombrerol,
            descrol:_descrol,
            permisosrol: "Ventas, Pedidos"
        }

        fetch(url,  {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if(json.msg){
                Swal.fire({
                    icon: 'success',
                    title: 'El rol se ha registrado',
                    timer: 4000
                    
                    
                }).then(() => {
                    window.location.href='gestionroles.html'

                })
                ;
            }
        })
    }


}



// _______________________________


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

// ____________________
  function consultarRol(busqueda) {
    let urlAPI = url;
    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    if (busqueda) {
        urlAPI += `?_id=${encodeURIComponent(busqueda)}`;
    }

    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let usuario = data.permisos[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('_id').value = usuario._id;
            document.getElementById('idrol').value = usuario.idrol;
            document.getElementById('nombrerol').value = usuario.nombrerol;
            document.getElementById('descrol').value = usuario.descrol;

        })
        .catch(function () {
            console.error('Error al obtener los detalles del cliente');
        });
}



