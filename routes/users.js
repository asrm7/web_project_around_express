const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /users
router.get("/", userController.getAllUsers);

// GET /users/:userId
router.get("/:userId", userController.getUserById);

// POST /users
router.post("/", userController.createUser);

// PATCH /users/me - Atualiza o perfil
router.patch("/me", userController.updateUserProfile);

// PATCH /users/me/avatar - Atualiza o avatar
router.patch("/me/avatar", userController.updateUserAvatar);

module.exports = router;
