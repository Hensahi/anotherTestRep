//Variables globales
const searchBar = document.getElementById("searchBar");

const pokemonNameTitle = document.getElementById("pokemon-name");
const habilidadData = document.getElementById("habilidadData");
const tipoData = document.getElementById("tipoData");

const progressBarHP = document.getElementById("progressBarHP");
const progressBarAttack = document.getElementById("progressBarAttack");
const progressBarDefense = document.getElementById("progressBarDefense");
const progressBarSpecialAttack = document.getElementById(
    "progressBarSpecialAttack"
);
const progressBarSpecialDefense = document.getElementById(
    "progressBarSpecialDefense"
);
const progressBarSpeed = document.getElementById("progressBarSpeed");
const pokeDescription = document.getElementById("pokeDescription");

const infoAltura = document.getElementById("infoAltura");
const infoPeso = document.getElementById("infoPeso");

searchBar.addEventListener("keyup", (event) => {
    // const pokemonName = "squirtle".toLocaleLowerCase();
    console.log(event);
    let pokemonName = event.target.value.trim().toLowerCase();
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        pokeDex(pokemonName);
    }

    //   habilidadData.innerText = "";
    //   tipoData.innerText = "";

    //   //Remover clase para el back-ground
    //   progressBarHP.classList.remove(`${pokemonData.types[0].type.name}`);
    //   progressBarAttack.classList.remove(`${pokemonData.types[0].type.name}`);
    //   progressBarDefense.classList.remove(`${pokemonData.types[0].type.name}`);
    //   progressBarSpecialAttack.classList.remove(
    //     `${pokemonData.types[0].type.name}`
    //   );
    //   progressBarSpecialDefense.classList.remove(
    //     `${pokemonData.types[0].type.name}`
    //   );
    //   progressBarSpeed.classList.remove(`${pokemonData.types[0].type.name}`);
    //   //Fin Remover clase para el back-ground

    //   //Remover clase para el borde
    //   pokeDescription.classList.remove(`border${pokemonData.types[0].type.name}`);
    //   //Fin Remover clase para el borde
});

