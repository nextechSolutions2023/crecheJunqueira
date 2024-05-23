const Database = require("../utils/database");

const banco = new Database();

class TelefoneModel{

    #codigo;
    #numeroTel;
    #pessoa_cpf;

    set codigo(codigo) { this.#codigo = codigo; }
    get codigo() { return this.#codigo; }

    set numeroTel(numeroTel) { this.#numeroTel = numeroTel; }
    get numeroTel() { return this.#numeroTel; }

    set pessoa_cpf(cpf) { this.#pessoa_cpf = cpf; }
    get pessoa_cpf() { return this.#pessoa_cpf; }

    constructor(codigo, numeroTel, pessoa_cpf) {
        this.#codigo = codigo;
        this.#numeroTel = numeroTel;
        this.#pessoa_cpf = pessoa_cpf;
    }

    async listar() {

        let sql = "select * from tb_telefone";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        

        for(let i = 0; i < rows.length; i++) {
            let telefone = new TelefoneModel(
                rows[i]["codigo"], rows[i]["numero"], rows[i]["pessoa_cpf"]);
    
            lista.push(telefone);
        }
        return lista;
    }


    async cadastrar() {
        let sql = "INSERT INTO tb_telefone (numero, pessoa_cpf) VALUES (?,?)";
        let valores = [this.#numeroTel, this.#pessoa_cpf];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterar() {
        let sql = "UPDATE tb_telefone SET numero = ? WHERE pessoa_cpf = ?";
        let valores = [this.#numeroTel, this.#pessoa_cpf];
    
        let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }
    

    async obterPorCpf(cpf) {
        let sql = "SELECT * FROM tb_telefone WHERE pessoa_cpf = " + cpf;
        let rows = await banco.ExecutaComando(sql);

        return new TelefoneModel(rows[0]["codigo"], rows[0]["numero"], rows[0]["pessoa_cpf"]);

    }

    async deletar() {
        let sql = "DELETE FROM tb_telefone WHERE codigo = ?";
        let valores = [this.#codigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = TelefoneModel;
