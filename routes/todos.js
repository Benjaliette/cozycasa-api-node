var express = require('express');
var router = express.Router();

const todo_controller = require('../controllers/todoController');

/**
 * @openapi
 * '/api/v1/todos':
 *   get:
 *     tags:
 *     - Todo Controller
 *     summary: Get all todos
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Controller method
 *                  example: Todo List
 *                todos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: The todo ID
 *                        example: 0
 *                      title:
 *                        type: string
 *                        description: The task's name
 *                        example: Do laundry
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get('/', todo_controller.todo_list);

/**
 * @openapi
 * /api/v1/todos:
 *   post:
 *     tags:
 *     - Todo Controller
 *     summary: Create a todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The todo's name.
 *                 example: Do the laundry
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The task's name
 *                   example: Do laundry
 *                 completed:
 *                   type: boolean
 *                   description: Is the task completed or not
 *                   example: false
 *                 _id:
 *                   type: string
 *                   description: The task's id
 *                   example: 669157e006a899b294e5de61
 *                 createdAd:
 *                   type: date
 *                   description: The task's creation date
 *                   example: 2024-07-12T16:20:48.795Z
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.post('/', todo_controller.todo_create);

module.exports = router;
