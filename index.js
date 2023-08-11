const express = require("express");
const server = express();

const validarChave = require('./middlewares/validarChaveMiddleware.js');
const { criarOuRecuperarSessao } = require('./middlewares/sessoes');
const constantes = require('./library/constantes.js');

// Rota de exceção que não será afetada pela validação de chave
server.get("/health", (req, res) => {
  res.send(JSON.stringify({
    status: 200,
    message: "API Online. Lucas Perussi manda um abraço! :)",
  }));
});

server.use(async (req, res, next) => {
  const codigoSessao = req.header('session-key');
  if (codigoSessao) {
    req.sessao = await criarOuRecuperarSessao(codigoSessao);

    // Após carregar aguardar a função, ficam disponíveis essas variaveis de sessão
    const permissions =  req.sessao.roleId;
    const userId =  req.sessao.id;
    const userEmail =  req.sessao.email;
    const role =  req.sessao.role;
    const username =  req.sessao.username;

  }
  next();
});

// Aplicar o middleware de autenticação em todas as outras rotas
server.use(validarChave);

// Importar as rotas de routes.js
const routes = require("./routes/routes.js");

// Usar as rotas de routes.js
server.use("/", routes);

server.listen(3500, () => {
  console.log('Welcome to Weight Control API by Lucas Perussi');
});











// const express = require("express");
// const server = express();

// const validarChave = require('./middlewares/validarChaveMiddleware.js');
// const { criarOuRecuperarSessao } = require('./middlewares/sessoes');
// const constantes = require('./library/constantes.js');

// // Aplicar o middleware de autenticação em todas as rotas 
// server.use(validarChave);

// server.use(async (req, res, next) => {
//   const codigoSessao = req.header('session-key');

//   if (codigoSessao) {
//     req.sessao = await criarOuRecuperarSessao(codigoSessao);

//     // Após carregar aguardar a função, ficam disponíveis essas variaveis de sessão
//     const permissions =  req.sessao.roleId;
//     const userId =  req.sessao.id;
//     const userEmail =  req.sessao.email;
//     const role =  req.sessao.role;
//     const username =  req.sessao.username;

//   }
//   next();
// });

// // Import the routes from routes.js
// const routes = require("./routes/routes.js");


// // Use the routes from routes.js
// server.use("/", routes);

// server.listen(3500, () => {
//   console.log('Welcome to Weight Control API by Lucas Perussi');
// });