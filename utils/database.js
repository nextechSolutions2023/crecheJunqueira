var mysql = require('mysql2');

class Database {

    #conexao;

    get conexao() { return this.#conexao;} set conexao(conexao) { this.#conexao = conexao; }

    constructor() {

        //Pessoal USAR ESTE BANCO É DA ANDRESSA E TUDO ESTÁ NELE
        // this.#conexao = mysql.createPool({
        //     host: '132.226.245.178', //endereço do nosso banco de dados na nuvem
        //     database: 'PFS1_10442313065', //a database de cada um de vocês possui a nomenclatura PFS1_(RA)
        //     user: '10442313065', // usuario e senha de cada um de vocês é o RA
        //     password: '10442313065',
        //     connectTimeout: 60000,
        //     connectionLimit:200,

        // // });
        // console.log('conectado');
        // this.#conexao = mysql.createPool({
        //     host: '132.226.245.178', //endereço do nosso banco de dados na nuvem
        //     database: 'PFS1_10442313190', //a database de cada um de vocês possui a nomenclatura PFS1_(RA)
        //     user: '10442313190', // usuario e senha de cada um de vocês é o RA
        //     password: '10442313190',
        // });

        this.#conexao = mysql.createPool({
            host: 'localhost', //endereço do nosso banco de dados na nuvem
            database: 'novo_creche', //a database de cada um de vocês possui a nomenclatura PFS1_(RA)
            user: 'root', // usuario e senha de cada um de vocês é o RA
            password: '',
        });
    }

    ExecutaComando(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                console.log('ExecutaComando: ' + sql);
                console.log('valores: ' + valores);
                console.log('------' );
                if (error) 
                    rej(error);
                else 
                    res(results);
            });
        })
    }
    
    ExecutaComandoNonQuery(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                console.log('ExecutaComandoNonQuery: ' + sql);
                console.log('valores: ' + valores);
                console.log('------' );

                if (error) 
                    rej(error);
                else 
                    res(results.affectedRows > 0);
            });
        })
    }

    ExecutaComandoLastInserted(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results.insertId);
            });
        })
    }
}

module.exports = Database;