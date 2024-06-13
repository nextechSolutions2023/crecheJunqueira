const EventoModel = require("../models/eventoModel");
const ContatoModel = require("../models/contatoModel");

class HomeController{
    
    homeView(req, res) {
        let nome = "";
    
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
    
        
        res.render('home/home', { nome: nome });
    }
    

    contatoView(req,res){
        let nome = "";
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
    
        res.render('home/contato',{nome:nome});
    }

    DoacaoView(req,res){
        let nome = "";
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
    
        res.render('home/doacao',{nome:nome});
    }

    recursosView(req, res){
        res.render('administrativo/dashboard', {layout:"layoutAdmin"});
    }

    sobrenosView(req,res){
        let nome = "";
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
    
        res.render('home/sobre_nos',{nome:nome});
    }

    integrantesView(req, resp){
        resp.render("home/nextechsolutions", {layout:false});
    }

    transparenciaView(req, res){
        let nome = "";
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
    
        res.render('transparencia', {layout:false, nome:nome});
    }

    async listarEventosView(req, res) {
        let nome = "";
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
    
        let eventoModel = new EventoModel();
        let lista = await eventoModel.listarEventosPublico();
        res.render('home/eventos', {lista: lista, nome:nome});
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
        
        res.send({ ok: ok })
    }
}

module.exports = HomeController;
