const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class voluntarioModel extends PessoaModel{

    #codigo;
    #disponibilidade;
    #habilidadecodigo;

    setcodigo(codigo) { this.#codigo = codigo};
    getcodigo() { return this.#codigo;}

    setdisponibilidade(disponibilidade) { this.#disponibilidade = disponibilidade}
    getdisponibilidade() { return this.#disponibilidade;}

    sethabilidadecodigo(habilidadecodigo) { this.#habilidadecodigo = habilidadecodigo}
    gethabilidadecodigo() { return this.#habilidadecodigo;}

    constructor(cpf, nome, codigo, disponibilidade ,habilidadecodigo, crechecodigo) {

        super (cpf, nome, crechecodigo);
        this.#codigo = codigo;
        this.#disponibilidade = disponibilidade;
        this.#habilidadecodigo = habilidadecodigo;
    }

    async listar() {

        let sql = "select * from tb_voluntarios v join tb_pessoa p on p.cpf = v.pessoa_cpf";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new voluntarioModel(rows[i]["pessoa_cpf"], rows[i]["nome"], rows[i]["codigo"], rows[i]["disponibilidade"], rows[i]["habilidade_codigo"], rows[i]["creche_codigo"] ));
        }
        return lista;
    }

    async cadastrar() {
        await super.cadastrarPessoa();
        let sql = "insert into tb_voluntarios (disponibilidade, pessoa_cpf, habilidade_codigo) values (?,?,?)";
        let valores = [this.#disponibilidade, this.getcpf(), this.#habilidadecodigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(codigo){
        let sql = "select * from tb_voluntarios where codigo = " + codigo;

        let rows = await banco.ExecutaComando(sql);
        let voluntario = new voluntarioModel(rows[i]["pessoa_cpf"], rows[i]["nome"], rows[i]["codigo"], rows[i]["disponibilidade"], rows[i]["habilidade_codigo"], rows[i]["creche_codigo"]);
        
        return voluntario;
    }

    //alterar
    async alterar(){
        await super.alterarPessoa();
        let sql = "update tb_voluntarios set disponibilidade = ?, habilidade_codigo = ? where codigo = ?";

        let valores = [this.#disponibilidade, this.#habilidadecodigo, this.#codigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    //deletar
    async deletar(){
        let sql = "delete from tb_voluntarios where codigo = ?";

        let valores = [this.#codigo];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        await super.deletarPessoa();

        return result;
    }
}

module.exports = voluntarioModel;