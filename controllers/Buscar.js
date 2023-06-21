import slideResponsive from "../config/slideResponsive.js"; // Importamos la función slideResponsive
import Post from "../models/Post.js"; // Importamos la clase Post
import Usuarios from "../models/Usuarios.js"; // Importamos la clase Usuarios
import Router from "../config/Router.js"; // Importamos la clase Router

const stripHtmlTags = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "").substring(0, 100);
};

let post = new Post(),
  posts = post.all().filter((el) => el.status == "publicado"),
  html = "",
  currentPage = 1,
  itemsPerPage = 9;

let currentUser = JSON.parse(localStorage.getItem("current-user")) || null;
if (currentUser != null) {
  if (currentUser.rol == "admin") {
    posts = post.all().filter((el) => el.status != "borrador");
  }
}

posts = posts.sort(
  (a, b) =>
    moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
    moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
);

let imagenHeader = posts[0].imagenUrl || "./assets/525105-Among-Trees.png";

html += `
  <div>
      <img src="${imagenHeader}" alt=""> 
      <span>
          <h2>Buscador</h2>
      </span>
  </div>
  `;
document.querySelector("#slider").innerHTML = html;

slideResponsive("#slider", { autoPlay: true, playTime: 3, isHeader: true });

const router = new Router();
let query = router.params.query || null;

if (query != null) {
  query = decodeURIComponent(query);
  posts = posts.filter((el) => {
    let resTitulo = el.titulo.toLowerCase().includes(query.toLowerCase()),
      resContenido = el.contenido.toLowerCase().includes(query.toLowerCase());

    return resTitulo || resContenido;
  });
} else {
  posts = [];
  query = "";
}

document.querySelector("h1").innerHTML = `Resultados para: ${query}`;

const renderPosts = (post) => {
  let startIndex = (currentPage - 1) * itemsPerPage,
    endIndex = startIndex + itemsPerPage,
    paginatedData = posts.slice(startIndex, endIndex);

  html = "";
  paginatedData.some((el, index) => {
    let date = moment(el.create_date, "DD/MM/YYYY h:mm:ss a").fromNow(),
      autor = new Usuarios().findById(el.id_usuario);

    if (autor == undefined) {
      autor = "Cuenta eliminada";
    } else {
      autor = autor.name;
    }

    html += `
    <div class="col col-12 col-md-6 col-lg-4">
        <div class="card border shadow-3">
          <img src="${el.imagenUrl}"> 
          <div class="card-body">
            <h5 class="card-title">${el.titulo}</h5>
            <p class="d-flex justify-content-between align-items-center-md flex-column flex-md-row">
              <small class="text-muted">
                <i class="fas fa-user me-1"></i> 
                ${autor}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date}
              </small>
            </p>
            <p class="card-text">${stripHtmlTags(el.contenido)}...</p>
            <a href="?view=Post&post_id=${
              el.id
            }" class="btn btn-primary">Ver más</a>
          </div>
        </div>
    </div>
    `;
    return index == paginatedData.length;
  });
  if (html == "")
    html = `<h3 class="text-center text-danger">No se encontraron resultados</h3>
    <a href="?view=Inicio" class="btn btn-outline-primary" style="display: block;margin: 2rem auto;width: auto;">Volver a inicio</a>`;
  document.querySelector("#resultados").innerHTML = html;
};

renderPosts(post);

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
    renderPosts();
  });

  paginationElement.appendChild(li);
}
