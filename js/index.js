// Variables globales
let actividades = [];
let modal = document.getElementById("modal");
let confirmarEliminarModal = document.getElementById("confirmarEliminarModal");
let agregarActividadBtn = document.getElementById("actividades");
let closeModal = document.getElementsByClassName("close")[0];
let guardarBtn = document.getElementById("guardar");
let confirmarEliminarBtn = document.getElementById("modalsi");
let cancelarEliminarBtn = document.getElementById("modalno");

let actividadEnEdicion = null; 
let actividadAEliminar = null; 

// Mostrar el modal para agregar actividad
agregarActividadBtn.onclick = function() {
    modal.style.display = "flex";
    actividadEnEdicion = null; // Reiniciar la actividad en edición
}

// Cerrar el modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Confirmar la eliminación de actividad
function confirmarEliminarActividad(index) {
    actividadAEliminar = index; 
    confirmarEliminarModal.style.display = "flex"; // Mostrar modal de confirmación
}

// Confirmar la eliminación
confirmarEliminarBtn.onclick = function() {
    if (actividadAEliminar !== null) {
        eliminarActividad(actividadAEliminar); 
        confirmarEliminarModal.style.display = "none"; 
        actividadAEliminar = null; 
    }
}

// Cancelar eliminación
cancelarEliminarBtn.onclick = function() {
    confirmarEliminarModal.style.display = "none"; 
    actividadAEliminar = null; 
}

// Guardar actividad
guardarBtn.onclick = function() {
    let nombre = document.getElementById("nombreActividad").value;
    let nota = parseFloat(document.getElementById("notaActividad").value);

    if (nombre && nota >= 0 && nota <= 5) {
        if (actividadEnEdicion !== null) {
            actividades[actividadEnEdicion].nombre = nombre;
            actividades[actividadEnEdicion].nota = nota;
        } else {
            actividades.push({ nombre, nota });
        }
        actualizarTabla();
        modal.style.display = "none";

        // Limpiar campos del modal
        document.getElementById("nombreActividad").value = "";
        document.getElementById("notaActividad").value = "";
    } else {
        alert("Por favor, ingrese un nombre y una nota válida.");
    }
}

// Actualizar la tabla
function actualizarTabla() {
    let tablaCuerpo = document.querySelector("#actividadesTabla tbody");
    tablaCuerpo.innerHTML = "";

    actividades.forEach((actividad, index) => {
        let fila = tablaCuerpo.insertRow();

        let celdaNombre = fila.insertCell(0);
        celdaNombre.textContent = actividad.nombre;

        let celdaNota = fila.insertCell(1);
        celdaNota.textContent = actividad.nota;

        let celdaAcciones = fila.insertCell(2);
        
        // Botón de eliminar
        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = function() {
            confirmarEliminarActividad(index); 
        };
        celdaAcciones.appendChild(eliminarBtn);

        // Botón de modificar
        let modificarBtn = document.createElement("button");
        modificarBtn.textContent = "Modificar";
        modificarBtn.onclick = function() {
            modificarActividad(index);
        };
        celdaAcciones.appendChild(modificarBtn);
    });

    actualizarPromedio();
}

// Eliminar actividad
function eliminarActividad(index) {
    actividades.splice(index, 1); 
    actualizarTabla(); 
}

// Modificar actividad
function modificarActividad(index) {
    document.getElementById("nombreActividad").value = actividades[index].nombre;
    document.getElementById("notaActividad").value = actividades[index].nota;

    modal.style.display = "flex";
    actividadEnEdicion = index; // Modo edición
}

// Actualizar promedio y estado
function actualizarPromedio() {
    let total = actividades.reduce((sum, actividad) => sum + actividad.nota, 0);
    let promedio = actividades.length ? (total / actividades.length).toFixed(2) : 0;

    document.getElementById("promedio").textContent = promedio;
    document.getElementById("estado").textContent = promedio >= 3 ? "Aprobado" : "No Aprobado";
}
