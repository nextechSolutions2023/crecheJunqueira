const express = require('express');
const MensagemController = require('../controllers/mensagemController');
const contatoModel = require("../models/contatoModel");

let ctrl = new MensagemController();
// let upload = multer({storage});

let router = express.Router();
router.get('/',ctrl.listarMensagens);
router.post('/excluir', ctrl.excluirMensagem);

module.exports = router;

