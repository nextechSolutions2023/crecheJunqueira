const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();

let ctrl = new LoginController();
router.post('/validar', ctrl.login);

router.get('/', ctrl.LoginView);
router.post('/', ctrl.login);

module.exports = router;