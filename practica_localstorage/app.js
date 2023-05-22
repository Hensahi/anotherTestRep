/**
 * Esta primera parte del ejercicio de editar consistia en editar el contenido de un elemento P y almacenarlo en el local storage. 
 * TODO:
 * La segunda parte de la prueba consiste en crear manualmente un array, guardarlo en el local storage, devolverlo y luego editarlo actualizando asi el local storage con la informacion editada.
 */

let PARAGRAPH = document.getElementById("editableText");

//PARAGRAPH.textContent = "hola";

let PARAGRAPH_TEXT = PARAGRAPH.textContent;
const EDIT_BTN = document.getElementById("editBTN");
const SAVE_BTN = document.getElementById("saveBTN");


//Boton editar

EDIT_BTN.addEventListener("click", () => {
  PARAGRAPH.style.backgroundColor = "white";
  PARAGRAPH.contentEditable = true;

  //console.log("clicked");
});

//Boton guardar

SAVE_BTN.addEventListener("click", () => {
  PARAGRAPH.style.backgroundColor = "#c3c3c3";
  PARAGRAPH.contentEditable = false;
  
  PARAGRAPH_TEXT = PARAGRAPH.textContent;
  localStorage.setItem("texto", JSON.stringify(PARAGRAPH_TEXT));
  console.log(PARAGRAPH_TEXT);
});

if(localStorage.getItem("texto") == null){
  PARAGRAPH_TEXT = PARAGRAPH.textContent;
} else{

  const STORED_TEXT = JSON.parse(localStorage.getItem("texto"));
  PARAGRAPH.textContent = STORED_TEXT;
  console.log(STORED_TEXT);
}



//localStorage.clear();
