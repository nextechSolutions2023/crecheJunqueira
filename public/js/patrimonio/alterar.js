document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnAlterar");
    btnGravar.addEventListener("click", alterarEvento);

})

function alterarEvento() {

    var inputId = document.getElementById("inputId");
    var inputCod = document.getElementById("inputCod");
    var inputDesc = document.getElementById("inputDesc");
    var inputQuant = document.getElementById("inputQuant");

    //validação básica
    if(inputCod.value != "" && inputDesc.value != "" && inputQuant.value != '0'){

        
        let obj = {
            id: inputId.value,
            codigo: inputCod.value,
            descricao: inputDesc.value,
            quantidade: inputQuant.value,
        }
        

        fetch('/patrimonio/alterar', {
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
                alert("Patrimonio alterado!");
                window.location.href="/patrimonio/";
            }
            else{
                alert("Erro ao alterar patrimonio");
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