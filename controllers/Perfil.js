import Usuarios from "../models/Usuarios.js";
import Post from "../models/Post.js";
import Comentarios from "../models/Comentarios.js";
import Router from "../config/Router.js";

const router = new Router();

let expresiones = {
  firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // valida que sea un email valido
  username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  currentPassword: /^([A-Za-z\d$@$#!%*?&]|[^ ]){1,15}$/, // 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])([A-Za-z\d$@$#!%*?&]|[^ ]){8,15}$/, // 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
  confirmPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])([A-Za-z\d$@$#!%*?&]|[^ ]){8,15}$/,
};

let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;

if (!currentUser) {
  router.GoTo("?view=Login");
}

const User = new Usuarios().findById(currentUser.id);
let nPosts = User.findRelated("post", "id_usuario", currentUser.id).filter(
  (el) => el.status == "publicado"
).length;
let nComentarios = User.findRelated(
  "comentarios",
  "id_usuario",
  currentUser.id
).filter((el) => el.status == "aceptado").length;

document.getElementById("numPosts").innerHTML = nPosts;
document.getElementById("numComments").innerHTML = nComentarios;
document.getElementById("registrationDate").innerHTML = User.create_date.slice(0,10);

const form = document.querySelector("form[data-user]");
form.firstName.value = User.name.split(" ")[0] || "";
form.lastName.value = User.name.split(" ")[1] || "";
form.email.value = User.email || "";
form.username.value = User.username || "";
form.username.disabled = true;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  for (let i in expresiones) {
    if (
      (form.currentPassword.value == "" && i == "currentPassword") ||
      (form.password.value == "" && i == "password") ||
      (form.confirmPassword.value == "" && i == "confirmPassword")
    )
      continue;
    if (form[i].value.trim() == "" || !expresiones[i].test(form[i].value)) {
      let error = form[i].parentElement.querySelector(".error");
      if (error != null) {
        form[i].parentElement.removeChild(error);
      }

      error = document.createElement("p");
      error.classList.add("error");
      switch (i) {
        case "firstName":
          error.innerHTML = `<br>El campo <b>Nombre</b> debe tener entre 1 y 40 caracteres, solo puede contener letras y espacios, pueden llevar acentos.`;
          break;
        case "lastName":
          error.innerHTML = `<br>El campo <b>Apellido</b> debe tener entre 1 y 40 caracteres, solo puede contener letras y espacios, pueden llevar acentos.`;
          break;
        case "email":
          error.innerHTML = `<br>El campo <b>Email</b> debe ser un email valido.`;
          break;
        case "username":
          error.innerHTML = `<br>El campo <b>Usuario</b> debe tener entre 4 y 16 caracteres, solo puede contener numeros, letras, guiones y guiones bajos.`;
          break;
        case "currentPassword":
          error.innerHTML = `<br>El campo <b>Contraseña actual</b> debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.`;
        case "password":
          error.innerHTML = `<br>El campo <b>Contraseña</b> debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.`;
          break;
        case "confirmPassword":
          error.innerHTML = `<br>El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
          break;
      }
      form[i].parentElement.appendChild(error);
      return;
    } else {
      let error = form[i].parentElement.querySelector(".error");
      if (error != null) {
        form[i].parentElement.removeChild(error);
      }
    }
  }

  User.name = `${form.firstName.value} ${form.lastName.value}`;
  User.email = form.email.value;
  User.username = form.username.value;

  if (form.currentPassword.value != "") {
    if (form.currentPassword.value != User.password) {
      let error = form.currentPassword.parentElement.querySelector(".error");
      if (error != null) {
        form.currentPassword.parentElement.removeChild(error);
      }
      error = document.createElement("p");
      error.classList.add("error");
      error.innerHTML = `<br>La contraseña actual es incorrecta.`;
      form.currentPassword.parentElement.appendChild(error);
      return;
    }
    if (form.password.value == "") {
      let error = form.password.parentElement.querySelector(".error");
      if (error != null) {
        form.password.parentElement.removeChild(error);
      }
      error = document.createElement("p");
      error.classList.add("error");
      error.innerHTML = `<br>El campo <b>Contraseña</b> es obligatorio.`;
      form.password.parentElement.appendChild(error);
      return;
    }

    if (form.confirmPassword.value == "") {
      let error = form.confirmPassword.parentElement.querySelector(".error");
      if (error != null) {
        form.confirmPassword.parentElement.removeChild(error);
      }
      error = document.createElement("p");
      error.classList.add("error");
      error.innerHTML = `<br>El campo <b>Repetir contraseña</b> es obligatorio.`;
      form.confirmPassword.parentElement.appendChild(error);
      return;
    }

    if (form.password.value != form.confirmPassword.value) {
      let error = form.confirmPassword.parentElement.querySelector(".error");
      if (error != null) {
        form.confirmPassword.parentElement.removeChild(error);
      }
      error = document.createElement("p");
      error.classList.add("error");
      error.innerHTML = `<br>Las contraseñas no coinciden.`;
      form.confirmPassword.parentElement.appendChild(error);
      return;
    }
    User.password = form.password.value;
  }
  User.update();
  alert("Perfil actualizado correctamente");
  localStorage.setItem("current-user", JSON.stringify(User));
  router.GoTo("?view=Perfil");
});
