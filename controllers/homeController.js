const EventoModel = require("../models/eventoModel");
class HomeController{
    
    homeView(req, res){
        let nome = "";
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            nome = req.cookies.usuarioLogado;
        }
        res.render('home/home',{nome:nome});
    }

    contatoView(req,res){
        let nome = "";
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            nome = req.cookies.usuarioLogado;
        }
        res.render('home/contato',{nome:nome});
    }

    DoacaoView(req,res){
        let nome = "";
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            nome = req.cookies.usuarioLogado;
        }
        res.render('home/doacao',{nome:nome});
    }

    recursosView(req, res){
        res.render('administrativo/dashboard', {layout:"layoutAdmin"});
    }

    sobrenosView(req,res){
        let nome = "";
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            nome = req.cookies.usuarioLogado;
        }
        res.render('home/sobre_nos',{nome:nome});
    }

    integrantesView(req, resp){
        resp.render("home/nextechsolutions", {layout:false});
    }

    transparenciaView(req, res){
        let nome = "";
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            nome = req.cookies.usuarioLogado;
        }
        res.render('transparencia', {layout:false, nome:nome});
    }

    async listarEventosView(req, res) {
        let nome = "";
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            nome = req.cookies.usuarioLogado;
        }
        let eventoModel = new EventoModel();
        let lista = await eventoModel.listarEventosPublico();
        res.render('home/eventos', {lista: lista, nome:nome});
    }
}

module.exports = HomeController;
