const express = require("express");
const router = express.Router({ mergeParams: true });

const home_controller = require('../controllers/homeController');
const { validateToken } = require('../middleware/jwtAuth');

router.get('', validateToken, home_controller.home_list);
router.post('', validateToken, home_controller.home_create);
router.put('/:id', validateToken, home_controller.home_update);
router.delete('/:id', validateToken, home_controller.home_delete);

module.exports = router;
