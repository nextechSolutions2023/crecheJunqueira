const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class doadorModel extends PessoaModel{

    #codigo;
    #tipo_doacao;

    set codigo(codigo) { this.#codigo = codigo};
    get codigo() { return this.#codigo;}

    set tipo_doacao(tipo_doacao) { this.#tipo_doacao = tipo_doacao};
    get tipo_doacao() { return this.#tipo_doacao;}

    constructor(cpf, nome, codigo, tipo_doacao, crechecodigo) {

        super (cpf, nome, crechecodigo);
        this.#codigo = codigo;
        this.#tipo_doacao = tipo_doacao;
    }

    async listar() {

        let sql = "select * from tb_doador v join tb_pessoa p on p.cpf = v.pessoa_cpf";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        

        for(let i = 0; i < rows.length; i++) {
            let doador = new doadorModel(rows[i]["pessoa_cpf"], rows[i]["nome"], rows[i]["codigo"], rows[i]["tipo_doacao"], rows[i]["creche_codigo"] );
            lista.push(doador);
        }
        return lista;
    }

    async cadastrar() {
        await super.cadastrarPessoa();
        let sql = "insert into tb_doador (tipo_doacao, pessoa_cpf) values (?,?)";
        let valores = [this.#tipo_doacao, this.cpf];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(codigo){
        let sql = "select * from tb_doador v join tb_pessoa p on p.cpf = v.pessoa_cpf where v.codigo = " + codigo;

        let rows = await banco.ExecutaComando(sql);
        let doador = new doadorModel(rows[0]["pessoa_cpf"], rows[0]["nome"], rows[0]["codigo"], rows[0]["tipo_doacao"], rows[0]["creche_codigo"] );
        return doador;
    }

    //alterar
    async alterar(){
        await super.alterarPessoa();
        let sql = "update tb_doador set tipo_doacao = ? where codigo = ?";

        let valores = [this.#tipo_doacao,this.#codigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    //deletar
    async deletar(){
        let sql = "delete from tb_doador where codigo = ?";

        let valores = [this.#codigo];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        await super.deletarPessoa();

        return result;
    }
}

module.exports = doadorModel;