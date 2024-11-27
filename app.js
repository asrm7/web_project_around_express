const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const HttpStatus = require("./utils/httpStatus"); // Importa os códigos de status
const GenericResponses = require("./utils/responses"); // Importa as respostas genéricas

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Middleware de autenticação temporária
app.use((req, res, next) => {
  req.user = {
    _id: "6745cd23dca249d01866ecbe",
  };
  next();
});

// Roteadores
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Rota de teste de erro
app.get("/cause-error", (req, res) => {
  throw new Error("Erro proposital para teste.");
});

// Middleware para tratar rotas inexistentes
app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: GenericResponses.NOT_FOUND });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: GenericResponses.SERVER_ERROR });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
