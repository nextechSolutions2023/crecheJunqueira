const ContatoModel = require("../models/contatoModel");


class MensagemController{

    // Controller
    async listarMensagens(req, res) {
            const contatoModel = new ContatoModel();
            let mensagens = await contatoModel.listarMensagens();
            res.render('mensagens/mensagens', { mensagens: mensagens, layout:"layoutAdmin" });
        }
    


}

module.exports = MensagemController;