const mongoose = require("mongoose");
const Card = require("../models/card");
const HttpStatus = require("../utils/httpStatus");
const GenericResponses = require("../utils/responses");

// Função para lidar com erros e personalizar mensagens
function handleCardError(err, res) {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: "O ID do cartão fornecido é inválido." });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(HttpStatus.NOT_FOUND).json({ message: "Cartão não encontrado com o ID fornecido." });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: GenericResponses.SERVER_ERROR });
}

// Controladores
const cardController = {
  // Listar todos os cartões
  async getAllCards(req, res) {
    try {
      const cards = await Card.find({});
      res.status(HttpStatus.OK).send(cards);
    } catch (err) {
      handleCardError(err, res);
    }
  },

  // Criar um novo cartão
  async createCard(req, res) {
    try {
      const { name, link } = req.body;
      const card = await Card.create({ name, link, owner: req.user._id });
      res.status(HttpStatus.CREATED).send(card);
    } catch (err) {
      handleCardError(err, res);
    }
  },

  // Deletar um cartão
  async deleteCard(req, res) {
    try {
      const card = await Card.findByIdAndDelete(req.params.cardId).orFail();
      res.status(HttpStatus.OK).json({ message: "Cartão deletado com sucesso." });
    } catch (err) {
      handleCardError(err, res);
    }
  },

  // Curtir um cartão
  async likeCard(req, res) {
    try {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      ).orFail();
      res.status(HttpStatus.OK).send(card);
    } catch (err) {
      handleCardError(err, res);
    }
  },

  // Descurtir um cartão
  async dislikeCard(req, res) {
    try {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true }
      ).orFail();
      res.status(HttpStatus.OK).send(card);
    } catch (err) {
      handleCardError(err, res);
    }
  },
};

module.exports = cardController;