function pokeDex(pokemon) {
    console.log(pokemon);

    console.log(`My name is: ${pokemon}`);

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const pokeImage = document.getElementById("pokeImage");

    // const hp = document.getElementById("hp");
    // const attack = document.getElementById("attack");
    // const defense = document.getElementById("defense");
    // const specialAttack = document.getElementById("special-attack");
    // const specialDefense = document.getElementById("special-defense");
    // const speed = document.getElementById("speed");

    //Generando stats dinamicamente

    // Funcion asincrona

    async function getPokemonData() {
        const response = await fetch(url);
        const pokemonDataPromise = response;
        const pokemonData = await pokemonDataPromise.json();

        let abilities = [];
        let types = [];

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
            habilidadData.appendChild(span);
            span.textContent = `${habilidad} `;
        });
        abilities = [];

        console.log(abilities);

        //FOR LOOP PARA OBTENER LOS TIPOS

        for (i = 0; i < pokemonData.types.length; i++) {
            types.push(pokemonData.types[i].type.name);
        }
        // console.log(types);

        types.forEach((tipo) => {
            const span = document.createElement("span");
            span.classList.add(`${tipo}`);
            tipoData.appendChild(span);
            span.textContent = `${tipo} `;
        });

        // console.log(`Estadisticas totales ${pokemonData.stats.length}`);

        //Stats

        // hp.textContent = `HP: ${pokemonData.stats[0].base_stat}`;
        // attack.textContent = `Attack: ${pokemonData.stats[1].base_stat}`;
        // defense.textContent = `Defense: ${pokemonData.stats[2].base_stat}`;
        // specialAttack.textContent = `Special-Attack: ${pokemonData.stats[3].base_stat}`;
        // specialDefense.textContent = `Special-Defense: ${pokemonData.stats[4].base_stat}`;
        // speed.textContent = `Speed: ${pokemonData.stats[5].base_stat}`;

        //Creando progress bar dinamicos
        //Creando contenedores de los progress bar

        // const spanContainerHP = document.createElement("span");
        // const spanBarHP = document.createElement("span");
        // hp.appendChild(spanContainerHP);
        // spanContainerHP.appendChild(spanBarHP);

        //Agregando custum-atributs
        progressBarHP.setAttribute(
            "data-StatHP",
            `${pokemonData.stats[0].base_stat}`
        );

        progressBarAttack.setAttribute(
            "data-StatAttack",
            `${pokemonData.stats[1].base_stat}`
        );

        progressBarDefense.setAttribute(
            "data-StatDefense",
            `${pokemonData.stats[2].base_stat}`
        );

        progressBarSpecialAttack.setAttribute(
            "data-StatSpecialAttack",
            `${pokemonData.stats[3].base_stat}`
        );

        progressBarSpecialDefense.setAttribute(
            "data-StatSpecialDefense",
            `${pokemonData.stats[4].base_stat}`
        );

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

        root.style.setProperty(
            "--widthSpeed",
            `${pokemonData.stats[5].base_stat}px`
        );

        //Fin variables CSS

        //Agregar clase para el back-ground
        progressBarHP.classList.add(`${pokemonData.types[0].type.name}`);
        progressBarAttack.classList.add(`${pokemonData.types[0].type.name}`);
        progressBarDefense.classList.add(`${pokemonData.types[0].type.name}`);
        progressBarSpecialAttack.classList.add(`${pokemonData.types[0].type.name}`);
        progressBarSpecialDefense.classList.add(
            `${pokemonData.types[0].type.name}`
        );
        progressBarSpeed.classList.add(`${pokemonData.types[0].type.name}`);
        //Fin clase para el back-ground

        //TODO: Limpiar codigo comentado
        //TODO: Obtener Categoria y debilidad en la parte de Info

        // console.log(pokemonData);

        const descriptionURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;

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
                }
            );

            const pokemonFlavorTextEntriesEspanish = pokemonFlavorTextEntries.filter(
                (language) => language.language.name === "es"
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
            const descriptionTitle = document.getElementById("descriptionTitle");

            //Cambia texto de titulo segun idioma de descripcion.

            if (pokemonFlavorTextEntries_En_Es[randomDescriptionToShow].language.name === "es") {
                descriptionTitle.textContent = "Descripcion:";
            }

            descriptionText.textContent =
                pokemonFlavorTextEntries_En_Es[randomDescriptionToShow].flavor_text;

            //Agregar clase para el color del borde

            pokeDescription.classList.add(`border${pokemonData.types[0].type.name}`);
            // console.log(descriptionData.flavor_text_entries[0].flavor_text);

            //Event Listener que limpia los campos

            searchBar.addEventListener("keyup", () => {
                habilidadData.innerText = "";
                tipoData.innerText = "";
                infoAltura.innerText = "";
                infoPeso.innerText = "";

                //Remover clase para el back-ground
                progressBarHP.classList.remove(`${pokemonData.types[0].type.name}`);
                progressBarAttack.classList.remove(`${pokemonData.types[0].type.name}`);
                progressBarDefense.classList.remove(
                    `${pokemonData.types[0].type.name}`
                );
                progressBarSpecialAttack.classList.remove(
                    `${pokemonData.types[0].type.name}`
                );
                progressBarSpecialDefense.classList.remove(
                    `${pokemonData.types[0].type.name}`
                );
                progressBarSpeed.classList.remove(`${pokemonData.types[0].type.name}`);
                //Fin Remover clase para el back-ground

                //Remover clase para el borde
                pokeDescription.classList.remove(
                    `border${pokemonData.types[0].type.name}`
                );
                //Fin Remover clase para el borde

                //Eliminando custum-atributs
                progressBarHP.removeAttribute("data-StatHP");

                progressBarAttack.removeAttribute("data-StatAttack");

                progressBarDefense.removeAttribute("data-StatDefense");

                progressBarSpecialAttack.removeAttribute("data-StatSpecialAttack");

                progressBarSpecialDefense.removeAttribute("data-StatSpecialDefense");

                progressBarSpeed.removeAttribute("data-StatSpeed");

                //Fin Remover Custom Attributes
            });
        }

        getDescription();
    }

    getPokemonData();

    // pokemonNameTitle.textContent = "Hency";

    //TODO: Las abilidades y tipo, asi como las clases para las barras y el borde se estan quedando generadas en el html.
    //TODO: Hay que buscar la forma de eliminar todo eso cuando se busca un nuevo pokemon.
}
