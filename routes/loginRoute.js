const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();

let ctrl = new LoginController();
// router.post('/validar', ctrl.login);

router.get('/', ctrl.loginView);
// router.post('/', ctrl.Login);

module.exports = router;