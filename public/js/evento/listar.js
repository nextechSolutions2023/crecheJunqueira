document.addEventListener("DOMContentLoaded", function(){

    var listaBtns = document.querySelectorAll(".btnExcluir");

    for(var i = 0; i<listaBtns.length; i++) {
        listaBtns[i].addEventListener("click", excluirEvento);
    }
    
})

function excluirEvento() {
    var ref = this.dataset.ref;
    if(confirm("Tem certeza que deseja excluir")) {
        if(ref != ""){
            var data = {
                ref: ref
            }
            fetch("/evento/excluir", {
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
                    alert("Erro ao excluir evento");
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

}