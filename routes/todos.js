const express = require('express');
const router = express.Router({ mergeParams: true });

const todo_controller = require('../controllers/todoController');
const { validateToken } = require('../middleware/jwtAuth');

router.get('/', validateToken, todo_controller.todo_list);
router.post('/', validateToken, todo_controller.todo_create);
router.put('/:id', validateToken, todo_controller.todo_update);
router.delete('/:id', validateToken, todo_controller.todo_delete);

module.exports = router;
