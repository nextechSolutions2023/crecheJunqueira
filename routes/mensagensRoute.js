const express = require('express');
const MensagemController = require('../controllers/mensagemController');
const contatoModel = require("../models/contatoModel");
const AuthMiddleware = require('../middlewares/authMiddleware');

let auth = new AuthMiddleware()
let ctrl = new MensagemController();
// let upload = multer({storage});

let router = express.Router();
router.get('/',ctrl.listarMensagens);
router.post('/excluir', ctrl.excluirMensagem);
router.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../public/docs', filename);
    res.download(filepath);
});
// router.get("/download/:nomeArquivo",auth.verificarUsuarioLogado, ctrl.downloadArquivo);

module.exports = router;

