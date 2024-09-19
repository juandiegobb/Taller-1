// Variables globales
let actividades = [];
let modal = document.getElementById("modal");
let confirmarEliminarModal = document.getElementById("confirmarEliminarModal");
let agregarActividadBtn = document.getElementById("agregarActividadBtn");
let closeModal = document.getElementsByClassName("close")[0];
let guardarActividadBtn = document.getElementById("guardarActividadBtn");
let confirmarEliminarBtn = document.getElementById("confirmarEliminarBtn");
let cancelarEliminarBtn = document.getElementById("cancelarEliminarBtn");

let actividadEnEdicion = null; // Nueva variable para controlar si se está editando
let actividadAEliminar = null; // Nueva variable para almacenar la actividad a eliminar

// Mostrar el modal para agregar una actividad
agregarActividadBtn.onclick = function() {
    modal.style.display = "flex";
    actividadEnEdicion = null;
}

// Cerrar el modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Mostrar el modal de confirmación antes de eliminar
function confirmarEliminarActividad(index) {
    actividadAEliminar = index; // Almacena el índice de la actividad a eliminar
    confirmarEliminarModal.style.display = "flex"; // Muestra el modal de confirmación
}

// Eliminar la actividad si se confirma
confirmarEliminarBtn.onclick = function() {
    if (actividadAEliminar !== null) {
        eliminarActividad(actividadAEliminar); // Llama a la función de eliminación
        confirmarEliminarModal.style.display = "none"; // Cierra el modal de confirmación
        actividadAEliminar = null; // Resetea la actividad seleccionada para eliminar
    }
}

// Cancelar la eliminación de la actividad
cancelarEliminarBtn.onclick = function() {
    confirmarEliminarModal.style.display = "none"; // Cierra el modal de confirmación
    actividadAEliminar = null; // Resetea la actividad seleccionada
}

// Función para guardar una nueva actividad o modificar una existente
guardarActividadBtn.onclick = function() {
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

        document.getElementById("nombreActividad").value = "";
        document.getElementById("notaActividad").value = "";
    } else {
        alert("Por favor, ingrese un nombre y una nota válida.");
    }
}

// Actualizar la tabla de actividades
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
        
        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = function() {
            confirmarEliminarActividad(index); // Mostrar la confirmación antes de eliminar
        };
        celdaAcciones.appendChild(eliminarBtn);

        let modificarBtn = document.createElement("button");
        modificarBtn.textContent = "Modificar";
        modificarBtn.onclick = function() {
            modificarActividad(index);
        };
        celdaAcciones.appendChild(modificarBtn);
    });

    actualizarPromedio();
}

// Eliminar una actividad
function eliminarActividad(index) {
    actividades.splice(index, 1); // Elimina la actividad
    actualizarTabla(); // Refresca la tabla
}

// Modificar una actividad
function modificarActividad(index) {
    document.getElementById("nombreActividad").value = actividades[index].nombre;
    document.getElementById("notaActividad").value = actividades[index].nota;

    modal.style.display = "flex";
    actividadEnEdicion = index; // Modo edición
}

// Actualizar el promedio y el estado de aprobación
function actualizarPromedio() {
    let total = actividades.reduce((sum, actividad) => sum + actividad.nota, 0);
    let promedio = actividades.length ? (total / actividades.length).toFixed(2) : 0;

    document.getElementById("promedio").textContent = promedio;
    document.getElementById("estado").textContent = promedio >= 3 ? "Aprobado" : "No Aprobado";
}
