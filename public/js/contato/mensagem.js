document.addEventListener("DOMContentLoaded", function() {


    var btnEnviar = document.getElementById("btnEnviar");


    btnEnviar.addEventListener("click", function() {
        enviarMensagem();
    })
})

function enviarMensagem() {

    limparErros();
    
    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var assunto = document.getElementById("assunto");
    var mensagem = document.getElementById("mensagem");
    var arquivo = document.getElementById("arquivo").files;
    

    var listaErros = [];

    if(nome.value == "" || nome.value == undefined || nome.value == null){
        listaErros.push("nome");
    }
    
    if(email.value == "" || email.value == undefined || email.value == null){
        listaErros.push("email");
    }

    if(assunto.value == "0" || assunto.value == undefined || assunto.value == null){
        listaErros.push("assunto");
    }

    if(mensagem.value == "" || mensagem.value == undefined || mensagem.value == null){
        listaErros.push("mensagem");
    }

    if(listaErros.length == 0){

        let formData = new FormData();

        formData.append("nome", nome.value);
        formData.append("email", email.value);
        formData.append("assunto", assunto.value);
        formData.append("mensagem", mensagem.value);
        formData.append("arquivo", arquivo[0]);
        



        fetch('/contato/enviar', { 
            method: "POST",
            body: formData
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {          
            if(r.ok) {
                nome.value = "";
                email.value = "";
                assunto.value = "0";
                mensagem.value = "";
                
               
                document.getElementById("alertaSucesso").innerText = "Mensagem enviada com sucesso!";
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao enviar a  mensagem !";
                document.getElementById("erros").style = "display:block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(listaErros)
    }
}

function mostrarErros(lista) {
    for (var i = 0; i < lista.length; i++) {
        let id = lista[i];
        let elemento = document.getElementById(id);

        if (elemento) {
            elemento.style.border = "1px solid red";
        }
    }

    var erros = document.getElementById("erros");
    if (erros) {
        erros.innerText = "Preencha corretamente os campos abaixo:";
        erros.style.display = "block";
    }
}


// function mostrarErros(lista) {
//     for(var i = 0; i<lista.length; i++){
//         let id = lista[i];

//         document.getElementById(id).classList.add("campoErro");

//         document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

//         document.getElementById("erros").style= "display:block";
//     }
// }

function limparErros() {
    document.getElementById("nome").classList.remove("campoErro");
    document.getElementById("email").classList.remove("campoErro");
    document.getElementById("assunto").classList.remove("campoErro");
    document.getElementById("mensagem").classList.remove("campoErro");
   

    document.getElementById("erros").style = "display:none";
    document.getElementById("alertaSucesso").style = "display:none";
}