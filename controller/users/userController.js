// userController.js
const dbConnection = require("../../library/dbConnection");
const constantes = require("../../library/constantes.js");
const bcrypt = require("bcrypt");
const usersModel = require("../../model/users/users");
const saltRounds = 10; // Número de rounds de salt (recomendado entre 10 e 12)
const mysql = require("mysql2/promise");

// Configuração de conexão com o banco de dados MySQL
const connection = mysql.createPool({
  host: constantes.SERVER_NAME,
  user: constantes.BD_USER,
  password: constantes.BD_PASSWORD,
  database: constantes.BD_NAME,
});

function criptografarSenha(senha) {
  return bcrypt.hashSync(senha, saltRounds);
}

function createUsername(nome, sobrenome) {
  const dataAtual = new Date();
  const dia = dataAtual.getDate(); // Dia do mês (1 a 31)
  const mes = dataAtual.getMonth() + 1; // Mês (0 a 11), adicione 1 para obter o mês de 1 a 12
  const ano = dataAtual.getFullYear(); // Ano com quatro dígitos
  const hora = dataAtual.getHours(); // Hora (0 a 23)
  const user = nome + "-" + sobrenome + dia + mes + hora;
  // remover espacos em branco dentro da string
  const semEspacos = user.replace(/\s/g, "");
  return semEspacos;
}

const UserController = {
  
  createUser: async (req, res) => {
    const {
      nome,
      sobrenome,
      email,
      idade,
      password,
      picture,
      sex,
      birthday,
      weight,
      height,
    } = req.body;
  
    const username = createUsername(nome, sobrenome);
    const senhaCriptografada = criptografarSenha(password);
  
    try {
      const newUser = await usersModel.insertUser(
        nome,
        sobrenome,
        email,
        idade,
        senhaCriptografada,
        picture,
        sex,
        birthday,
        weight,
        height,
        username
      );
  
      return res.json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário :", error);
      return res.status(500).json({ error: "Erro ao criar usuário. ", code: error.code });
    }
  },
  
  loginUser: async (email, password) => {
    try {
      // Encontrar o usuário no banco de dados
      const users = await usersModel.getUserByEmail(email);

      if (users.length === 0) {
        return { success: false, message: "Usuário não encontrado" };
      }
      const user = users;
      // Comparar a senha fornecida com a senha armazenada usando Bcrypt
      const passwordMatch = await bcrypt.compare(password, user.usr_password);

      if (!passwordMatch) {
        return { success: false, message: "Credenciais inválidas" };
      }
      // Criar Session e salvar no banco
      const crypto = require("crypto");

      function gerarCodigoAleatorio(tamanho) {
        return crypto.randomBytes(tamanho).toString("hex");
      }
      const codigoAleatorio = gerarCodigoAleatorio(25);

      const insertSession =
        `INSERT INTO ` +
        constantes.TABLE_LOGINS +
        ` (ses_key, ses_user) VALUES (?,?)`;
      const values = [codigoAleatorio, user.usr_id];

      dbConnection.query(insertSession, values, (err, results) => {
        if (err) {
          console.error("Erro ao session no banco de dados:", err);
          return { success: false, message: "Erro ao gerar session key" };
        }
      });

      // Fim das operacoes de session

      return {
        success: true,
        message: "Login bem-sucedido",
        session: codigoAleatorio,
        user: user,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro no servidor" };
    }
  },
};

module.exports = UserController;
