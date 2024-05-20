document.addEventListener("DOMContentLoaded", function(){

    var listaBtns = document.querySelectorAll(".btnExcluir");

    for(var i = 0; i<listaBtns.length; i++) {
        listaBtns[i].addEventListener("click", excluirPatrimonio);
    }
    
})

function excluirPatrimonio() {
    var id = this.dataset.id;
    if(confirm("Tem certeza que deseja excluir")) {
        if(id != ""){
            var data = {
                id: id
            }
            fetch("/patrimonio/excluir", {
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
                    alert("Erro ao excluir patrimonio");
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

}