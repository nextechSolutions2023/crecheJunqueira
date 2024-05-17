const EventoModel = require("../models/eventoModel");
//const EnderecoModel = require("../models/enderecoModel");
//const PessoaModel = require("../models/pessoaModel");
const fs = require("fs");

class EventoController {

    async listarView(req, res) {
        let prod = new EventoModel();
        let lista = await prod.listarEventos();
        res.render('evento/listar', {lista: lista, layout:"layoutAdmin"});
    }

    async excluirEvento(req, res){
        var ok = true;
        if(req.body.ref != "") {
            let evento = new EventoModel();
            ok = await evento.excluir(req.body.ref);
        }
        else{
            ok = false;
        }

        res.send({ok: ok});
    }
    async cadastrarEvento(req, res){
        var ok = true;
        if(req.body.descricao != "" && req.body.ref != "" && req.body.nome != "" ) {
            let arquivo = req.file != null ? req.file.filename : null;
            let evento = new EventoModel(0, req.body.descricao, req.body.ref, req.body.nome, arquivo);
                //alterei aqui let evento = new EventoModel(0, req.body.ref, 
                //req.body.nome, req.body.descricao, "", "", arquivo);
            ok = await evento.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async alterarView(req, res){
        let evento = new EventoModel();
        //let marca = new MarcaModel();
        
        //let categoria = new CategoriaModel();
        if(req.params.codigo != undefined && req.params.codigo != ""){
            evento = await evento.buscarEvento(req.params.codigo);
        }

        //let listaMarca = await marca.listarMarcas();
        //let listaCategoria = await categoria.listarCategorias();
        res.render("evento/alterar", {eventoAlter: evento, layout:"layoutAdmin"});
    }

    async alterarEvento(req, res) {
        var ok = true;
        if(req.body.descricao != "" && req.body.ref != "" && req.body.nome != "" ) {

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

            let evento = new EventoModel(req.body.codigo, req.body.descricao, req.body.ref, req.body.nome, imagem )
            //alterei
            //let evento = new EventoModel(req.body.codigo, req.body.ref, req.body.nome, req.body.descricao, "", "", imagem);
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
}

module.exports = EventoController;