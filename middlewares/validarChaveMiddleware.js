const constantes = require('../library/constantes');
const consultarChaves = require('../controller/api_keys/keyController');


// Função para verificar se a chave fornecida está presente na lista de chaves válidas
async function validarChave(req, res, next) {
  const chave = req.headers["api_identifier"];

  try {
    // Obter a lista de chaves válidas do banco de dados
    const chavesValidas = await consultarChaves();

    // Verifique se a chave é válida (se está na lista de chaves válidas)
    if (chavesValidas.includes(chave)) {
      // Se a chave for válida, continue para a próxima rota
      next();
    } else {
      // Se a chave não for válida, retorne um erro de não autorizado (401)
      res.status(401).json({ mensagem: "Acesso não autorizado. Entre em contato para obter uma chave válida. " });
    }
  } catch (error) {
    // Em caso de erro ao consultar o banco de dados, retorne um erro interno (500)
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = validarChave;
