class LoginController {

    loginView(req,res){
        res.render('login/login', {layout:false});
    }

    // Login(req, res){
    //     let msgLogin = "";
    //     let corLogin = "";
    //     if(req.body.adm === "adm" && req.body.admSenha === "1234"){
    //         msgLogin = "Login bem sucedido!";
    //         corLogin = "color:blue";
    //     }
    //     else{
    //         msgLogin = "Voluntário ou Senha Inválido";
    //         corLogin = "color:red";
    //     }

    //     res.render('login', {msgLogin: msgLogin, corLogin:corLogin});
    // }
}

module.exports = LoginController;