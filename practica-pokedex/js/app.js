//Variables globales
const searchBar = document.getElementById("searchBar");




const pokemonNameTitle = document.getElementById("pokemon-name");

console.log(searchBar);

const pokemonName = "charizard".toLocaleLowerCase();
// let pokemonName = "";


// if (event.target.value === "") {
//     pokemonName = "";
// } else {

//     pokemonName = event.target.value.toLowerCase();
// }



console.log(pokemonName);


console.log(`My name is: ${pokemonName}`);







const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
const pokeImage = document.getElementById("pokeImage");
const infoAltura = document.getElementById("infoAltura");
const infoPeso = document.getElementById("infoPeso");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

//Generando stats dinamicamente

const containerHabilidad = document.getElementById("habilidad");
const containerTipo = document.getElementById("tipo");

// Funcion asincrona

async function getPokemonData() {
    const response = await fetch(url);
    const pokemonDataPromise = response;
    const pokemonData = await pokemonDataPromise.json();

    const abilities = [];
    const types = [];

    pokemonNameTitle.textContent = pokemonData.forms[0].name;
    pokeImage.setAttribute("src", pokemonData.sprites.other.home.front_default);
    infoAltura.textContent = pokemonData.height;
    infoPeso.textContent = pokemonData.weight;

    //FOR LOOP PARA OBTENER LAS HABILIDADES

    for (i = 0; i < pokemonData.abilities.length; i++) {
        abilities.push(pokemonData.abilities[i].ability.name);
    }
    // console.log(abilities);

    abilities.forEach((habilidad) => {
        const span = document.createElement("span");
        containerHabilidad.appendChild(span);
        span.textContent = `${habilidad} `;
    });

    //FOR LOOP PARA OBTENER LOS TIPOS

    for (i = 0; i < pokemonData.types.length; i++) {
        types.push(pokemonData.types[i].type.name);
    }
    // console.log(types);

    types.forEach((tipo) => {
        const span = document.createElement("span");
        span.classList.add(`${tipo}`);
        containerTipo.appendChild(span);
        span.textContent = `${tipo} `;
    });

    // console.log(`Estadisticas totales ${pokemonData.stats.length}`);

    //Stats

    // hp.textContent = `HP: ${pokemonData.stats[0].base_stat}`;
    // attack.textContent = `Attack: ${pokemonData.stats[1].base_stat}`;
    // defense.textContent = `Defense: ${pokemonData.stats[2].base_stat}`;
    // specialAttack.textContent = `Special-Attack: ${pokemonData.stats[3].base_stat}`;
    specialDefense.textContent = `Special-Defense: ${pokemonData.stats[4].base_stat}`;
    speed.textContent = `Speed: ${pokemonData.stats[5].base_stat}`;

    //Creando progress bar dinamicos
    //Creando contenedores de los progress bar

    // const spanContainerHP = document.createElement("span");
    // const spanBarHP = document.createElement("span");
    // hp.appendChild(spanContainerHP);
    // spanContainerHP.appendChild(spanBarHP);

    //Agregando custum-atributs
    const progressBarHP = document.getElementById("progressBarHP");
    progressBarHP.setAttribute(
        "data-StatHP",
        `${pokemonData.stats[0].base_stat}`
    );

    const progressBarAttack = document.getElementById("progressBarAttack");
    progressBarAttack.setAttribute(
        "data-StatAttack",
        `${pokemonData.stats[1].base_stat}`
    );

    const progressBarDefense = document.getElementById("progressBarDefense");
    progressBarDefense.setAttribute(
        "data-StatDefense",
        `${pokemonData.stats[2].base_stat}`
    );

    const progressBarSpecialAttack = document.getElementById(
        "progressBarSpecialAttack"
    );
    progressBarSpecialAttack.setAttribute(
        "data-StatSpecialAttack",
        `${pokemonData.stats[3].base_stat}`
    );

    const progressBarSpecialDefense = document.getElementById(
        "progressBarSpecialDefense"
    );
    progressBarSpecialDefense.setAttribute(
        "data-StatSpecialDefense",
        `${pokemonData.stats[4].base_stat}`
    );

    const progressBarSpeed = document.getElementById("progressBarSpeed");
    progressBarSpeed.setAttribute(
        "data-StatSpeed",
        `${pokemonData.stats[5].base_stat}`
    );

    //Fin Custom Attributes

    //Agregando variables CSS
    let root = document.documentElement;
    root.style.setProperty("--widthHP", `${pokemonData.stats[0].base_stat}px`);
    root.style.setProperty(
        "--widthAttack",
        `${pokemonData.stats[1].base_stat}px`
    );

    root.style.setProperty(
        "--widthDefense",
        `${pokemonData.stats[2].base_stat}px`
    );

    root.style.setProperty(
        "--widthSpecialAttack",
        `${pokemonData.stats[3].base_stat}px`
    );

    root.style.setProperty(
        "--widthSpecialDefense",
        `${pokemonData.stats[4].base_stat}px`
    );

    root.style.setProperty("--widthSpeed", `${pokemonData.stats[5].base_stat}px`);

    //Fin variables CSS

    //Agregar clase para el back-ground
    progressBarHP.classList.add(`${pokemonData.types[0].type.name}`);
    progressBarAttack.classList.add(`${pokemonData.types[0].type.name}`);
    progressBarDefense.classList.add(`${pokemonData.types[0].type.name}`);
    progressBarSpecialAttack.classList.add(`${pokemonData.types[0].type.name}`);
    progressBarSpecialDefense.classList.add(`${pokemonData.types[0].type.name}`);
    progressBarSpeed.classList.add(`${pokemonData.types[0].type.name}`);
    //Fin clase para el back-ground

    //TODO: Limpiar codigo comentado
    //TODO: Obtener Categoria y debilidad en la parte de Info

    // console.log(pokemonData);

    const descriptionURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;

    async function getDescription() {
        const descriptionResponse = await fetch(descriptionURL);
        const descriptionData = await descriptionResponse.json();
        const descriptionText = document.getElementById("descriptionText");
        const pokemonFlavorTextEntries = [];

        for (let i = 0; i < descriptionData.flavor_text_entries.length; i++) {
            pokemonFlavorTextEntries.push(descriptionData.flavor_text_entries[i]);
        }
        // console.log(pokemonFlavorTextEntries);
        const pokemonFlavorTextEntriesEnglish = pokemonFlavorTextEntries.filter(
            (language) => {
                return language.language.name === "en";
            });

        const pokemonFlavorTextEntriesEspanish = pokemonFlavorTextEntries.filter(
            language => language.language.name === "es"
        );

        const pokemonFlavorTextEntries_En_Es = pokemonFlavorTextEntriesEnglish.concat(
            pokemonFlavorTextEntriesEspanish
        );

        console.log(pokemonFlavorTextEntries_En_Es);
        //console.log(pokemonFlavorTextEntries[110].language.name);

        //Generar descripcion random

        const randomDescription = () => {
            const randomNumber = Math.round(
                Math.random() * pokemonFlavorTextEntries_En_Es.length
            );
            return randomNumber;
        };

        const randomDescriptionToShow = randomDescription();
        const descriptionTitle = document.getElementById("descriptionTitle")

        //Cambia texto de titulo segun idioma de descripcion.

        if (pokemonFlavorTextEntries_En_Es[randomDescriptionToShow].language.name === "es") {
            descriptionTitle.textContent = `Descripcion:`;
        }

        descriptionText.textContent =
            pokemonFlavorTextEntries_En_Es[randomDescriptionToShow].flavor_text;

        //Agregar clase para el color del borde

        const pokeDescription = document.getElementById("pokeDescription");

        pokeDescription.classList.add(`border${pokemonData.types[0].type.name}`);
        // console.log(descriptionData.flavor_text_entries[0].flavor_text);
    }

    getDescription();
}

getPokemonData();

    // pokemonNameTitle.textContent = "Hency";


