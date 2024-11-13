const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require('./routes/cards');

const port = 3000;
const app = express();


// Monta o roteador de usuários na rota base '/users'
app.use(usersRouter);
// Monta o roteador de cartoes na rota base '/cards'
app.use(cardsRouter);

app.get("/cause-error", (req, res) => {
  throw new Error("Erro proposital para teste.");
});

//Middleware para tratar rotas inexistentes
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

