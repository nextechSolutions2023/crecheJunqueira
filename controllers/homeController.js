class HomeController{
    
    homeView(req, res){
        res.render('home');
    }

    contatoView(req,res){
        res.render('contato');
    }

    loginView(){
        res.render('login');
    }

}

module.exports = HomeController;