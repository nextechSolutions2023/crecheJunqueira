const EventoModel = require("../models/eventoModel");
const fs = require("fs");

class EventoController {

    async listarView(req, res) {
        let even = new EventoModel();
        let lista = await even.listarEventosAdmin();
        res.render('evento/listar', {lista: lista, layout:"layoutAdmin"});
    }

    //
    // async excluirEvento(req, res){
    //     var ok = true;
    //     if(req.body.ref != "") {
    //         let evento = new EventoModel();
    //         ok = await evento.excluir(req.body.ref);
    //     }
    //     else{
    //         ok = false;
    //     }

    //     res.send({ok: ok});
    // }

    //excluir
    // async excluirView(req, res) {
    //     let eventoModel = new EventoModel();
    //     let evento = await eventoModel.buscarEvento(req.params.codigo);
    //     res.render('evento/excluir', {eventoExcluir: evento, layout:"layoutAdmin"});
    // }
    async excluirView(req, res) {
        let eventoModel = new EventoModel();
        let evento = await eventoModel.buscarEvento(req.params.codigo);
        res.render('evento/excluir', {eventoExcluir: evento, layout:"layoutAdmin"});
    }

    async excluir(req, resp){
        let eventoModel = 
        new EventoModel();
        let evento = await eventoModel.buscarEvento(req.body.codigo); 
        
        //excluir imagem
        if (evento.possuiImagem && evento.imagem !== "/img/sem-foto.png") {
            fs.unlinkSync(global.RAIZ_PROJETO + "/public" + evento.imagem);
        }

        let result = await evento.excluir();
        if(result) {
            return resp.send({
                ok: true,
                msg: "Evento deletado com sucesso!"
            });
        }   
        else{
            return resp.send({
                ok: false,
                msg: "Erro ao deletar evento!"
            });
        }
    }

    async cadastrarEvento(req, res){
        var ok = true;
        // if(req.body.descricao != "" && req.body.ref != "" && req.body.nome != "" ) {
        //     let arquivo = req.file != null ? req.file.filename : null;
        //     let evento = new EventoModel(0, req.body.ref, req.body.nome, req.body.descricao, arquivo, req.body.data, null, req.body.local);
        //     ok = await evento.gravar();
        // }
        // else{
        //     ok = false;
        // }
        if(req.body.nome != "" &&  req.body.descricao != "" && req.body.data != "" && req.body.local != "") {
            let arquivo = req.file != null ? req.file.filename : null;
            let evento = new EventoModel(0, req.body.nome, req.body.descricao, arquivo, req.body.data, null, req.body.local);
            ok = await evento.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async alterarView(req, res){
        let evento = new EventoModel();
        
        if(req.params.codigo != undefined && req.params.codigo != ""){
            evento = await evento.buscarEvento(req.params.codigo);
        }

        res.render("evento/alterar", {eventoAlter: evento, layout:"layoutAdmin"});
    }

    async alterarEvento(req, res) {
        var ok = true;
        // if(req.body.descricao != "" && req.body.ref != "" && req.body.nome != "" ) {
        if(req.body.nome != "" &&  req.body.descricao != "" && req.body.data != "" && req.body.local != "") {
            let eventoOld = new EventoModel();
            eventoOld = await eventoOld.buscarEvento(req.body.codigo);
            //apagar a imagem do evento se tiver uma nova imagem na alteração e se o antigo tiver imagem
            let imagem = null
            //se o file tiver preenchcodigoo, significa que a imagem será alterada
            if(req.file != null) {
                imagem = req.file.filename;
                //se o meu evento já tiver uma imagem cadastrada, faço a deleção com o fs
                if(eventoOld.possuiImagem) {
                    let imagemAntiga = eventoOld.imagem;
                    fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntiga);
                }
            }
            else{ //se não, a imagem antiga deve ser mantida, mas apenas se houver
                if(eventoOld.possuiImagem) {
                    imagem = eventoOld.imagem.toString().split("/").pop();
                }
            }

            let evento = new EventoModel(req.body.codigo, req.body.nome, req.body.descricao, imagem, req.body.data, req.body.status, req.body.local)
           
            ok = await evento.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async cadastroView(req, res) {
        res.render("evento/cadastrar", {layout:"layoutAdmin"});
    }

    async obter(req, res) {
        let codigo = req.params.evento;
        let evento = new EventoModel();
        evento = await evento.buscarEvento(codigo);

        res.send({eventoEncontrado: evento});
    }

    //aprovar
    async aprovar(req, resp){
        
        let eventoModel = new EventoModel();
        let evento = await eventoModel.buscarEvento(req.body.codigo);
        
        let dataEvento = new Date(evento.eventoData);
        let dataHoje = new Date();
        if (dataEvento <= dataHoje) {
            return resp.send({
                ok: false,
                msg: "Data do evento é anterior a data atual!"
            });
        }

        let result = await evento.aprovar();

        if(result) {
            resp.send({
                ok: true,
                msg: "Evento aprovado com sucesso!"
            });
        }   
        else{
            resp.send({
                ok: false,
                msg: "Erro ao aprovar evento!"
            });
        }
    }

    
    async reprovar(req, resp){
        
        let eventoModel = new EventoModel();
        let evento = await eventoModel.buscarEvento(req.body.codigo);
        
        let dataEvento = new Date(evento.eventoData);
        let dataHoje = new Date();
        if (dataEvento <= dataHoje) {
            return resp.send({
                ok: false,
                msg: "Erro ao reprovar evento. A data é anterior a data atual!"
            });
        }

        let result = await evento.reprovar();

        if(result) {
            resp.send({
                ok: true,
                msg: "Evento reprovado com sucesso!"
            });
        }   
        else{
            resp.send({
                ok: false,
                msg: "Erro ao reprovar evento!"
            });
        }
    }
}

module.exports = EventoController;