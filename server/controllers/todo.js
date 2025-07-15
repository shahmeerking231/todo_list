import { Todo } from '../models/todo.js'

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const todo = new Todo({ title, description });
        todo.save();
        return res.status(200).json({
            success: true,
            message: "Todo created successfully.",
            todo
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            success: true,
            todos: todos.length === 0 ? [] : todos
        })
    } catch (error) {
        console.log(error)
    }
}


export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        await Todo.findByIdAndDelete(todoId);
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId; 
        const { title, description } = req.body; 
        if (!title || !description) {
            return res.status(400).json({
                success: false, 
                message: "Title and description are required."
            });
        }
        const todo = await Todo.findByIdAndUpdate(todoId, { title, description }, { new: true }); return res.status(200).json({
            success: true, 
            message: "Todo Updated.", 
            todo
        });
    } catch (error) {
        console.log(error); return res.status(500).json({
            success: false, 
            message: "Internal server error."
        });
    }
}