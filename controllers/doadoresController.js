const DoadorModel = require("../models/doadorModel");
const EnderecoModel = require("../models/enderecoModel");
const PessoaModel = require("../models/pessoaModel");
const TelefoneModel = require("../models/telefoneModel");


class DoadorController{

    async listagemView(req, resp){
        let doador = new DoadorModel();
        let listaDoadores = await doador.listar();
        resp.render("doadores/listagem", { lista: listaDoadores , layout:"layoutAdmin"});
    }

    cadastrarView(req, resp){
        resp.render("doadores/cadastrar", {layout:false});
    }

    //cadastrar
    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.cpf != "" && req.body.nome != "" &&
        req.body.tipo_doacao != "" ) {

            let doador = new DoadorModel(req.body.cpf, req.body.nome, 0,req.body.tipo_doacao, req.body.creche_codigo );
            let endereco = new EnderecoModel(0,req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf,req.body.cpf);
            let telefone = new TelefoneModel(0, req.body.telefone, req.body.cpf);

            let result = await doador.cadastrar();
            let resultEndereco = await endereco.cadastrar();
            let resultTel = await telefone.cadastrar();

            if(result && resultEndereco && resultTel) {
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
        let telefoneModel = new TelefoneModel();
        let telefone = await telefoneModel.obterPorCpf(doador.cpf);
        res.render('doadores/alterar', {doador:doador, endereco: endereco, telefone:telefone, layout:"layoutadmin"});
    }

    async alterar(req, resp){


        if(req.body.cpf != "" && req.body.nome != "" &&
        req.body.tipo_doacao != "" )  {
            let doador = new DoadorModel(req.body.cpf, req.body.nome, req.body.codigo,req.body.tipo_doacao, req.body.creche_codigo );
            let endereco = new EnderecoModel(req.body.codigoEndereco,req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf);
            let telefone = new TelefoneModel(req.body.codigoTelefone, req.body.telefone, req.body.cpf);

            let result = await doador.alterar();
            let resultEndereco = await endereco.alterar();
            let resultTel = await telefone.alterar();


            if(result && resultEndereco && resultTel) {
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
        let telefoneModel = new TelefoneModel();
        let telefone = await telefoneModel.obterPorCpf(doador.cpf) ;
        res.render('doadores/deletar', {doador:doador, endereco: endereco, telefone:telefone,layout:"layoutAdmin"});
    }

    async deletar(req, resp){
        let doador = new DoadorModel(req.body.cpf, req.body.nome, req.body.codigo,req.body.tipo_doacao, req.body.creche_codigo );
        let endereco = new EnderecoModel(req.body.codigoEndereco,req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf);
        let telefone = new TelefoneModel(req.body.codigoTelefone, req.body.telefone, req.body.cpf);

        let resultEndereco = await endereco.deletar();
        let resultTel = await telefone.deletar();
        let result = await doador.deletar();


        if(result && resultEndereco && resultTel) {
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