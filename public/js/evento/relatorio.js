
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filtro").disabled = true;
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel);

    let filtroEscolhido = 0;
    let itemFiltro = document.querySelectorAll(".itemFiltro");
    document.getElementById("btnFiltrar").addEventListener("click", buscar);

    for (let i = 0; i < itemFiltro.length; i++) {
        itemFiltro[i].addEventListener("click", mudarCriterioFiltragem);
    }

    function buscar() {
        let termoFiltro = document.getElementById("filtro").value;
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        termoFiltro = termoFiltro ? termoFiltro : 'semvalor';

        let url = `/evento/filtrar/${termoFiltro}/${filtroEscolhido}`;
        if (filtroEscolhido == 8) {
            url += `?startDate=${startDate}&endDate=${endDate}`;
        }

        fetch(url)
            .then(r => r.json())
            .then(r => {
                let htmlCorpo = "";
                if (r.length > 0) {
                    for (let i = 0; i < r.length; i++) {
                        htmlCorpo += `
                            <tr>
                                <td>${r[i].eventoCodigo}</td>
                                <td>${r[i].eventoNome}</td>
                                <td>${r[i].eventoDescricao}</td>
                                <td>${new Date(r[i].eventoData).toLocaleString()}</td>
                                <td>${r[i].eventoLocal}</td>
                                <td>${r[i].eventoStatus}</td>
                            </tr>
                        `;
                    }
                } else {
                    htmlCorpo = "<tr><td colspan='6'>A pesquisa não retornou resultados</td></tr>";
                }
                document.querySelector("#tabelaEventos > tbody").innerHTML = htmlCorpo;
            });
    }

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaEventos"));
        XLSX.writeFile(wb, "relatorio-eventos.xlsx");
    }

    function mudarCriterioFiltragem() {
        let nome = this.dataset.nome;
        document.getElementById("btnEscolherFiltro").innerText = nome;
        filtroEscolhido = this.dataset.valor;
        document.getElementById("filtro").disabled = filtroEscolhido != 1;
        document.getElementById("dateFilter").style.display = filtroEscolhido == 8 ? null : 'none';
    }
});
