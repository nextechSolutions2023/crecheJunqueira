document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("cpf").style["border-color"] = "#ced4da";
        document.getElementById("rua").style["border-color"] = "#ced4da";
        document.getElementById("numero").style["border-color"] = "#ced4da";
        document.getElementById("cep").style["border-color"] = "#ced4da";
        document.getElementById("complemento").style["border-color"] = "#ced4da";
        document.getElementById("bairro").style["border-color"] = "#ced4da";
        document.getElementById("cidade").style["border-color"] = "#ced4da";
        document.getElementById("uf").style["border-color"] = "#ced4da";
        document.getElementById("telefone").style["border-color"] = "#ced4da";
        document.getElementById("disponibilidade").style["border-color"] = "#ced4da";
    
    }

    function alterar() {
        limparValidacao();
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
        let codigo = document.querySelector("#codigo").value;
        let codigoEndereco = document.querySelector("#codigoEndereco").value;

         let listaErros = [];
        if(nome == "" || nome.length < 5) {
            listaErros.push("nome");
        }
        if(!validarCPF(cpf)) {
            listaErros.push("cpf");
        }
        if(rua == "") {
            listaErros.push("rua");
        }
        if(numero == "") {
            listaErros.push("numero");
        }

        if(cep == "" || !validarCEP(cep)) {
            listaErros.push("cep");
        }

        if(complemento == "") {
            listaErros.push("complemento");
        }

        if(bairro == "") {
            listaErros.push("bairro");
        }

        if(cidade == "") {
            listaErros.push("cidade");
        }

        if(uf == "") {
            listaErros.push("uf");
        }

        if(telefone == "") {
            listaErros.push("telefone");
        }

        if(disponibilidade == "") {
            listaErros.push("disponibilidade");
        }


        if(listaErros.length == 0) {
            
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
                disponibilidade: disponibilidade,
                codigo: codigo,
                codigoEndereco: codigoEndereco
            }

            fetch("/voluntario/alterar/", {
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
        else{
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }
})