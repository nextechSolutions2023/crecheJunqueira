const UsuarioModel = require("../models/usuarioModel");

class LoginController {

    loginView(req,res){
        res.render('./login/login', {layout:false});
    }

    async login(req, res) {
        let msg = "";
        if (req.body.email && req.body.senha) {
            let usuario = new UsuarioModel();
            usuario = await usuario.obterPorEmailSenha(req.body.email, req.body.senha);
            if (usuario != null) {
                res.cookie("usuarioLogado", JSON.stringify({ id: usuario.usuarioId, nome: usuario.usuarioNome }));
                return res.redirect("/dashboard"); 
            } else {
                msg = "Usuário/Senha incorretos!";
            }
        } else {
            msg = "Usuário/Senha incorretos!";
        }
    
        res.render('login/login', { msg: msg, layout: 'login/login' });
    }
    

    deslogar(req, res) {
        res.clearCookie("usuarioLogado");
        res.redirect("/");
    }
}

module.exports = LoginController;