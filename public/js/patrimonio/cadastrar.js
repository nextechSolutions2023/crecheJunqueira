document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnGravar");

    btnGravar.addEventListener("click", gravarEvento);
})

function gravarEvento() {

    var inputCod = document.getElementById("inputCod");
    var inputDesc = document.getElementById("inputDesc");
    var inputQuant = document.getElementById("inputQuant");
    
    //console.log(document.getElementById("inputImagem").file)
    //if de validação básica
    if(inputCod.value != "" && inputDesc.value != "" && inputQuant.value != '0'){
        /*var data = {
            codigo: inputCodigo.value,
            ref: inputRef.value,
            nome: inputNome.value,
            dataHoracodigoade: inputDataHora.value,
            marca: selMarca.value,
            categoria: selCategoria.value
        }*/

        let obj = {
            codigo: inputCod.value,
            descricao: inputDesc.value,
            quantidade: inputQuant.value,
        }

        fetch('/patrimonio/cadastrar', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Patrimonio cadastrado!");
            }
            else{
                alert("Erro ao cadastrar patrimonio");
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