const ContatoModel = require("../models/contatoModel");


class MensagemController{


    async listarMensagens(req, res) {
            const contatoModel = new ContatoModel();
            let mensagens = await contatoModel.listarMensagens();
            res.render('mensagens/mensagens', { mensagens: mensagens, layout:"layoutAdmin" });
        }

        async excluirMensagem(req, res) {
            try {
                let ok = true;
                if (req.body.codigo) {
                    let mensagem = new ContatoModel();
                    ok = await mensagem.excluirMensagem(req.body.codigo);
                } else {
                    ok = false;
                }
                res.send({ ok: ok });
            } catch (error) {
                console.error('Erro ao excluir mensagem:', error);
                res.status(500).send({ ok: false, error: 'Erro ao excluir mensagem' });
            }
        }
    
    
        // async excluirMensagem(req, res){

        //     var ok = true;
        //     if(req.body.codigo != "") {
        //         let mensagem = new ContatoModel();
        //         // let prod_imagem = await produto.buscarProduto(req.body.codigo);
    
        //         // if (prod_imagem.possuiImagem) {
        //         //     fs.unlinkSync(global.RAIZ_PROJETO + "/public" + prod_imagem.imagem);
        //         // }
    
        //         ok = await mensagem.excluirMensagem(req.body.codigo);
    
        //     }
        //     else{
        //         ok = false;
        //     }
    
        //     res.send({ok: ok});
        // }


}

module.exports = MensagemController;