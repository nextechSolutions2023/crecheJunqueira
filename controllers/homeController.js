class HomeController{
    
    homeView(req, res){
        res.render('home/home');
    }

    contatoView(req,res){
        res.render('home/contato');
    }

    recursosView(req, res){
        res.render('administrativo/dashboard', {layout:"layoutAdmin"});
    }

    sobrenosView(req,res){
        res.render('home/sobre_nos');
    }

    doacaoView(req,res){
        res.render("home/doacao");
    }

    integrantesView(req, resp){
        resp.render("home/nextechsolutions", {layout:false});
    }


}

module.exports = HomeController;