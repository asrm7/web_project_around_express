const express = require("express");
const Card = require("../models/card");
const mongoose = require("mongoose");
const router = express.Router();
// Função para lidar com erros e personalizar mensagens
function handleCardError(err, res) {
  if (err instanceof mongoose.Error.CastError) {
    // Erro de ID inválido
    return res.status(400).json({ message: "O ID do cartão fornecido é inválido." });
  }

  if (err.name === "DocumentNotFoundError") {
    // Cartão não encontrado
    return res.status(404).json({ message: "Cartão não encontrado com o ID fornecido." });
  }

  // Outros erros
  return res.status(500).json({ message: "Ocorreu um erro no servidor." });
}


// GET /cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    handleCardError(err, res); // Chama a função para tratar o erro
  }
});

// POST /cards
router.post("/", async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send(card);
  } catch (err) {
    handleCardError(err, res); // Chama a função para tratar o erro
  }
});

// DELETE /cards/:cardId
router.delete("/:cardId", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).orFail();
    res.send({ message: "Cartão deletado com sucesso" });
  } catch (err) {
    handleCardError(err, res); // Chama a função para tratar o erro
  }
});

// PUT /cards/:cardId/likes - Curtir um cartão
router.put("/:cardId/likes", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // Adiciona o like apenas se ainda não estiver no array
      { new: true }
    ).orFail();

    res.send(card);
  } catch (err) {
    handleCardError(err, res); // Chama a função para tratar o erro
  }
});

// DELETE /cards/:cardId/likes - Descurtir um cartão
router.delete("/:cardId/likes", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // Remove o like do array
      { new: true }
    ).orFail();

    res.send(card);
  } catch (err) {
    handleCardError(err, res); // Chama a função para tratar o erro
  }
});

module.exports = router;
