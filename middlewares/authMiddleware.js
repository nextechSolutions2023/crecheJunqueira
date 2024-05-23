const UsuarioModel = require("../models/usuarioModel");


class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            let usuarioId = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(usuarioId);
            if(usuario != null && usuario.usuarioAtivo == 1 && usuario.perfilId == 1) {
               return next(); // teste return
            }
            else{
              return res.redirect("/login"); // teste
            }
        }
        else{
           return res.redirect("/login"); // teste
        }
    }

}

module.exports = AuthMiddleware;