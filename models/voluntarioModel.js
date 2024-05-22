const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class voluntarioModel extends PessoaModel{

    #codigo;
    #disponibilidade;
    #habilidadecodigo;

    set codigo(codigo) { this.#codigo = codigo};
    get codigo() { return this.#codigo;}

    set disponibilidade(disponibilidade) { this.#disponibilidade = disponibilidade}
    get disponibilidade() { return this.#disponibilidade;}

    set habilidadecodigo(habilidadecodigo) { this.#habilidadecodigo = habilidadecodigo}
    get habilidadecodigo() { return this.#habilidadecodigo;}

    constructor(cpf, nome, codigo, disponibilidade ,habilidadecodigo, crechecodigo) {

        super (cpf, nome, crechecodigo);
        this.#codigo = codigo;
        this.#disponibilidade = disponibilidade;
        this.#habilidadecodigo = habilidadecodigo;
        this.telefone = null;
    }

    #telefone;
    set telefone(telefone) { this.#telefone = telefone}
    get telefone() { return this.#telefone;}

    async listar() {

        let sql = "select v.codigo, nome, v.pessoa_cpf, disponibilidade, habilidade_codigo, creche_codigo, t.numero " +
                  "from tb_voluntarios v join tb_pessoa p on p.cpf = v.pessoa_cpf " +
                  "left join tb_telefone t on t.pessoa_cpf = v.pessoa_cpf";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        

        for(let i = 0; i < rows.length; i++) {
            console.log(rows[i]);
            let voluntario = new voluntarioModel(rows[i]["pessoa_cpf"], rows[i]["nome"], rows[i]["codigo"], rows[i]["disponibilidade"], rows[i]["habilidade_codigo"], rows[i]["creche_codigo"] );
            voluntario.telefone = rows[i]["numero"] || null;
            lista.push(voluntario);
        }
        return lista;
    }

    async cadastrar() {
        await super.cadastrarPessoa();
        let sql = "insert into tb_voluntarios (disponibilidade, pessoa_cpf, habilidade_codigo) values (?,?,?)";
        let valores = [this.#disponibilidade, this.cpf, this.#habilidadecodigo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(codigo){
        let sql = "select * from tb_voluntarios v join tb_pessoa p on p.cpf = v.pessoa_cpf where v.codigo = " + codigo;

        let rows = await banco.ExecutaComando(sql);
        let voluntario = new voluntarioModel(rows[0]["pessoa_cpf"], rows[0]["nome"], rows[0]["codigo"], rows[0]["disponibilidade"], rows[0]["habilidade_codigo"], rows[0]["creche_codigo"]);
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