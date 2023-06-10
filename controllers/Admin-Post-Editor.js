import Router from "../config/Router.js";
import Post from "../models/Post.js";

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
  post = new Post();

if (id != null) {
  post = post.findById(id);
  if (post != null) {
    document.querySelector("h1").innerHTML = "Editar Post";
    document.querySelector("input[name=titulo]").value = post.titulo;
    document.querySelector("textarea[name=contenido]").value = post.contenido;
    document.querySelector("select[name=status]").value = post.status;
    document.querySelector("input[name=imagenUrl]").value = post.imagenUrl;
  } else {
    document.querySelector("#editor").innerHTML = `
      <div class="d-flex justify-content-center align-items-center flex-column">
        <div class="alert alert-danger w-100" role="alert">
          <h4 class="alert-heading">Error!</h4>
          <p>El post no existe</p>
          <hr>
          <p class="mb-0">Vuelve a intentarlo</p>
        </div>
        <a href="?view=Admin-Post" class="btn btn-primary mt-4">Volver</a>
      </div>
    `;
  }
} else {
  let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
  post.id_usuario = currentUser.id;
}

// Esta linea activa el edictor pero es para el apartado de administrador en el que se puede editar el post
sceditor.create(document.querySelector("textarea[name=contenido]"), {
  format: "xhtml",
  style:
    "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/minified/themes/content/default.min.css",
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches("#editor")) {
    let titulo = document.querySelector("input[name=titulo]").value,
      contenido = document.querySelector("textarea[name=contenido]").value,
      status = document.querySelector("select[name=status]").value,
      imagenUrl = document.querySelector("input[name=imagenUrl]").value;

    document.querySelectorAll(".error").forEach((el) => el.remove());
    document.querySelectorAll(".is-invalid").forEach((el) => {
      el.classList.remove("is-invalid");
    });

    if (status == "Selecione un estado") {
      let error = document.createElement("p");
      error.classList.add("text-danger", "error");
      error.innerHTML = "Elija un <b>Estado</b> para el post";
      e.target.status.classList.add("is-invalid");
      e.target.status.parentElement.appendChild(error);
      return false;
    }

    if (titulo.trim() == "") {
      let error = document.createElement("p");
      error.classList.add("text-danger", "error");
      error.innerHTML = "El <b>titulo</b> es requerido";
      e.target.titulo.classList.add("is-invalid");
      e.target.titulo.parentElement.appendChild(error);
      return false;
    }

    if (imagenUrl.trim() == "") {
      let error = document.createElement("p");
      error.classList.add("text-danger", "error");
      error.innerHTML = "La <b>imagen</b> es requerida";
      e.target.imagenUrl.classList.add("is-invalid");
      e.target.imagenUrl.parentElement.appendChild(error);
      return false;
    }

    if (
      /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imagenUrl) ==
      false
    ) {
      let error = document.createElement("p");
      error.classList.add("text-danger", "error");
      error.innerHTML = "La <b>URL de la imagen</b> no es valida";
      e.target.imagenUrl.classList.add("is-invalid");
      e.target.imagenUrl.parentElement.appendChild(error);
      return false;
    }

    if (contenido.trim() == "") {
      let error = document.createElement("p");
      error.classList.add("text-danger", "error");
      error.innerHTML = "El <b>contenido</b> es requerido";
      error.style.position = "relative";
      error.style.zIndex = "10";
      e.target.contenido.classList.add("is-invalid");
      e.target.contenido.parentElement.appendChild(error);
      return false;
    }

    post.titulo = titulo;
    post.contenido = contenido;
    post.status = status;
    post.imagenUrl = imagenUrl;
    post.save();
    router.GoTo("?view=Admin-Post");
  }
});
