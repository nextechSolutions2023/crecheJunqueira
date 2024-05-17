const Database = require("../utils/database");

const conexao = new Database();
class EventoModel {

    #eventoCodigo;
    #eventoRef;
    #eventoNome;
    #eventoDescricao;
    #imagem;
    #possuiImagem;

    get eventoCodigo() { return this.#eventoCodigo; } set eventoCodigo(eventoCodigo) {this.#eventoCodigo = eventoCodigo;}
    get eventoRef() { return this.#eventoRef; } set eventoRef(eventoRef) {this.#eventoRef = eventoRef;}
    get eventoNome() { return this.#eventoNome; } set eventoNome(eventoNome) {this.#eventoNome = eventoNome;}
    get eventoDescricao() { return this.#eventoDescricao; } set eventoDescricao(eventoDescricao) {this.#eventoDescricao = eventoDescricao;}
    get imagem() { return this.#imagem; } set imagem(imagem) {this.#imagem = imagem;}
    get possuiImagem() { return this.#possuiImagem; } set possuiImagem(possuiImagem) {this.#possuiImagem = possuiImagem;}
   
    constructor(eventoCodigo, eventoRef, eventoNome, eventoDescricao, imagem) {
        this.#eventoCodigo = eventoCodigo
        this.#eventoRef = eventoRef
        this.#eventoNome = eventoNome
        this.#eventoDescricao = eventoDescricao
        this.#imagem = imagem;
    }

    async excluir(ref){
        let sql = "delete from tb_evento where codigo = ?"
        let valores = [ref];

        var result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async gravar() {
        if(this.#eventoCodigo == 0){
            let sql = "insert into tb_evento (descricao, ref, nome, imagem) values (?, ?, ?, ?)";

            let valores = [this.#eventoRef, this.#eventoNome, this.#eventoDescricao, this.#imagem];

            return await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            //alterar
            let sql = "update tb_evento set descricao = ?, ref = ?, nome = ?, imagem =? where codigo = ?";

            let valores = [this.#eventoDescricao, this.#eventoRef, this.#eventoNome, this.#imagem, this.#eventoCodigo];
            return await conexao.ExecutaComandoNonQuery(sql, valores) > 0;
        }
    }

    async buscarEvento(codigo){
        let sql = `select * from tb_evento`;
        let valores = [codigo];
        var rows = await conexao.ExecutaComando(sql, valores);

        let evento = null;

        if(rows.length > 0){
            var row = rows[0];

            let imagem = "";
            
            evento = new EventoModel(row['codigo'], 
            row['descricao'], row['ref'], row['nome'], null);

            if(row["imagem"] != null) {
                evento.imagem = global.CAMINHO_IMG_EVENTO_BROWSER + row["imagem"];
                evento.possuiImagem = true;
            }
            else {
                evento.imagem = global.CAMINHO_IMG_EVENTO_BROWSER + "sem-foto.png";
                evento.possuiImagem = false;
            }

        }

        return evento;
    }

    async listarEventos() {
    
        let sql = 'select * from tb_evento order by codigo';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];
        
        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                
                var row = rows[i];
                
                let imagem = "";
                if(row["imagem"] != null) {
                    imagem = global.CAMINHO_IMG_EVENTO_BROWSER + row["imagem"];
                    console.log(imagem)
                }
                else {
                    imagem = global.CAMINHO_IMG_EVENTO_BROWSER + "sem-foto.png";
                }

                listaRetorno.push(new EventoModel(row['codigo'], 
                row['ref'], row['nome'], row['descricao'],  imagem));
            }
        }

        return listaRetorno;
    }

    toJSON() {
        return {
            "eventoCodigo": this.#eventoCodigo,
            "eventoDescricao": this.#eventoDescricao,
            "eventoNome": this.#eventoNome,
            "eventoImagem": this.#imagem,
        }
    }
}

module.exports = EventoModel;