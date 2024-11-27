const mongoose = require("mongoose");
const User = require("../models/user");
const HttpStatus = require("../utils/httpStatus");
const GenericResponses = require("../utils/responses");

// Função para lidar com erros e personalizar mensagens
function handleUserError(err, res) {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: "O ID do usuário fornecido é inválido." });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(HttpStatus.NOT_FOUND).json({ message: "Usuário não encontrado com o ID fornecido." });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: GenericResponses.SERVER_ERROR });
}

// Controladores
const userController = {
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(HttpStatus.OK).send(users);
    } catch (err) {
      handleUserError(err, res);
    }
  },

  // Obter um usuário por ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId).orFail();
      res.status(HttpStatus.OK).send(user);
    } catch (err) {
      handleUserError(err, res);
    }
  },

  // Criar um novo usuário
  async createUser(req, res) {
    try {
      const { name, about, avatar } = req.body;
      const user = await User.create({ name, about, avatar });
      res.status(HttpStatus.CREATED).send(user);
    } catch (err) {
      handleUserError(err, res);
    }
  },

  // Atualizar o perfil do usuário
  async updateUserProfile(req, res) {
    const { name, about } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, about },
        { new: true, runValidators: true }
      ).orFail();

      res.status(HttpStatus.OK).send(user);
    } catch (err) {
      handleUserError(err, res);
    }
  },

  // Atualizar o avatar do usuário
  async updateUserAvatar(req, res) {
    const { avatar } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { avatar },
        { new: true, runValidators: true }
      ).orFail();

      res.status(HttpStatus.OK).send(user);
    } catch (err) {
      handleUserError(err, res);
    }
  },
};

module.exports = userController;
