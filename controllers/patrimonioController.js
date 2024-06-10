const patrimonioModel = require("../models/patrimonioModel");


class patrimonioController{
    
    async listarView(req, res) {
        let prod = new patrimonioModel();
        let lista = await prod.listarPatrimonios();
        res.render('patrimonio/listar', {lista: lista, layout:"layoutAdmin"});
    }

    async cadastroView(req, res) {
        res.render("patrimonio/cadastrar", {layout:"layoutAdmin"});
    }

    async alterarView(req, res) {
        console.log(req.params);
        let patrimonioAlter = new patrimonioModel();
        patrimonioAlter = await patrimonioAlter.obter(req.params.id);
        res.render('patrimonio/alterar', { patrimonioAlter: patrimonioAlter, layout:"layoutAdmin"});
    }

    async cadastrarPatrimonio(req, res){
        var ok = true;
        if(req.body.codigo != "" && req.body.descricao != "" && 
        req.body.quantidade != '0' ) {
            let patrimonio = new patrimonioModel(0, req.body.codigo, 
                req.body.descricao, req.body.quantidade);

            ok = await patrimonio.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async alterarPatrimonio(req, res) {
        if(req.body.id > 0 && req.body.codigo != "" && req.body.descricao != "" && req.body.quantidade != "0") {
            let patrimonio = new patrimonioModel(req.body.id, req.body.codigo, req.body.descricao, req.body.quantidade);

            let result = await patrimonio.gravar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Patrimonio alterado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao alterar patrimonio!"
                });
            }
        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async excluirPatrimonio(req, res) {
        if(req.body.id != null) {
            let patrimonio = new patrimonioModel();
            let result = await patrimonio.excluir(req.body.id);
            if(result) {
                res.send({ok: true, msg: "Patrimonio excluido com sucesso!"});
            }
            else{
                res.send({ok: false, msg: "Erro ao excluir patrimonio"})
            }
        }
        // else{
        //     res.send({ok: false, msg: "O id para exclusão não foi enviado"})
        // }
    }
}




module.exports = patrimonioController