const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

// GET /cards
router.get("/", cardController.getAllCards);

// POST /cards
router.post("/", cardController.createCard);

// DELETE /cards/:cardId
router.delete("/:cardId", cardController.deleteCard);

// PUT /cards/:cardId/likes
router.put("/:cardId/likes", cardController.likeCard);

// DELETE /cards/:cardId/likes
router.delete("/:cardId/likes", cardController.dislikeCard);

module.exports = router;
