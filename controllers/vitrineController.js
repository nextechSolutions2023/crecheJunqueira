const ProdutoModel = require("../models/produtoModel");

class VitrineController {

    async vitrineView(req, res) {
        let produto = new ProdutoModel();
        let lista = await produto.listarProdutos();
        res.render('loja/vitrine', {produtos: lista, layout:false});
    }

}

module.exports = VitrineController;