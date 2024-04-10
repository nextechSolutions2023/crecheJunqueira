const express = require('express');
const DoadoresController = require('../controllers/doadoresController');
const PessoaModel = require("../models/pessoaModel");
const EnderecoModel = require("../models/enderecoModel");


let ctrl = new DoadoresController();

let router = express.Router();
router.get('/',ctrl.listagemView);
router.get('/cadastrar',ctrl.cadastrarView);
router.post('/cadastrar',ctrl.cadastrar);
router.get('/alterar/:codigo', ctrl.alterarView);
router.post('/alterar/', ctrl.alterar);
router.get('/deletar/:codigo', ctrl.deletarView);
router.post('/deletar/', ctrl.deletar);


module.exports = router;