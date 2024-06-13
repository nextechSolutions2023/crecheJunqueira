const EventoModel = require("../models/eventoModel");
const VoluntarioModel = require("../models/voluntarioModel");
const PatrimonioModel = require("../models/patrimonioModel");

class saidaEventoController {
    async listarEventoView(req, res) {
        let prod = new EventoModel();
        let lista = await prod.listarEventosPublico();
        res.render('saidaEvento/listarEvento', { lista: lista, layout: "layoutAdmin" });
    }

    async saidaView(req, res) {
        let saidaEvento = new EventoModel();
        let infoVoluntario = new VoluntarioModel();
        let infoPatrimonio = new PatrimonioModel();
        infoVoluntario = await infoVoluntario.listarVoluntariosAtivos();
        infoPatrimonio = await infoPatrimonio.listarPatrimonios();
        saidaEvento = await saidaEvento.buscarEvento(req.params.codigo);
        res.render('saidaEvento/saidaView', { saidaEvento: saidaEvento, infoVoluntario: infoVoluntario, infoPatrimonio: infoPatrimonio, layout: "layoutAdmin" });
    }

    async alterarPatrimonioVoluntario(req, res) {
        console.log(req.body);
        var ok = true;
    
        // Lógica para alterar o status do voluntário para inativo
        if (req.body.voluntariosSelecionados && req.body.voluntariosSelecionados.length > 0) {
            for (let i = 0; i < req.body.voluntariosSelecionados.length; i++) {
                let voluntarioCodigo = req.body.voluntariosSelecionados[i].codigo; // Supondo que o código do voluntário esteja disponível
                let voluntario = new VoluntarioModel();
                let result = await voluntario.atualizarStatusVoluntario(voluntarioCodigo);
                if (!result) {
                    console.error(`Erro ao atualizar o status do voluntário de código ${voluntarioCodigo}`);
                }
            }
        }
    
        if (req.body.patrimoniosQuantidades && req.body.patrimoniosQuantidades.length > 0) {
          
            for (let i = 0; i < req.body.patrimoniosQuantidades.length; i++) {
                let id = req.body.patrimoniosQuantidades[i].id;
                let quantidade = req.body.patrimoniosQuantidades[i].quantidade;
                if (quantidade > 0) { // Verifica se a quantidade é maior que zero
                    let patrimonio = new PatrimonioModel();
                    if (!await patrimonio.validarEstoque(id, quantidade)) {
                        ok = false;                       
                    } else {
                        
                        patrimonio = await patrimonio.obter(id);
                        patrimonio.quantidade -= quantidade;
                        ok = await patrimonio.gravar();
                    }
                }
            }
        } 
        res.send({ ok: ok })
    }
    
    
    
}

module.exports = saidaEventoController;
