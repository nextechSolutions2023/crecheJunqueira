const Database = require("../utils/database");

const banco = new Database();

class VendasModel {

    #codigo
    #data
    #total

    get codigo() {
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }

    get data() {
        return this.#data;
    }
    set data(data){
        this.#data = data;
    }

    get total() {
        return this.#total;
    }
    set total(total){
        this.#total = total;
    }


    constructor(codigo, data, total) {
        this.#codigo = codigo;
        this.#data = data;
        this.#total = total
    }

    async listar() {
        let sql = "select * from tb_vendas";
        let valores = [];
        let rows = await banco.ExecutaComando(sql, valores);
        let listaVendas = [];
        for(let i =0; i< rows.length; i++) {
            let row = rows[i];
            listaVendas.push(new VendasModel(row["codigo"], row["data"], row["total"]));
        }
        return listaVendas;
    }

    async gravar() {
        let sql = "insert into tb_vendas (data, total) values (now(), 0)";     
       let valores = [];
        let result = await banco.ExecutaComandoLastInserted(sql, valores);
        return result;
    }

    async atualizar(codigo){
        let sql = "update tb_vendas set total = ? where codigo = ?";
        let valores = [this.#total, codigo];

        return await banco.ExecutaComandoNonQuery(sql, valores);
    }
}

module.exports = VendasModel;