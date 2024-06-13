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

        async downloadArquivo(req, res) {
            const { nomeArquivo } = req.params;
            const filePath = path.join(__dirname, '../public/docs', nomeArquivo);
    
            res.download(filePath, (err) => {
                if (err) {
                    console.error('Erro ao fazer download do arquivo:', err);
                    res.status(500).send('Erro ao fazer download do arquivo');
                }
            });
        }
}

module.exports = MensagemController;