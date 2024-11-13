const express = require("express");
const usersRouter = express.Router();

const fs = require("fs");
const path = require("path");
// Conforme roteiro, usando o modulo path para pegar o caminho para o arquivo JSON
const filepath = path.join(__dirname, "../data/users.json");

// Rota para listar todos os usuários
usersRouter.get("/users", (req, res) => {
  // Conforme roteiro, usando o modulo fs para acessar e manipular os arquivos de dados JSON
  fs.readFile(filepath, "utf8", (err, data) => {

    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return res.status(500).json({ error: "Erro ao acessar os dados dos usuários." });
    }
    try {
      const users = JSON.parse(data); // Parseia a string JSON para um objeto
      res.json(users); // Retorna a lista de usuários
    } catch (parseError) {
      console.error("Erro ao parsear o JSON:", parseError);
      res.status(500).json({ error: "Erro ao processar os dados dos usuários." });
    }
  });
});

// Rota para buscar um usuário pelo ID
usersRouter.get('/users/:id', (req, res) => {
  const userId = req.params.id; // Captura o ID da URL

  fs.readFile(filepath, "utf8", (err, data) => {

    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return res.status(500).json({ error: "Erro ao acessar os dados dos usuários." });
    }
    try {
      const users = JSON.parse(data); // Parseia a string JSON para um objeto

      const user = users.find(u => u._id === userId); // Procura o usuário pelo ID

      if (user) {
        res.json(user); // Retorna o usuário encontrado
      } else {
        res.status(404).json({ message: "ID do usuário não encontrado" }); // Erro 404 se não encontrado
      }
    } catch (parseError) {
      console.error("Erro ao parsear o JSON:", parseError);
      res.status(500).json({ error: "Erro ao processar os dados dos usuários." });
    }
  });
});



module.exports = usersRouter;
