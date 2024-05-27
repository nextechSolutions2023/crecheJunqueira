const Database = require("../utils/database");

const banco = new Database();

class VendasProdutosModel {

    #vendas_codigo;
    #produtos_codigo;
    #quantidade;
    #preco;
    #valor_total;
    #data;
    #total;
    #descricao;

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

    get data() {
        return this.#data;
    }
    set data(data) {
        this.#data = data;
    }

    get total() {
        return this.#total;
    }
    set total(total) {
        this.#total = total;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(descricao) {
        this.#descricao = descricao;
    }

    constructor(vendas_codigo, produtos_codigo, quantidade, preco, valor_total) {
        this.#vendas_codigo = vendas_codigo;
        this.#produtos_codigo = produtos_codigo;
        this.#quantidade = quantidade;
        this.#preco = preco;
        this.#valor_total = valor_total;
    }

    async listarVendas(termo, filtro) {
        let sqlFiltro = "";
        if(termo !== "") {
            if(filtro === "1") {
                termo = "%" + termo + "%";
                sqlFiltro = ` WHERE p.descricao LIKE ?`;
            } else if(filtro === "2") {
                sqlFiltro = ` WHERE v.codigo = ?`;
            }
        }

        let sql = `SELECT v.codigo AS vendas_codigo, v.data, v.total, vp.quantidade, vp.preco, p.descricao, vp.produtos_codigo 
                    FROM tb_vendas v
                    JOIN tb_vendas_produtos vp ON v.codigo = vp.vendas_codigo
                    JOIN tb_produtos p ON p.codigo = vp.produtos_codigo
                    ${sqlFiltro}`;
                   
        let valores = [];
        if(sqlFiltro !== ""){
            valores.push(termo);
        }
        
        let rows = await banco.ExecutaComando(sql, valores);
        let lista = [];

        for(let row of rows){
            let vendasProduto = new VendasProdutosModel(row["vendas_codigo"], row["produtos_codigo"], row["quantidade"], row["preco"], null);
            vendasProduto.descricao = row['descricao'];

            let data = new Date(row['data']);
            let dataFormatada = data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    
            vendasProduto.data = dataFormatada;
            vendasProduto.total = row['total'];
            lista.push(vendasProduto);
        }

        return lista;
    }

    async listar() {
        let sql = "SELECT * FROM tb_vendas_produtos";
        let valores = [];
        let rows = await banco.ExecutaComando(sql, valores);
        let listaItens = [];

        for(let row of rows) {
            listaItens.push(new VendasProdutosModel(row["vendas_codigo"], row["produtos_codigo"], row["quantidade"], row["preco"], row["valor_total"]));
        }

        return listaItens;
    }

    async gravar() {
        let sql = "INSERT INTO tb_vendas_produtos (vendas_codigo,produtos_codigo,quantidade,preco,valor_total) VALUES (?, ?, ?, ?, ?)";
        let valores = [this.#vendas_codigo, this.#produtos_codigo, this.#quantidade, this.#preco, this.#valor_total];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    toJSON() {
        return {
            "vendas_codigo": this.#vendas_codigo,
            "produtos_codigo": this.#produtos_codigo,
            "quantidade": this.#quantidade,
            "preco": this.#preco,
            "valor_total": this.#valor_total,
            "data": this.#data,
            "total": this.#total,
            "descricao": this.#descricao
        }
    }
}

module.exports = VendasProdutosModel;
