import Model from "../config/Model.js";

class Comentarios extends Model {
  nameModel = "comentarios";
  id_usuario = ""; // el usuario que hizo el comentario
  id_post = ""; // id del post al que pertence
  comentario = ""; // el texto del comentario
  status = "pendiente"; // estados : pendiente, rechazado, aceptado
  padre = "null"; // si padre tiene algo entonce se va a mostrar como un subcomentarios
  create_date = moment().format("DD/MM/YYYY h:mm:ss a");
}

export default Comentarios;
