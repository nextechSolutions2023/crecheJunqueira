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
    var inputRef = document.getElementById("inputRef");
    var inputNome = document.getElementById("inputNome");
    var inputDescricao = document.getElementById("inputDescricao");
    var arquivos = document.getElementById("inputImagem").files;
    
    //if de validação básica
    if(inputRef.value != "" && inputNome.value != "" && inputDescricao.value != '' ){

        /*var data = {
            codigo: inputCodigo.value,
            ref: inputRef.value,
            nome: inputNome.value,
            dataHoracodigoade: inputDataHora.value,
            marca: selMarca.value,
            categoria: selCategoria.value
        }*/

        let formData = new FormData();

        formData.append("codigo", inputCodigo.value);
        formData.append("ref", inputRef.value);
        formData.append("nome", inputNome.value);
        formData.append("descricao", inputDescricao.value);
        formData.append("imagem", arquivos[0]);

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