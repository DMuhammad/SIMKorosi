const { Router } = require("express");
const user = require("../controllers/userController");
const userController = require("../controllers/userController");

const userRoutes = Router();

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.get("/token", userController.refreshToken);
userRoutes.post("/logout", userController.logout);

module.exports = userRoutes;
