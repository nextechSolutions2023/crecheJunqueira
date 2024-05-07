const AtividadeModel = require("../models/atividadeModel");

class AtividadeController{

    async listagemView(req, resp){
        let atividade = new AtividadeModel();
        let listaAtividades = await atividade.listar();
        resp.render("atividades/listagem", { lista: listaAtividades,layout:false });
    }

    cadastrarView(req, resp){
        resp.render("atividades/cadastrar");
    }

    //cadastrar
    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.disponibilidade != "" && req.body.cpf != "" &&
        req.body.nome != "" ) {

            let atividade = new AtividadeModel(0, req.body.descricao );

            let result = await atividade.cadastrar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Atividade cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar atividade!"
                });
            }
        }
        else
        {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    //alterar
    async alterarView(req, res) {
        let atividadeModel = new AtividadeModel();
        let atividade = await atividadeModel.obter(req.params.codigo) ;
        res.render('atividades/alterar', {atividade:atividade});
    }

    async alterar(req, resp){


        if(req.body.descricao != "" ) {
            let atividade = new AtividadeModel(req.body.codigo, req.body.descricao );
            let result = await atividade.alterar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Atividade alterado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar cadastro de atividade!"
                });
            }
        }
        else
        {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    //deletar
    async deletarView(req, res) {
        let atividadeModel = new AtividadeModel();
        let atividade = await atividadeModel.obter(req.params.codigo);
        res.render('atividades/deletar', {atividade:atividade});
    }

    async deletar(req, resp){
        let atividade = new AtividadeModel(req.body.codigo, req.body.descricao );
        let result = await atividade.deletar();

        if(result ) {
            resp.send({
                ok: true,
                msg: "Atividade deletado com sucesso!"
            });
        }   
        else{
            resp.send({
                ok: false,
                msg: "Erro ao deletar atividade!"
            });
        }
    }
}

module.exports = AtividadeController;