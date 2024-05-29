const express = require('express');
const HomeController = require('../controllers/homeController');
const AuthMiddleware = require('../middlewares/authMiddleware');


let router = express.Router();
let ctrl = new HomeController();
let auth = new AuthMiddleware()

router.get("/", ctrl.homeView);
router.get("/contato", ctrl.contatoView);
router.get("/doacao", ctrl.DoacaoView);
router.get("/sobre_nos", ctrl.sobrenosView);
// router.get("/doacao", ctrl.doacaoView);
router.get("/nextechsolutions", ctrl.integrantesView);
router.get("/transparencia", ctrl.transparenciaView);
router.get("/eventos", ctrl.listarEventosView);
router.get("/dashboard", ctrl.recursosView);

module.exports = router;
