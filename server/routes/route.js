const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorization } = require("../middleware/authorization");
const {
  getToDo,
  saveToDo,
  updateToDo,
  deleteToDo
} = require("../controllers/todoController");

//==============================USER APIS======================================

router.post("/register", userController.regiserUser);
router.post("/login", userController.login);
router.get("/user", authorization, userController.getUser);
router.get("/gettodo", authorization, getToDo);
router.post("/save", authorization, saveToDo);
router.post("/delete", authorization, deleteToDo);
router.put("/update", authorization, updateToDo);

module.exports = router;
