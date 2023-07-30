// userController.js
const dbConnection = require("../../library/dbConnection");
const constantes = require("../../library/constantes.js");

const UserController = {
  createUser: (req, res) => {
    const { nome, email, idade } = req.body;
    // console.log(req)

    // Aqui você teria a lógica para salvar os dados no banco de dados usando SQL
    const insertQuery = `INSERT INTO ` + constantes.TABLE_USERS +` (nome, email, idade) VALUES (?, ?, ?)`;
    const values = [nome, email, idade];
    
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

module.exports = UserController;