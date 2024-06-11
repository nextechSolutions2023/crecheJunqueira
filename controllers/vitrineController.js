const ProdutoModel = require("../models/produtoModel");

class VitrineController {

    async vitrineView(req, res) {
        let nome = "";
        if(req.cookies != undefined && req.cookies.usuarioLogado != null){
            nome = req.cookies.usuarioLogado;
        }
        let produto = new ProdutoModel();
        let lista = await produto.listarProdutos();
        res.render('loja/vitrine', {produtos: lista, layout:false, nome:nome});
    }

}

module.exports = VitrineController;