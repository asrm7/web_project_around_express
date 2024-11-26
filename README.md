
# Projeto Tripleten web_project_around_express

Este é um projeto de API básico feito no bootcamp de desenvolvimento web da Tripleten, usando **Express.js**  para gerenciar usuários e cartões. A aplicação permite a realização de operações GET em ambos os recursos (usuários e cartões) e foi projetada para ser utilizada como base para aplicações web.

## Tecnologias usadas

- **Back-end:** Express.js
  O aplicativo escutará na porta especificada (padrão, 3000).
- MongoDB 
  Community Edition como banco de dados para armazenamento de dados da API. 


## Rotas
Rotas do usuário

- **Obter todos os usuários:**
- **Obtenha um usuário específico:**
- **Criar um novo usuário:**
- **Atualizar o perfil do usuário:**
- **Atualizar o avatar do perfil do usuário:**


Rotas de cartão
- **Obter todos os cartões:**
- **Criar um novo cartão:**
- **Deletar um cartão específico:**
- **Curtir um cartão específico:**
- **Descurtir um cartão específico:**

### Caminho "Não encontrado"

- **Tratamento de erros de rotas inexistentes:**
 - **Caso a rota solicitada não seja encontrada, retorna um erro 500 com uma mensagem personalizada.**
 - **retorna um erro 400 quando algum dado inválido é passados aos métodos para criar um cartão/usuário ou atualizar um perfil/avatar do usuário.**
 - **retorna um erro 404 quando o cartão ou usuário não é encontrado.**
