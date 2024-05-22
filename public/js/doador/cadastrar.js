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

    //-----------------validacao CPF-----------------------
    function validarCPF(cpf) {
        // Remove caracteres especiais
        cpf = cpf.replace(/[^0-9]/g, '');
      
        // Verifica se o CPF tem o tamanho correto
        if (cpf.length !== 11) {
          return false;
        }
      
        // Cálculo do dígito verificador 1
        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf[i]) * (10 - i);
        }
      
        let resto1 = soma % 11;
        if (resto1 === 0 || resto1 === 1) {
          resto1 = 0;
        } else {
          resto1 = 11 - resto1;
        }
      
        // Cálculo do dígito verificador 2
        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf[i]) * (11 - i);
        }
      
        let resto2 = soma % 11;
        if (resto2 === 0 || resto2 === 1) {
          resto2 = 0;
        } else {
          resto2 = 11 - resto2;
        }
      
        // Valida se o CPF é válido
        return cpf[9] === String(resto1) && cpf[10] === String(resto2);
    }
      
    function impedirLetras(cpf) {
        // Remove caracteres especiais e letras
        cpf.value = cpf.value.replace(/[^0-9]/g, '');
        
        // Limita o tamanho do CPF
        if (cpf.value.length > 11) {
            cpf.value = cpf.value.substring(0, 11);
        }
        
        // Adiciona máscara de formatação
        let valorFormatado = "";
        for (let i = 0; i < cpf.value.length; i++) {
            if (i === 3 || i === 6) {
            valorFormatado += ".";
            } else if (i === 9) {
            valorFormatado += "-";
            }
            valorFormatado += cpf.value[i];
        }
            cpf.value = valorFormatado;
    }

    function limparPontosTracosCPF(cpf){
        return cpf.replace(/[.-]/g, '');
    }

    
    // Exemplo de uso
    const cpf = document.getElementById("cpf");
    
    cpf.addEventListener("keyup", function() {
        impedirLetras(cpf);
        validarCPF(cpf.value);
    })

    //--------------------validacao numero de telefone----------------------
    const telefone = document.getElementById("telefone");
    
    telefone.addEventListener("keyup", function() {

        telefone.value = phoneMask(telefone.value)
    })

    function phoneMask (value) {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
    }
    
    //------------------validacao do cep------------------
    function preencherCidadeUFEBairroComCEP(cepInput, cidadeInput, ufInput, bairroInput) {
        cepInput.addEventListener("blur", function(event) {
          const cep = event.target.value.replace(/\D/g, ''); 
      
          if (cep.length !== 8) {
            return; 
          }
      
          fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
              if (data.erro) {
                console.log("CEP não encontrado");
                return;
              }
      
              cidadeInput.value = data.localidade;
              ufInput.value = data.uf;
              bairroInput.value = data.bairro;
              logradouro.value = data.logradouro;
            })
            .catch(error => {
              console.error("Ocorreu um erro ao buscar os dados do CEP:", error);
            });
        });
    }
      
    // Exemplo de uso
    const cepInput = document.getElementById("cep");
    const cidadeInput = document.getElementById("cidade");
    const ufInput = document.getElementById("uf");
    const bairroInput = document.getElementById("bairro");
    const logradouro = document.getElementById("logradouro");
    
    
    preencherCidadeUFEBairroComCEP(cepInput, cidadeInput, ufInput, bairroInput, logradouro);
      
})