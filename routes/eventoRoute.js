const express = require('express');
const multer = require('multer');
const EventoController = require('../controllers/eventoController');

const eventoRouter = express.Router();

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/img/eventos");
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

let ctrl = new EventoController

eventoRouter.get('/', ctrl.listarView);
eventoRouter.get('/cadastrar', ctrl.cadastroView);
eventoRouter.post("/cadastrar", upload.single("imagem"), ctrl.cadastrarEvento);
eventoRouter.post("/excluir",  ctrl.excluirEvento);
eventoRouter.get("/alterar/:id", ctrl.alterarView);
eventoRouter.post("/alterar", upload.single("imagem"), ctrl.alterarEvento);
eventoRouter.get("/obter/:evento", ctrl.obter)

module.exports = eventoRouter;