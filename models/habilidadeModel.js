const Database = require("../utils/database");

const banco = new Database();

class habilidadeModel{

    #codigo;
    #descricao;
    
    set codigo(codigo) { this.#codigo = codigo};
    get codigo() { return this.#codigo;}

    set descricao(descricao) { this.#descricao = descricao}
    get descricao() { return this.#descricao;}

    constructor(codigo, descricao) {

        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    async listar() {

        let sql = "select * from tb_habilidade";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        

        for(let i = 0; i < rows.length; i++) {
            let habilidade = new habilidadeModel(
                rows[i]["codigo"], rows[i]["descricao"]);
    
            lista.push(habilidade);
        }
        return lista;
    }

    async cadastrar() {
        let sql = "INSERT INTO tb_habilidade (descricao) VALUES (?)";

        let valores = [this.descricao];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(codigo){
        let sql = "SELECT * FROM tb_habilidade where codigo = " + codigo;

        let rows = await banco.ExecutaComando(sql);
        let habilidade = new habilidadeModel(rows[0]["codigo"], rows[0]["descricao"]);
        return habilidade;
    }

    //alterar
    async alterar(){
        let sql = "UPDATE tb_habilidade SET descricao = ? WHERE codigo = ?";

        let valores = [this.#descricao, this.#codigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    //deletar
    async deletar(){
        let sql = "DELETE FROM tb_habilidade WHERE codigo = ?";

        let valores = [this.#codigo];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = habilidadeModel;