document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("cpf").style["border-color"] = "#ced4da";
        document.getElementById("logradouro").style["border-color"] = "#ced4da";
        document.getElementById("numero").style["border-color"] = "#ced4da";
        document.getElementById("cep").style["border-color"] = "#ced4da";
        document.getElementById("complemento").style["border-color"] = "#ced4da";
        document.getElementById("bairro").style["border-color"] = "#ced4da";
        document.getElementById("cidade").style["border-color"] = "#ced4da";
        document.getElementById("uf").style["border-color"] = "#ced4da";
        document.getElementById("telefone").style["border-color"] = "#ced4da";
        document.getElementById("tipo_doacao").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#nome").value;
        let cpf = document.querySelector("#cpf").value;
        let logradouro = document.querySelector("#logradouro").value;
        let numero = document.querySelector("#numero").value;
        let cep = document.querySelector("#cep").value;
        let complemento = document.querySelector("#complemento").value;
        let bairro = document.querySelector("#bairro").value;
        let cidade = document.querySelector("#cidade").value;
        let uf = document.querySelector("#uf").value;
        let telefone = document.querySelector("#telefone").value;
        let tipo_doacao = document.querySelector("#tipo_doacao").value;
        

        let listaErros = [];
        if(nome == "" || nome.length < 5) {
            listaErros.push("nome");
        }
        if(!validarCPF(cpf)) {
            listaErros.push("cpf");
        }
        if(logradouro == "") {
            listaErros.push("logradouro");
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

        if(tipo_doacao == "") {
            listaErros.push("tipo_doacao");
        }

        if(listaErros.length == 0) {

            let obj = {
                nome: nome,
                cpf: cpf,
                logradouro: logradouro,
                numero: numero,
                cep:cep,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                telefone: telefone,
                tipo_doacao: tipo_doacao,
                creche_codigo: 0
            
            }

            fetch("/doadores/cadastrar", {
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
                    window.location.href="/doadores";
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
                alert(listaErros[i]);
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');    
        if(cpf == '') return false; 
        // Elimina CPFs invalidos conhecidos    
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
                return false;       
        // Valida 1o digito 
        let add = 0;    
        for (let i=0; i < 9; i ++)      
            add += parseInt(cpf.charAt(i)) * (10 - i);  
        let rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
        // Valida 2o digito 
        add = 0;    
        for (let i = 0; i < 10; i ++)        
            add += parseInt(cpf.charAt(i)) * (11 - i);  
        rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11) 
            rev = 0;    
        if (rev != parseInt(cpf.charAt(10)))
            return false;       
        return true;  
    }

    function validarCEP(cep) {
        return /^[0-9]{5}-?[0-9]{3}$/.test(cep);
    }

})