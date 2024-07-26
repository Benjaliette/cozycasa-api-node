const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { performance } = require('node:perf_hooks');

const Todo = require('../models/todo');

exports.todo_list = asyncHandler(async (req, res, next) => {
  const allTodos = await Todo
    .find({ homeId: req.params.homeId }, "title completed userId homeId")
    .sort({
      createdAt: 'asc'
    })
    .exec();

  res.status(200).json({
    message: "Todo List",
    todos: allTodos
  })
});

exports.todo_create = [
  body('title', 'Task must have a title').not().isEmpty(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = req.user.user;

    const { title, completed } = req.body;

    const newTodo = new Todo({
      title,
      completed,
      homeId: req.params.homeId,
      userId: user._id
    });

    if (errors.isEmpty()) {
      await newTodo.save();
      return res.status(201).json(newTodo);
    }

    res.status(422).json({ errors: errors.array() })
  })
]

exports.todo_update = [
  body('title', 'Task must have a title').notEmpty(),
  body('completed', 'Task must have a completed field').notEmpty(),
  asyncHandler(async (req, res, next) => {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )

    res.status(200).json(todo);
  })
]

exports.todo_delete = asyncHandler(async (req, res, next) => {
  await Todo.findOneAndDelete(
    { _id: req.params.id }
  )

  res.status(200).json(req.params.id);
})
