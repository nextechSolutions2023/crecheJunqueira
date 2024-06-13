const express = require('express');
const VoluntarioController = require('../controllers/voluntarioController');
const PessoaModel = require("../models/pessoaModel");
const EnderecoModel = require("../models/enderecoModel");
const AuthMiddleware = require('../middlewares/authMiddleware');




let ctrl = new VoluntarioController();

let auth = new AuthMiddleware()

let router = express.Router();
router.get('/cadastrar',ctrl.cadastrarView);
router.post('/cadastrar',ctrl.cadastrar);

// rotas restritas abaixo:
router.get('/',auth.verificarUsuarioLogado, ctrl.listagemView);
router.get('/alterar/:codigo',auth.verificarUsuarioLogado, ctrl.alterarView);
router.post('/alterar/', auth.verificarUsuarioLogado, ctrl.alterar);
router.get('/deletar/:codigo',auth.verificarUsuarioLogado, ctrl.deletarView);
router.post('/deletar/',auth.verificarUsuarioLogado, ctrl.deletar);


module.exports = router;