const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Todo = require('../models/todo');

exports.todo_list = asyncHandler(async (req, res, next) => {
  const allTodos = await Todo.find({}, "title completed").exec();

  res.status(200).json({
    message: "Todo List",
    todos: allTodos
  })
});

exports.todo_create = [
  body('title', 'Task must have a title').not().isEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const { title, completed } = req.body;
    const newTodo = new Todo({ title, completed });

    if (errors.isEmpty()) {
      await newTodo.save();
      return res.status(201).json(newTodo);
    }

    res.status(422).json({ errors: errors.array() })
  })
]
