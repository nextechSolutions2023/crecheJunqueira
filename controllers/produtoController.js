const ProdutoModel = require("../models/produtoModel");
const fs = require("fs");

class ProdutoController {

    async listarView(req, res) {
        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();
        res.render('produto/listar', {lista: lista, layout:false});
    }

    async excluirProduto(req, res){

        var ok = true;
        if(req.body.codigo != "") {
            let produto = new ProdutoModel();
            let prod_imagem = await produto.buscarProduto(req.body.codigo);

            if (prod_imagem.possuiImagem) {
                fs.unlinkSync(global.RAIZ_PROJETO + "/public" + prod_imagem.imagem);
            }

            ok = await produto.excluir(req.body.codigo);

        }
        else{
            ok = false;
        }

        res.send({ok: ok});
    }
    async cadastrarProduto(req, res){
        var ok = true;
        if(req.body.codigo != "" && req.body.descricao != "" && 
        req.body.preco > 0 && req.body.estoque  != '0') {
            let arquivo = req.file != null ? req.file.filename : null;
            let produto = new ProdutoModel(0, 
                req.body.descricao, req.body.estoque, 
                 arquivo, req.body.preco);

            ok = await produto.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async alterarView(req, res){
        let produto = new ProdutoModel();
        
        if(req.params.codigo != undefined && req.params.codigo != ""){
            produto = await produto.buscarProduto(req.params.codigo);
        }

        res.render("produto/alterar", {produtoAlter: produto, layout:false});
    }

    async alterarProduto(req, res) {
        var ok = true;

        console.log(req.body);
        
        if(req.body.codigo != "" && req.body.descricao != "" && req.body.preco > 0 && req.body.estoque  != '0' ) {

            let produtoOld = new ProdutoModel();
            produtoOld = await produtoOld.buscarProduto(req.body.codigo);
            //apagar a imagem do produto se tiver uma nova imagem na alteração e se o antigo tiver imagem
            let imagem = null
            //se o file tiver preenchcodigoo, significa que a imagem será alterada
            if(req.file != null) {
                imagem = req.file.filename;
                //se o meu produto já tiver uma imagem cadastrada, faço a deleção com o fs
                if(produtoOld.possuiImagem) {
                    let imagemAntiga = produtoOld.imagem;
                    fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntiga);
                }
            }
            else{ //se não, a imagem antiga deve ser mantcodigoa, mas apenas se houver
                if(produtoOld.possuiImagem)
                    imagem = produtoOld.imagem.toString().split("/").pop();
            }

            let produto = new ProdutoModel(req.body.codigo, req.body.descricao, req.body.estoque, imagem, req.body.preco);
            ok = await produto.gravar();


        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async cadastroView(req, res) {

        res.render('produto/cadastrar', {layout:false});
    }

    async obter(req, res) {
        let codigo = req.params.produto;
        
        console.log('Param ' + codigo);
        let produto = new ProdutoModel();
        produto = await produto.buscarProduto(codigo);

        res.send({produtoEncontrado: produto, layout:false});
    }
}

module.exports = ProdutoController;