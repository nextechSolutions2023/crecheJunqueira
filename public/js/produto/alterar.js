document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnAlterar");

    btnGravar.addEventListener("click", alterarProduto);

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

function alterarProduto() {

    var inputCodigo = document.getElementById("codigo");
    var inputDescricao = document.getElementById("descricao");
    var inputEstoque = document.getElementById("estoque");
    var arquivos = document.getElementById("inputImagem").files;
    var inputPreco = parseFloat(document.getElementById("preco").value.replaceAll('R$ ' , '').replaceAll('.', '').replaceAll(',', '.'));




    //if de validação básica
    if(inputDescricao.value != "" && inputEstoque.value != "" && inputPreco > 0 ){

        let formData = new FormData();

        formData.append("codigo", inputCodigo.value);
        formData.append("descricao", inputDescricao.value);
        formData.append("estoque", inputEstoque.value);
        formData.append("imagem", arquivos[0]);
        formData.append("preco", inputPreco);
       

        fetch('/produtos/alterar', {
            method: "POST",
            body: formData
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Produto alterado!");
                window.location.href="/produtos/";
            }
            else{
                alert("Erro ao alterar produto");
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

const mascaraMoeda = (event) => {
    const onlyDigits = event.target.value
      .split("")
      .filter(s => /\d/.test(s))
      .join("")
      .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
  }
  
  const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor)
  }