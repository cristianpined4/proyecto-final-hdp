import Post from "../models/Post.js";
import Comentarios from "../models/Comentarios.js";
import Router from "../config/router.js";
import sliderResponsive from "../config/slideResponsive.js";

const routes = new Router();

let id_post = routes.params.post_id;

if (id_post == null) {
  routes.GoTo("?view=error");
}

const post = new Post().findById(id_post);
if (post == null) {
  routes.GoTo("?view=error");
}

const $slider = document.querySelector("#slider");
$slider.innerHTML = `
  <div>
    <img src="${post.imagenUrl}" alt="${post.titulo}" />
    <span>
      <h2>${post.titulo}</h2>
    </span>
  </div>
`;
sliderResponsive("#slider", { isHeader: true });

const autor = post.findRelated("usuarios", "id", post.id_usuario)[0];

let comentarios = new Comentarios()
  .findRelated("comentarios", "id_post", post.id)
  .filter((comentario) => comentario.status == "aceptado");

let date = moment(post.create_date, "DD/MM/YYYY h:mm:ss a").format("LLLL");

const $post = document.querySelector(".card.post");
$post.querySelector("img").src = post.imagenUrl;
$post.querySelector("img").alt = post.titulo;
$post.querySelector(".card-title").innerHTML = post.titulo;
$post.querySelector(".card-text").innerHTML = `
<p class="d-flex justify-content-between align-items-center my-3">
  <small class="text-muted">
    <i class="fas fa-user me-1"></i> 
    ${autor.name}
  </small>
  <small class="text-muted">
    <i class="fas fa-clock me-1"></i> 
    ${date}
  </small>
</p>
<div class="my-3">${post.contenido}</div>
`;

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
      let date_post = moment(el.create_date, "DD/MM/YYYY h:mm:ss a").fromNow();
      html += `<div class="card mb-3">
          <div class="card-body">
            <h5 class="mt-0 d-flex justify-content-between">
              <small class="text-muted">
                <i class="fas fa-user me-1"></i> 
                ${autor.name}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date_post}
              </small>
            </h5>
            <p>${el.comentario}</p>
            <button class="btn btn-outline-primary" data-padre="${el.id}">Responder</button>
          </div>
        </div>`;
    }
    comentarios.forEach((el2) => {
      if (el.id == el2.padre) {
        let autor2 = el2.findRelated("usuarios", "id", el2.id_usuario)[0];
        let date_post = moment(
          el2.create_date,
          "DD/MM/YYYY h:mm:ss a"
        ).fromNow();
        html += `<div class="card ms-5 mb-3">
          <div class="card-body">
            <h5 class="mt-0 d-flex justify-content-between">
              <small class="text-muted">
                <i class="fas fa-user me-1"></i> 
                ${autor2.name}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date_post}
              </small>
            </h5>
            <p>${el2.comentario}</p>
          </div>
        </div>`;
      }
    });
  });
  $comentarios.innerHTML = html;
};

renderComentarios(comentarios);

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
if (currentUsuario.status == "bloqueado") {
  $formComentario.innerHTML = `
    <div class="alert alert-danger my-3 role="alert">
      Tu cuenta esta silenciada, no puedes comentar.
    </div>
  `;
  document
    .querySelectorAll(".comentarios .card button")
    .forEach((el) => (el.style.display = "none"));
}
if (currentUsuario.status == "activo") {
  $formComentario.usuario.value = currentUsuario.name;
}

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
        .filter((comentario) => comentario.status == "aceptado");
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
        .filter((comentario) => comentario.status == "aceptado");
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
      Responde a este comentario de &nbsp; ${
        e.target.parentNode.querySelector("h5 small:first-child").innerHTML
      }.
    </div>
        <label for="comentario">Comentario</label>
        <textarea class="form-control" name="comentario" rows="3" placeholder="Escribe tu comentario"></textarea>
    </div>
    <button type="submit" class="btn btn-primary mt-2">Enviar
            comentario</button>
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
