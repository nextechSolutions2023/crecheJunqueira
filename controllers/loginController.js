class LoginController {

    login(req, res){
        res.render("login/login");
    }

    LoginView(req, res){
        let msgLogin = "";
        let corLogin = "";
        if(req.body.voluntario === "maria" && req.body.voluntarioSenha === "1234"){
            msgLogin = "Login bem sucedido!";
            corLogin = "color:blue";
        }
        else{
            msgLogin = "Voluntário ou Senha Inválido";
            corLogin = "color:red";
        }

        res.render('login/login', {msgLogin: msgLogin, corLogin:corLogin});
    }
}

module.exports = LoginController;