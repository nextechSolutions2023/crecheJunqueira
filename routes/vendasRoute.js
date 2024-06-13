const express = require('express');
const VendasController = require('../controllers/VendasController');

const AuthMiddleware = require('../middlewares/authMiddleware');
let auth = new AuthMiddleware()
const vendasRouter = express.Router();

let ctrl = new VendasController();
vendasRouter.post('/gravar', ctrl.gravar);

vendasRouter.get('/', auth.verificarUsuarioLogado, ctrl.listar);
vendasRouter.get("/filtrar/:termo/:filtro", auth.verificarUsuarioLogado, ctrl.filtrar);

// vendasRouter.get('/listar', auth.verificarUsuarioLogado, ctrl.listar);
// vendasRouter.get("/filtrar/:termo/:filtro", auth.verificarUsuarioLogado, ctrl.filtrar);

module.exports = vendasRouter;
