document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnGravar");
    btnGravar.addEventListener("click", gravarEvento);

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

function gravarEvento() {

    var inputRef = document.getElementById("inputRef");
    var inputNome = document.getElementById("inputNome");
    var inputDescricao = document.getElementById("inputDescricao");
    var arquivos = document.getElementById("inputImagem").files;
    var inputData = document.getElementById("inputData");
    var inputLocal = document.getElementById("inputLocal");

    // Validação da data
    let dataEvento = new Date(inputData.value);
    let dataAtual = new Date();
    if (dataEvento < dataAtual) {
        inputDataError.textContent = "A data do evento não pode ser anterior à data atual.";
        inputDataError.style.display = "block";
        return;
    } else {
        inputDataError.style.display = "none";
    }

    if(inputRef.value != "" && inputNome.value != "" && inputDescricao.value != '' && inputData.value != '' && inputLocal.value != '' ){
        
        let formData = new FormData();

        formData.append("ref", inputRef.value);
        formData.append("nome", inputNome.value);
        formData.append("descricao", inputDescricao.value);
        formData.append("imagem", arquivos[0]);
        formData.append("data", inputData.value);
        formData.append("local", inputLocal.value);

        fetch('/evento/cadastrar', {
            method: "POST",
            body: formData
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Evento cadastrado!");
                window.location.href="/evento/";
            }
            else{
                alert("Erro ao cadastrar evento");
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