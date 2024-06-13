const ProdutoModel = require("../models/produtoModel");

class VitrineController {

    async vitrineView(req, res) {
        let nome = "";
        if (req.cookies && req.cookies.usuarioLogado != null) {
            const usuarioLogado = JSON.parse(req.cookies.usuarioLogado);
            nome = usuarioLogado.nome;
        }
    
        let produto = new ProdutoModel();
        let lista = await produto.listarProdutos();
        res.render('loja/vitrine', {produtos: lista, layout:false, nome:nome});
    }

}

module.exports = VitrineController;