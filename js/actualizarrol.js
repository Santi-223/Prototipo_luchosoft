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

const actualizar = async()=>{

    

  let id = document.getElementById('_id').value
  let idrol = document.getElementById('idrol').value
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




    
        let usuarioActualizado = {
            _id: id,
            idrol: idrol,
            nombrerol: nombrerol,
            descrol: descrol,
            permisosrol: "Productos"
        }

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuarioActualizado),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if (json.msg) {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'gestionroles.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
    }
// Swal.fire({
//     icon: 'success',
//     title: 'El rol se ha actualizado',
//     timer: 4000}).then(() => {window.location.href='gestionroles.html'});
  }

    
