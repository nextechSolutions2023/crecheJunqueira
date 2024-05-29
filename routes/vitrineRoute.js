const express = require('express');
const ProdutoController = require('../controllers/produtoController');
const VitrineController = require('../controllers/vitrineController');

let router = express.Router();
let ctrl = new VitrineController();
router.get("/", ctrl.vitrineView);

module.exports = router;