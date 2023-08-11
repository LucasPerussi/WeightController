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
    const [rows, fields] = await connection.execute('SELECT * FROM ' + constantes.TABLE_USERS);
    connection.end();

    // Mapear cada linha para um objeto e retornar um array de objetos (JSON)
    return rows.map(row => ({
      id: row.usr_id,
      username: row.usr_user,
      role: row.usr_role,
      nome: row.usr_name,
      sobrenome: row.usr_last_name,
      email: row.usr_email,
      idade: row.usr_idade,
      picture: row.usr_picture,
      sexo: row.usr_sex,
      birthday: row.usr_born_date,
      peso: row.usr_weight,
      altura: row.usr_height,
      // Adicione outras colunas aqui, se houver mais informações
    }));
  } catch (error) {
    console.error(error_messages.SELECT_ERROR, error);
    return [];
  }
}

async function getUserById(id) {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    const [rows, fields] = await connection.execute('SELECT * from ' + constantes.TABLE_USERS + ' WHERE usr_id = ?', [id]);
    connection.end();

    // Verificar se um usuário com o ID especificado foi encontrado
    if (rows.length === 0) {
      return null; // Se não for encontrado nenhum usuário com o ID, retornar null
    }

    // return rows[0]; // Retorna o primeiro (e único) usuário encontrado com o ID
    return rows.map(row => ({
      id: row.usr_id,
      username: row.usr_user,
      role: row.usr_role,
      nome: row.usr_name,
      sobrenome: row.usr_last_name,
      email: row.usr_email,
      picture: row.usr_picture,
      sexo: row.usr_sex,
      idade: row.usr_idade,
      birthday: row.usr_born_date,
      peso: row.usr_weight,
      altura: row.usr_height,
      // Adicione outras colunas aqui, se houver mais informações
    }));
  } catch (error) {
    console.error(error_messages.SELECT_ERROR, error);
    return null;
  }
}

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
};







