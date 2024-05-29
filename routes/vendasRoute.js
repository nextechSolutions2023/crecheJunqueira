const express = require('express');
const VendasController = require('../controllers/VendasController');
const vendasRouter = express.Router();

let ctrl = new VendasController();
vendasRouter.post('/gravar', ctrl.gravar);

vendasRouter.get('/', ctrl.listar);
vendasRouter.get("/filtrar/:termo/:filtro", ctrl.filtrar);

// vendasRouter.get('/listar', auth.verificarUsuarioLogado, ctrl.listar);
// vendasRouter.get("/filtrar/:termo/:filtro", auth.verificarUsuarioLogado, ctrl.filtrar);

module.exports = vendasRouter;
