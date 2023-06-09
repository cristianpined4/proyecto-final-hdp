import Post from "../models/Post.js";
import Comentarios from "../models/Comentarios.js";
import Router from "../config/Router.js";
import sliderResponsive from "../config/slideResponsive.js";

const routes = new Router();

let id_post = routes.params.post_id;

if (id_post == null) {
  routes.GoTo("?view=error");
}
// Validar si el post existe
const post = new Post().findById(id_post);
if (post == null) {
  routes.GoTo("?view=error");
}
// Validar si el post esta publicado

let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
if (currentUser != null) {
  if (currentUser.rol != "admin") {
    if (post.status != "publicado") {
      routes.GoTo("?view=error");
    }
  }
}

document.title = document.title.replace("Post", post.titulo);

const $slider = document.querySelector("#slider");
$slider.innerHTML = `
  <div>
    <img src="${post.imagenUrl}" alt="${post.titulo}" />
    <span>
      <h2>${post.titulo}</h2>
    </span>
  </div>
`;
// Inicializar el slider
sliderResponsive("#slider", { isHeader: true });

let autor = post.findRelated("usuarios", "id", post.id_usuario)[0];
if (autor == undefined) {
  autor = "Cuenta eliminada";
} else {
  autor = autor.name;
}
// Obtener los comentarios del post
let comentarios = new Comentarios()
  .findRelated("comentarios", "id_post", post.id)
  .filter((comentario) => comentario.status == "aceptado")
  .sort(
    (a, b) =>
      moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
      moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
  );

let date = moment(post.create_date, "DD/MM/YYYY h:mm:ss a").format(
  "dddd LL, h:mm:ss a"
);
// Renderizar el post
const $post = document.querySelector(".card.post");
$post.querySelector(
  ".imagen"
).style.background = `url(${post.imagenUrl}) center center / cover no-repeat`;
$post.querySelector(".card-title").innerHTML = post.titulo;
$post.querySelector(".card-text").innerHTML = `
<p class="d-flex justify-content-between align-items-center-md flex-column flex-md-row mt-4 mb-5">
  <small class="text-muted">
    <i class="fas fa-user me-1"></i> 
    ${autor}
  </small>
  <small class="text-muted">
    <i class="fas fa-clock me-1"></i> 
    ${date}
  </small>
</p>
<div class="my-3">${post.contenido}</div>
`;
// Renderizar los comentarios
const renderComentarios = (comentarios) => {
  const $comentarios = document.querySelector(".comentarios");
  let html = "";
  if (comentarios.length == 0) {
    html = `
    <div class="alert alert-info my-3" role="alert">
      No hay comentarios.
    </div>
    `;
    $comentarios.innerHTML = html;
    return;
  }
  comentarios.forEach((el) => {
    if (el.padre == "null") {
      let autor = el.findRelated("usuarios", "id", el.id_usuario)[0];
      if (autor == undefined) {
        autor = "Cuenta eliminada";
      } else {
        autor = autor.name;
      }
      let date_post = moment(el.create_date, "DD/MM/YYYY h:mm:ss a").fromNow();
      html += `<div class="card mb-3">
          <div class="card-body">
            <h6 class="mt-0 d-flex justify-content-between align-items-center-md flex-column flex-md-row">
              <small class="text-muted mb-2">
                <i class="fas fa-user me-1"></i> 
                ${autor}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date_post}
              </small>
            </h6>
            <p>${el.comentario}</p>
            <button class="btn btn-outline-primary" data-padre="${el.id}">Responder</button>
          </div>
        </div>`;
    }
    comentarios.forEach((el2) => {
      if (el.id == el2.padre) {
        let autor2 = el2.findRelated("usuarios", "id", el2.id_usuario)[0];
        if (autor2 == undefined) {
          autor2 = "Cuenta eliminada";
        } else {
          autor2 = autor2.name;
        }
        let date_post = moment(
          el2.create_date,
          "DD/MM/YYYY h:mm:ss a"
        ).fromNow();
        html += `<div class="card ms-5 mb-3">
          <div class="card-body">
            <h6 class="mt-0 d-flex justify-content-between align-items-center-md flex-column flex-md-row">
              <small class="text-muted mb-2">
                <i class="fas fa-user me-1"></i> 
                ${autor2}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date_post}
              </small>
            </h6>
            <p>${el2.comentario}</p>
          </div>
        </div>`;
      }
    });
  });
  $comentarios.innerHTML = html;
};

