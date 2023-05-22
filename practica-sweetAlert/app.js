//Arra de Objetos que almacena los estudiantes

let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

//Variables globales

const TABLE_BODY = document.querySelector("#tableBody");
const formularioEstudiantes = document.getElementById("formularioEstudiantes");
const registrarEstudiante = document.querySelector("#registrarEstudiante");
let id = crypto.randomUUID();
const titulo1 = document.getElementById("titulo1");
let userEditing = null;

const promedio__calculado = document.getElementById("promedio__calculado");

function crearTabla() {
    TABLE_BODY.innerHTML = "";

    estudiantes.forEach((estudiante) => {
        //Creando los elementos HTML
        const TR = document.createElement("tr");
        const TD_NOMBRE = document.createElement("td");
        const TD_APELLIDO = document.createElement("td");
        const TD_MATRICULA = document.createElement("td");
        const TD_CURSO = document.createElement("td");
        const TD_NOTA = document.createElement("td");
        const TD_ACCIONES = document.createElement("td");
        const EDITAR_BTN = document.createElement("button");
        const ELIMINAR_BTN = document.createElement("button");

        //Agregando los elementos creados a sus elementos padres

        TABLE_BODY.appendChild(TR);
        TR.appendChild(TD_NOMBRE);
        TD_NOMBRE.textContent = `${estudiante.nombreEstudiante}`;
        TR.appendChild(TD_APELLIDO);
        TD_APELLIDO.textContent = `${estudiante.apellidoEstudiante}`;
        TR.appendChild(TD_MATRICULA);
        TD_MATRICULA.textContent = `${estudiante.matriculaEstudiante}`;
        TR.appendChild(TD_CURSO);
        TD_CURSO.textContent = `${estudiante.cursoEstudiante}`;
        TR.appendChild(TD_NOTA);
        TD_NOTA.textContent = `${estudiante.notaEstudiante}`;
        TR.appendChild(TD_ACCIONES);
        TD_ACCIONES.setAttribute("id", `${estudiante.id}`);
        TD_ACCIONES.appendChild(EDITAR_BTN);
        EDITAR_BTN.textContent = "Editar";
        EDITAR_BTN.setAttribute("type", "button");
        EDITAR_BTN.classList.add("btn");
        EDITAR_BTN.classList.add("btn-warning");
        EDITAR_BTN.classList.add("me-2");
        TD_ACCIONES.appendChild(ELIMINAR_BTN);
        ELIMINAR_BTN.textContent = "Eliminar";
        ELIMINAR_BTN.setAttribute("type", "button");
        ELIMINAR_BTN.classList.add("btn");
        ELIMINAR_BTN.classList.add("btn-danger");
    });

    id = crypto.randomUUID();
}
crearTabla();

function calcularPromedioGeneral() {
    let notaArr = [];

    estudiantes.forEach((estudiante) => {
        notaArr.push(parseInt(estudiante.notaEstudiante));
    });

    if (notaArr.length === 0) {
        return notaArr = 0;
    } else {


        let notaPromedio = notaArr.reduce((valorAnterior, valorActual) => {
            return valorAnterior + valorActual;
        });

        return (notaPromedio / notaArr.length).toFixed(2);
    }
}

let promedioCalculado = calcularPromedioGeneral();
promedio__calculado.textContent = promedioCalculado;


//Capturar datos del formulario

formularioEstudiantes.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreEstudiante = event.target.nameEstudiante.value.trim();
    const apellidoEstudiante = event.target.lastNameEstudiante.value.trim();
    const matriculaEstudiante = event.target.matriculaEstudiante.value.trim();
    const cursoEstudiante = event.target.cursoEstudiante.value.trim();
    const notaEstudiante = event.target.notaEstudiante.value.trim();


    if (
        nombreEstudiante === "" ||
        apellidoEstudiante === "" ||
        matriculaEstudiante === "" ||
        cursoEstudiante === "" ||
        notaEstudiante === ""
    ) {
        return Swal.fire({
            title: "Alto!",
            text: "Todos lo campos son necesarios",
            icon: "warning",
            timer: 3000,
            timerProgressBar: true
        });
    }

    const OBJETO_ESTUDIANTE = {
        id,
        nombreEstudiante,
        apellidoEstudiante,
        matriculaEstudiante,
        cursoEstudiante,
        notaEstudiante
    };

    if (userEditing) {
        const newArray = estudiantes.map((estudiante) => {
            if (estudiante.id === userEditing.id) {

                Swal.fire({
                    title: "Editado!",
                    text: "El estudiante ha sido editado correctamente",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true
                });

                return {
                    ...OBJETO_ESTUDIANTE,
                    id: userEditing.id
                };

            }

            else {
                return estudiante;
            }

        });

        estudiantes = newArray;

        userEditing = null;

        registrarEstudiante.textContent = "Registrar";
        titulo1.textContent = "Registro de Estudiantes";
        registrarEstudiante.classList.remove("btn-warning");


    } else {
        estudiantes.push(OBJETO_ESTUDIANTE);

        Swal.fire({
            title: "Agregado!",
            text: "El estudiante ha sido agregado correctamente",
            icon: "success",
            timer: 3000,
            timerProgressBar: true
        });

    }

    formularioEstudiantes.reset();


    crearTabla();
    promedioCalculado = calcularPromedioGeneral();
    promedio__calculado.textContent = promedioCalculado;

    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
});


//Evento para saber cuando se le esta dando clic al boton edit y cuando es al noton delete

TABLE_BODY.addEventListener("click", (event) => {

    if (event.target.classList.contains("btn-danger")) {

        const idEliminar = event.target.parentElement.id;

        Swal.fire({
            title: 'Seguro que desea eliminar?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((respuesta) => {

            if (!respuesta.isConfirmed) {
                return;
            } else {

                const remainingArr = estudiantes.filter(
                    (estudiante) => estudiante.id !== idEliminar
                );

                estudiantes = remainingArr;
                crearTabla();
                promedioCalculado = calcularPromedioGeneral();
                promedio__calculado.textContent = promedioCalculado;
                localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

                Swal.fire(
                    'Eliminado!',
                    'El estudiante ha sido eliminado correctamente.',
                    'success'
                )
            }
        });

    }



    if (event.target.classList.contains("btn-warning")) {

        const idEditar = event.target.parentElement.id;
        registrarEstudiante.textContent = "Editar";
        titulo1.textContent = "Editando Estudiante";
        registrarEstudiante.classList.add("btn-warning");

        userEditing = estudiantes.find((estudiante) => estudiante.id === idEditar);

        formularioEstudiantes.nameEstudiante.value = userEditing.nombreEstudiante;
        formularioEstudiantes.lastNameEstudiante.value =
            userEditing.apellidoEstudiante;
        formularioEstudiantes.matriculaEstudiante.value =
            userEditing.matriculaEstudiante;
        formularioEstudiantes.cursoEstudiante.value = userEditing.cursoEstudiante;
        formularioEstudiantes.notaEstudiante.value = userEditing.notaEstudiante;
    }

});


