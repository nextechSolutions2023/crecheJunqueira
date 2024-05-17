const DoadorModel = require("../models/doadorModel");
const EnderecoModel = require("../models/enderecoModel");
const PessoaModel = require("../models/pessoaModel");

class DoadorController{

    async listagemView(req, resp){
        let doador = new DoadorModel();
        let listaDoadores = await doador.listar();
        resp.render("doadores/listagem", { lista: listaDoadores , layout:false});
    }

    cadastrarView(req, resp){
        resp.render("doadores/cadastrar", {layout:false});
    }

    //cadastrar
    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.disponibilidade != "" && req.body.cpf != "" &&
        req.body.nome != "" ) {

            let doador = new DoadorModel(req.body.cpf, req.body.nome, 0,req.body.tipo_doacao, req.body.creche_codigo );
            let endereco = new EnderecoModel(0,req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf,req.body.cpf);

            let result = await doador.cadastrar();
            let resultEndereco = await endereco.cadastrar();

            if(result && resultEndereco) {
                resp.send({
                    ok: true,
                    msg: "Doador cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar doador!"
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
        let doadorModel = new DoadorModel();
        let doador = await doadorModel.obter(req.params.codigo) ;
        let enderecoModel = new EnderecoModel();
        let endereco = await enderecoModel.obterPorCpf(doador.cpf) ;
        res.render('doadores/alterar', {doador:doador, endereco: endereco, layout:false});
    }

    async alterar(req, resp){


        if(req.body.disponibilidade != "" && req.body.cpf != "" &&
        req.body.nome != "" ) {
            let doador = new DoadorModel(req.body.cpf, req.body.nome, req.body.codigo,req.body.tipo_doacao, req.body.creche_codigo );
            let endereco = new EnderecoModel(req.body.codigoEndereco,req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf);
            let result = await doador.alterar();
            let resultEndereco = await endereco.alterar();

            if(result && resultEndereco) {
                resp.send({
                    ok: true,
                    msg: "Doador alterado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar cadastro de doador!"
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
        let doadorModel = new DoadorModel();
        let doador = await doadorModel.obter(req.params.codigo);
        let enderecoModel = new EnderecoModel();
        let endereco = await enderecoModel.obterPorCpf(doador.cpf) ;
        res.render('doadores/deletar', {doador:doador, endereco: endereco, layout:false});
    }

    async deletar(req, resp){
        let doador = new DoadorModel(req.body.cpf, req.body.nome, req.body.codigo,req.body.tipo_doacao, req.body.creche_codigo );
        let endereco = new EnderecoModel(req.body.codigoEndereco,req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf);
        let resultEndereco = await endereco.deletar();
        let result = await doador.deletar();

        if(result && resultEndereco) {
            resp.send({
                ok: true,
                msg: "Doador deletado com sucesso!"
            });
        }   
        else{
            resp.send({
                ok: false,
                msg: "Erro ao deletar doador!"
            });
        }
    }
}

module.exports = DoadorController;