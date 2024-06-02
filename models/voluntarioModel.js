const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class voluntarioModel extends PessoaModel{

    #codigo;
    #disponibilidade;
    #habilidadecodigo;
    #ativo_inativo;

    set codigo(codigo) { this.#codigo = codigo};
    get codigo() { return this.#codigo;}

    set disponibilidade(disponibilidade) { this.#disponibilidade = disponibilidade}
    get disponibilidade() { return this.#disponibilidade;}

    set habilidadecodigo(habilidadecodigo) { this.#habilidadecodigo = habilidadecodigo}
    get habilidadecodigo() { return this.#habilidadecodigo;}

    set ativo_inativo(ativo_inativo) { this.#ativo_inativo = ativo_inativo}
    get ativo_inativo() { return this.#ativo_inativo;}

    constructor(cpf, nome, codigo, disponibilidade ,habilidadecodigo, ativo_inativo, crechecodigo) {

        super (cpf, nome, crechecodigo);
        this.#codigo = codigo;
        this.#disponibilidade = disponibilidade;
        this.#ativo_inativo = ativo_inativo;
        this.#habilidadecodigo = habilidadecodigo;
    }

    #telefone;
    set telefone(telefone) { this.#telefone = telefone}
    get telefone() { return this.#telefone;}

    async listar() {

        let sql = "select v.codigo, nome, v.pessoa_cpf, disponibilidade, ativo_inativo, habilidade_codigo, creche_codigo, t.numero " +
                  "from tb_voluntarios v join tb_pessoa p on p.cpf = v.pessoa_cpf " +
                  "left join tb_telefone t on t.pessoa_cpf = v.pessoa_cpf";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        
        
        for(let i = 0; i < rows.length; i++) {
            let voluntario = new voluntarioModel(rows[i]["pessoa_cpf"], rows[i]["nome"], rows[i]["codigo"], rows[i]["disponibilidade"], rows[i]["habilidade_codigo"], rows[i]["ativo_inativo"], rows[i]["creche_codigo"] );
            lista.push(voluntario);
        }
        return lista;
    }

    async listarVoluntariosAtivos() {
        let sql = "SELECT * FROM tb_voluntarios v JOIN tb_pessoa p ON p.cpf = v.pessoa_cpf WHERE v.ativo_inativo = 'Ativo'";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let voluntario = new voluntarioModel(
                rows[i]["pessoa_cpf"],
                rows[i]["nome"],
                rows[i]["codigo"],
                rows[i]["disponibilidade"],
                rows[i]["habilidade_codigo"],
                rows[i]["creche_codigo"]
            );
            lista.push(voluntario);
        }
        return lista;
    }
    

    async cadastrar() {
        await super.cadastrarPessoa();
        let sql = "insert into tb_voluntarios (disponibilidade, pessoa_cpf, habilidade_codigo, ativo_inativo) values (?,?,?,?)";
        let valores = [this.#disponibilidade, this.cpf, this.#habilidadecodigo, this.#ativo_inativo];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(codigo){
        let sql = "select * from tb_voluntarios v join tb_pessoa p on p.cpf = v.pessoa_cpf where v.codigo = " + codigo;

        let rows = await banco.ExecutaComando(sql);
        let voluntario = new voluntarioModel(rows[0]["pessoa_cpf"], rows[0]["nome"], rows[0]["codigo"], rows[0]["disponibilidade"], rows[0]["ativo_inativo"], rows[0]["habilidade_codigo"], rows[0]["creche_codigo"]);
        return voluntario;
    }

    //alterar
    async alterar(){
        await super.alterarPessoa();
        let sql = "update tb_voluntarios set disponibilidade = ?, habilidade_codigo = ?where codigo = ?";

        let valores = [this.#disponibilidade, this.#habilidadecodigo,this.#codigo];

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

    // async atualizarStatusVoluntario(codigo){
    //     let sql = "update tb_voluntarios set ativo_inativo = ? where codigo = " + codigo;

    //     let valores = [this.#ativo_inativo, this.#codigo];

    //     let result = await banco.ExecutaComandoNonQuery(sql, valores);

    //     return result;
    // }

    async atualizarStatusVoluntario(codigo) {
        let sql = "update tb_voluntarios set ativo_inativo = ? where codigo = ?";
        let valores = ["Inativo", codigo]; 
        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    }
}

module.exports = voluntarioModel;