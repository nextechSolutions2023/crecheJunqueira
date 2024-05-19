document.addEventListener("DOMContentLoaded", function(){

    var btnExcluir = document.getElementById("btnExcluir");

    btnExcluir.addEventListener("click", excluirEvento);

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

function excluirEvento() {

    var inputCodigo = document.getElementById("inputCodigo");
    //alert(inputCodigo.value);
    //if de validação básica
    if(inputCodigo.value != "" ){

        //let formData = new FormData();

        //formData.append("codigo", inputCodigo.value);
        
        fetch('/evento/excluir', {
            method: "POST",
            body: JSON.stringify({codigo: inputCodigo.value}),
            headers: {
                "Content-Type": "application/json",
            }

        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Evento excluído!");
                window.location.href="/evento";
            }
            else{
                alert("Erro ao excluir evento");
            }
        })
        .catch(e => {
            console.log(e);
        })

    }
    else{
        alert("Codigo não localizado!");
        return;
    }
}