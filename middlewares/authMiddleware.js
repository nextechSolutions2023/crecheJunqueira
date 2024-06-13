const UsuarioModel = require("../models/usuarioModel");


class AuthMiddleware {

    // async verificarUsuarioLogado(req, res, next) {
    //     try {
    //         if (req.cookies && req.cookies.usuarioLogado) {
    //             let usuarioId = req.cookies.usuarioLogado;
    //             let usuarioModel = new UsuarioModel();
    //             let usuario = await usuarioModel.obterPorEmailSenha(usuarioId);
    
    //             if (usuario && usuario.usuarioAtivo === 1 && usuario.perfilId === 1) {
    //                 return next();
    //             } else {
    //                 return res.redirect("/login");
    //             }
    //         } else {
    //             return res.redirect("/login");
    //         }
    //     } catch (error) {
    //         console.error('Erro ao verificar usuário logado:', error);
    //         return res.status(500).send('Erro interno ao verificar usuário logado');
    //     }
    // }

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            let usuarioId = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(usuarioId);
                        
            if(usuario != null && usuario.usuarioAtivo == 1 && usuario.perfilId == 1) {
                res.locals.usuarioLogado = usuario;
                return next(); 
            }
            else{
              return res.redirect("/login"); 
            }
        }
        else{
           return res.redirect("/login"); 
        }
    }

}

module.exports = AuthMiddleware;