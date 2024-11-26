const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const port = 3000;

// Middleware para analisar JSON
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb");

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
  res.status(404).json({ message: "A solicitação não foi encontrada" });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err.stack); // Loga o erro no console
  res.status(500).json({ message: "Ocorreu um erro no servidor" });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
