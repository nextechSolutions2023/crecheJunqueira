class HomeController{
    
    homeView(req, res){
        res.render('home');
    }

    contatoView(req,res){
        res.render('contato',  {layout:false});
    }

    recursosView(req, res){
        res.render('administrativo/dashboard', {layout:false});
    }

    sobrenosView(req,res){
        res.render('sobre_nos', {layout:false});
    }

}

module.exports = HomeController;