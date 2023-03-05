const Todo = require('../model/todo.model');

let GetTodoAllList = async (req, res) => {
    try {
        let getTodoList = await Todo.find({});
        // console.log("getTodoList", getTodoList);
        res.json(getTodoList);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

let AddTodoList = async (req, res) => {
    try {
        let addTodoList = await Todo.create({list : req.body.list});
        // console.log("addTodoList", addTodoList);
        res.json(addTodoList);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

let UpdateTodoListById = async (req, res) => {
    try {
        let updateTodoList = await Todo.findById(req.params.id);
        console.log("updateTodoList", updateTodoList);
        if (updateTodoList != null) {
            updateTodoList.list = req.body.list;
            await updateTodoList.save();
            res.json(updateTodoList);
        }else {
            throw new Error("Todo Item not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

let DeleteTodoListById = async (req, res) => {
    try {
        let updateTodoList = await Todo.findByIdAndDelete(req.params.id);
        if (updateTodoList != null) {
        // await updateTodoList.save();
        // console.log("updateTodoList", updateTodoList);
        res.json({message: "Removed Todo Item",updateTodoList});
        }else {
            throw new Error("Todo Item not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    GetTodoAllList,
    AddTodoList,
    UpdateTodoListById,
    DeleteTodoListById,
}