// Función que pide los datos de la persona
function pedirDatosPersona() {
    var miLlamada = new XMLHttpRequest();

    miLlamada.open("GET", "https://sgemp.azurewebsites.net/api/persona");

    //Definicion estados
    miLlamada.onreadystatechange = function () {
        if (miLlamada.readyState < 4) {
            //aquí se puede poner una imagen de un reloj o un texto “Cargando”
            // document.getElementById("cargando").innerHTML = "Cargando";
        }
        else {
            if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                var arrayPersonas = JSON.parse(miLlamada.responseText);

                // Constante que almacena la tabla
                const table = document.getElementById("tablePersonas");
                    
                // Constante que almacena el cuerpo de la tabla
                const tbody = document.getElementById("tbody");

                tbody.innerHTML = ""

                // Variable para enumerar a las personas
                var i = 1;
                arrayPersonas.forEach(p => {
                    

                    // Creamos una nueva fila
                    const tr = document.createElement("tr");
                    
                    // Creamos las celdas para el número, nombre, apellido, foto y las acciones
                    const tdNum = document.createElement("td");
                    const tdNombre = document.createElement("td");
                    const tdApellido = document.createElement("td");
                    const tdFoto = document.createElement("td");
                    const tdAcciones = document.createElement("td");

                    // Colocamos los datos
                    tdNum.innerHTML = i;
                    tdNombre.innerHTML = p.nombre;
                    tdApellido.innerHTML = p.apellidos;
                    tdFoto.innerHTML = `<img src="${p.foto}" width="48px" height="48px" style="border-radius: 50%">`;
                    
                    // Creamos el botón para eliminar
                    const btEliminar = document.createElement("button")
                    btEliminar.textContent = "Eliminar"
                    btEliminar.classList.add("btn", "btn-danger")
                    btEliminar.addEventListener("click", function() {
                        eliminar(p)
                    })

                    tdAcciones.appendChild(btEliminar)
                    
                    // Incrementamos el contador
                    i += 1;

                    // Agregamos las celdas a la fila
                    tr.appendChild(tdNum);
                    tr.appendChild(tdNombre);
                    tr.appendChild(tdApellido);
                    tr.appendChild(tdFoto);
                    tr.appendChild(tdAcciones);

                    // Agregamos la fila a la tabla
                    tbody.appendChild(tr);


                    // Mostramos la tabla
                    table.style.visibility = "visible";
                })
            }
        }
    };

    miLlamada.send();

}

// Función que elimina a una persona
function eliminar(persona) {
    var done = confirm(`¿Está seguro de que desea eliminar a ${persona.nombre}?`)

    if (done) {
        var miLlamada = new XMLHttpRequest();

        miLlamada.open("DELETE", "https://sgemp.azurewebsites.net/api/persona/" + persona.id);

        miLlamada.onreadystatechange = function () {
            if (miLlamada.readyState < 4) {
                //aquí se puede poner una imagen de un reloj o un texto “Cargando”
                // document.getElementById("cargando").innerHTML = "Cargando";
            } else {
                if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                    alert(persona.nombre + " eliminad@ correctamente")

                    pedirDatosPersona()
                }
            }
        }

        miLlamada.send();
    }
}

window.onload = function () {
    document.getElementById("btPersonas").addEventListener("click", function () {
        pedirDatosPersona();
    });
}