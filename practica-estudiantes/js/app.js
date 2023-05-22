

let users = JSON.parse(localStorage.getItem("users")) || [];


const formRegister = document.querySelector("#formRegister");
const containerUsers = document.querySelector("#containerUsers");
const titleFormulario = document.querySelector("#titleFormulario");
const btnFormulario = document.querySelector("#btnFormulario");

let userEditing = null;


function printUser() {

    let html = "";

    users.forEach(({ id, emailUser, nameUser }) => {
        html += `
                    <tr>
                        <td>${nameUser}</td>
                        <td>${emailUser}</td>
                        <td id="${id}">
                            <button type="button" class="btn btn-warning">Editar</button>
                            <button type="button" class="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                `;
    });
    containerUsers.innerHTML = html;
}

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameUser = e.target.nameUser.value.trim();
    const emailUser = e.target.emailUser.value.trim();

    if (nameUser === "" || emailUser === "") {
        return alert("Todos los campos son necesarios!!")
    }


    const formUser = { id: crypto.randomUUID(), nameUser, emailUser };

    if (userEditing) {
        const editedArray = users.map((user) => {
            if (user.id === userEditing.id) {
                return {
                    ...formUser,
                    id: userEditing.id
                }
            } else {
                return user;
            }
        });

        users = editedArray;
        userEditing = null;

        titleFormulario.textContent = "Formulario ingreso de Estudiantes";
        btnFormulario.textContent = "Registrar";
        btnFormulario.classList.remove("btn-warning");
    } else {
        users.push(formUser);
    }


    formRegister.reset();

    printUser();

    localStorage.setItem("users", JSON.stringify(users));
});

printUser();

containerUsers.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-danger")) {
        const id = event.target.parentElement.id;
        const respuesta = confirm("Estas seguro que deseas eliminar?");
        if (!respuesta) {

            return;
        }
        const newArray = users.filter((user) => {

            return user.id !== id;
        });

        users = newArray;
        printUser();

        localStorage.setItem("users", JSON.stringify(users));

    }

    if (event.target.classList.contains("btn-warning")) {
        const id = event.target.parentElement.id;

        userEditing = users.find((user) => {
            return user.id === id;
        });

        // console.log(userEditing);

        titleFormulario.textContent = "Editando usuario";
        btnFormulario.textContent = "Editar";
        btnFormulario.classList.add("btn-warning");

        formRegister.nameUser.value = userEditing.nameUser;
        formRegister.emailUser.value = userEditing.emailUser;

    }

});



printUser();