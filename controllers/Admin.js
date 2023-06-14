import Usuarios from "../models/Usuarios.js";
import Post from "../models/Post.js";
import Comentarios from "../models/Comentarios.js";

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

const users = new Usuarios(),
  activos = users.all().filter((user) => user.status == "activo"),
  silenciados = users.all().filter((user) => user.status == "silenciado"),
  card = document.querySelector(".card.usuarios");

card.querySelector("span[data-activos]").innerHTML =
  activos.length == 1 ? "1 usuario" : `${activos.length} usuarios`;
card.querySelector("span[data-silenciados]").innerHTML =
  silenciados.length == 1 ? "1 usuario" : `${silenciados.length} usuarios`;

const posts = new Post(),
  publicaciones = posts.all().filter((post) => post.status == "publicado"),
  borradores = posts.all().filter((post) => post.status == "borrador"),
  privados = posts.all().filter((post) => post.status == "privado"),
  card2 = document.querySelector(".card.posts");

card2.querySelector("span[data-publicados]").innerHTML =
  publicaciones.length == 1 ? "1 post" : `${publicaciones.length} posts`;
card2.querySelector("span[data-borradores]").innerHTML =
  borradores.length == 1 ? "1 post" : `${borradores.length} posts`;
card2.querySelector("span[data-privados]").innerHTML =
  privados.length == 1 ? "1 post" : `${privados.length} posts`;

const comentarios = new Comentarios(),
  aprobados = comentarios
    .all()
    .filter((comentario) => comentario.status == "aceptado"),
  pendientes = comentarios
    .all()
    .filter((comentario) => comentario.status == "pendiente"),
  rechazados = comentarios
    .all()
    .filter((comentario) => comentario.status == "rechazado"),
  card3 = document.querySelector(".card.comentarios");

card3.querySelector("span[data-aprobados]").innerHTML =
  aprobados.length == 1 ? "1 comentario" : `${aprobados.length} comentarios`;
card3.querySelector("span[data-pendientes]").innerHTML =
  pendientes.length == 1 ? "1 comentario" : `${pendientes.length} comentarios`;
card3.querySelector("span[data-rechazados]").innerHTML =
  rechazados.length == 1 ? "1 comentario" : `${rechazados.length} comentarios`;

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
