const express = require("express");
const router = express.Router({ mergeParams: true });

const note_controller = require("../controllers/noteController");
const { validateToken } = require('../middleware/jwtAuth');

router.get('', validateToken, note_controller.note_list);
router.post('', validateToken, note_controller.note_create);
router.put('/:id', validateToken, note_controller.note_update);
router.delete('/:id', validateToken, note_controller.note_delete);

module.exports = router;
