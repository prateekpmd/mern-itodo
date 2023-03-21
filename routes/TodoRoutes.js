const express = require("express");
const router = express.Router();
const {getTodo,setTodo,updateTodo,deleteTodo}=require('../controllers/todoControllers')

router.get("/", getTodo);

router.post("/", setTodo);

router.get("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports=router;