import express from 'express'
import { createTodo,getAllTodos, updateTodo, deleteTodo } from '../controllers/todo.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'

const router = express.Router();

router.route("/").post(isAuthenticated,createTodo)

router.route("/").get(isAuthenticated,getAllTodos)

router.route("/:todoId").put(isAuthenticated,updateTodo);
router.route("/:todoId").delete(isAuthenticated,deleteTodo);

export default router;