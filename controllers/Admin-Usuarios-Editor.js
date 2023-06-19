import Router from "../config/Router.js";
import Comentarios from "../models/Comentarios.js";
import Usuarios from "../models/Usuarios.js";

let expresiones = {
  firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // valida que sea un email valido
  username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])([A-Za-z\d$@$#!%*?&]|[^ ]){8,15}$/, // 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
  passrepeat:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])([A-Za-z\d$@$#!%*?&]|[^ ]){8,15}$/,
};

let data = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  passrepeat: "",
};

let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
if (currentUser != null) {
  document.querySelector("h5[data-username]").innerHTML = currentUser.name;
}

document.addEventListener("click", (e) => {
  if (
    e.target.matches("button.navbar-toggler") ||
    e.target.matches("button.navbar-toggler *") ||
    e.target.matches("div.sidebar .menu") ||
    e.target.matches("div.sidebar .menu *")
  ) {
    let navbar = document.querySelector("div.sidebar");
    navbar.classList.toggle("d-none");
  }
});

let router = new Router(),
  id = router.params.id || null,
  user = new Usuarios();

if (id != null) {
  user = user.findById(id);
  if (user != null) {
    let form = document.querySelector("#editor");
    form.firstName.value = user.name.split(" ")[0] || "";
    form.lastName.value = user.name.split(" ")[1] || "";
    form.email.value = user.email || "";
    form.username.value = user.username || "";
    form.status.value = user.status || "";
    form.rol.value = user.rol || "";
    document.querySelector("h1").innerHTML = `Editar usuario: ${user.name}`;
    data = {
      firstName: user.name.split(" ")[0] || "",
      lastName: user.name.split(" ")[1] || "",
      email: user.email || "",
      username: user.username || "",
      password: "",
      passrepeat: "",
    };
  } else {
    document.querySelector("#editor").innerHTML = `
      <div class="d-flex justify-content-center align-items-center flex-column">
        <div class="alert alert-danger w-100" role="alert">
          <h4 class="alert-heading">Error!</h4>
          <p>El usuario no existe</p>
          <hr>
          <p class="mb-0">Vuelve a intentarlo</p>
        </div>
        <a href="?view=Admin-Usuarios" class="btn btn-primary mt-4">Volver</a>
      </div>
    `;
  }
}

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#editor input")) {
    data = {
      ...data,
      [e.target.name]: e.target.value,
    };

    if (
      e.target.value.trim() == "" ||
      !expresiones[e.target.name].test(e.target.value)
    ) {
      let error = e.target.parentElement.querySelector(".error");
      if (error != null) {
        e.target.parentElement.removeChild(error);
      }

      error = document.createElement("p");
      error.classList.add("error");
      switch (e.target.name) {
        case "firstName":
          error.innerHTML = `El campo <b>Nombre</b> debe tener entre 1 y 40 caracteres, solo puede contener letras y espacios, pueden llevar acentos.`;
          break;
        case "lastName":
          error.innerHTML = `El campo <b>Apellido</b> debe tener entre 1 y 40 caracteres, solo puede contener letras y espacios, pueden llevar acentos.`;
          break;
        case "email":
          error.innerHTML = `El campo <b>Email</b> debe ser un email valido.`;
          break;
        case "username":
          error.innerHTML = `El campo <b>Usuario</b> debe tener entre 4 y 16 caracteres, solo puede contener numeros, letras, guiones y guiones bajos.`;
          break;
        case "password":
          error.innerHTML = `El campo <b>Contraseña</b> debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.`;
          break;
        case "passrepeat":
          error.innerHTML = `El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
          break;
      }
      e.target.parentElement.appendChild(error);
      return;
    } else {
      let error = e.target.parentElement.querySelector(".error");
      if (error != null) {
        e.target.parentElement.removeChild(error);
      }
    }

    if (e.target.name == "passrepeat") {
      if (e.target.value != data.password) {
        let error = e.target.parentElement.querySelector(".error");
        if (error != null) {
          e.target.parentElement.removeChild(error);
        }

        error = document.createElement("p");
        error.classList.add("error");
        error.innerHTML = `<br>El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
        e.target.parentElement.appendChild(error);
        return;
      } else {
        let error = e.target.parentElement.querySelector(".error");
        if (error != null) {
          e.target.parentElement.removeChild(error);
        }
      }
    }
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  for (let key in data) {
    if (key != "passrepeat" || key != "password") {
      if (data[key].trim() == "") {
        let error = form[key].parentElement.querySelector(".error");
        if (error != null) {
          form[key].parentElement.removeChild(error);
        }

        error = document.createElement("p");
        error.classList.add("error");
        switch (key) {
          case "firstName":
            error.innerHTML = `El campo <b>Nombre</b> es obligatorio.`;
            break;
          case "lastName":
            error.innerHTML = `El campo <b>Apellido</b> es obligatorio.`;
            break;
          case "email":
            error.innerHTML = `El campo <b>Email</b> es obligatorio.`;
            break;
          case "username":
            error.innerHTML = `El campo <b>Usuario</b> es obligatorio.`;
            break;
        }
        form[key].parentElement.appendChild(error);
      }
    }
  }
  if (data["password"] != "") {
    if (data["password"] != data["passrepeat"]) {
      let error = form["passrepeat"].parentElement.querySelector(".error");
      if (error != null) {
        form["passrepeat"].parentElement.removeChild(error);
      }

      error = document.createElement("p");
      error.classList.add("error");
      error.innerHTML = `El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
      form["passrepeat"].parentElement.appendChild(error);
    } else {
      let inputs = ["password", "passrepeat"];
      inputs.forEach((input) => {
        let error = form[input].parentElement.querySelector(".error");
        if (error != null) {
          form[input].parentElement.removeChild(error);
        }
        if (!expresiones[input].test(form[input].value)) {
          error = document.createElement("p");
          error.classList.add("error");
          switch (input) {
            case "password":
              error.innerHTML = `El campo <b>Contraseña</b> debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.`;
              break;
            case "passrepeat":
              error.innerHTML = `El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
              break;
          }
          form[input].parentElement.appendChild(error);
        }
      });
    }
  } else {
    if (id == null) {
      if (data["password"] != data["passrepeat"]) {
        let error = form["passrepeat"].parentElement.querySelector(".error");
        if (error != null) {
          form["passrepeat"].parentElement.removeChild(error);
        }

        error = document.createElement("p");
        error.classList.add("error");
        error.innerHTML = `El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
        form["passrepeat"].parentElement.appendChild(error);
      } else {
        let inputs = ["password", "passrepeat"];
        inputs.forEach((input) => {
          let error = form[input].parentElement.querySelector(".error");
          if (error != null) {
            form[input].parentElement.removeChild(error);
          }
          if (!expresiones[input].test(form[input].value)) {
            error = document.createElement("p");
            error.classList.add("error");
            switch (input) {
              case "password":
                error.innerHTML = `El campo <b>Contraseña</b> debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.`;
                break;
              case "passrepeat":
                error.innerHTML = `El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
                break;
            }
            form[input].parentElement.appendChild(error);
          }
        });
      }
    } else {
      let error = form["passrepeat"].parentElement.querySelector(".error");
      if (error != null) {
        form["passrepeat"].parentElement.removeChild(error);
      }
      error = form["password"].parentElement.querySelector(".error");
      if (error != null) {
        form["password"].parentElement.removeChild(error);
      }
    }
  }
  let errores = form.querySelectorAll(".error");
  if (errores.length != 0) {
    alert("El formulario contiene errores");
    return;
  }
  errores.forEach((error) => error.remove());
  user.name = `${data.firstName} ${data.lastName}`;
  if (
    user.all().filter((u) => u.email == data.email && u.id != user.id).length !=
    0
  ) {
    let error = form["email"].parentElement.querySelector(".error");
    if (error != null) {
      form["email"].parentElement.removeChild(error);
    }

    error = document.createElement("p");
    error.classList.add("error");
    error.innerHTML = `El campo <b>Email</b> ya existe.`;
    form["email"].parentElement.appendChild(error);
    return;
  }
  user.email = data.email;
  if (
    user.all().filter((u) => u.username == data.username && u.id != user.id)
      .length != 0
  ) {
    let error = form["username"].parentElement.querySelector(".error");
    if (error != null) {
      form["username"].parentElement.removeChild(error);
    }

    error = document.createElement("p");
    error.classList.add("error");
    error.innerHTML = `El campo <b>Usuario</b> ya existe.`;
    form["username"].parentElement.appendChild(error);
    return;
  }
  user.username = data.username;
  if (data.password != "") {
    user.password = data.password;
  }
  user.status = form.status.value;
  user.rol = form.rol.value;
  user.save();
  let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
  if (currentUser != null) {
    if (currentUser.id == user.id) {
      localStorage.setItem("current-user", JSON.stringify(user));
    }
  }
  if (id == null) {
    alert("Usuario guardado correctamente");
  } else {
    alert("Usuario editado correctamente");
  }
  router.GoTo("?view=Admin-Usuarios");
});

let comentarios = new Comentarios(),
  pendientes = comentarios
    .all()
    .filter((comentario) => comentario.status == "pendiente");
if (pendientes.length != 0) {
  let span = document.querySelector(`a[href="?view=Admin-Comentarios"] span`);
  span.classList.add(
    "badge",
    "bg-danger",
    "rounded-pill",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  span.style.width = "1.5rem";
  span.style.height = "1.5rem";
  span.innerHTML = pendientes.length;
  span.parentElement.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
}
