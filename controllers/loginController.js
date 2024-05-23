const UsuarioModel = require("../models/usuarioModel");

class LoginController {

    loginView(req,res){
        res.render('./login/login', {layout:false});
        // res.render('dashboard', {layout:false});
    }

    
    async login(req, res) {
        let msg = "";
        if(req.body.email != null && req.body.senha != null) {
            let usuario = new UsuarioModel();
            usuario = await usuario.obterPorEmailSenha(req.body.email, req.body.senha);
            if(usuario != null) {
                res.cookie("usuarioLogado", usuario.usuarioId);
                return res.redirect("/dashboard"); // teste return
            }
            else {
                msg = "Usuário/Senha incorretos!";
            }
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }

        res.render('login/login', { msg: msg, layout: 'login/login' });
    }
}

module.exports = LoginController;