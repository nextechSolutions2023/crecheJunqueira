document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    function limparValidacao() {
        document.getElementById("descricao").style["border-color"] = "#ced4da";
    
    }

    function alterar() {
        limparValidacao();
        let descricao = document.querySelector("#descricao").value;
        let codigo = document.querySelector("#codigo").value;

         let listaErros = [];
        if(descricao == "" || descricao.length < 5) {
            listaErros.push("descricao");
        }


        if(listaErros.length == 0) {
            
            let obj = {
                descricao: descricao,
                codigo: codigo
            }

            fetch("/atividades/alterar", {
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
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

    
})