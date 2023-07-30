const express = require("express");
const router = express.Router();
const keyController = require("../../controller/api_keys/keyController");
const fetch = require('../../fetch/keys/keys')


// Resto do código...

router.get("/getAll", async (req, res) => {
  try {
    const users = await fetch.getAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao obter API-KEYS." });
  }
});

router.get("/getById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const key = await fetch.getKeyById(id);

    if (key === null) {
      return res.status(404).json({ mensagem: "API-KEY não encontrado." });
    }

    return res.json(key);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao obter API-KEY." });
  }
});


router.get("/", (req, res) => {
  return res.json({ mensagem: "Nossa API de Identificadores está funcionando" });
});

router.post("/new", express.json(), (req, res) => {
  // Lógica para salvar o usuário no banco de dados
  UserController.createKey(req, res);
});

// Resto do código...

module.exports = router;