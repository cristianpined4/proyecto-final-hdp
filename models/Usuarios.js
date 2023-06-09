import Model from "../config/Model.js";

class Usuarios extends Model {
  nameModel = "usuarios";
  username = ""; // nombre de usuarios
  password = ""; // contrasena
  email = ""; // email
  name = ""; // nombre
  status = "activo"; // activo o silenciado
  rol = "usuario"; // usuario o admin
  create_date = moment().format("DD/MM/YYYY h:mm:ss a");
}

export default Usuarios;
