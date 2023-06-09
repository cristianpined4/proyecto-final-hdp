import slideResponsive from "../config/slideResponsive.js";
import Post from "../models/Post.js";
import Usuarios from "../models/Usuarios.js";

const stripHtmlTags = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "").substring(0, 20);
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

html += `
  <div>
      <img src="${posts[0].imagenUrl}" alt=""> 
      <span>
          <h2>Blog</h2>
      </span>
  </div>
  `;
document.querySelector("#slider").innerHTML = html;

const renderPosts = () => {
  let startIndex = (currentPage - 1) * itemsPerPage,
    endIndex = startIndex + itemsPerPage,
    paginatedData = posts.slice(startIndex, endIndex);

  html = "";
  paginatedData.some((el, index) => {
    let date = moment(el.create_date, "DD/MM/YYYY h:mm:ss a").fromNow(),
      autor = new Usuarios().findById(el.id_usuario);

    html += `
    <div class="col col-12 col-md-6 col-lg-4">
        <div class="card border shadow-3">
          <img src="${el.imagenUrl}" alt=""> 
          <div class="card-body">
            <h5 class="card-title">${el.titulo}</h5>
            <p class="d-flex justify-content-between align-items-center-md flex-column flex-md-row">
              <small class="text-muted">
                <i class="fas fa-user me-1"></i> 
                ${autor.name}
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
  document.querySelector("#last-post").innerHTML = html;
};

renderPosts();

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

slideResponsive("#slider", { autoPlay: true, playTime: 3, isHeader: true });
