const express = require("express");
const router = express.Router();
const UserController = require("../../controller/users/userController");
const fetch = require("../../model/users/users");


router.get("/getAll", async (req, res) => {
  try {
    if (req.sessao.roleId === 2) {
      const users = await fetch.getAllUsers();
      return res.json(users);
    } else {
      return res
        .status(403)
        .json({ mensagem: "Seu usuário não tem permissão de acesso" });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao obter usuários." });
  }
});

router.get("/getById/:id", async (req, res) => {
  const userId = Number(req.params.id);
  // Number() converte pra number, se for string pode passar os params direto;
  try {
    if (req.sessao.roleId === 2 || req.sessao.id === userId) {
      const user = await fetch.getUserById(userId);

      if (user === null) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.json(user);
    } else {
      return res
        .status(403)
        .json({ mensagem: "Você não tem permissão de acessar essa rota." });
    }
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
  UserController.createUser(req, res);
});

router.post("/login", express.json(), async (req, res) => {
  const { email, password } = req.body;
  const result = await UserController.loginUser(email, password);
  res.status(result.success ? 200 : 401).json({
    message: result.message,
    session: result.session,
    user: result.user,
  });
});

module.exports = router;
