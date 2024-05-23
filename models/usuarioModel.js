const Database = require ("../utils/database");

const banco = new Database();

class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioSenha;
    #usuarioAtivo;
    #perfilId;
    //implementar getter e setter
    get usuarioId() {
        return this.#usuarioId;
    }
    set usuarioId(usuarioId) {
        this.#usuarioId = usuarioId
    }
    get usuarioNome() {
        return this.#usuarioNome;
    }
    set usuarioNome(usuarioNome) {
        this.#usuarioNome = usuarioNome;
    }

    get usuarioEmail() {
        return this.#usuarioEmail;
    }
    set usuarioEmail(usuarioEmail) {
        this.#usuarioEmail = usuarioEmail;
    }

    get usuarioSenha() {
        return this.#usuarioSenha;
    }

    set usuarioSenha(usuarioSenha) {
        this.#usuarioSenha = usuarioSenha;
    }
    get perfilId() {
        return this.#perfilId;
    }

    set perfilId(perfilId){
        this.#perfilId = perfilId;
    }

    get usuarioAtivo() {
        return this.#usuarioAtivo;
    }
    set usuarioAtivo(usuarioAtivo) {
        this.#usuarioAtivo = usuarioAtivo;
    }

    //implementar construtor
    constructor(usuarioId, usuarioNome, usuarioEmail, usuarioSenha, usuarioAtivo, perfilId) {
        this.#usuarioId = usuarioId;
        this.#usuarioNome = usuarioNome;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioSenha = usuarioSenha;
        this.#usuarioAtivo = usuarioAtivo;
        this.#perfilId = perfilId;
    }

    async obterPorEmailSenha(email, senha) {
        let sql = "select * from tb_usuarioCreche where usuarioEmail = ? and usuarioSenha = ?";

        let valores = [email, senha];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["usuarioId"], row["usuarioNome"], row["usuarioEmail"], row["usuarioSenha"], row["usuarioAtivo"], row["perfilId"]);
        }

        return null;
    }

    //implementar as funções para manipulação das informações no banco
    async listar() {

        let sql = "select * from tb_usuarioCreche";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new UsuarioModel(row["usuarioId"], row["usuarioNome"], row["usuarioEmail"], row["usuarioSenha"], row["usuarioAtivo"], row["perfilId"]));
        }
        return lista;
    }

    async cadastrar() {
        if(this.#usuarioId == 0) {
            let sql = "insert into tb_usuarioCreche (usuarioEmail, usuarioNome, usuarioSenha, usuarioAtivo, perfilId) values (?,?,?,?,?)";

            let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
        }
        else{
            let sql = "update tb_usuarioCreche set usuarioEmail = ?, usuarioNome = ?, usuarioSenha = ?, usuarioAtivo = ?, perfilId = ? where usuarioID = ?";

            let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId, this.#usuarioId];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    async obter(id) {
        let sql = "select * from tb_usuarioCreche where usuarioId = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["usuarioId"], row["usuarioNome"], row["usuarioEmail"], row["usuarioSenha"], row["usuarioAtivo"], row["perfilId"]);
        }

        return null;
    }

    async excluir(id) {
        let sql = "delete from tb_usuarioCreche where usuarioID = ?";

        let valores = [id];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = UsuarioModel;