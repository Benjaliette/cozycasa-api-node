const express = require('express');
const router = express.Router({ mergeParams: true });

const user_controller = require('../controllers/userController');

// REGISTER A USER //
router.post('/signup', user_controller.user_create);

// LOGIN //
router.post('/login', user_controller.user_login);

// LOGOUT //
router.delete('/logout', user_controller.user_logout);

// GET NEW TOKEN //
router.post('/refreshToken', user_controller.refresh_token);

module.exports = router;
