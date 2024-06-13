const express = require('express');
const multer = require('multer');
const EventoController = require('../controllers/eventoController');
const AuthMiddleware = require('../middlewares/authMiddleware');
let auth = new AuthMiddleware();
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

eventoRouter.get('/', auth.verificarUsuarioLogado,ctrl.listarView);
eventoRouter.get('/cadastrar', auth.verificarUsuarioLogado,ctrl.cadastroView);
eventoRouter.post("/cadastrar", auth.verificarUsuarioLogado,upload.single("imagem"), ctrl.cadastrarEvento);
eventoRouter.get("/excluir/:codigo",auth.verificarUsuarioLogado,  ctrl.excluirView);
eventoRouter.post("/excluir",  auth.verificarUsuarioLogado,ctrl.excluir);
eventoRouter.get("/alterar/:codigo",auth.verificarUsuarioLogado, ctrl.alterarView);
eventoRouter.post("/alterar", auth.verificarUsuarioLogado,upload.single("imagem"), ctrl.alterarEvento);
eventoRouter.get("/obter/:evento",auth.verificarUsuarioLogado, ctrl.obter)
eventoRouter.post("/aprovar",auth.verificarUsuarioLogado,  ctrl.aprovar);
eventoRouter.post("/reprovar",  auth.verificarUsuarioLogado,ctrl.reprovar);
//Relatório
eventoRouter.get('/relatorios', auth.verificarUsuarioLogado,ctrl.listar);
eventoRouter.get("/filtrar/:termo/:filtro", auth.verificarUsuarioLogado,ctrl.filtrar);

module.exports = eventoRouter;