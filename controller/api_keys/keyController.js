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


const keyController = {
  createKey: (req, res) => {
    const { user } = req.body;
    // console.log(req)

    const crypto = require('crypto');

    function gerarCodigoAleatorio(tamanho) {
      return crypto.randomBytes(tamanho).toString('hex');
    }

    // Gerar código aleatório de 20 caracteres
    const codigoAleatorio = gerarCodigoAleatorio(20);

    console.log('Código Aleatório:', codigoAleatorio);

    // Aqui você teria a lógica para salvar os dados no banco de dados usando SQL
    const insertQuery = `INSERT INTO ` + constantes.TABLE_API_KEYS +` (api_user, api_key) VALUES (?, ?, ?)`;
    const values = [nome, codigoAleatorio];
    
    dbConnection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Erro ao salvar usuário no banco de dados:", err);
        return res.status(500).json({ error: "Erro ao salvar usuário no banco de dados", err });
      }

      const newUserId = results.insertId;
      return res.json({ id: newUserId, nome, email, idade });
    });
  },
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