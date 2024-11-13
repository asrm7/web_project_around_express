const express = require("express");
const cardsRouter = express.Router();

const fs = require("fs");
const path = require("path");
// Conforme roteiro, usando o modulo path para pegar o caminho para o arquivo JSON
const filepath = path.join(__dirname, "../data/cards.json");

// Rota para listar todos os usuários
cardsRouter.get("/cards", (req, res) => {
  // Conforme roteiro, usando o modulo fs para acessar e manipular os arquivos de dados JSON
  fs.readFile(filepath, "utf8", (err, data) => {
    console.log(data);
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return res.status(500).json({ error: "Erro ao acessar os dados dos cartoes." });
    }
    try {
      const cards = JSON.parse(data); // Parseia a string JSON para um objeto
      res.json(cards); // Retorna a lista de cartoes
    } catch (parseError) {
      console.error("Erro ao parsear o JSON:", parseError);
      res.status(500).json({ error: "Erro ao processar os dados dos cartoes." });
    }
  });
});



module.exports = cardsRouter;
