const express = require("express");
const server = express();

// Middleware para verificar a chave válida no header da requisição
const validarChave = require('./middlewares/validarChaveMiddleware.js');

// constantes
const constantes = require('./library/constantes.js');

// Aplicar o middleware de autenticação em todas as rotas que você deseja proteger
server.use(validarChave);

server.get("/", (req, res) => {
  return res.json({ mensagem: "Nossa API está funcionando" });
});

server.get("/usuarios", (req, res) => {
  return res.json({
    usuario: "Lucassss",
    tamanhoDoPau: 23424,
    demoraPraGozar: 0,
  });
});

server.get("/filmes", (req, res) => {
//   return res.json(filmes);
console.log("oier")
});

server.get("/usuario", (req, res) => {
  return res.json({
    usuario: "Lucas Perussiiiiii",
    tamanhoDoPau: 33333,
    demoraPraGozar: 0,
  });
});

server.listen(3500, () => {
    console.log('Welcome to Weight Control API by Lucas Perussi' + constantes.BASE_URL);
});