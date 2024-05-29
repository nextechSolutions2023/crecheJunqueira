const express = require('express');
const saidaEventoController = require('../controllers/saidaEventoController');

const saidaRouter = express.Router();
let ctrl = new saidaEventoController;

saidaRouter.get('/', ctrl.listarEventoView);
saidaRouter.get('/saida/:codigo', ctrl.saidaView);
saidaRouter.post('/alterarBanco', ctrl.alterarPatrimonioVoluntario);



module.exports = saidaRouter;