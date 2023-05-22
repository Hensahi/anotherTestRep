//Pide la cantidad de notas
let cantidadNotas = document.getElementById("input_field");
//console.log(parseInt(cantidadNotas));

//Genera la tabla

const CALIFICACIONES_BTN = document.getElementById("calificaciones_btn");

CALIFICACIONES_BTN.addEventListener("click", () => {
  //Valida la entrada de numeros validos
  if (isNaN(parseInt(cantidadNotas.value))) {
    alert("Debe introducir un numero valido");
  }

  //Variables
  const INPUT_FIELD = document.getElementById("input_field");
  const INPUT_VALUE = document.createTextNode(cantidadNotas.value);
  const TABLE_BODY = document.getElementById("table__body");
  const CONTADOR = parseInt(cantidadNotas.value);

  //Limpia la tabla con cada nueva entrada
  TABLE_BODY.innerHTML = "";

  //Muestra el boton de generar el promedio
  const SHOW_PROM_BUTTON = document.getElementById("BTN_Prom_Container");
  SHOW_PROM_BUTTON.classList.remove("hide");

  //Muestra el boton de generar el numero mayor
  const SHOW_MAYOR_BUTTON = document.getElementById("BTN_Mayor_Container");
  SHOW_MAYOR_BUTTON.classList.remove("hide");

   //Muestra el boton de generar el numero mayor
   const SHOW_MENOR_BUTTON = document.getElementById("BTN_Menor_Container");
   SHOW_MENOR_BUTTON.classList.remove("hide");
 


  //For para generar la tabla
  for (let i = 1; i <= CONTADOR; i++) {
    const NEW_ROW = document.createElement("tr");
    const NEW_TH = document.createElement("th");
    const TH_TEXT = document.createTextNode(`Calificacion No. ${i}`);
    const NEW_TD = document.createElement("td");
    const TD_CONTENT = document.createElement("input");

    TABLE_BODY.appendChild(NEW_ROW);
    NEW_ROW.appendChild(NEW_TH);
    NEW_TH.appendChild(TH_TEXT);
    NEW_ROW.appendChild(NEW_TD);
    NEW_TD.appendChild(TD_CONTENT);

    //Falta Mostrar los calculos de promedio, numero mayor y numero menor
  }
  //Limpia el input despues de generar la tabla
  INPUT_FIELD.value = "";

  //console.log(INPUT_VALUE);
});

//Programacion del boton que genera el promedio
const BOTON_PROMEDIO = document.getElementById("calcularPromedioBTN");
BOTON_PROMEDIO.addEventListener("click", () => {

  //Declarar arreglo vacio
  let listaCalificaciones = [];
  
  //for loop para iterar la cantidad de notas a ingresar
  for (let i = 1; i <= cantidadNotas; i++) {
    let interruptor = false;
    while (interruptor === false) {
      let validadorCalificacion = Number(prompt("Introduzca la calificacion"));
      if (
        validadorCalificacion < 50 ||
        validadorCalificacion > 100 ||
        isNaN(validadorCalificacion)
      ) {
        alert("Calificacion Invalida");
      } else {
        listaCalificaciones.push(validadorCalificacion);
        interruptor = true;
      }
    }
  }
});



//Funcion que calcula el promedio

let promedio = (arr_calificaciones) => {
  let suma_calificaciones = 0;
  for (let i = 0; i < arr_calificaciones.length; i++) {
    suma_calificaciones += arr_calificaciones[i];
  }
  return suma_calificaciones / arr_calificaciones.length;
};

console.log(
  `El promedio de las calificaciones ingresadas es: ${promedio(
    listaCalificaciones
  )}`
);

//Funcion que imprime la calificacion mas alta

let calificacionMaxima = (arr_calificaciones) => {
  return Math.max(...arr_calificaciones);
};

console.log(
  `La calificacion mas alta es ${calificacionMaxima(listaCalificaciones)}`
);

//Funcion que imprime la calificacion mas baja

let calificacionMinima = (arr_calificaciones) => {
  return Math.min(...arr_calificaciones);
};

console.log(
  `La calificacion mas baja es ${calificacionMinima(listaCalificaciones)}`
);
