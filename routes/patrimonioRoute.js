const express = require('express');
const patrimonioController = require('../controllers/patrimonioController');

const patrimonioRouter = express.Router();


let ctrl = new patrimonioController;

patrimonioRouter.get('/', ctrl.listarView);
patrimonioRouter.get('/cadastrar', ctrl.cadastroView);
patrimonioRouter.post('/cadastrar', ctrl.cadastrarPatrimonio);
patrimonioRouter.get('/alterar/:id', ctrl.alterarView);
patrimonioRouter.post('/alterar', ctrl.alterarPatrimonio);
patrimonioRouter.post('/excluir', ctrl.excluirPatrimonio);

module.exports = patrimonioRouter;