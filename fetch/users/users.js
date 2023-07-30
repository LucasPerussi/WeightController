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

async function getAllUsers() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    const [rows, fields] = await connection.execute('SELECT nome, email, idade FROM ' + constantes.TABLE_USERS);
    connection.end();

    // Retornar apenas os valores das chaves como um array
    return rows.map(row => row.nome);
  } catch (error) {
    console.error(error_messages.SELECT_ERROR, error);
    return [];
  }
}

async function getUserById(id) {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    const [rows, fields] = await connection.execute('SELECT id, nome, email, idade FROM ' + constantes.TABLE_USERS + ' WHERE id = ?', [id]);
    connection.end();

    // Verificar se um usuário com o ID especificado foi encontrado
    if (rows.length === 0) {
      return null; // Se não for encontrado nenhum usuário com o ID, retornar null
    }

    return rows[0]; // Retorna o primeiro (e único) usuário encontrado com o ID
  } catch (error) {
    console.error(error_messages.SELECT_ERROR, error);
    return null;
  }
}

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
};







