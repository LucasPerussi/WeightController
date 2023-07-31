const mysql = require('mysql2/promise');
const constantes = require('../../library/constantes');
const error_messages = require('../../library/errors');
const dbConnection = require("../../library/dbConnection");

const KeyController = {
  createKey: (req, res) => {
    const { user } = req.body;

    // gerar código aleatorio para servir como chave
    const crypto = require('crypto');
    
    function gerarCodigoAleatorio(tamanho) {
      return crypto.randomBytes(tamanho).toString('hex');
    }
    const codigoAleatorio = gerarCodigoAleatorio(20);

    // console.log('Código Aleatório:', codigoAleatorio);
    // fim da geracao do codigo

  
    const insertQuery = `INSERT INTO ` + constantes.TABLE_API_KEYS +` (api_user, api_key) VALUES (?, ?)`;
    const values = [user, codigoAleatorio];
    
    dbConnection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Erro ao salvar usuário no banco de dados:", err);
        return res.status(500).json({ error: "Erro ao salvar usuário no banco de dados", err });
      }
      return res.json({ key: codigoAleatorio, user });
    });
  },
};

module.exports = KeyController;
