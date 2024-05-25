document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel);

    let filtroEscolhido = 0;

    let itemFiltro = document.querySelectorAll(".itemFiltro");

    document.getElementById("btnFiltrar").addEventListener("click", buscar);

    for(let i = 0; i<itemFiltro.length; i++) {
        itemFiltro[i].addEventListener("click", mudarCriterioFiltragem);
    }

    function buscar() {
        let termoFiltro = document.getElementById("filtro").value;
    
        if (termoFiltro === "") {
            termoFiltro = "todos";
            filtroEscolhido = 0;
        }
    
        fetch(`/vendas/filtrar/${termoFiltro}/${filtroEscolhido}`)
            .then(r => r.json())
            .then(r => {
                if (r.length > 0) {
                    let htmlCorpo = "";
                    for (let i = 0; i < r.length; i++) {
                        let dataFormatada = new Date(r[i].data).toLocaleString("pt-BR", {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
    
                        htmlCorpo += `
                            <tr>
                                <td>${r[i].vendas_codigo}</td>
                                <td>${r[i].data}</td>
                                <td>${r[i].produtos_codigo}</td>
                                <td>${r[i].descricao}</td>
                                <td>${parseFloat(r[i].preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>${r[i].quantidade}</td>
                                <td>${parseFloat(r[i].total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            </tr>
                        `;
                    }
    
                    document.querySelector("#tabelaVendas > tbody").innerHTML = htmlCorpo;
                } else {
                    // Se nenhum resultado for encontrado, exibir mensagem de "Nenhuma Venda Encontrada"
                    document.querySelector("#tabelaVendas > tbody").innerHTML = `
                        <tr>
                            <td colspan="7" class="text-center">Nenhuma Venda Encontrada.</td>
                        </tr>
                    `;
                }
            });
    }
    
    

    function exportarExcel() {
        //chama a biblioteca para gerar o excel
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaVendas"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "relatorio-pedidos.xlsx");
    }

    function mudarCriterioFiltragem() {
        let nome = this.dataset.nome;
        document.getElementById("btnEscolherFiltro").innerText = nome;
        filtroEscolhido = this.dataset.valor;
    }

})