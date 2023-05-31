import Router from "./Router.js";

let arrayPermisos = {
  admin: ["Inicio"],
  usuario: ["Inicio"],
};

document.addEventListener("DOMContentLoaded", () => {
  let usuarioLogin = localStorage.getItem("current-user") || null,
    container = "#app",
    navLink = "nav ul li a",
    title = document.title;

  moment.locale("es");

  const route = new Router();
  let doc = route.params.view;

  if (doc == undefined) {
    doc = "Inicio";
  }

  if (usuarioLogin != null && doc != "Login") {
    if (arrayPermisos[usuarioLogin.rol].indexOf(doc) == -1) {
      route.GoToWith("?view=Login");
    }
  } else {
    if (arrayPermisos["usuario"].indexOf(doc) == -1) {
      route.GoToWith("?view=Login");
    }
  }

  fetch(`./views/${doc}.html`)
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((md) => {
      document.querySelector(container).innerHTML = md;
      if (document.querySelector(`${navLink}[href="?view=${doc}"]`) != null) {
        document
          .querySelector(`${navLink}[href="?view=${doc}"]`)
          .classList.add("active");
      }
      document.title = `${doc} - ${title}`;

      document.querySelectorAll(`${container} pre code`).forEach((el) => {
        el.innerHTML = el.innerHTML
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
      });
      document.querySelector(
        "script[data-script]"
      ).src = `./controllers/${doc}.js`;
    })
    .catch((err) => {
      document.title = `Page not found - ${title}`;
      document.querySelector(container).innerHTML =
        "<h1 class='error-message'>Error 404: Page not found</h1>";
    });
});
