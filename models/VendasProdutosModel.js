const Database = require("../utils/database");

const banco = new Database();

class VendasProdutosModel {

    #vendas_codigo;
    #produtos_codigo;
    #quantidade;
    #preco;
    #valor_total;

    get vendas_codigo() {
        return this.#vendas_codigo;
    }
    set vendas_codigo(vendas_codigo) {
        this.#vendas_codigo = vendas_codigo;
    }

    get produtos_codigo() {
        return this.#produtos_codigo;
    }
    set produtos_codigo(produtos_codigo) {
        this.#produtos_codigo = produtos_codigo;
    }

    get quantidade() {
        return this.#quantidade;
    }
    set quantidade(quantidade) {
        this.#quantidade = quantidade;
    }

    get preco() {
        return this.#preco;
    }
    set preco(preco) {
        this.#preco = preco;
    }

    get valor_total() {
        return this.#valor_total;
    }
    set valor_total(valor_total) {
        this.#valor_total = valor_total;
    }


    constructor(vendas_codigo, produtos_codigo, quantidade, preco, valor_total) {
        this.#vendas_codigo = vendas_codigo;
        this.#produtos_codigo = produtos_codigo;
        this.#quantidade = quantidade;
        this.#preco = preco;
        this.#valor_total = valor_total;
    }

    async listar() {
        let sql = "select * from tb_vendas_produtos";

        let valores = [];

        let rows = await banco.ExecutaComando(sql, valores);

        let listaItens = [];

        for(let i = 0; i< rows.length; i++) {
            let row = rows[i];
            listaItens.push(new VendasProdutosModel(row["vendas_codigo"], row["produtos_codigo"], row["quantidade"], row["preco"], row["valor_total"]));
        }

        return listaItens;
    }

    async gravar() {
        let sql = "insert into tb_vendas_produtos (vendas_codigo,produtos_codigo,quantidade,preco,valor_total) values (?, ?, ?, ?, ?)";
        let valores = [this.#vendas_codigo, this.#produtos_codigo, this.#quantidade, this.#preco, this.#valor_total];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    }
}

module.exports = VendasProdutosModel;