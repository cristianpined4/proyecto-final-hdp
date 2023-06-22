import Usuarios from "../models/Usuarios.js";
import Router from "../config/Router.js";

let expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/, // valida que sea un email valido
  username: /^[a-z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])([A-Za-z\d$@$#!%*?&]|[^ ]){8,15}$/, // 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
  passrepeat:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])([A-Za-z\d$@$#!%*?&]|[^ ]){8,15}$/,
};

let data = {
  name: "",
  email: "",
  username: "",
  password: "",
  passrepeat: "",
};

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#registro input")) {
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
        case "name":
          error.innerHTML = `<br>El campo <b>Nombre</b> debe tener entre 1 y 40 caracteres, solo puede contener letras y espacios, pueden llevar acentos.`;
          break;
        case "email":
          error.innerHTML = `<br>El campo <b>Email</b> debe ser un email valido. Evite usar letras mayusculas.`;
          break;
        case "username":
          error.innerHTML = `<br>El campo <b>Usuario</b> debe tener entre 4 y 16 caracteres, solo puede contener numeros, letras minusculas, guiones y guiones bajos.`;
          break;
        case "password":
          error.innerHTML = `<br>El campo <b>Contraseña</b> debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.`;
          break;
        case "passrepeat":
          error.innerHTML = `<br>El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
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
  if (e.target.matches("#registro")) {
    e.preventDefault();
    let error = document.querySelectorAll(".form-group .error");
    if (error.length != 0) {
      let err = document.querySelector(".error.form-message");
      if (err != null) {
        err.parentElement.removeChild(err);
      }
      err = document.createElement("p");
      err.classList.add("error", "form-message");
      err.innerHTML = `<br>Debe corregir los errores antes de continuar.`;
      e.target.appendChild(err);
      return;
    }

    if (e.target["passrepeat"].value != data.password) {
      let error = e.target["passrepeat"].parentElement.querySelector(".error");
      if (error != null) {
        e.target["passrepeat"].parentElement.removeChild(error);
      }

      error = document.createElement("p");
      error.classList.add("error");
      error.innerHTML = `<br>El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
      e.target["passrepeat"].parentElement.appendChild(error);
      return;
    } else {
      let error = e.target["passrepeat"].parentElement.querySelector(".error");
      if (error != null) {
        e.target["passrepeat"].parentElement.removeChild(error);
      }
    }

    for (let i in data) {
      if (data[i].trim() == "") {
        let error = e.target[i].parentElement.querySelector(".error");
        if (error != null) {
          e.target[i].parentElement.removeChild(error);
        }

        error = document.createElement("p");
        error.classList.add("error");
        switch (i) {
          case "name":
            error.innerHTML = `<br>El campo <b>Nombre</b> debe tener entre 1 y 40 caracteres, solo puede contener letras y espacios, pueden llevar acentos.`;
            break;
          case "email":
            error.innerHTML = `<br>El campo <b>Email</b> debe ser un email valido. Evite usar letras mayusculas.`;
            break;
          case "username":
            error.innerHTML = `<br>El campo <b>Usuario</b> debe tener entre 4 y 16 caracteres, solo puede contener numeros, letras minusculas, guiones y guiones bajos.`;
            break;
          case "password":
            error.innerHTML = `<br>El campo <b>Contraseña</b> debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial.`;
            break;
          case "passrepeat":
            error.innerHTML = `<br>El campo <b>Repetir contraseña</b> debe ser igual a la contraseña.`;
            break;
        }
        e.target[i].parentElement.appendChild(error);
        return;
      }
    }

    let err = document.querySelector(".error.form-message");
    if (err != null) {
      err.parentElement.removeChild(err);
    }
    let usuario = new Usuarios();
    let exist = usuario.all().find((el) => el.username == data.username);
    if (exist != undefined) {
      let err = document.querySelector(".error.form-message");
      if (err != null) {
        err.parentElement.removeChild(err);
      }
      err = document.createElement("p");
      err.classList.add("error", "form-message");
      err.innerHTML = `<br>El usuario ya existe.`;
      e.target.appendChild(err);
      return;
    }
    exist = usuario.all().find((el) => el.email == data.email);
    if (exist != undefined) {
      let err = document.querySelector(".error.form-message");
      if (err != null) {
        err.parentElement.removeChild(err);
      }
      err = document.createElement("p");
      err.classList.add("error", "form-message");
      err.innerHTML = `<br>El email ya existe.`;
      e.target.appendChild(err);
      return;
    }
    usuario.username = data.username;
    usuario.password = data.password;
    usuario.name = data.name;
    usuario.email = data.email;
    usuario.save();
    e.target.reset();
    alert("Usuario registrado correctamente");
    let route = new Router();
    route.GoTo("?view=Login");
  }
});
