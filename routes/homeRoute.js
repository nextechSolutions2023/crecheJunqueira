const express = require('express');
const HomeController = require('../controllers/homeController');
const AuthMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

let router = express.Router();

let ctrl = new HomeController();
let auth = new AuthMiddleware()

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/docs");
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.split(".").pop();
        //ou
        //
        //let ext = file.originalname.split(".").slice(-1)[0]
        let novoNome = Date.now().toString() + "." + ext;
        cb(null, novoNome);
    }
})


let upload = multer({storage});

router.get("/", ctrl.homeView);
router.get("/contato", ctrl.contatoView);
router.post("/contato/enviar", upload.single("arquivo"), ctrl.contatoEnviar);
router.get("/doacao", ctrl.DoacaoView);
router.get("/sobre_nos", ctrl.sobrenosView);
// router.get("/doacao", ctrl.doacaoView);
router.get("/nextechsolutions", ctrl.integrantesView);
router.get("/transparencia", ctrl.transparenciaView);
router.get("/eventos", ctrl.listarEventosView);
router.get("/dashboard", ctrl.recursosView);

module.exports = router;
