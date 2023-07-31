const mysql = require('mysql2/promise');
const constantes = require('../../library/constantes');
const error_messages = require('../../library/errors');

// Configuração de conexão com o banco de dados MySQL
const connectionConfig = {
  host: constantes.SERVER_NAME,
  user: constantes.BD_USER,
  password: constantes.BD_PASSWORD,
  database: constantes.BD_NAME,
};


async function consultarChaves() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    const [rows, fields] = await connection.execute('SELECT api_key FROM ' + constantes.TABLE_API_KEYS);
    // console.log(rows)
    connection.end();

    // Retornar apenas os valores das chaves como um array
    return rows.map(row => row.api_key);
  } catch (error) {
    console.error(error_messages.SELECT_ERROR, error);
    return [];
  }
}

module.exports = consultarChaves;