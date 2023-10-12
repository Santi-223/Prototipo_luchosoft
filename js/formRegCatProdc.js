let url = 'https://consumirapileidy.onrender.com/api/categoria'

const listarCategorias = async (busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidoCategorias')

    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro

    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?id_categoria_productos=${encodeURIComponent(busqueda)}`;
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

            let listarCategoria = data.categoria //Capturar el array devuelto por la api

            // Limpia la tabla antes de agregar datos nuevos
            table.clear().draw();

            datos =
                listarCategoria.map(function (categoria) {//Recorrer el array
                    let estado = ""
                    if (categoria.estado_categoria == false) {
                        estado = "fas fa-toggle-off iconos toggle-icon gris"
                    } else {
                        estado = "fas fa-toggle-on iconos toggle-icon"
                    }
                    let estado_nuevo;
                    if (categoria.estado_ == true) {
                        estado_nuevo = false;
                    } else {
                        estado_nuevo = true;
                    }
                    respuesta += `<tr><td>${categoria.id_categoria_productos}</td>` +
                        `<td>${categoria.nombre_categoria}</td>` +
                        `<td>
                            <i onclick="window.location.href='actualizarCatProductos.html?id_categoria_productos=${categoria.id_categoria_productos}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
                            <i onclick="cambiarEstadoCategoria('${categoria.id_categoria_productos}', '${estado_nuevo}')" class="${estado}"></i>
                        </td>`+
                        `</tr>`
                })
            // Agrega los datos a la tabla y redibuja la tabla
            table.rows.add($(respuesta)).draw();
        })
}

const cambiarEstadoCategoria = async (id_categoria_productos, estado_nuevo) => {

    try {

        let categoria = {
            id_categoria_productos: id_categoria_productos,
            nombreCategoria: nombre_categoria,
            estado_categoria: estado_nuevo
        }

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(categoria),
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
                    window.location.href = 'categoriaProfuctos.html'; // Redireccionar después del clic en OK
                }
            });
        } else {
            alert("Error al cambiar el estado de la categoria.");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}

function consultarCategoria(busqueda) {
    let urlAPI = url;
    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    if (busqueda) {
        urlAPI += `?id_categoria_productos=${encodeURIComponent(busqueda)}`;
    }

    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let categorias = data.categoria[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos de la categoria
            document.getElementById('idCategoria').value = categorias.id_categoria_productos;
            document.getElementById('agregarNombre').value = categorias.nombre_categoria;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalles de la categoria:', error);
        });
}


function validarCamposAgregar() {
    // Obtén los valores de los campos de entrada
    let id_categoria = document.getElementById('idCategoria').value;
    let nombreCategoria = document.getElementById('agregarNombre').value;

    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if (nombreCategoria === "0" || id_categoria === "0") {
        // Utiliza SweetAlert para mostrar una alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
        });
    } else {
        // Todos los campos son válidos, llama a la función agregarCliente
        registrarCategoria();
    }
}

const registrarCategoria = async () => {
    let id_categoria = document.getElementById('idCategoria').value;
    let nombreCategoria = document.getElementById('agregarNombre').value;


    let categoria = {
        id_categoria_productos: id_categoria,
        nombre_categoria: nombreCategoria
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(categoria),//Convertir el objeto _categoria  a un JSON
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
                        window.location.href = 'categoriaProductos.html'; // Redireccionar después del clic en OK
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
                        window.location.href = 'categoriaProductos.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
}


function validarCamposModificar() {
    // Obtén los valores de los campos de entrada
    let id_categoria = document.getElementById('id_Categoria').value;
    let nombreCategoria = document.getElementById('agregar_Nombre').value;


    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if (id_categoria === "" || nombreCategoria === "") {
        // Utiliza SweetAlert para mostrar una alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
        });
    } else {
        // Todos los campos son válidos, llama a la función.
        actualizarCategoria();
    }
}

const actualizarCategoria = async () => {
    let id_categoria = document.getElementById('id_Categoria').value;
    let nombreCategoria = document.getElementById('agregar_Nombre').value;



    let categoria = {
        id_categoria: id_categoria,
        nombreCategoria: nombreCategoria,
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(categoria),//Convertir el objeto _usuario  a un JSON
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
                    window.location.href = '.html';

                }
            });
        })
}














