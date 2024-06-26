const VoluntarioModel = require("../models/voluntarioModel");
const EnderecoModel = require("../models/enderecoModel");
const HabilidadeModel = require("../models/habilidadeModel");
const TelefoneModel = require("../models/telefoneModel");

class VoluntarioController{

    async listagemView(req, resp){
        let voluntario = new VoluntarioModel();
        let listaVoluntarios = await voluntario.listar();
        console.log(listaVoluntarios);
        resp.render("voluntarios/listagem", {lista: listaVoluntarios, layout:"layoutAdmin"});

    }

    async cadastrarView(req, resp){
        let nome = "";
        
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
        
        let habilidade = new HabilidadeModel();
        let listaHabilidades = await habilidade.listar();
        resp.render("voluntarios/cadastrar", { habilidades: listaHabilidades,layout:false, nome:nome});
    }

    //cadastrar
    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.disponibilidade != "" && req.body.cpf != "" &&
        req.body.nome != "" ) {

            let voluntario = new VoluntarioModel(req.body.cpf, req.body.nome, 0,req.body.disponibilidade, req.body.habilidadecodigo, req.body.ativoInativo, req.body.creche_codigo);
            let endereco = new EnderecoModel(0,req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf,req.body.cpf);
            let telefone = new TelefoneModel(0, req.body.telefone, req.body.cpf);

            let result = await voluntario.cadastrar();
            let resultEndereco = await endereco.cadastrar();
            let resultTel = await telefone.cadastrar();

            if(result && resultEndereco && resultTel) {
                resp.send({
                    ok: true,
                    msg: "Voluntário cadastrado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao cadastrar voluntário!"
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
        let voluntarioModel = new VoluntarioModel();
        let voluntario = await voluntarioModel.obter(req.params.codigo) ;

        let enderecoModel = new EnderecoModel();
        let endereco = await enderecoModel.obterPorCpf(voluntario.cpf) ;

        let telefoneModel = new TelefoneModel();
        let telefone = await telefoneModel.obterPorCpf(voluntario.cpf) ;

        let habilidade = new HabilidadeModel();
        let listaHabilidades = await habilidade.listar();
        res.render('voluntarios/alterar', {voluntario:voluntario, endereco: endereco, telefone: telefone, habilidades: listaHabilidades, layout:"layoutAdmin"});

    }

    async alterar(req, resp) {
        if(req.body.disponibilidade != "" && req.body.cpf != "" &&
           req.body.nome != ""  && req.body.habilidadecodigo != "") {
            let voluntario = new VoluntarioModel(req.body.cpf, req.body.nome, req.body.codigo, req.body.disponibilidade, req.body.habilidadecodigo, req.body.crechecodigo );
            let endereco = new EnderecoModel(req.body.codigoEndereco, req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf, req.body.cpf);
            let telefone = new TelefoneModel(req.body.codigoTelefone, req.body.telefone, req.body.cpf);
    
            let result = await voluntario.alterar();
            let resultEndereco = await endereco.alterar();
            let resultTel = await telefone.alterar();
    
            if(result && resultEndereco && resultTel) {
                resp.send({
                    ok: true,
                    msg: "Voluntário alterado com sucesso!"
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar cadastro de voluntário!"
                });
            }
        } else {
            resp.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }
    
    //deletar
    async deletarView(req, res) {
        let voluntarioModel = new VoluntarioModel();
        let voluntario = await voluntarioModel.obter(req.params.codigo);

        let enderecoModel = new EnderecoModel();
        let endereco = await enderecoModel.obterPorCpf(voluntario.cpf) ;

        let habilidade = new HabilidadeModel();
        let listaHabilidades = await habilidade.listar();

        let telefoneModel = new TelefoneModel();
        let telefone = await telefoneModel.obterPorCpf(voluntario.cpf) ;
        
        res.render('voluntarios/deletar', {voluntario:voluntario, endereco: endereco, habilidades: listaHabilidades, telefone: telefone,layout:"layoutAdmin"});
    }

    async deletar(req, resp){
        let voluntario = new VoluntarioModel(req.body.cpf, req.body.nome, req.body.codigo, req.body.disponibilidade, req.body.habilidadecodigo, req.body.crechecodigo );
        let endereco = new EnderecoModel(req.body.codigoEndereco, req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.cep, req.body.uf, req.body.cpf);
        let telefone = new TelefoneModel(req.body.codigoTelefone, req.body.telefone, req.body.cpf);
        
        let resultTel = await telefone.deletar();
        let resultEndereco = await endereco.deletar();
        let result = await voluntario.deletar();
       

        if(result && resultEndereco && resultTel) {
            resp.send({
                ok: true,
                msg: "Voluntário deletado com sucesso!"
            });
        }   
        else{
            resp.send({
                ok: false,
                msg: "Erro ao deletar voluntário!"
            });
        }
    }
}

module.exports = VoluntarioController;