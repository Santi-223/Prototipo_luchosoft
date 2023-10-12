const url = 'https://apipedidos2.onrender.com/api/usuario'

document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('insertBtn').addEventListener('click', function() {
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');
    let seleccionado=false

    for (let i = 1; i < rows.length; i++) {
        const checkbox = document.querySelectorAll('input[name="opcion1"]');

        checkbox.forEach(opcion => {
            if (opcion.checked) {
                seleccionado = true;
            }
        });

        if (seleccionado) {
                Swal.fire({
                  icon: 'success',
                  title: 'Guardado exitosamente',
                  confirmButtonColor: '#722F37'})
        }else if(!seleccionado){
            Swal.fire({
                title: 'Sin elección',
                text: "Necesitas agregar al menos un producto",
                confirmButtonColor: '#722F37',
                icon: 'warning'
            })
    }
        }
    document.getElementById('popup').style.display = 'none';
});













//barra de navegacion
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowMatch = false;
        for (let j = 1; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                rowMatch = true;
                break;
            }
        }
        rows[i].style.display = rowMatch ? 'table-row' : 'none';
    }
});

//boton de cancelar operación

document.getElementById('cancelBtn').addEventListener('click', function() {
    closePopup();
});

document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowMatch = false;
        for (let j = 1; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                rowMatch = true;
                break;
            }
        }
        rows[i].style.display = rowMatch ? 'table-row' : 'none';
    }
});

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Calcula el ancho de la barra de desplazamiento y ajusta los estilos
window.addEventListener('DOMContentLoaded', () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.textContent = `
        .scrollbar::-webkit-scrollbar {
            width: ${scrollbarWidth}px;
        }
    `;
    document.head.appendChild(scrollbarStyle);
});




//-------------------------------------19/09/2023

const CancelarV=()=>{
    Swal.fire({
      title: 'Salir sin guardar',
      text: "¿Quieres cancelar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#722F37',
      cancelButtonColor: '#E12424',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        closePopup();
      }
    })
  }










document.getElementById('openPopupBtnAAA').addEventListener('click', function() {
    document.getElementById('popupAAA').style.display = 'block';
});

document.getElementById('insertBtnAAA').addEventListener('click', function() {
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');
    let seleccionado=false

    for (let i = 1; i < rows.length; i++) {
        const checkbox = document.querySelectorAll('input[name="opcion"]');

        checkbox.forEach(opcion => {
            if (opcion.checked) {
                seleccionado = true;
            }
        });

        if (seleccionado) {
                Swal.fire({
                  icon: 'success',
                  title: 'Guardado exitosamente',
                  confirmButtonColor: '#722F37'})
        }else if(!seleccionado){
            Swal.fire({
                title: 'Sin elección',
                text: "Necesitas agregar un cliente",
                confirmButtonColor: '#722F37',
                icon: 'warning'
            })
    }
        }
    document.getElementById('popup').style.display = 'none';
});




















//barra de navegacion
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowMatch = false;
        for (let j = 1; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                rowMatch = true;
                break;
            }
        }
        rows[i].style.display = rowMatch ? 'table-row' : 'none';
    }
});

//boton de cancelar operación

document.getElementById('cancelBtnAAA').addEventListener('click', function() {
    closePopupAAA();
});

document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowMatch = false;
        for (let j = 1; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                rowMatch = true;
                break;
            }
        }
        rows[i].style.display = rowMatch ? 'table-row' : 'none';
    }
});

function closePopupAAA() {
    document.getElementById('popupAAA').style.display = 'none';
}

// Calcula el ancho de la barra de desplazamiento y ajusta los estilos
window.addEventListener('DOMContentLoaded', () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.textContent = `
        .scrollbar::-webkit-scrollbar {
            width: ${scrollbarWidth}px;
        }
    `;
    document.head.appendChild(scrollbarStyle);
});


$(".iClienteFrecuente").click(function () {
    $(this).toggleClass("fa-user-plus fa-user-minus");
    $(this).toggleClass("gris");
});



function seleccionarFila(checkbox) {
    var fila = checkbox.parentNode.parentNode;
    if (checkbox.checked) {
        fila.classList.add('selected');
    } else {
        fila.classList.remove('selected');
    }

    // Deseleccionar otras filas
    var checkboxes = document.getElementsByName('seleccion');
    checkboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = false;
            cb.parentNode.parentNode.classList.remove('selected');
        }
    });
}




//VALIDACION


const actualizar = async()=>{

    
    let _id = document.getElementById('_id').value
    let _idpedido = document.getElementById('idpedido').value
    let _descpedido = document.getElementById('descpedido').value
    let _preciopedido = document.getElementById('preciopedido').value
    let _fechapedido = document.getElementById('fechapedido').value









    
    
    let caracteres = /^[a-zA-Z0-9_.-ñÑ' 'áéíóúÁÉÍÓÚ,]+$/;
    

if (idpedido==="" || preciopedido==="" || fechapedido==="" || descpedido==="") {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        timer: 3000
    });

} else if (!caracteres.test(descpedido)){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese caracteres válidos.',
        timer: 3000
        
    });

}

else {



        let usuario = {
            _id: _id,
            idpedido: _idpedido,
            descpedido: _descpedido,
            preciopedido: _preciopedido,
            fechapedido: _fechapedido,
            productospedido: "Coca-Cola, Postobón",
            clientepedido: "Bebicool"
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
                        window.location.href = 'pedidos.html'; // Redireccionar después del clic en OK
                    }
                });
            })
    }
// Swal.fire({
//     icon: 'success',
//     title: 'El pedido ha sido actualizado',
//     timer: 4000}).then(() => {window.location.href='pedidos.html'});

}

    



//_________________________________________________________-

function consultarPedido(busqueda) {
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
            let usuario = data.pedidos[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('_id').value = usuario._id;
            document.getElementById('idpedido').value = usuario.idpedido;
            document.getElementById('descpedido').value = usuario.descpedido;
            document.getElementById('preciopedido').value = usuario.preciopedido;
            document.getElementById('fechapedido').value = usuario.fechapedido;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalles del cliente:', error);
        });
}