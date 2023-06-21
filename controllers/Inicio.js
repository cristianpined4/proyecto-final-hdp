import slideResponsive from "../config/slideResponsive.js"; // Importamos la función slideResponsive
import Post from "../models/Post.js"; // Importamos la clase Post
import Usuarios from "../models/Usuarios.js"; // Importamos la clase Usuarios

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
  html = "";

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

posts.some((el, index) => {
  html += `
    <div>
        <img src="${el.imagenUrl}" alt=""> 
        <span>
            <h3>${el.titulo}</h3>
            <p>${stripHtmlTags(el.contenido)}...</p>
        </span>
    </div>
    `;
  return index == 2;
});

document.querySelector("#slider").innerHTML = html;

html = "";
posts.some((el, index) => {
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
          <img src="${el.imagenUrl}" alt=""> 
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
  return index == 5;
});
document.querySelector("#last-post").innerHTML = html;

slideResponsive("#slider", { autoPlay: true, playTime: 3, isHeader: true });
