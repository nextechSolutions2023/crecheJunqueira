const express = require('express');
const VoluntarioController = require('../controllers/voluntarioController');
const PessoaModel = require("../models/pessoaModel");
const EnderecoModel = require("../models/enderecoModel");

let ctrl = new VoluntarioController();

let router = express.Router();
router.get('/',ctrl.listagemView);
router.get('/cadastrar',ctrl.cadastrarView);
router.post('/cadastrar',ctrl.cadastrar);
router.get('/alterar/:id', ctrl.alterarView);
router.post('/alterar/', ctrl.alterar);
router.get('/deletar/:id', ctrl.deletarView);
router.post('/deletar/', ctrl.deletar);

module.exports = router;