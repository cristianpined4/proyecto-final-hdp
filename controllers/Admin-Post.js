import Post from "../models/Post.js";

let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
if (currentUser != null) {
  document.querySelector("h5[data-username]").innerHTML = currentUser.name;
}

let posts = new Post().all(),
  currentPage = 1,
  itemsPerPage = 10;

posts = posts.sort(
  (a, b) =>
    moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
    moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
);

const renderPost = (post) => {
  let startIndex = (currentPage - 1) * itemsPerPage,
    endIndex = startIndex + itemsPerPage,
    paginatedData = post.slice(startIndex, endIndex),
    html = "";
  if (post.length == 0) {
    html += `
      <div class="col-12">
        <div class="alert alert-warning" role="alert">
          No hay publicaciones
        </div>
      </div>
      `;
  }
  post.some((el, index) => {
    html += `
      <div class="card mb-3">
      <div class="card-body d-flex justify-content-between align-items-center border-bottom border-dark">
        <div class="info">
            <h5 class="card-title">${el.titulo} ${
      el.status != "publicado"
        ? ` - <span class="text-muted text-capitalize">${el.status}</span>`
        : ""
    }</h5>
            <h6 class="card-subtitle mb-2 text-muted">Creado: ${
              el.create_date
            }</h6>
        </div>
        <div class="option">
          <a href="?view=Post&post_id=${
            el.id
          }" class="btn btn-primary btn-sm" target="_blank">
            <i class="fas fa-eye"></i>
          </a>
          <a href="?view=Admin-Post-Editor&id=${
            el.id
          }" class="btn btn-warning btn-sm">
            <i class="fas fa-edit"></i>
          </a>
          <button class="btn btn-danger btn-sm delete" data-id="${el.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      </div>
    `;
    return index == paginatedData.length;
  });
  document.getElementById("ListasPost").innerHTML = html;
  let publicados = new Post()
      .all()
      .filter((el) => el.status == "publicado").length,
    borradores = new Post()
      .all()
      .filter((el) => el.status == "borrador").length,
    privados = new Post().all().filter((el) => el.status == "privado").length;

  document.querySelector(
    ".main-content div[data-estadisticas] span[data-privados]"
  ).innerHTML = privados;
  document.querySelector(
    ".main-content div[data-estadisticas] span[data-borradores]"
  ).innerHTML = borradores;
  document.querySelector(
    ".main-content div[data-estadisticas] span[data-publicados]"
  ).innerHTML = publicados;
};
renderPost(posts);

let paginationElement = document.querySelector("nav ul.pagination"),
  totalPages = Math.ceil(posts.length / itemsPerPage);
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
    if (confirm("¿Estás seguro de eliminar esta publicación?")) {
      let del = new Post().findById(id);
      del.delete();
      renderPost(
        del
          .all()
          .sort(
            (a, b) =>
              moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
              moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
          )
      );
    }
  }
});
