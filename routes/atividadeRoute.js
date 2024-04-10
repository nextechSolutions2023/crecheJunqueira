const express = require('express');
const AtividadesController = require('../controllers/atividadeController');

let ctrl = new AtividadesController();

let router = express.Router();
router.get('/',ctrl.listagemView);
router.get('/cadastrar',ctrl.cadastrarView);
router.post('/cadastrar',ctrl.cadastrar);
router.get('/alterar/:codigo', ctrl.alterarView);
router.post('/alterar/', ctrl.alterar);
router.get('/deletar/:codigo', ctrl.deletarView);
router.post('/deletar/', ctrl.deletar);


module.exports = router;