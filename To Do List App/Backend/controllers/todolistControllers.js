import Todolist from "../models/Todolist.js"

export async function getTodolists(req, res) {
    try {
        const todolists = await Todolist.find({});
        res.json(todolists);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function getTodolistById(req, res) {
    const { id } = req.params;

    try {
        const todolist = await Todolist.findById(id);

        res.json(todolist)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function addTodolist(req, res) {
    const { title, description } = req.body;

    if (!title || description) {
        
    }
}