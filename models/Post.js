import Model from "../config/Model.js";

class Post extends Model {
  nameModel = "post";
  id_usuario = ""; // id de quien lo publico
  titulo = ""; // titulo del post por este campo se va a buscar
  contenido = ""; // contenido del post
  imagenUrl = ""; // imagen de portada url
  status = "borrador"; // estados : borrador, privado, publicado
  create_date = moment().format("DD/MM/YYYY h:mm:ss a");
}

export default Post;
