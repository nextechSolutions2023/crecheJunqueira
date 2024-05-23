const EventoModel = require("../models/eventoModel");
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
}

module.exports = HomeController;
