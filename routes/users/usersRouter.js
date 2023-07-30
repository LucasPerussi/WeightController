const express = require("express");
const router = express.Router();
const usersController = require("../../controller/users/userController");
const fetch = require('../../fetch/users/users')


// Resto do código...

router.get("/getAll", async (req, res) => {
  try {
    const users = await fetch.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao obter usuários." });
  }
});

router.get("/getById/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await fetch.getUserById(userId);

    if (user === null) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao obter usuário." });
  }
});


router.get("/", (req, res) => {
  return res.json({ mensagem: "Nossa API de usuários está funcionando" });
});

router.get("/profile", (req, res) => {
    return res.json({ Nome: "Lucas Perussi" });
});

router.post("/new", express.json(), (req, res) => {
  // Lógica para salvar o usuário no banco de dados
  UserController.createUser(req, res);
});

module.exports = router;
