const Database = require("../utils/database");

const banco = new Database();

class EnderecoModel{

    #codigo;
    #logradouro;
    #numero;
    #complemento;
    #bairro;
    #cidade;
    #cep;
    #uf;
    #pessoacpf;

    setcodigo(codigo) {this.#codigo = codigo};
    getcodigo(){this.#codigo};

    setlogradouro(logradouro) {this.#logradouro = logradouro };
    getlogradouro(){this.#logradouro};

    setnumero(numero) {this.#numero = numero };
    getnumero(){this.#numero};

    setcomplemento(complemento) {this.#complemento = complemento };
    getcomplemento(){this.#complemento};

    setbairro(bairro) {this.#bairro = bairro };
    getbairro(){this.#bairro};

    setcidade(cidade) {this.#cidade = cidade};
    getcidade(){this.#cidade};

    setcep(cep) {this.#cep = cep };
    getcep(){this.#cep};

    setuf(uf) {this.#uf = uf};
    getuf(){this.#uf};

    setpessoacpf() {this.#pessoacpf = pessoacpf};
    get(){this.#pessoacpf};

    constructor(codigo, logradouro, numero, complemento, bairro, cidade, cep, uf, pessoacpf) {

        this.#codigo = codigo;
        this.#logradouro = logradouro;
        this.#numero = numero;
        this.#complemento = complemento;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#cep = cep;
        this.#uf = uf;
        this.#pessoacpf = pessoacpf;
    }

    async cadastrar() {
        let sql = "insert into tb_endereco (logradouro, numero, complemento, bairro, cidade, cep, uf, pessoa_cpf) values (?,?,?,?,?,?,?,?)";

        let valores = [this.#logradouro, this.#numero, this.#complemento, this.#bairro, this.#cidade, this.#cep, this.#uf, this.#pessoacpf];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterar(){
        
        let sql = "update tb_endereco set logradouro = ?,numero = ?, complemento = ? , bairro = ?, cidade = ?, cep = ?, uf = ? where codigo = ?";

        let valores = [this.#logradouro, this.#numero, this.#complemento, this.#bairro, this.#cidade, this.#cep, this.#uf, this.#codigo];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obterPorCpf(cpf){
        let sql = "select * from tb_endereco where pessoa_cpf = " + cpf;

        let rows = await banco.ExecutaComando(sql);
        let endereco = new EnderecoModel(rows[i]["codigo"], rows[i]["logradouro"], rows[i]["numero"], rows[i]["complemento"], rows[i]["bairro"], rows[i]["cidade"], rows[i]["cep"], rows[i][uf], rows[i][pessoa_cpf]);
        
        return endereco;
    }

    async deletar(){
        let sql = "delete from tb_endereco where codigo = ?";

        let valores = [this.#codigo];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
};

module.exports = EnderecoModel;