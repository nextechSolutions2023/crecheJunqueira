const Database = require("../utils/database");

const banco = new Database();

class PessoaModel {

    #cpf;
    #nome;
    #crechecodigo;

    set cpf(cpf) {this.#cpf = cpf};
    get cpf(){return this.#cpf};

    set nome(nome) {this.#nome = nome};
    get nome(){return this.#nome};

    set crechecodigo(crechecodigo) {this.#crechecodigo = crechecodigo};
    get crechecodigo(){return this.#crechecodigo};

    constructor(cpf, nome, crechecodigo) {

        
        this.#cpf = cpf;
        this.#nome = nome;
        this.#crechecodigo = crechecodigo;
    }

    // async listar() {

    //     let sql = "select * from tb_pessoa";

    //     let rows = await banco.ExecutaComando(sql);
    //     let lista = [];

    //     for(let i = 0; i < rows.length; i++) {
    //         lista.push(new PessoaModel(rows[i]["cpf"], rows[i]["nome"],rows[i]["creche_codigo"] ));
    //     }
    //     return lista;
    // }

    async cadastrarPessoa() {
        let sql = "insert into tb_pessoa (cpf, nome, creche_codigo) values (?,?,?)";

        let valores = [this.#cpf, this.#nome, this.#crechecodigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterarPessoa(){
        let sql = "update tb_pessoa set nome = ? where cpf = ?";
        let valores = [this.#nome, this.#cpf];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletarPessoa(){
        let sql = "delete from tb_pessoa where cpf = ?";

        let valores = [this.#cpf];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

};

module.exports = PessoaModel;