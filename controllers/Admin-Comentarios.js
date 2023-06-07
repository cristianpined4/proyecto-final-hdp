import Post from "../models/Post.js";
import Comentario from "../models/Comentarios.js";

let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
if (currentUser != null) {
  document.querySelector("h5[data-username]").innerHTML = currentUser.name;
}

let post = new Post(),
  currentPage = 1,
  itemsPerPage = 10;

post = post
  .all()
  .sort(
    (a, b) =>
      parseInt(
        new Post().findById(b.id).findRelated("comentarios", "id_post", b.id)
          .length
      ) -
      parseInt(
        new Post().findById(a.id).findRelated("comentarios", "id_post", a.id)
          .length
      )
  );

const renderComentarios = (id) => {
  let html = "";
  let comentarios = new Post()
    .findById(id)
    .findRelated("comentarios", "id_post", id)
    .sort(
      (a, b) =>
        moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
        moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
    );
  comentarios.forEach((el) => {
    if (el.padre == "null") {
      let autor = el.findRelated("usuarios", "id", el.id_usuario)[0];
      let date_post = moment(el.create_date, "DD/MM/YYYY h:mm:ss a").fromNow();
      html += `
        <div class="card mb-3 ${
          el.status == "pendiente"
            ? "bg-warning"
            : el.status == "rechazado"
            ? "bg-danger"
            : "bg-success"
        }" style="height:130px">
          <div class="card-body">
            <h6 class="mt-0 d-flex justify-content-between align-items-center-md flex-column flex-md-row">
              <small class="text-muted mb-2">
                <i class="fas fa-user me-1"></i> 
                ${autor.name}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date_post}
              </small>
            </h6>
            <div class="d-flex justify-content-between align-items-center">
              <p>${el.comentario}</p>
              <div class="d-flex justify-content-between align-items-center">
                ${
                  el.status != "aceptado"
                    ? `<button class="btn btn-sm btn-success" data-id="${el.id}"><i class="fa-sharp fa-solid fa-circle-check"></i></button>`
                    : ""
                }
                ${
                  el.status != "rechazado"
                    ? `<button class="btn btn-sm btn-danger ms-2" data-id="${el.id}"><i class="fa-sharp fa-solid fa-circle-xmark"></i></button>`
                    : ""
                }
                <button class="btn btn-sm btn-secondary ms-2" data-id="${
                  el.id
                }"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
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
        html += `<div class="card ms-5 mb-3 ${
          el2.status == "pendiente"
            ? "bg-warning"
            : el2.status == "rechazado"
            ? "bg-danger"
            : "bg-success"
        }" style="height:130px">
          <div class="card-body">
            <h6 class="mt-0 d-flex justify-content-between align-items-center-md flex-column flex-md-row">
              <small class="text-muted mb-2">
                <i class="fas fa-user me-1"></i> 
                ${autor2.name}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date_post}
              </small>
            </h6>
            <div class="d-flex justify-content-between align-items-center">
              <p>${el2.comentario}</p>
              <div class="d-flex justify-content-between align-items-center">
                 ${
                   el2.status != "aceptado"
                     ? `<button class="btn btn-sm btn-success" data-id="${el2.id}"><i class="fa-sharp fa-solid fa-circle-check"></i></button>`
                     : ""
                 }
                ${
                  el2.status != "rechazado"
                    ? `<button class="btn btn-sm btn-danger ms-2" data-id="${el2.id}"><i class="fa-sharp fa-solid fa-circle-xmark"></i></button>`
                    : ""
                }
                <button class="btn btn-sm btn-secondary ms-2" data-id="${
                  el2.id
                }"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>`;
      }
    });
  });
  let aceptados = new Comentario()
      .all()
      .filter((el) => el.status == "aceptado").length,
    rechazados = new Comentario()
      .all()
      .filter((el) => el.status == "rechazado").length,
    pendientes = new Comentario()
      .all()
      .filter((el) => el.status == "pendiente").length;
  document.querySelector(
    ".main-content div[data-estadisticas] span[data-rechazados]"
  ).innerHTML = rechazados;
  document.querySelector(
    ".main-content div[data-estadisticas] span[data-aprobados]"
  ).innerHTML = aceptados;
  document.querySelector(
    ".main-content div[data-estadisticas] span[data-pendientes]"
  ).innerHTML = pendientes;
  return html;
};

