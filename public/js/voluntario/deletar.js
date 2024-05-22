document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("btnDeletar").addEventListener("click", deletar);

    function deletar() {
        let nome = document.querySelector("#nome").value;
        let cpf = document.querySelector("#cpf").value;
        let logradouro = document.querySelector("#logradouro").value;
        let numero = document.querySelector("#numero").value;
        let cep = document.querySelector("#cep").value;
        let complemento = document.querySelector("#complemento").value;
        let bairro = document.querySelector("#bairro").value;
        let cidade = document.querySelector("#cidade").value;
        let uf = document.querySelector("#uf").value;
        let disponibilidade = document.querySelector("#disponibilidade").value;
        let codigo = document.querySelector("#codigo").value;
        let codigoEndereco = document.querySelector("#codigoEndereco").value;
        let habilidadecodigo = document.querySelector("#habilidade").value; 
        let telefone = document.querySelector("#telefone").value; 


        
        let obj = {
            nome: nome,
            cpf: cpf,
            logradouro: logradouro,
            numero: numero,
            cep,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            telefone: telefone,
            disponibilidade: disponibilidade,
            codigo: codigo,
            codigoEndereco: codigoEndereco,
            creche_codigo: 0,
            habilidadecodigo: habilidadecodigo
        }

        fetch("/voluntario/deletar", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert(r.msg);
                window.location.href="/voluntarios";
            }   
            else {
                alert(r.msg);
            }
        })
    }
})