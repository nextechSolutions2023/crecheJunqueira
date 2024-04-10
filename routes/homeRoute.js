const express = require('express');
const HomeController = require('../controllers/homeController');

const router = express.Router();
let ctrl = new HomeController();
router.get("/", ctrl.homeView);
router.get("/contato", ctrl.contatoView);
router.get("/sobre_nos", ctrl.sobrenosView);
router.get("/recursos", ctrl.recursosView);
// router.get('/semlayout', ctrl.semLayoutView);

module.exports = router;