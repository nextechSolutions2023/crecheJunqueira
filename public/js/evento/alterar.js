document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnAlterar");
    btnGravar.addEventListener("click", alterarEvento);

    var inputImagem = document.getElementById("inputImagem");
    inputImagem.addEventListener("change", exibirPreviaImagem);
})

function exibirPreviaImagem() {

    let file = document.getElementById("inputImagem").files[0];

    if(file.type.includes("png") || 
    file.type.includes("jpg") || 
    file.type.includes("jpeg")) {
        let url = URL.createObjectURL(file);

        document.getElementById("previaImagem").setAttribute("src", url);
    }
    else{
        alert("Imagem inválida!!!");
    }
}

function alterarEvento() {

    var inputCodigo = document.getElementById("inputCodigo");
    var inputNome = document.getElementById("inputNome");
    var inputDescricao = document.getElementById("inputDescricao");
    var arquivos = document.getElementById("inputImagem").files;
    var inputData = document.getElementById("inputData");
    var inputLocal = document.getElementById("inputLocal");
    
    //validação básica
    if(inputNome.value != "" && inputDescricao.value != '' && inputData.value != '' && inputLocal.value != '' ){

        let formData = new FormData();

        formData.append("codigo", inputCodigo.value);
        formData.append("nome", inputNome.value);
        formData.append("descricao", inputDescricao.value);
        formData.append("imagem", arquivos[0]);
        formData.append("data", inputData.value);
        formData.append("local", inputLocal.value);

        fetch('/evento/alterar', {
            method: "POST",
            body: formData
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Evento alterado!");
                window.location.href="/evento/";
            }
            else{
                alert("Erro ao alterar evento");
            }
        })
        .catch(e => {
            console.log(e);
        })

    }
    else{
        alert("Preencha todos os campos corretamente!");
        return;
    }
}