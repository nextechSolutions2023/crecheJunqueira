const express = require('express');
const VendasController = require('../controllers/VendasController');
const vendasRoute = express.Router();

let ctrl = new VendasController();
vendasRoute.post('/gravar', ctrl.gravar);

module.exports = vendasRoute;