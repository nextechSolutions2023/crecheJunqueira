const express = require('express');
const MensagemController = require('../controllers/mensagemController');
const contatoModel = require("../models/contatoModel");
const AuthMiddleware = require('../middlewares/authMiddleware');
let auth = new AuthMiddleware();

let ctrl = new MensagemController();
// let upload = multer({storage});

let router = express.Router();
router.get('/', auth.verificarUsuarioLogado, ctrl.listarMensagens);
router.post('/excluir',  auth.verificarUsuarioLogado, ctrl.excluirMensagem);

module.exports = router;

