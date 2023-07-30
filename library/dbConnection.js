const mysql = require("mysql2");
const constantes = require("./constantes");


const dbConnection = mysql.createPool({
  host: constantes.SERVER_NAME,
    user: constantes.BD_USER,
    password: constantes.BD_PASSWORD,
    database: constantes.BD_NAME,
  });

module.exports = dbConnection;