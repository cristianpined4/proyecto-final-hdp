import Usuarios from "../models/Usuarios.js";
import Comentarios from "../models/Comentarios.js";

let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
if (currentUser != null) {
  document.querySelector("h5[data-username]").innerHTML = currentUser.name;
}

let users = new Usuarios().all(),
  currentPage = 1,
  itemsPerPage = 10;

const renderUsuarios = (users) => {
  let startIndex = (currentPage - 1) * itemsPerPage,
    endIndex = startIndex + itemsPerPage,
    paginatedData = users.slice(startIndex, endIndex),
    html = "";
  if (users.length == 0) {
    html += `
      <div class="col-12">
        <div class="alert alert-warning" role="alert">
          No hay usuarios registrados
        </div>
      </div>
      `;
  }
  users.some((el, index) => {
    html += `
      <div class="card mb-3">
      <div class="card-body d-flex justify-content-between align-items-center border-bottom border-dark flex-wrap flex-md-nowrap">
        <div class="info my-2">
            <h5 class="card-title pe-2">${
              el.name
            } - <span class="text-muted">@${
      el.username
    }</span> - <span class="text-muted text-capitalize">${el.status}</span></h5>
            <h6 class="card-subtitle my-2 text-muted">Rol: <span class="text-capitalize">${
              el.rol
            } - </span> Creado: ${el.create_date}</h6>
        </div>
        <div class="option">
          <a href="?view=Admin-Usuarios-Editor&id=${
            el.id
          }" class="btn btn-warning btn-sm">
            <i class="fas fa-edit"></i>
          </a>
          ${
            currentUser.id != el.id
              ? `<button class="btn btn-danger btn-sm delete" data-id="${el.id}">
            <i class="fas fa-trash-alt"></i>
          </button>`
              : ""
          }
          ${
            el.rol == "admin"
              ? ""
              : `<button class="btn btn-sm btn-info" data-id="${
                  el.id
                }" title="${
                  el.status == "activo"
                    ? "Silenciar Usuario"
                    : "Desilenciar Usuario"
                }">
                  <i class="fa-solid ${
                    el.status == "activo"
                      ? "fa-head-side-cough"
                      : "fa-head-side-cough-slash"
                  }"></i>
                </button>`
          }
        </div>
      </div>
      </div>
    `;
    return index == paginatedData.length;
  });
  document.getElementById("ListasUsuarios").innerHTML = html;
  let activos = users.filter((el) => el.status == "activo").length,
    silenciado = users.filter((el) => el.status == "silenciado").length;

  document.querySelector(
    ".main-content div[data-estadisticas] span[data-activos]"
  ).innerHTML = activos;
  document.querySelector(
    ".main-content div[data-estadisticas] span[data-silenciado]"
  ).innerHTML = silenciado;
};
renderUsuarios(users);

let paginationElement = document.querySelector("nav ul.pagination"),
  totalPages = Math.ceil(users.length / itemsPerPage);
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
    renderUsuarios(new Usuarios().all());
  });

  paginationElement.appendChild(li);
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

  if (
    e.target.matches("button.delete") ||
    e.target.matches("button.delete *")
  ) {
    let id = e.target.dataset.id || e.target.parentElement.dataset.id;
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      let del = new Usuarios().findById(id);
      del.delete();
      alert("Usuario eliminado correctamente");
      renderUsuarios(del.all());
    }
  }

  if (
    e.target.matches("#ListasUsuarios button.btn-info") ||
    e.target.matches("#ListasUsuarios button.btn-info > *")
  ) {
    if (confirm("¿Desea cambiar el estado del usuario?")) {
      let id = e.target.dataset.id || e.target.parentElement.dataset.id,
        usuario = new Usuarios().findById(id);
      usuario.status = usuario.status == "activo" ? "silenciado" : "activo";
      usuario.update();
      renderUsuarios(new Usuarios().all());
      if (currentUser.id == usuario.id) {
        localStorage.setItem("current-user", JSON.stringify(usuario));
      }
      alert("Se ha cambiado el estado del usuario a " + usuario.status);
    }
  }
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
