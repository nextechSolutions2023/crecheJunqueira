document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnGravar");

    btnGravar.addEventListener("click", gravarProduto);

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

function gravarProduto() {

    // var inputCodigo = document.getElementById("codigo");
    var inputDescricao = document.getElementById("descricao");
    var inputEstoque = document.getElementById("estoque");
    var arquivos = document.getElementById("inputImagem").files;
    var inputPreco = document.getElementById("preco").value.replace(",", ".");

    //if de validação básica
    if( 
        inputDescricao.value != "" && 
        inputEstoque.value != "" && 

        !isNaN(inputPreco) && 

        inputPreco > 0)
    {


        let formData = new FormData();

        // formData.append("codigo", inputCodigo.value);
        formData.append("descricao", inputDescricao.value);
        formData.append("estoque", inputEstoque.value);
        formData.append("imagem", arquivos[0]);
        formData.append("preco", inputPreco);

        fetch('/produtos/cadastrar', {
            method: "POST",
            body: formData
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Produto cadastrado!");
                window.location.href="/produtos/";
            }
            else{
                alert("Erro ao cadastrar produto");
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