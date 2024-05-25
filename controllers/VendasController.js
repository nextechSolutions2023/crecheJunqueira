const VendasProdutosModel = require("../models/VendasProdutosModel");
const VendasModel = require("../models/VendasModel");
const ProdutoModel = require("../models/produtoModel");

const Database = require("../utils/database");

class VendasController {

    async listar(req, res) {
        let vendasItem = new VendasProdutosModel();
        let vendas = await vendasItem.listarVendas();
        res.render('vendas/listar', { vendas: vendas, layout:"layoutAdmin"});
    }

    async filtrar(req, res) {
        let termo = req.params.termo;
        let filtro = req.params.filtro;
        let vendasItem = new VendasProdutosModel();
        var lista = await vendasItem.listarVendas(termo, filtro);

        res.send(lista);
    }

    async gravar(req, res) {
        console.log(req.body);
    
        if (req.body != null) {
    
            let listaProdutos = [];
            //validação de estoque
            let listaValidacao = [];
            for (let i = 0; i < req.body.length; i++) {
                let codigo = req.body[i].codigo;
                let quantidade = req.body[i].quantidade;
                let produto = new ProdutoModel();
                if (await produto.validarEstoque(codigo, quantidade) == false) {
                    listaValidacao.push(codigo);
                }
            }
    
            if (listaValidacao.length == 0) {
                //prosseguir com a gravação
                let vendas = new VendasModel();
                let codigo = await vendas.gravar();
                let produto = new ProdutoModel();
                let total = 0;
                //gerar os itens do pedido
                for (let i = 0; i < req.body.length; i++) {
                    let vendasItem = new VendasProdutosModel();
    
                    vendasItem.quantidade = req.body[i].quantidade;
    
                    vendasItem.vendas_codigo = codigo;
    
                    vendasItem.produtos_codigo = req.body[i].codigo
    
                    produto = await produto.buscarProduto(req.body[i].codigo);
                    produto.estoque = produto.estoque - vendasItem.quantidade;
                    produto.gravar();
    
                    vendasItem.preco = produto.preco;
    
                    vendasItem.valor_total = vendasItem.quantidade * vendasItem.preco;
                    total += vendasItem.valor_total;
                    vendasItem.gravar();
                }
    
                vendas.total = total;
                vendas.atualizar(codigo);
    
                res.send({ ok: true, msg: "Pedido realizado!" });
    
            } else {
                res.send({ ok: false, msg: "Erro durante a validação de estoque", lista: listaValidacao })
            }
    
        } else {
            res.send({ ok: false, msg: "carrinho vazio!" });
        }
    }
    

}

module.exports = VendasController;