const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();

// Define routes and link them to controller methods
router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getUser);
router.post("/users", usersController.createUsers);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
