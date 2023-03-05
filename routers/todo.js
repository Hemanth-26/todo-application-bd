const TodoRouter = require('express').Router();
const Todo = require('../model/todo.model');
const { GetTodoAllList, AddTodoList, UpdateTodoListById, DeleteTodoListById } = require('../controllers/todo');

TodoRouter.get('/get', GetTodoAllList);

TodoRouter.post('/add', AddTodoList);

TodoRouter.post('/update/:id', UpdateTodoListById);

TodoRouter.post('/remove/:id', DeleteTodoListById);

module.exports = TodoRouter;