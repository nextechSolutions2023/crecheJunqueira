const EventoModel = require("../models/eventoModel");
const ContatoModel = require("../models/contatoModel");

class HomeController{
    
    homeView(req, res){
        res.render('home/home');
    }

    contatoView(req,res){
        res.render('home/contato');
    }

    DoacaoView(req,res){
        res.render('home/doacao');
    }

    recursosView(req, res){
        res.render('administrativo/dashboard', {layout:"layoutAdmin"});
    }

    sobrenosView(req,res){
        res.render('home/sobre_nos');
    }

    integrantesView(req, resp){
        resp.render("home/nextechsolutions", {layout:false});
    }

    transparenciaView(req, res){
        res.render('transparencia', {layout:false});
    }

    async listarEventosView(req, res) {
        let eventoModel = new EventoModel();
        let lista = await eventoModel.listarEventosPublico();
        res.render('home/eventos', {lista: lista});
    }

    async contatoEnviar(req,res){
        var ok = true;
        if(req.body.codigo != "" && req.body.nome != "" && req.body.email != "" && 
        req.body.assunto != '0' && req.body.mensagem != '') {
            let arquivo = req.file != null ? req.file.filename : null;
            let contato = new ContatoModel (0, 
                req.body.nome, req.body.email, 
                 req.body.assunto, req.body.mensagem, arquivo, 0);

            ok = await contato.gravarMensagem();
        }
        else{
            ok = false;
        }
    }
}

module.exports = HomeController;
