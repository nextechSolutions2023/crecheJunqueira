document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("btnDeletar").addEventListener("click", deletar);

    function deletar() {
        let nome = document.querySelector("#nome").value;
        let cpf = document.querySelector("#cpf").value;
        let rua = document.querySelector("#rua").value;
        let numero = document.querySelector("#numero").value;
        let cep = document.querySelector("#cep").value;
        let complemento = document.querySelector("#complemento").value;
        let bairro = document.querySelector("#bairro").value;
        let cidade = document.querySelector("#cidade").value;
        let uf = document.querySelector("#uf").value;
        let telefone = document.querySelector("#telefone").value;
        let disponibilidade = document.querySelector("#disponibilidade").value;
        
        let obj = {
            nome: nome,
            cpf: cpf,
            rua: rua,
            numero: numero,
            cep,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            telefone: telefone,
            disponibilidade: disponibilidade
        }

        fetch("/voluntario/deletar/", {
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
                window.location.href="/voluntario";
            }   
            else {
                alert(r.msg);
            }
        })
    }
})