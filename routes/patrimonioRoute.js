const express = require('express');
const patrimonioController = require('../controllers/patrimonioController');
const AuthMiddleware = require('../middlewares/authMiddleware');
let auth = new AuthMiddleware();
const patrimonioRouter = express.Router();


let ctrl = new patrimonioController;

patrimonioRouter.get('/',  auth.verificarUsuarioLogado, ctrl.listarView);
patrimonioRouter.get('/cadastrar',  auth.verificarUsuarioLogado, ctrl.cadastroView);
patrimonioRouter.post('/cadastrar', auth.verificarUsuarioLogado,  ctrl.cadastrarPatrimonio);
patrimonioRouter.get('/alterar/:id',  auth.verificarUsuarioLogado, ctrl.alterarView);
patrimonioRouter.post('/alterar',  auth.verificarUsuarioLogado, ctrl.alterarPatrimonio);
patrimonioRouter.post('/excluir', auth.verificarUsuarioLogado,  ctrl.excluirPatrimonio);

module.exports = patrimonioRouter;