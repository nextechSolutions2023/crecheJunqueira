const express = require('express');
const saidaEventoController = require('../controllers/saidaEventoController');
const AuthMiddleware = require('../middlewares/authMiddleware');
let auth = new AuthMiddleware();

const saidaRouter = express.Router();
let ctrl = new saidaEventoController;

saidaRouter.get('/', auth.verificarUsuarioLogado, ctrl.listarEventoView);
saidaRouter.get('/saida/:codigo', auth.verificarUsuarioLogado, ctrl.saidaView);
saidaRouter.post('/alterarBanco', auth.verificarUsuarioLogado, ctrl.alterarPatrimonioVoluntario);



module.exports = saidaRouter;