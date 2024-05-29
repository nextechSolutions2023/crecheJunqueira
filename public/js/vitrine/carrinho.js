document.addEventListener("DOMContentLoaded", function() {

    var btnAddCarrinho = document.querySelectorAll(".btnAddCarrinho");

    var btnConfirmar = document.querySelector("#btnConfirmarPedido");
    btnConfirmar.addEventListener("click", gravarVendas);
    
    let carrinho = [];

    //carrega a quantcodigoade de itens no carrinho quando carrega a tela
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

    function gravarVendas() {

        let listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));
        if(listaCarrinho.length > 0) {

            fetch("/vendas/gravar", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(listaCarrinho)
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                console.log(r);
                alert(r.msg);
                if(r.ok == true){
                    localStorage.removeItem("carrinho");
                    location.reload();
                }

            })

        }
        else{
            alert("O carrinho está vazio!");
        }
    }

    function incrementarItem(){
        let codigo = this.dataset.codigo;
        let lista = localStorage.getItem("carrinho");
        let carrinho = JSON.parse(lista);
        let qtdeAtualizada = 0;
        let valorItem = 0;
       
        //atualiza o carrinho
        for(let i = 0; i < carrinho.length;i++){
            if(carrinho[i].codigo == codigo && carrinho[i].quantidade < 999){
                carrinho[i].quantidade++;
                qtdeAtualizada = carrinho[i].quantidade;
                valorItem = parseFloat(carrinho[i].preco);  
            }
        }


        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();

    }

    function decrementarItem(){
        let codigo = this.dataset.codigo;
        let lista = localStorage.getItem("carrinho");
        let carrinho = JSON.parse(lista);
        let qtdeAtualizada = 0;
        let valorItem = 0;
       
        //atualiza o carrinho
        for(let i = 0; i < carrinho.length;i++){
            if(carrinho[i].codigo == codigo){
                carrinho[i].quantidade--;
                qtdeAtualizada = carrinho[i].quantidade;
                valorItem = parseFloat(carrinho[i].preco);

            }
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
        
        if (qtdeAtualizada == 0) {
            lixeira(codigo);
        }

    }

    function lixeira(codigoDecrementa){
        let codigo;
        if(isNaN(codigoDecrementa) == false){
            codigo = codigoDecrementa;
        }
        else{
            codigo = this.dataset.codigo;
        }
        
        let lista = localStorage.getItem("carrinho");
        let carrinho = JSON.parse(lista);
        let qtdeAtualizada = 0;
        let valorItem = 0;
        let carrinhoAtualizado = [];
       
        //atualiza o carrinho
        for(let i = 0; i < carrinho.length;i++){
            //vai excluir
            if(carrinho[i].codigo == codigo){
                carrinho[i].quantidade;
                qtdeAtualizada = carrinho[i].quantidade;
                valorItem = parseFloat(carrinho[i].preco);
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

            let valorTotalItem = carrinhoModal[i].preco * carrinhoModal[i].quantidade;
            valorTotal += valorTotalItem;

            html += `<tr>
                                             
                        <td><img wcodigoth="100" src="${carrinhoModal[i].imagem}" /></td>
                        <td>${carrinhoModal[i].descricao}</td>
                        <td>R$ ${parseFloat(carrinhoModal[i].preco).toFixed(2)}</td>
                        <td>
                            <button data-codigo="${carrinhoModal[i].codigo}" class="btnDecrementa" style="background-color: red; color: white; padding: 5px;border-radius: 5px; border: none; font-size: smaller;"><i class="bi bi-dash"></i></button>
                            <input class="iQtd" data-codigo="${carrinhoModal[i].codigo}" type="number" style="wcodigoth: 50px; height: 30px; border-radius: 5px; border-color: gray;font-size: smaller; text-align:center;" min="0" max="999" value="${carrinhoModal[i].quantidade}">&nbsp;
                            <button data-codigo="${carrinhoModal[i].codigo}" class="btnIncrementa" style="background-color: green; color: white; padding: 5px;border-radius: 5px; border: none; font-size: smaller;"><i class="bi bi-plus"></i></button>&nbsp;
                        </td>
                        <td class="valorItem" data-codigo="${carrinhoModal[i].codigo}" style="text-align:center";>R$ ${valorTotalItem.toFixed(2)}</td>
                        <td class="btnLixeira" data-codigo="${carrinhoModal[i].codigo}" style="text-align:center";><i class="bi bi-trash-fill"></i></td>
                    </tr>`;
        }

        html += `
            <tr>
                <td colspan="5" style="text-align: right;">Total R$</td>
                <td codigo="valorTotal" style="text-align:center";>${valorTotal.toFixed(2)}</td>
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

                let codigo = this.dataset.codigo;

                if(valor > 0){
                    let lista = localStorage.getItem("carrinho");
                    let carrinho = JSON.parse(lista);

                    //atualiza o carrinho
                    for(let i = 0; i < carrinho.length;i++){
                        if(carrinho[i].codigo == codigo){
                            carrinho[i].quantidade = this.value;
                        }
                    }
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));

                    carregarCarrinho();
                }   
                else{
                    if(this.value != '')
                        lixeira(codigo);
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
                if(carrinho[i].codigo == item.codigo){
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
            item.quantidade = 1;
            carrinho.push(item);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }

        //incrementar contador com a nova lista;
        carrinho = JSON.parse(localStorage.getItem("carrinho"));
        document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }

    function adicionarAoCarrinho(){
        let codigo = this.dataset.codigo;

        fetch("/produtos/obter/" + codigo)
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