const Database = require("../utils/database");

const conexao = new Database();
class ProdutoModel {

    #codigo;
    #descricao;
    #preco;
    #estoque;
    #imagem;
    #possuiImagem;

    get codigo() { return this.#codigo; } set codigo(codigo) {this.#codigo = codigo;}
    get descricao() { return this.#descricao; } set descricao(descricao) {this.#descricao = descricao;}
    get estoque() { return this.#estoque; } set estoque(estoque) {this.#estoque = estoque;}
    get imagem() { return this.#imagem; } set imagem(imagem) {this.#imagem = imagem;}
    get possuiImagem() { return this.#possuiImagem; } set possuiImagem(possuiImagem) {this.#possuiImagem = possuiImagem;}
    get preco() { return this.#preco; } set preco(preco) {this.#preco = preco;}


    constructor(codigo, descricao, estoque, imagem, preco) {
        this.#codigo = codigo
        this.#descricao = descricao
        this.#estoque = estoque
        this.#imagem = imagem;
        this.#preco = preco;
    }

    async excluir(codigo){
        let sql = "delete from tb_produtos where codigo = ?"
        let valores = [codigo];

        var result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async validarEstoque(codigo, estoque) {

        let sql = "select * from tb_produtos where codigo= ? and estoque >= ?";
        let valores = [codigo, estoque];

        let rows = await conexao.ExecutaComando(sql, valores);
        
        return rows.length > 0;
    }

    async gravar() {
        if(this.#codigo == 0){
            let sql = "insert into tb_produtos (descricao, estoque, imagem, preco) values (?, ?, ?, ?)";

            let valores = [this.#descricao, this.#estoque, this.#imagem, this.#preco];

            return await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            //alterar

            this.#imagem = this.#imagem.replaceAll(global.CAMINHO_IMG_BROWSER, '')
            let sql = "update tb_produtos set descricao =?, estoque= ?, imagem = ?, preco = ? where codigo = ?";

            let valores = [this.#descricao, 
                this.#estoque, 
               this.#imagem, this.#preco, this.#codigo];

            return await conexao.ExecutaComandoNonQuery(sql, valores) > 0;
        }
    }

    async buscarProduto(codigo){
        let sql = `select * from tb_produtos where codigo = ?`;
        let valores = [codigo];
        var rows = await conexao.ExecutaComando(sql, valores);
        
        console.log(rows);

        let produto = null;

        if(rows.length > 0){
            var row = rows[0];

            let imagem = "";
            
            produto = new ProdutoModel(row['codigo'], 
            row['descricao'], row['estoque'], null,row['preco']);

            if(row["imagem"] != null) {
                produto.imagem = global.CAMINHO_IMG_BROWSER + row["imagem"];
                produto.possuiImagem = true;
            }
            else {
                produto.imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";
                produto.possuiImagem = false;
            }

        }

        return produto;
    }

    async listarProdutos() {

        let sql = 'select * from tb_produtos ';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){

                var row = rows[i];

                let imagem = "";
                if(row["imagem"] != null) {
                    imagem = global.CAMINHO_IMG_BROWSER + row["imagem"];
                }
                else {
                    imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";
                }

                listaRetorno.push(new ProdutoModel( 
                row['codigo'], row['descricao'], row['estoque'], imagem,
                row['preco']));



            }
        }

        return listaRetorno;
    }

    toJSON() {
        return {
            "descricao": this.#descricao,
            "estoque": this.#estoque,
            "imagem": this.#imagem, 
            "preco": this.#preco,
            "codigo": this.#codigo,
        }
    }
}

module.exports = ProdutoModel;