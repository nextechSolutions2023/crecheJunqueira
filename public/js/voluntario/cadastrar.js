document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("voluntarioNome").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioEmail").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioSenha").style["border-color"] = "#ced4da";
        document.getElementById("voluntarioPerfil").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#voluntarioNome").value;
        let email = document.querySelector("#voluntarioEmail").value;
        let senha = document.querySelector("#voluntarioSenha").value;
        let perfil = document.querySelector("#voluntarioPerfil").value;
        let ativo = document.querySelector("#voluntarioAtivo").checked;

        let listaErros = [];
        if(nome == "") {
            listaErros.push("voluntarioNome");
        }
        if(email == "") {
            listaErros.push("voluntarioEmail");
        }
        if(senha == "") {
            listaErros.push("voluntarioSenha");
        }
        if(perfil == 0) {
            listaErros.push("voluntarioPerfil");
        }

        if(listaErros.length == 0) {

            // let obj = {
            //     nome: nome,
            //     email: email,
            //     senha: senha,
            //     ativo: ativo,
            //     perfil: perfil,
            // }

            fetch("/voluntarios/cadastrar", {
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
        else{
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

})