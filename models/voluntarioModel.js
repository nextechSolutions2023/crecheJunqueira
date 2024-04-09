const Database = require("../utils/database");

const banco = new Database();

class voluntarioModel {

    #voluntarioId;
    #voluntarioNome;
    #voluntarioNascimento;
    #voluntarioCpf;
    #voluntarioRg;
    #voluntarioGenero;
    #voluntarioCep;
    #voluntarioRua;
    #voluntarioNumero;
    #voluntarioComplemento;
    #voluntarioBairro;
    #voluntarioCidade;
    #voluntarioUf;
    #voluntarioEmail;
    #voluntarioTelefone;
    #voluntarioContVoluntario;
    #voluntarioDisponibilidade;
    #voluntarioPeriodo;
    #voluntarioSenha;

    get voluntarioId() { return this.#voluntarioId;}
    set voluntarioId(voluntarioId) { this.#voluntarioId = voluntarioId}

    get voluntarioNome() { return this.#voluntarioNome;}
    set voluntarioNome(voluntarioNome) { this.#voluntarioNome = voluntarioNome}

    get voluntarioNascimento() { return this.#voluntarioNascimento;}
    set voluntarioNascimento(voluntarioNascimento) { this.#voluntarioNascimento = voluntarioNascimento }

    get voluntarioCpf() { return this.#voluntarioCpf;}
    set voluntarioCpf(voluntarioCpf) { this.#voluntarioCpf = voluntarioCpf}

    get voluntarioRg() { return this.#voluntarioRg;}
    set voluntarioRg(voluntarioRg) { this.#voluntarioRg = voluntarioRg}

    get voluntarioGenero() { return this.#voluntarioGenero;}
    set voluntarioGenero(voluntarioGenero) { this.#voluntarioGenero = voluntarioGenero}

    get voluntarioCep() { return this.#voluntarioCep;}
    set voluntarioCep(voluntarioCep) { this.#voluntarioCep = voluntarioCep}

    get voluntarioRua() { return this.#voluntarioRua;}
    set voluntarioRua(voluntarioRua) { this.#voluntarioRua = voluntarioRua}

    get voluntarioNumero() { return this.#voluntarioNumero;}
    set voluntarioNumero(voluntarioNumero) { this.#voluntarioNumero = voluntarioNumero}

    get voluntarioComplemento() { return this.#voluntarioComplemento;}
    set voluntarioComplemento(voluntarioComplemento) { this.#voluntarioComplemento = voluntarioComplemento}

    get voluntarioBairro() { return this.#voluntarioBairro;}
    set voluntarioBairro(voluntarioBairro) { this.#voluntarioBairro = voluntarioBairro}

    get voluntarioCidade() { return this.#voluntarioCidade;}
    set voluntarioCidade(voluntarioCidade) { this.#voluntarioCidade = voluntarioCidade}

    get voluntarioUf() { return this.#voluntarioUf;}
    set voluntarioUf(voluntarioUf) { this.#voluntarioUf = voluntarioUf}

    get voluntarioEmail() { return this.#voluntarioEmail;}
    set voluntarioEmail(voluntarioEmail) { this.#voluntarioEmail = voluntarioEmail}

    get voluntarioTelefone() { return this.#voluntarioTelefone;}
    set voluntarioTelefone(voluntarioTelefone) { this.#voluntarioTelefone = voluntarioTelefone}

    get voluntarioContVoluntario() { return this.#voluntarioContVoluntario;}
    set voluntarioContVoluntario(voluntarioContVoluntario) { this.#voluntarioContVoluntario = voluntarioContVoluntario}

    get voluntarioDisponibilidade() { return this.#voluntarioDisponibilidade;}
    set voluntarioDisponibilidade(voluntarioDisponibilidade) { this.#voluntarioDisponibilidade = voluntarioDisponibilidade}

    get voluntarioPeriodo() { return this.#voluntarioPeriodo;}
    set voluntarioPeriodo(voluntarioPeriodo) { this.#voluntarioPeriodo = voluntarioPeriodo}

    get voluntarioSenha() { return this.#voluntarioSenha;}
    set voluntarioSenha(voluntarioSenha) { this.#voluntarioSenha = voluntarioSenha}
  
    constructor(voluntarioId, voluntarioNome, voluntarioNascimento, voluntarioCpf, voluntarioRg, voluntarioGenero, voluntarioCep, voluntarioRua, voluntarioNumero, voluntarioComplemento, 
        voluntarioBairro, voluntarioCidade, voluntarioUf, voluntarioEmail, voluntarioTelefone, voluntarioContVoluntario, voluntarioDisponibilidade, voluntarioPeriodo, voluntarioSenha ) {

        this.#voluntarioId = voluntarioId;
        this.#voluntarioNome = voluntarioNome;
        this.#voluntarioNascimento = voluntarioNascimento;
        this.#voluntarioCpf = voluntarioCpf;
        this.#voluntarioRg = voluntarioRg;
        this.#voluntarioGenero = voluntarioGenero;
        this.#voluntarioCep = voluntarioCep;
        this.#voluntarioRua = voluntarioRua;
        this.#voluntarioNumero = voluntarioNumero;
        this.#voluntarioComplemento = voluntarioComplemento;
        this.#voluntarioBairro = voluntarioBairro;
        this.#voluntarioCidade = voluntarioCidade;
        this.#voluntarioUf = voluntarioUf;
        this.#voluntarioEmail = voluntarioEmail;
        this.#voluntarioTelefone = voluntarioTelefone;
        this.#voluntarioContVoluntario = voluntarioContVoluntario;
        this.#voluntarioDisponibilidade = voluntarioDisponibilidade;
        this.#voluntarioPeriodo = voluntarioPeriodo;
        this.#voluntarioSenha = voluntarioSenha;
    }

    async listar() {

        let sql = "select * from tb_voluntarios";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new voluntarioModel(rows[i]["voluntario_id"], rows[i]["voluntario_nome"], rows[i]["voluntario_nascimento"], rows[i]["voluntario_cpf"], rows[i]["voluntario_rg"],
            rows[i]["voluntario_genero"], rows[i]["voluntario_cep"], rows[i]["voluntario_rua"], rows[i]["voluntario_numero"], rows[i]["voluntario_complemento"], rows[i]["voluntario_bairro"],
            rows[i]["voluntario_cidade"], rows[i]["voluntario_uf"], rows[i]["voluntario_email"], rows[i]["voluntario_telefone"], rows[i]["voluntario_contvoluntario"],
            rows[i]["voluntario_disponibilidade"], rows[i]["voluntario_periodo"], rows[i]["voluntario_senha"]));
        }
        return lista;
    }

    async cadastrar() {
        let sql = "insert into tb_voluntarios (voluntario_id, voluntario_nome, voluntario_nascimento, voluntario_cpf,voluntario_rg, voluntario_genero, voluntario_cep, voluntario_rua, voluntario_numero, voluntario_complemento, voluntario_bairro, voluntario_cidade, voluntario_uf, voluntario_email, voluntario_telefone, voluntario_contvoluntario, voluntario_disponibilidade, voluntario_periodo, voluntario_senha) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        let valores = [this.#voluntarioId, this.#voluntarioNome, this.#voluntarioNascimento, this.#voluntarioCpf, this.#voluntarioRg, this.#voluntarioGenero, this.#voluntarioCep, 
            this.#voluntarioRua, this.#voluntarioNumero, this.#voluntarioComplemento, this.#voluntarioBairro, this.#voluntarioCidade, this.#voluntarioUf, this.#voluntarioEmail, 
            this.#voluntarioTelefone, this.#voluntarioContVoluntario, this.#voluntarioDisponibilidade, this.#voluntarioPeriodo, this.#voluntarioSenha];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id){
        let sql = "select * from tb_voluntarios where voluntario_id = " + id;

        let rows = await banco.ExecutaComando(sql);
        let voluntario = new voluntarioModel(rows[0]["voluntario_id"], rows[0]["voluntario_nome"], rows[0]["voluntario_nascimento"], rows[0]["voluntario_cpf"],
        rows[0]["voluntario_rg"], rows[0]["voluntario_genero"], rows[0]["voluntario_cep"], rows[0]["voluntario_rua"], rows[0]["voluntario_numero"],
        rows[0]["voluntario_complemento"], rows[0]["voluntario_bairro"], rows[0]["voluntario_cidade"], rows[0]["voluntario_uf"], rows[0]["voluntario_email"],
        rows[0]["voluntario_telefone"], rows[0]["voluntario_contvoluntario"], rows[0]["voluntario_disponibilidade"], rows[0]["voluntario_periodo"], rows[0]["voluntario_senha"]);
        
        return voluntario;
    }

    //alterar
    async alterar(){
        let sql = "update tb_usuario set voluntario_nome = ?, voluntario_nascimento = ?, voluntario_cpf = ?,voluntario_rg = ?, voluntario_genero = ?, voluntario_cep = ?, voluntario_rua = ?, voluntario_numero = ?, voluntario_complemento = ?, voluntario_bairro = ?, voluntario_cidade = ?, voluntario_uf = ?, voluntario_email = ?, voluntario_telefone = ?, voluntario_contvoluntario = ?, voluntario_disponibilidade = ?, voluntario_periodo = ?, voluntario_senha = ? where voluntario_id = ?";

        let valores = [this.#voluntarioNome, this.#voluntarioNascimento, this.#voluntarioCpf, this.#voluntarioRg, this.#voluntarioGenero, this.#voluntarioCep, 
            this.#voluntarioRua, this.#voluntarioNumero, this.#voluntarioComplemento, this.#voluntarioBairro, this.#voluntarioCidade, this.#voluntarioUf, this.#voluntarioEmail, 
            this.#voluntarioTelefone, this.#voluntarioContVoluntario, this.#voluntarioDisponibilidade, this.#voluntarioPeriodo, this.#voluntarioSenha, this.#voluntarioId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    //deletar
    async deletar(){
        let sql = "delete from tb_voluntario where voluntario_id = ?";

        let valores = [this.#voluntarioId];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = voluntarioModel;