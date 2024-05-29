document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("descricao").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let descricao = document.querySelector("#descricao").value;
        

        let listaErros = [];
        if(descricao == "" || descricao.length < 2) {
            listaErros.push("descricao");
        }



        if(listaErros.length == 0) {

            let obj = {
                descricao: descricao
            }

            fetch("/atividades/cadastrar", {
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
                    window.location.href="/atividades/";
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

    

})