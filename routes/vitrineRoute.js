const express = require('express');
// const ProdutoController = require('../controllers/produtoController');
const VitrineController = require('../controllers/vitrineController');

// const router = express.Router();
const vitrineRouter = express.Router();

// let ctrl = new ProdutoController();
// vitrineRouter.get('/vitrine', ctrl.listarView);

module.exports = vitrineRouter;