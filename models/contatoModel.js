const Database = require("../utils/database");
const conexao = new Database();

class ContatoModel {
    #codigo;
    #nome;
    #email;
    #assunto;
    #mensagem;
    #arquivo;
    #creche_codigo

    getCodigo() {
        return this.#codigo;
    }
    setCodigo(codigo) {
        this.#codigo = codigo;
    }

    getNome() {
        return this.#nome;
    }
    setNome(nome) {
        this.#nome = nome;
    }

    getEmail() {
        return this.#email;
    }
    setEmail(email) {
        this.#email = email;
    }

    getAssunto() {
        return this.#assunto;
    }
    setAssunto(assunto) {
        this.#assunto = assunto;
    }

    getMensagem() {
        return this.#mensagem;
    }
    setMensagem(mensagem) {
        this.#mensagem = mensagem;
    }

    getArquivo() {
        return this.#arquivo;
    }
    setArquivo(arquivo) {
        this.#arquivo = arquivo;
    }

    getCreche_codigo() {
        return this.#creche_codigo;
    }
    setCreche_codigo(creche_codigo) {
        this.#creche_codigo = creche_codigo;
    }
        
    constructor(codigo, nome, email, assunto, mensagem, arquivo, creche_codigo) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#email = email;
        this.#assunto = assunto;
        this.#mensagem = mensagem;
        this.#arquivo = arquivo;
        this.#creche_codigo = creche_codigo;
    }

    async gravarMensagem() {
        if(this.#codigo == 0){
            let sql = "insert into tb_contato (nome, email, assunto, mensagem, arquivo, creche_codigo) values (?, ?, ?, ?,?,?)";

            let valores = [this.#nome, this.#email, this.#assunto, this.#mensagem, this.#arquivo, 0];

            return await conexao.ExecutaComandoNonQuery(sql, valores);
        }

    }
    

    async listarMensagens() {
        let sql = 'select * from tb_contato';
        try {
            var rows = await conexao.ExecutaComando(sql);

            let listaRetorno = [];

            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    var row = rows[i];

                    let arquivo = "";
                    if (row["arquivo"] != null) {
                        arquivo = global.CAMINHO_DOC_CONTATO + row["arquivo"];
                    }

                    listaRetorno.push(new ContatoModel(
                        row['contato_codigo'], row['nome'], row['email'], row['assunto'], row['mensagem'], arquivo,
                        row['creche_codigo']));
                }
            } else {
                console.log("Nenhuma mensagem encontrada.");
            }

            return listaRetorno;
            
        } catch (error) {
            console.error("Erro ao listar mensagens:", error);
            throw error;
        }
    }
    
    async excluirMensagem(codigo) {
        let sql = "DELETE FROM tb_contato WHERE contato_codigo = ?";
        let valores = [codigo];
        let result = await conexao.ExecutaComandoNonQuery(sql, valores);
        return result;
    }


}
module.exports = ContatoModel;
