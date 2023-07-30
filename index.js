const express = require("express");
const server = express();

// Middleware para verificar a chave válida no header da requisição
const validarChave = require('./middlewares/validarChaveMiddleware.js');

// constantes
const constantes = require('./library/constantes.js');

// Aplicar o middleware de autenticação em todas as rotas que você deseja proteger
server.use(validarChave);


// Import the routes from routes.js
const routes = require("./routes/routes.js");


// Use the routes from routes.js
server.use("/", routes);

server.listen(3500, () => {
  console.log('Welcome to Weight Control API by Lucas Perussi');
});