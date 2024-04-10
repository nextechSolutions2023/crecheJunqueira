const Database = require("../utils/database");

const banco = new Database();

class atividadeModel {

    #codigo;
    #descricao;

    set codigo(codigo) { this.#codigo = codigo};
    get codigo() { return this.#codigo;}

    set descricao(descricao) { this.#descricao = descricao};
    get descricao() { return this.#descricao;}

    constructor(codigo, descricao) {

        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    async listar() {

        let sql = "select * from tb_atividade";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        

        for(let i = 0; i < rows.length; i++) {
            let atividade = new atividadeModel(rows[i]["codigo"], rows[i]["descricao"]);
            lista.push(atividade);
        }
        return lista;
    }

    async cadastrar() {
        let sql = "insert into tb_atividade (descricao) values (?)";
        let valores = [this.#descricao];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(codigo){
        let sql = "select * from tb_atividade where codigo = " + codigo;

        let rows = await banco.ExecutaComando(sql);
        let atividade = new atividadeModel(rows[0]["codigo"], rows[0]["descricao"]);
        return atividade;
    }

    //alterar
    async alterar(){
        let sql = "update tb_atividade set descricao = ? where codigo = ?";

        let valores = [this.#descricao,this.#codigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    //deletar
    async deletar(){
        let sql = "delete from tb_atividade where codigo = ?";

        let valores = [this.#codigo];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = atividadeModel;