const renderPost = (post) => {
  let startIndex = (currentPage - 1) * itemsPerPage,
    endIndex = startIndex + itemsPerPage,
    paginatedData = post.slice(startIndex, endIndex),
    html = "";
  post.some((el, index) => {
    let numero = new Post()
      .findById(el.id)
      .findRelated("comentarios", "id_post", el.id)
      .filter((lis) => lis.status == "pendiente").length;
    html += `
    <div class="accordion-item">
      <h2 class="accordion-header" id="q${el.id}">
              <button class="accordion-button collapsed" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#flush-collapseThreeX-${el.id}" aria-expanded="false" aria-controls="flush-collapseThreeX">
                <span class="badge bg-danger rounded-circle me-3">${numero}</span>
                ${el.titulo}
              </button>
            </h2>
            <div id="flush-collapseThreeX-${el.id}" class="accordion-collapse collapse" aria-labelledby="flush-headingThreeX"
              data-mdb-parent="#accordionFlushExampleX">
              <div class="accordion-body">`;

    html += renderComentarios(el.id);

    html += `
              </div>
            </div>
          </div>
        </div>
    `;
    return index == paginatedData.length;
  });
  document.getElementById("ListasPostComentarios").innerHTML = html;
};
renderPost(post);

let paginationElement = document.querySelector("nav ul.pagination"),
  totalPages = Math.ceil(post.length / itemsPerPage);
for (let i = 1; i <= totalPages; i++) {
  let li = document.createElement("li");
  li.classList.add("page-item", "mx-2");
  li.style.cursor = "pointer";
  let a = document.createElement("a");
  a.classList.add("page-link");
  a.textContent = i;
  if (i == currentPage) {
    li.classList.add("active");
  }
  li.appendChild(a);
  li.addEventListener("click", function () {
    currentPage = parseInt(this.textContent);
    document
      .querySelector("nav ul.pagination li.active")
      .classList.remove("active");
    this.classList.add("active");
    document.scrollingElement.scrollTop = 0;
    renderPost(post);
  });

  paginationElement.appendChild(li);
}

document.addEventListener("click", (e) => {
  if (
    e.target.matches("#ListasPostComentarios button.btn-success") ||
    e.target.matches("#ListasPostComentarios button.btn-success > *")
  ) {
    let id = e.target.dataset.id || e.target.parentElement.dataset.id,
      comentario = new Comentario().findById(id);
    comentario.status = "aceptado";
    comentario.update();
    document.querySelector(
      `#ListasPostComentarios #flush-collapseThreeX-${comentario.id_post} .accordion-body`
    ).innerHTML = renderComentarios(comentario.id_post);
    let numero = new Post()
      .findById(comentario.id_post)
      .findRelated("comentarios", "id_post", comentario.id_post)
      .filter((lis) => lis.status == "pendiente").length;
    document.querySelector(
      `#q${comentario.id_post} button span.badge.bg-danger.rounded-circle`
    ).innerHTML = numero;
  }
  if (
    e.target.matches("#ListasPostComentarios button.btn-danger") ||
    e.target.matches("#ListasPostComentarios button.btn-danger > *")
  ) {
    let id = e.target.dataset.id || e.target.parentElement.dataset.id,
      comentario = new Comentario().findById(id);
    comentario.status = "rechazado";
    comentario.update();
    document.querySelector(
      `#ListasPostComentarios #flush-collapseThreeX-${comentario.id_post} .accordion-body`
    ).innerHTML = renderComentarios(comentario.id_post);
    let numero = new Post()
      .findById(comentario.id_post)
      .findRelated("comentarios", "id_post", comentario.id_post)
      .filter((lis) => lis.status == "pendiente").length;
    document.querySelector(
      `#q${comentario.id_post} span.badge.bg-danger.rounded-circle`
    ).innerHTML = numero;
  }
  if (
    e.target.matches("#ListasPostComentarios button.btn-secondary") ||
    e.target.matches("#ListasPostComentarios button.btn-secondary > *")
  ) {
    let id = e.target.dataset.id || e.target.parentElement.dataset.id,
      comentario = new Comentario().findById(id),
      padre = comentario.padre;

    if (padre == "null") {
      let comentariosHijos = comentario.findRelated("comentarios", "padre", id);
      comentariosHijos.forEach((el) => {
        el.delete();
      });
    }
    comentario.delete();
    document.querySelector(
      `#ListasPostComentarios #flush-collapseThreeX-${comentario.id_post} .accordion-body`
    ).innerHTML = renderComentarios(comentario.id_post);
    let numero = new Post()
      .findById(comentario.id_post)
      .findRelated("comentarios", "id_post", comentario.id_post)
      .filter((lis) => lis.status == "pendiente").length;
    document.querySelector(
      `#q${comentario.id_post} span.badge.bg-danger.rounded-circle`
    ).innerHTML = numero;
  }
});
