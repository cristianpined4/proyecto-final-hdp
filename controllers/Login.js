import Usuarios from "../models/Usuarios.js";
import Router from "../config/Router.js";
let data = {
  username: "",
  password: "",
};

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#inicio input")) {
    data = {
      ...data,
      [e.target.name]: e.target.value,
    };
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.matches("#inicio")) {
    e.preventDefault();
    for (let i in data) {
      if (data[i].trim() == "") {
        let error = e.target[i].parentElement.querySelector(".error");
        if (error != null) {
          e.target[i].parentElement.removeChild(error);
        }
        error = document.createElement("p");
        error.classList.add("error");
        switch (i) {
          case "username":
            error.innerHTML = `<br>El campo <b>Usuario</b> es obligatorio.`;
            break;
          case "password":
            error.innerHTML = `<br>El campo <b>Contraseña</b> es obligatorio.`;
            break;
        }
        e.target[i].parentElement.appendChild(error);
        return;
      }
      let err = document.querySelector(".error.form-message");
      if (err != null) {
        err.parentElement.removeChild(err);
      }
      let usuario = new Usuarios();
      let exist = usuario.all().find((el) => el.username == data.username);
      if (exist == undefined) {
        err = document.createElement("p");
        err.classList.add("error", "form-message");
        err.innerHTML = `<br>El usuario <b>${data.username}</b> no existe.`;
        e.target.appendChild(err);
        return;
      }
      if (exist.password != data.password) {
        err = document.createElement("p");
        err.classList.add("error", "form-message");
        err.innerHTML = `<br>La contraseña es incorrecta.`;
        e.target.appendChild(err);
        return;
      }
      localStorage.setItem("current-user", JSON.stringify(exist));
      let route = new Router();
      if (exist.rol == "admin") {
        route.GoTo("?view=Admin");
        return;
      }
      route.GoTo("?view=Inicio");
    }
  }
});
