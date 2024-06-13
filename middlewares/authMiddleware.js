const UsuarioModel = require("../models/usuarioModel");


class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if (req.cookies && req.cookies.usuarioLogado) {
            let usuarioCookie = JSON.parse(req.cookies.usuarioLogado);
            let usuarioId = usuarioCookie.id;
            let usuarioNome = usuarioCookie.nome;
    
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(usuarioId);
    
            if (usuario && usuario.usuarioAtivo === 1 && usuario.perfilId === 1) {
                res.locals.usuarioLogado = { id: usuario.usuarioId, nome: usuario.usuarioNome };
                return next();
            } else {
                return res.redirect("/login");
            }
        } else {
            return res.redirect("/login");
        }
    }
    
}

module.exports = AuthMiddleware;