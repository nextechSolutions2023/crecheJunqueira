const Database = require("../utils/database");


const banco = new Database();

class ContatoModel {
    #codigo;
    #nome;
    #email;
    #assunto;
    #mensagem;
    #arquivo;

    getCodigo() {
        return this.#codigo;
    }

    getNome() {
        return this.#nome;
    }

    getEmail() {
        return this.#email;
    }

    getAssunto() {
        return this.#assunto;
    }

    getMensagem() {
        return this.#mensagem;
    }

    getArquivo() {
        return this.#arquivo;
    }

    // Setters
    setCodigo(codigo) {
        this.#codigo = codigo;
    }

    setNome(nome) {
        this.#nome = nome;
    }

    setEmail(email) {
        this.#email = email;
    }

    setAssunto(assunto) {
        this.#assunto = assunto;
    }

    setMensagem(mensagem) {
        this.#mensagem = mensagem;
    }

    setArquivo(arquivo) {
        this.#arquivo = arquivo;
    }

    constructor(codigo, nome, email, assunto, mensagem, arquivo) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#email = email;
        this.#assunto = assunto;
        this.#mensagem = mensagem;
        this.#arquivo = arquivo;
    }

    async gravar(){
        if(this.#codigo == 0){
            let sql = "insert into tb_contato (nome, email, assunto, mensagem, arquivo) values (?,?,?,?,?)";

            let valores = [this.#nome, this.#email, this.#assunto, this.#mensagem, this.#arquivo];

            return await banco.ExecutaComandoNonQuery(sql, valores);
        }
    }
}

module.exports = ContatoModel;
