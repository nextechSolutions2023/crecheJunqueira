document.addEventListener("DOMContentLoaded", function() {

    var btnAddCarrinho = document.querySelectorAll(".btnAddCarrinho");
    
    let carrinho = [];

    //carrega a quantidade de itens no carrinho quando carrega a tela
    if(localStorage.getItem("carrinho") != null) {
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
        document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }

    for(let i = 0; i < btnAddCarrinho.length; i++) {
        btnAddCarrinho[i].addEventListener("click", adicionarAoCarrinho);
    }

    var modalCarrinho = document.getElementById('modalCarrinho')
    modalCarrinho.addEventListener('show.bs.modal', function (event) {
        carregarCarrinho();
    })

    function incrementarItem(){
        let id = this.dataset.produtoid;
        let lista = localStorage.getItem("carrinho");
        let carrinho = JSON.parse(lista);
        let qtdeAtualizada = 0;
        let valorItem = 0;
       
        //atualiza o carrinho
        for(let i = 0; i < carrinho.length;i++){
            if(carrinho[i].produtoId == id && carrinho[i].quantidade < 999){
                carrinho[i].quantidade++;
                qtdeAtualizada = carrinho[i].quantidade;
                valorItem = parseFloat(carrinho[i].produtoValor);
                
            }
        }


        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();

    }

    function decrementarItem(){
        let id = this.dataset.produtoid;
        let lista = localStorage.getItem("carrinho");
        let carrinho = JSON.parse(lista);
        let qtdeAtualizada = 0;
        let valorItem = 0;
       
        //atualiza o carrinho
        for(let i = 0; i < carrinho.length;i++){
            if(carrinho[i].produtoId == id){
                carrinho[i].quantidade--;
                qtdeAtualizada = carrinho[i].quantidade;
                valorItem = carrinho[i].produtoValor;
                
            }
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
        
        if (qtdeAtualizada == 0) {
            lixeira(id);
        }

    }

    function lixeira(idDecrementa){
        let id;
        if(isNaN(idDecrementa) == false){
            id = idDecrementa;
        }
        else{
            id = this.dataset.produtoid;
        }
        
        let lista = localStorage.getItem("carrinho");
        let carrinho = JSON.parse(lista);
        let qtdeAtualizada = 0;
        let valorItem = 0;
        let carrinhoAtualizado = [];
       
        //atualiza o carrinho
        for(let i = 0; i < carrinho.length;i++){
            //vai excluir
            if(carrinho[i].produtoId == id){
                carrinho[i].quantidade;
                qtdeAtualizada = carrinho[i].quantidade;
                valorItem = carrinho[i].produtoValor;
            }
            else{
                carrinhoAtualizado.push(carrinho[i]);
            }
        }
        
        // carrinho = carrinhoAtualizado;
        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));
        carregarCarrinho();
    }

    function carregarCarrinho(){

        let html = "";
        let valorTotal = 0;

        let carrinhoModal = JSON.parse(localStorage.getItem("carrinho"));

        for(let i = 0; i< carrinhoModal.length; i++) {

            let valorTotalItem = carrinhoModal[i].produtoValor * carrinhoModal[i].quantidade;
            valorTotal += valorTotalItem;

            html += `<tr>
                        <td>${carrinhoModal[i].produtoId}</td>                       
                        <td><img width="100" src="${carrinhoModal[i].produtoImagem}" /></td>
                        <td>${carrinhoModal[i].produtoNome}</td>
                        <td>R$ ${carrinhoModal[i].produtoValor}</td>
                        <td>
                            <button data-produtoid="${carrinhoModal[i].produtoId}" class="btnDecrementa" style="font-size: smaller;"><i class="bi bi-dash-lg"></i></button>
                            <input class="iQtd" data-produtoid="${carrinhoModal[i].produtoId}" type="number" style="width: 50px; height: 30px; font-size: smaller; text-align:center;" min="0" max="999" value="${carrinhoModal[i].quantidade}">&nbsp;
                            <button data-produtoid="${carrinhoModal[i].produtoId}" class="btnIncrementa" style="font-size: smaller;"><i class="bi bi-plus-lg"></i></button>&nbsp;
                        </td>
                        <td class="valorItem" data-produtoid="${carrinhoModal[i].produtoId}" style="text-align:center";>R$ ${valorTotalItem.toFixed(2)}</td>
                        <td class="btnLixeira" data-produtoid="${carrinhoModal[i].produtoId}"><i class="bi bi-trash-fill"></i></td>
                    </tr>`;
        }

        html += `
            <tr>
                <td colspan="5" style="text-align: right;">Total R$</td>
                <td id="valorTotal" style="text-align:center";>${valorTotal.toFixed(2)}</td>
            </tr>`;

        document.querySelector("#tabelaCarrinho > tbody").innerHTML = html;

        var btnIncrementa = document.querySelectorAll(".btnIncrementa");
        var btnDecrementa = document.querySelectorAll(".btnDecrementa");
        var btnLixeira = document.querySelectorAll(".btnLixeira");

         //Incrementa , Decrementa Carrinho e lixeira
        for(let i = 0; i < btnIncrementa.length;i++){
            btnIncrementa[i].addEventListener("click", incrementarItem);
        }

        for(let i = 0; i < btnDecrementa.length;i++){
            btnDecrementa[i].addEventListener("click", decrementarItem);
        }

        for(let i = 0; i < btnLixeira.length;i++){
            btnLixeira[i].addEventListener("click", lixeira);
        }


        let iQuantidades = document.querySelectorAll(".iQtd");
        for (let i = 0; i < iQuantidades.length; i++) {
            iQuantidades[i].addEventListener("change", function() {
                let valor = parseInt(this.value);
                if (valor < 0) {
                    this.value = 1;
                    valor = 1;
                }
                if (valor > 999) {
                    this.value = 999;
                }
                if (isNaN(valor)) {
                    this.value = 1;
                    valor = 1;
                }

                let id = this.dataset.produtoid;

                if(valor > 0){
                    let lista = localStorage.getItem("carrinho");
                    let carrinho = JSON.parse(lista);

                    //atualiza o carrinho
                    for(let i = 0; i < carrinho.length;i++){
                        if(carrinho[i].produtoId == id){
                            carrinho[i].quantidade = this.value;
                        }
                    }
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));

                    carregarCarrinho();
                }   
                else{
                    if(this.value != '')
                        lixeira(id);
                }
                
        
            });
        }
        
    }

    function adicionarItemCarrinho(item) {
        let lista = localStorage.getItem("carrinho");

        if(lista != null){
            carrinho = JSON.parse(lista);
            let achou = false;
            for(let i = 0; i < carrinho.length;i++){
                if(carrinho[i].produtoId == item.produtoId){
                    carrinho[i].quantidade++;
                    achou = true;
                }
            }

            if(achou == false){
                item.quantidade = 1;
                carrinho.push(item);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
        else{
            item.carrinho = 1;
            carrinho.push(item);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }

        //incrementar contador com a nova lista;
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
        document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }

    function adicionarAoCarrinho(){
        let id = this.dataset.produtoid;
        console.log(id);

        fetch("/produto/obter/" + id)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            if(r.produtoEncontrado != null){
                adicionarItemCarrinho(r.produtoEncontrado);

                this.innerHTML = "<i class='fa fa-check'></i> Produto adicionado";

                let that = this;
                setTimeout(function(){
                    that.innerHTML = `<i class="bi-cart-fill me-1"></i> Adicionar ao carrinho`;
                },3000)
            }
           
        })
    }
})