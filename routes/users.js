const express = require("express");
const User = require("../models/user");

const router = express.Router();

function handleUserError(err, res) {
  if (err instanceof mongoose.Error.CastError) {
    // Erro de ID inválido
    return res.status(400).json({ message: "O ID do usuário fornecido é inválido." });
  }

  if (err.name === "DocumentNotFoundError") {
    // ID não encontrado
    return res.status(404).json({ message: "Usuário não encontrado com o ID fornecido." });
  }

  // Outros erros
  return res.status(500).json({ message: "Ocorreu um erro no servidor." });
}

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    handleUserError(err, res); // Chama a função para tratar o erro
  }
});

// GET /users/:userId
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).orFail();
    res.send(user);
  } catch (err) {
    handleUserError(err, res); // Chama a função para tratar o erro
  }
});

// POST /users
router.post("/", async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(201).send(user);
  } catch (err) {
    handleUserError(err, res); // Chama a função para tratar o erro
  }
});

// PATCH /users/me - Atualiza o perfil
router.patch("/me", async (req, res) => {
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    ).orFail();

    res.send(user);
  } catch (err) {
    handleUserError(err, res); // Chama a função para tratar o erro
  }
});

// PATCH /users/me/avatar - Atualiza o avatar
router.patch("/me/avatar", async (req, res) => {
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    ).orFail();

    res.send(user);
  } catch (err) {
    handleUserError(err, res); // Chama a função para tratar o erro
  }
});

module.exports = router;