renderComentarios(comentarios);
// Agregar un comentario
const $formComentario = document.querySelector(".form-comentarios");
let currentUsuario = JSON.parse(localStorage.getItem("current-user"));
if (currentUsuario == null) {
  $formComentario.innerHTML = `
    <div class="alert alert-info my-3" role="alert">
      Inicia sesión para poder comentar.
    </div>
  `;
  document
    .querySelectorAll(".comentarios .card button")
    .forEach((el) => (el.style.display = "none"));
}
if (currentUsuario != null) {
  if (currentUsuario.status == "silenciado") {
    $formComentario.innerHTML = `
    <div class="alert alert-danger my-3 role="alert">
      Tu cuenta esta silenciada, no puedes comentar.
    </div>
  `;
    document
      .querySelectorAll(".comentarios .card button")
      .forEach((el) => (el.style.display = "none"));
  } else {
    $formComentario.usuario.value = currentUsuario.name;
  }
}
// Responder un comentario
document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches(".form-comentarios")) {
    if (e.target.comentario.value.trim() == "") {
      if (e.target.querySelector(".error") != null) {
        e.target.comentario.parentNode.removeChild(
          e.target.querySelector(".error")
        );
      }
      let error = document.createElement("span");
      error.classList.add("text-danger", "error");
      error.innerHTML = "El comentario no puede estar vacio.";
      e.target.comentario.classList.add("is-invalid");
      e.target.comentario.parentNode.appendChild(error);
      return;
    }
    if (e.target.querySelector(".error") != null) {
      e.target.comentario.parentNode.removeChild(
        e.target.querySelector(".error")
      );
      e.target.comentario.classList.remove("is-invalid");
    }
    let comentario = new Comentarios();
    comentario.id_post = post.id;
    comentario.id_usuario = currentUsuario.id;
    comentario.comentario = e.target.comentario.value;
    if (currentUsuario.rol == "admin") {
      comentario.status = "aceptado";
    }
    comentario.save();
    $formComentario.reset();
    if (currentUsuario.rol == "admin") {
      comentarios = new Comentarios()
        .findRelated("comentarios", "id_post", post.id)
        .filter((comentario) => comentario.status == "aceptado")
        .sort(
          (a, b) =>
            moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
            moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
        );
      renderComentarios(comentarios);
    } else {
      $formComentario.innerHTML = `
      <div class="alert alert-success my-3" role="alert">
        Tu comentario se ha enviado correctamente, espera a que sea aceptado.
      </div>
    `;
    }
  }

  if (e.target.matches(".form-comentarios-respuesta")) {
    if (e.target.comentario.value.trim() == "") {
      if (e.target.querySelector(".error") != null) {
        e.target.comentario.parentNode.removeChild(
          e.target.querySelector(".error")
        );
      }
      let error = document.createElement("span");
      error.classList.add("text-danger", "error");
      error.innerHTML = "El comentario no puede estar vacio.";
      e.target.comentario.classList.add("is-invalid");
      e.target.comentario.parentNode.appendChild(error);
      return;
    }
    let comentario = new Comentarios();
    comentario.id_post = post.id;
    comentario.id_usuario = currentUsuario.id;
    comentario.comentario = e.target.comentario.value;
    comentario.padre = e.target.id;
    if (currentUsuario.rol == "admin") {
      comentario.status = "aceptado";
    }
    comentario.save();
    e.target.reset();
    e.target.innerHTML = `
      <div class="alert alert-success my-3" role="alert">
        Tu comentario se ha enviado correctamente, espera a que sea aceptado.
      </div>
    `;
    if (currentUsuario.rol == "admin") {
      comentarios = new Comentarios()
        .findRelated("comentarios", "id_post", post.id)
        .filter((comentario) => comentario.status == "aceptado")
        .sort(
          (a, b) =>
            moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
            moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
        );
      renderComentarios(comentarios);
    }
  }
});

document.addEventListener("click", (e) => {
  if (
    e.target.matches(".social-buttons .btn-primary") ||
    e.target.matches(".social-buttons .btn-primary > *")
  ) {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(window.location.href),
      "_blank"
    );
  }
  if (
    e.target.matches(".social-buttons .btn-info") ||
    e.target.matches(".social-buttons .btn-info > *")
  ) {
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent("¡Echa un vistazo a este contenido!") +
        "&url=" +
        encodeURIComponent(window.location.href),
      "_blank"
    );
  }
  if (
    e.target.matches(".social-buttons .btn-success") ||
    e.target.matches(".social-buttons .btn-success > *")
  ) {
    window.open(
      "https://api.whatsapp.com/send?text=" +
        encodeURIComponent("¡Echa un vistazo a este contenido!") +
        " " +
        encodeURIComponent(window.location.href),
      "_blank"
    );
  }
  if (e.target.matches(".comentarios .card button[data-padre]")) {
    if (
      e.target.parentNode.querySelector(".form-comentarios-respuesta") != null
    ) {
      e.target.parentNode.removeChild(
        e.target.parentNode.querySelector(".form-comentarios-respuesta")
      );
    }
    let form = document.createElement("form");
    form.classList.add("form-comentarios-respuesta");
    form.id = e.target.dataset.padre;
    form.innerHTML = `
    <div class="form-group mt-2">
    <div class="alert alert-info" role="alert">
      Responde a &nbsp; ${
        e.target.parentNode.querySelector("h6 small:first-child").innerHTML
      }.
    </div>
        <label for="comentario">Comentario</label>
        <textarea class="form-control" name="comentario" rows="3" placeholder="Escribe tu respuesta"></textarea>
    </div>
    <button type="submit" class="btn btn-primary mt-2">Enviar</button>
    <button class="btn btn-danger mt-2 ms-3 exit">Cancelar</button>`;
    e.target.parentNode.appendChild(form);
  }

  if (e.target.matches(".comentarios .card button.exit")) {
    e.preventDefault();
    e.target.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.querySelector("form")
    );
  }
});
