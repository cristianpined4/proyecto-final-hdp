import Router from "./Router.js";

let rutasProtegidas = ["Admin"];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(
    "footer div.copyright"
  ).innerHTML = `Copyright &copy; ${moment().format("YYYY")} - GRUPO`;
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

  if (usuarioLogin != null) {
    if (doc == "Login" || doc == "Registro") {
      route.GoToWith("?view=Inicio");
      return;
    }
    document.querySelector(".menu-no-user").classList.add("d-none");
    document.querySelector(".menu-user").classList.remove("d-none");
    document.querySelector(".menu-user img").title = usuarioLogin.name;
    document.querySelector(".menu-user img").alt = usuarioLogin.name;
    document.querySelector(
      ".menu-user img"
    ).parentElement.innerHTML += `<span class="text-white" style="margin-left: 0.5rem;">${usuarioLogin.name}</span>`;
    if (usuarioLogin.rol == "admin") {
      document.querySelector(".menu-admin").classList.remove("d-none");
    }
    if (usuarioLogin.rol == "usuario" && rutasProtegidas.indexOf(doc) != -1) {
      route.GoToWith("?view=Inicio");
      return;
    }
  } else {
    if (rutasProtegidas.indexOf(doc) != -1) {
      route.GoToWith("?view=Login");
      return;
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
        "<div class='container'><div class='card my-3 p-4'><h1 class='error-message text-center display-2 text-danger'>Error 404<br><span class='text-black display-5'>Esta pagina no fue encontrada o no existe!!</span></h1><a class='btn btn-outline-primary rounded-4 btn-lg' style='width: fit-content;display: block;margin: 1rem auto;' href='?view=Inicio'>Ir a inicio</a></div></div>";
    });
});
