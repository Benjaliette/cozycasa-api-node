var express = require('express');
var router = express.Router();

const todo_controller = require('../controllers/todoController');
const { validateToken } = require('../middleware/jwtAuth');

router.get('/', validateToken, todo_controller.todo_list);

router.post('/', validateToken, todo_controller.todo_create);

module.exports = router;
