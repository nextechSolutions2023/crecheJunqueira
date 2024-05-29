const Database = require("../utils/database");

const banco = new Database();


class PatrimonioModel {

    #id;
    #codigo;
    #descricao;
    #quantidade;
    #crechecodigo;

    set id(id) {this.#id = id};
    get id(){return this.#id};

    set codigo(codigo) {this.#codigo = codigo};
    get codigo(){return this.#codigo};

    set descricao(descricao) {this.#descricao = descricao};
    get descricao(){return this.#descricao};

    set quantidade(quantidade) {this.#quantidade = quantidade};
    get quantidade(){return this.#quantidade};

    set crechecodigo(crechecodigo) {this.#crechecodigo = crechecodigo};
    get crechecodigo(){return this.#crechecodigo};

    constructor(id, codigo, descricao, quantidade, crechecodigo) {

        this.#id = id;
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#quantidade = quantidade;
        this.#crechecodigo = crechecodigo;
    }

    async listarPatrimonios() {

        let sql = "select * from tb_patrimonio";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new PatrimonioModel(rows[i]["id"], rows[i]["codigo"], rows[i]["descricao"], rows[i]["quantidade"]));
        }
        return lista;
    }

    async validarEstoque(id, quantidade) {

        let sql = "select * from tb_patrimonio where id = ? and quantidade >= ?";
        let valores = [id, quantidade];

        let rows = await banco.ExecutaComando(sql, valores);
        
        return rows.length > 0;
    }


    async gravar() {
        if(this.#id == 0){
            let sql = "insert into tb_patrimonio (id, codigo, descricao, quantidade) values (?, ?, ?, ?)";

            let valores = [this.#id, this.#codigo, this.#descricao, this.#quantidade];

            return await banco.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            //alterar
            let sql = "update tb_patrimonio set codigo = ?, descricao =?, quantidade= ? where id = ?";

            let valores = [this.#codigo, this.#descricao, 
                this.#quantidade, 
                this.#id];

            return await banco.ExecutaComandoNonQuery(sql, valores) > 0;
        }
    }

    async obter(id) {
        let sql = "select * from tb_patrimonio where id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new PatrimonioModel(row["id"], row["codigo"], row["descricao"], row["quantidade"], row["creche_codigo"]);
        }

        return null;
    }

    async excluir(id) {
        let sql = "delete from tb_patrimonio where id = ?";

        let valores = [id];
        
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = PatrimonioModel