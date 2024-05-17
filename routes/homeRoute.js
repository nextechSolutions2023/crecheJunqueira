const express = require('express');
const HomeController = require('../controllers/homeController');

let router = express.Router();
let ctrl = new HomeController();
router.get("/", ctrl.homeView);
router.get("/contato", ctrl.contatoView);
router.get("/sobre_nos", ctrl.sobrenosView);
router.get("/doacao", ctrl.doacaoView);
router.get("/nextechsolutions", ctrl.integrantesView);


// router.get("/recursos", ctrl.recursosView);
router.get("/dashboard", ctrl.recursosView);

// router.get('/semlayout', ctrl.semLayoutView);

module.exports = router;