document.addEventListener("DOMContentLoaded", function(){

    var listaBtns = document.querySelectorAll(".btnExcluir");

    for(var i = 0; i<listaBtns.length; i++) {
        listaBtns[i].addEventListener("click", excluirMensagem);
    }
    
    // Adiciona um listener para os botões de download
    const btnDownloads = document.querySelectorAll('.btnDownload');
    btnDownloads.forEach(btn => {
        btn.addEventListener('click', function() {
            const nomeArquivo = this.getAttribute('data-nome');
            const url = `../public/docs/${nomeArquivo}`;
            
            // Cria um link <a> temporário
            const link = document.createElement('a');
            link.href = url;
            link.target = '_self'; // Abre na mesma janela
            link.download = nomeArquivo;
            document.body.appendChild(link);
            
            // Simula o clique no link para iniciar o download
            link.click();

            // Remove o link temporário após o download iniciar
            document.body.removeChild(link);
        });
    });
});



function excluirMensagem() {
    var codigo = this.dataset.codigo;
    if(confirm("Tem certeza que deseja excluir")) {
        if(codigo !== ""){
            var data = {
                codigo: codigo
            }
            fetch("/mensagens/excluir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok){
                    window.location.reload();
                }
                else{
                    alert("Erro ao excluir a mensagem");
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

}