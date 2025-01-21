let arrayPersonas
let arrayPersonasFiltro

// Función que pide los datos de la persona
function pedirDatosPersona() {
    var miLlamada = new XMLHttpRequest()

    miLlamada.open("GET", "https://sgemp.azurewebsites.net/api/persona")

    //Definicion estados
    miLlamada.onreadystatechange = function () {
        if (miLlamada.readyState < 4) {
            //aquí se puede poner una imagen de un reloj o un texto “Cargando”
            // document.getElementById("cargando").innerHTML = "Cargando"
        }
        else {
            if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                arrayPersonas = JSON.parse(miLlamada.responseText)

                // Constante que almacena la tabla
                const table = document.getElementById("tablePersonas")

                // Constante que almacena el cuerpo de la tabla
                const tbody = document.getElementById("tbody")

                tbody.innerHTML = ""

                // Variable para enumerar a las personas
                var i = 1
                arrayPersonas.forEach(p => {

                    // Creamos una nueva fila
                    const tr = document.createElement("tr")

                    // Creamos las celdas para el número, nombre, apellido, foto y las acciones
                    const tdNum = document.createElement("td")
                    const tdNombre = document.createElement("td")
                    const tdApellido = document.createElement("td")
                    const tdFoto = document.createElement("td")
                    const tdAcciones = document.createElement("td")

                    // Colocamos los datos
                    tdNum.innerHTML = i
                    tdNombre.innerHTML = p.nombre
                    tdApellido.innerHTML = p.apellidos
                    tdFoto.innerHTML = `<img src="${p.foto}" width="48px" height="48px" style="border-radius: 50%">`

                    // Creamos el botón para eliminar
                    const btEliminar = document.createElement("button")
                    btEliminar.textContent = "Eliminar"
                    btEliminar.classList.add("btn", "btn-danger")
                    btEliminar.addEventListener("click", function () {
                        eliminar(p)
                    })

                    tdAcciones.appendChild(btEliminar)

                    // Incrementamos el contador
                    i += 1

                    // Agregamos las celdas a la fila
                    tr.appendChild(tdNum)
                    tr.appendChild(tdNombre)
                    tr.appendChild(tdApellido)
                    tr.appendChild(tdFoto)
                    tr.appendChild(tdAcciones)

                    // Agregamos la fila a la tabla
                    tbody.appendChild(tr)


                    // Mostramos la tabla
                    table.style.display = "initial"
                })
            }
        }
    }

    miLlamada.send()

}

// Función que elimina a una persona
function eliminar(persona) {
    var done = confirm(`¿Está seguro de que desea eliminar a ${persona.nombre}?`)

    if (done) {
        var miLlamada = new XMLHttpRequest()

        miLlamada.open("DELETE", "https://sgemp.azurewebsites.net/api/persona/" + persona.id)

        miLlamada.onreadystatechange = function () {
            if (miLlamada.readyState < 4) {
                //aquí se puede poner una imagen de un reloj o un texto “Cargando”
                // document.getElementById("cargando").innerHTML = "Cargando"
            } else {
                if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                    alert(persona.nombre + " eliminad@ correctamente")

                    pedirDatosPersona()
                }
            }
        }

        miLlamada.send()
    }
}

// Función que añade una persona
function add(persona) {
    var miLlamada = new XMLHttpRequest()

    miLlamada.open("POST", "https://sgemp.azurewebsites.net/api/persona/")

    miLlamada.setRequestHeader('Content-type', 'application/json charset=utf-8')

    var json = JSON.stringify(persona)

    // Definicion estados
    miLlamada.onreadystatechange = function () {
        if (miLlamada.readyState < 4) {
            //aquí se puede poner una imagen de un reloj o un texto “Cargando”
        } else if (miLlamada.readyState == 4 && miLlamada.status == 200) {
            alert("Persona insertada con exito")
        }
    }

    miLlamada.send(json)
}

// Función que filtra el listado
function filtrarListado() {
    let textoBuscar = document.getElementById('txtBuscar').value

    arrayPersonas.forEach((p) => {
        if (p.nombre.contains(textoBuscar)) {
            arrayPersonasFiltro.add(p)
        }
    })
}

var listadoDesplegado = false
var formDesplegado = false

window.onload = function () {
    const table = document.getElementById("tablePersonas")
    const form = document.getElementById("addPersona")

    document.getElementById("btPersonas").addEventListener("click", function () {
        form.style.display = 'none'
        formDesplegado = false

        if (listadoDesplegado) {
            table.style.display = 'none'
            listadoDesplegado = false
        } else {
            pedirDatosPersona()
            listadoDesplegado = true
        }
    })

    document.getElementById("btAdd").addEventListener("click", function () {
        table.style.display = 'none'
        listadoDesplegado = false

        if (formDesplegado) {
            form.style.display = 'none'
            formDesplegado = false
        } else {
            form.style.display = 'block'
            formDesplegado = true
        }
    })

    document.getElementById("savePersona").addEventListener("click", function () {
        // Captura de los valores de los inputs
        const nombre = document.getElementById('nombre').value.trim()
        const apellidos = document.getElementById('apellidos').value.trim()
        const telefono = document.getElementById('telefono').value.trim()
        const direccion = document.getElementById('direccion').value.trim()
        const foto = document.getElementById('foto').value.trim()
        const fechaNac = document.getElementById('fechaNacimiento').value.trim()
        const departamento = document.getElementById('departamento').value

        // Validación de campos
        if (!nombre || !apellidos || !telefono || !direccion || !foto || !fechaNac || !departamento) {
            alert('Rellena todos los campos')
            return // Detenemos la ejecución si hay algún campo vacío
        }

        // Creación del objeto persona
        const persona = {
            "nombre": nombre,
            "apellidos": apellidos,
            "telefono": telefono,
            "direccion": direccion,
            "foto": foto,
            "fechaNacimiento": fechaNac,
            "idDepartamento": departamento
        }

        // Llamada a la función add
        add(persona)
    })

    document.getElementById("cancelSavePersona").addEventListener("click", function () {
        form.style.display = 'none'
    })
}