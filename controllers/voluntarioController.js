const VoluntarioModel = require("../models/voluntarioModel");

class VoluntarioController{

    async listagemView(req, resp){
        let voluntario = new VoluntarioModel();
        let listaVoluntarios = await voluntario.listar()
        resp.render("voluntarios/listagem", { lista: listaVoluntarios });
    }

    cadastrarView(req, resp){
        resp.render("voluntarios/cadastrar");
    }

    //cadastrar
    async cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.voluntarioNome != "" && req.body.voluntarioNascimento != "" && req.body.voluntarioCpf != "" &&
        req.body.voluntarioRg != "" && req.body.voluntarioGenero != "" && req.body.voluntarioCep != "" && req.body.voluntarioRua != "" && req.body.voluntarioNumero != "" && req.body.voluntarioComplemento != "" && req.body.voluntarioBairro != "" 
        && req.body.voluntarioCidade != "" && req.body.voluntarioUf != "" && req.body.voluntarioEmail != "" && req.body.voluntarioTelefone != "" && req.body.voluntarioContVoluntario != "" && req.body.voluntarioDisponibilidade != "" 
        && req.body.voluntarioPeriodo != "" && req.body.voluntarioSenha != '0') {

            let voluntario = new VoluntarioModel(0, req.body.voluntarioNome ,req.body.voluntarioNascimento ,req.body.voluntarioCpf ,req.body.voluntarioRg , req.body.voluntarioGenero , req.body.voluntarioCep , 
                req.body.voluntarioRua , req.body.voluntarioNumero , req.body.voluntarioComplemento , req.body.voluntarioBairro ,req.body.voluntarioCidade ,req.body.voluntarioUf,req.body.voluntarioEmail ,req.body.voluntarioTelefone ,
                req.body.voluntarioContVoluntario ,req.body.voluntarioDisponibilidade,req.body.voluntarioPeriodo,req.body.voluntarioSenha);

            let result = await voluntario.cadastrar();

            if(result) {
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
        let voluntario = await voluntarioModel.obter(req.params.id) 
        res.render('voluntario/alterar', {voluntario:voluntario});
    }

    async alterar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.voluntarioNome != "" && req.body.voluntarioNascimento != "" && req.body.voluntarioCpf != "" &&
        req.body.voluntarioRg != "" && req.body.voluntarioGenero != "" && req.body.voluntarioCep != "" && req.body.voluntarioRua != "" && req.body.voluntarioNumero != "" && req.body.voluntarioComplemento != "" && req.body.voluntarioBairro != "" 
        && req.body.voluntarioCidade != "" && req.body.voluntarioUf != "" && req.body.voluntarioEmail != "" && req.body.voluntarioTelefone != "" && req.body.voluntarioContVoluntario != "" && req.body.voluntarioDisponibilidade != "" 
        && req.body.voluntarioPeriodo != "" && req.body.voluntarioSenha != '0') {

            let voluntario = new VoluntarioModel(req.body.voluntarioNome ,req.body.voluntarioNascimento ,req.body.voluntarioCpf ,req.body.voluntarioRg , req.body.voluntarioGenero , req.body.voluntarioCep , 
                req.body.voluntarioRua , req.body.voluntarioNumero , req.body.voluntarioComplemento , req.body.voluntarioBairro ,req.body.voluntarioCidade ,req.body.voluntarioUf,req.body.voluntarioEmail ,req.body.voluntarioTelefone ,
                req.body.voluntarioContVoluntario ,req.body.voluntarioDisponibilidade,req.body.voluntarioPeriodo,req.body.voluntarioSenha);

            let result = await voluntario.alterar();

            if(result) {
                resp.send({
                    ok: true,
                    msg: "Voluntário alterado com sucesso!"
                });
            }   
            else{
                resp.send({
                    ok: false,
                    msg: "Erro ao alterar cadastro de voluntário!"
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
        let voluntarioModel = new VoluntarioModel();
        let voluntario = await voluntarioModel.obter(req.params.id) 
        res.render('voluntario/deletar', {voluntario:voluntario});
    }

    async deletar(req, resp){
        let msg = "";
        let cor = "";
        
        let voluntario = new VoluntarioModel(req.body.voluntarioNome ,req.body.voluntarioNascimento ,req.body.voluntarioCpf ,req.body.voluntarioRg , req.body.voluntarioGenero , req.body.voluntarioCep , 
            req.body.voluntarioRua , req.body.voluntarioNumero , req.body.voluntarioComplemento , req.body.voluntarioBairro ,req.body.voluntarioCidade ,req.body.voluntarioUf,req.body.voluntarioEmail ,req.body.voluntarioTelefone ,
            req.body.voluntarioContVoluntario ,req.body.voluntarioDisponibilidade,req.body.voluntarioPeriodo,req.body.voluntarioSenha);

        let result = await voluntario.deletar();

        if(result) {
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