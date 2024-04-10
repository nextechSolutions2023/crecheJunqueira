class HomeController{
    
    homeView(req, res){
        res.render('home');
    }

    contatoView(req,res){
        res.render('contato');
    }

    recursosView(req, res){
        res.render('recursos');
    }



    sobrenosView(req,res){
        res.render('sobre_nos');
    }

}

module.exports = HomeController;