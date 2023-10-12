

let url = 'https://consumirapileidy.onrender.com/api/usuarios'

const listarUsuarios = async (busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidoUsuarios')

    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro

    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?id_usuario=${encodeURIComponent(busqueda)}`;
    }

    //url: Es la url de la api.
    //Al desplegarla en el servidor colocar la api del servidor
    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(function (data) {
            let listarUsuarios = data.usuario //Capturar el array devuelto por la api

            // Limpia la tabla antes de agregar datos nuevos
            table.clear().draw();

            datos =
                listarUsuarios.map(function (usuario) {//Recorrer el array
                    let estado = ""

                    if (usuario.estado_usuario == false) {
                        estado = "fas fa-toggle-off iconos toggle-icon gris"
                    } else {
                        estado = "fas fa-toggle-on iconos toggle-icon"
                    }
                    let estado_nuevo;
                    if (usuario.estado_ == true) {
                        estado_nuevo = false;
                    } else {
                        estado_nuevo = true;
                    }
                    respuesta += `<tr><td>${usuario.id_usuario}</td>` +
                        `<td><img src="${usuario.imagen_usuario}" height="100px" width="100px"></td>` +
                        `<td>${usuario.nombre_usuario}</td>` +
                        `<td>${usuario.direccion_usuario}</td>` +
                        `<td>${usuario.telefono_usuario}</td>` +
                        `<td>${usuario.correo_usuario}</td>` +

                        `<td>
                            <i onclick="window.location.href='actualizarUsuario.html?id_usuario=${usuario.id_usuario}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
                            <i onclick="cambiarEstadoUsuario('${usuario.id_usuario}', '${estado_nuevo}')" class="${estado}"></i>
                            <i onclick="eliminarUsuario('${usuario.id_usuario}')" class="fas fa-trash iconosRojos"></i>
                        </td>`+
                        `</tr>`
                })
            // Agrega los datos a la tabla y redibuja la tabla
            table.rows.add($(respuesta)).draw();
        })
}

const cambiarEstadoUsuario = async (id_usuario, estado_nuevo) => {

    try {

        let usuario = {
            id_usuario: id_usuario,
            estado_usuario: estado_nuevo
        }

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),
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
                    window.location.href = 'gestionUsuario.html'; // Redireccionar después del clic en OK
                }
            });
        } else {
            alert("Error al cambiar el estado del usuario.");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}

function consultarUsuario(busqueda) {
    let urlAPI = url;
    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    if (busqueda) {
        urlAPI += `?id_usuario=${encodeURIComponent(busqueda)}`;
    }

    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {

            let usuario = data.usuario[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('cedula').value = usuario.id_usuario;
            document.getElementById('imagen_usuario').src = usuario.imagen_usuario;
            document.getElementById('nombre').value = usuario.nombre_usuario;
            document.getElementById('telefono').value = usuario.telefono_usuario;
            document.getElementById('direccion').value = usuario.direccion_usuario;
            document.getElementById('correo').value = usuario.correo_usuario;


        })
        .catch(function (error) {
            console.error('Error al obtener los detalles del usuario:', error);
        });
}

function validarCamposModificar() {
    var cedula = document.getElementById("cedula").value;
    var nombre = document.getElementById("nombre").value;
    var telefono = document.getElementById("telefono").value;
    var direccion = document.getElementById("direccion").value;
    var correo = document.getElementById("correo").value;

    var mensajeError = "";

    if (cedula === "") {
        mensajeError += "El campo Cedula es obligatorio.<br>";
    }

    if (nombre === "") {
        mensajeError += "El campo Nombre es obligatorio.<br>";
    }

    if (telefono === "") {
        mensajeError += "El campo Teléfono es obligatorio.<br>";
    }

    if (direccion === "") {
        mensajeError += "El campo Dirección es obligatorio.<br>";
    }

    if (correo === "") {
        mensajeError += "El campo Correo es obligatorio.<br>";
    } else if (!validarFormatoCorreo(correo)) {
        mensajeError += "El formato del correo electrónico no es válido.<br>";
    }

    if (mensajeError !== "") {
        // Mostrar una alerta de error con SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: mensajeError,
        });
    } else {
        actualizarUsuario();
    }
}

function validarCamposAgregar() {
    var cedula = document.getElementById("cedula").value;
    var nombre = document.getElementById("nombre").value;
    var telefono = document.getElementById("telefono").value;
    var direccion = document.getElementById("direccion").value;
    var password = document.getElementById("password").value;
    var correo = document.getElementById("correo").value;

    var mensajeError = "";

    if (cedula === "") {
        mensajeError += "El campo Cedula es obligatorio.<br>";
    }

    if (nombre === "") {
        mensajeError += "El campo Nombre es obligatorio.<br>";
    }

    if (telefono === "") {
        mensajeError += "El campo Teléfono es obligatorio.<br>";
    }

    if (direccion === "") {
        mensajeError += "El campo Dirección es obligatorio.<br>";
    }

    if (password.length < 8) {
        mensajeError += "La contraseña debe tener al menos 8 caracteres.<br>";
    }

    if (password.length > 20) {
        mensajeError += "La contraseña debe tener maximo 20 caracteres.<br>";
    }

    if (correo === "") {
        mensajeError += "El campo Correo es obligatorio.<br>";
    } else if (!validarFormatoCorreo(correo)) {
        mensajeError += "El formato del correo electrónico no es válido.<br>";
    }

    if (mensajeError !== "") {
        // Mostrar una alerta de error con SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: mensajeError,
        });
    } else {
        registrarUsuario();
    }
}

function validarFormatoCorreo(correo) {
    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formatoCorreo.test(correo);
}

const registrarUsuario = async () => {
    let id_usuario = document.getElementById('cedula').value;
    let imagen_usuario = document.getElementById('imagen_usuario').value;
    let nombre_usuario = document.getElementById('nombre').value;
    let telefono_usuario = document.getElementById('telefono').value;
    let direccion_usuario = document.getElementById('direccion').value;
    let correo_usuario = document.getElementById('correo').value;


    let usuario = {
        id_usuario: id_usuario,
        imagen_usuario: imagen_usuario,
        nombre_usuario: nombre_usuario,
        telefono_usuario: telefono_usuario,
        direccion_usuario: direccion_usuario,
        correo_usuario: correo_usuario
    }

    let urlAPI = url

    fetch(urlAPI, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
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
                        window.location.href = 'gestionUsuario.html'; // Redireccionar después del clic en OK
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
                        window.location.href = 'gestionUsuario.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
}

const actualizarUsuario = async () => {
    let id_usuario = document.getElementById('cedula').value;
    let nombre_usuario = document.getElementById('nombre').value;
    let imagen_usuario = document.getElementById('imagen_usuario').value;
    let telefono_usuario = document.getElementById('telefono').value;
    let direccion_usuario = document.getElementById('direccion').value;
    let correo_usuario = document.getElementById('correo').value;



    let usuario = {
        id_usuario: id_usuario,
        nombre_usuario: nombre_usuario,
        imagen_usuario: imagen_usuario,
        telefono_usuario: telefono_usuario,
        direccion_usuario: direccion_usuario,
        correo_usuario: correo_usuario
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            Swal.fire({
                title: json.msg,
                icon: 'success',
                showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "OK"
                    window.location.href = 'gestionUsuario.html';
                }
            });
        })
}

function cargarImagen() {
    let src = document.getElementById('imagen_usuario').value

    if (src === "") {
    }

    document.getElementById('imagen_usuario').src = src
}

const eliminarUsuario = async (id_usuario) => {

    fetch(`${url}?id_usuario=${id_usuario}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if (json.msg == "La eliminación se efectuó exitosamente") {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'gestionUsuario.html'; // Redireccionar después del clic en OK
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
                        window.location.href = 'gestionUsuario.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })


}

function seleccionarImagen() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            console.log("Imagen seleccionada:", selectedImage);
        }
    });

    input.click();
}