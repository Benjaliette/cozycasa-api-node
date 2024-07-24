const express = require('express');
const router = express.Router({ mergeParams: true });

const event_controller = require('../controllers/eventController');
const { validateToken } = require('../middleware/jwtAuth');

router.get('', validateToken, event_controller.event_list);
router.post('', validateToken, event_controller.event_create);
router.put('/:id', validateToken, event_controller.event_update);
router.delete('/:id', validateToken, event_controller.event_delete);

module.exports = router;
