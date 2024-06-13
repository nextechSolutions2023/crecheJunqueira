const express = require('express');
const AtividadesController = require('../controllers/atividadeController');
const AuthMiddleware = require('../middlewares/authMiddleware');
let auth = new AuthMiddleware()
let ctrl = new AtividadesController();

let router = express.Router();
router.get('/',auth.verificarUsuarioLogado,ctrl.listagemView);
router.get('/cadastrar',auth.verificarUsuarioLogado,ctrl.cadastrarView);
router.post('/cadastrar',auth.verificarUsuarioLogado,ctrl.cadastrar);
router.get('/alterar/:codigo', auth.verificarUsuarioLogado,ctrl.alterarView);
router.post('/alterar/', auth.verificarUsuarioLogado,ctrl.alterar);
router.get('/deletar/:codigo', auth.verificarUsuarioLogado,ctrl.deletarView);
router.post('/deletar/', auth.verificarUsuarioLogado,ctrl.deletar);


module.exports = router;