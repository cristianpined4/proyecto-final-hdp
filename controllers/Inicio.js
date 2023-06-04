import slideResponsive from "../config/slideResponsive.js";
import Post from "../models/Post.js";
import Usuarios from "../models/Usuarios.js";

let post = new Post(),
  posts = post.all().filter((el) => el.status == "publicado"),
  html = "";

posts = posts.sort(
  (a, b) =>
    moment(b.create_date, "DD/MM/YYYY h:mm:ss a").unix() -
    moment(a.create_date, "DD/MM/YYYY h:mm:ss a").unix()
);

posts.forEach((el, index) => {
  html += `
    <div>
        <img src="${el.imagenUrl}" alt=""> 
        <span>
            <h3>${el.titulo}</h3>
            <p>${el.contendido.substring(0, 20)}...</p>
        </span>
    </div>
    `;
  if (index == 3) return;
});
document.querySelector("#slider").innerHTML = html;

html = "";
posts.forEach((el, index) => {
  let date = moment(el.create_date, "DD/MM/YYYY h:mm:ss a").fromNow(),
    autor = new Usuarios().findById(el.id_usuario);

  console.log(autor);
  html += `
    <div class="col col-12 col-md-6 col-lg-4">
        <div class="card border shadow-3">
          <img src="${el.imagenUrl}" alt=""> 
          <div class="card-body">
            <h5 class="card-title">${el.titulo}</h5>
            <p class="d-flex justify-content-between align-items-center">
              <small class="text-muted">
                <i class="fas fa-user me-1"></i> 
                ${autor.name}
              </small>
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i> 
                ${date}
              </small>
            </p>
            <p class="card-text">${el.contendido.substring(0, 20)}...</p>
            <a href="?view=Post&post_id=${
              el.id
            }" class="btn btn-primary">Ver más</a>
          </div>
        </div>
    </div>
    `;
  if (index == 5) return;
});
document.querySelector("#last-post").innerHTML = html;

slideResponsive("#slider", { autoPlay: true, playTime: 3, isHeader: true });
