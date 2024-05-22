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

    set codigo(codigo) {this.#codigo = codigo};
    get codigo(){return this.#codigo};

    set logradouro(logradouro) {this.#logradouro = logradouro };
    get logradouro(){ return this.#logradouro};

    set numero(numero) {this.#numero = numero };
    get numero(){return this.#numero};

    set complemento(complemento) {this.#complemento = complemento };
    get complemento(){return this.#complemento};

    set bairro(bairro) {this.#bairro = bairro };
    get bairro(){return this.#bairro};

    set cidade(cidade) {this.#cidade = cidade};
    get cidade(){return this.#cidade};

    set cep(cep) {this.#cep = cep };
    get cep(){return this.#cep};

    set uf(uf) {this.#uf = uf};
    get uf(){return this.#uf};

    set pessoacpf(pessoacpf) {this.#pessoacpf = pessoacpf};
    get pessoacpf(){return this.#pessoacpf};

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
        let sql = "select * from tb_endereco where pessoa_cpf = ?";
        let valores = [cpf];
        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0){
            let row = rows[0];
            return new EnderecoModel(row["codigo"], row["logradouro"], row["numero"], 
            row["complemento"], row["bairro"], row["cidade"], row["cep"], row["uf"], row["pessoa_cpf"]);
        }
        
        return null;
        
    }

    async deletar(){
        let sql = "delete from tb_endereco where codigo = ?";

        let valores = [this.#codigo];
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
};

module.exports = EnderecoModel;