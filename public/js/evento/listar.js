document.addEventListener("DOMContentLoaded", function(){

    var listaBtnsAprovar = document.querySelectorAll(".btnAprovar");
    for(var i = 0; i<listaBtnsAprovar.length; i++) {
        listaBtnsAprovar[i].addEventListener("click", aprovarEvento);
    }

    var listaBtnsReprovar = document.querySelectorAll(".btnReprovar");
    for(var i = 0; i<listaBtnsReprovar.length; i++) {
        listaBtnsReprovar[i].addEventListener("click", reprovarEvento);
    }
})

function aprovarEvento() {
    var codigo = this.dataset.codigo;

    if(confirm("Tem certeza que deseja aprovar esse evento?")) {
        if(codigo != ""){
            var data = {
                codigo
            }
            fetch("/evento/aprovar", {
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
                    alert(r.msg)
                    window.location.reload();
                }
                else{
                    alert(r.msg);
                }
            })
            .catch(e => {
                console.log(e);
            })
        } else {
            alert("Não foi possível obter o codigo do evento");
        }
    }

}

function reprovarEvento() {
    var codigo = this.dataset.codigo;

    if(confirm("Tem certeza que deseja reprovar o evento?")) {
        if(codigo != ""){
            var data = {
                codigo
            }
            fetch("/evento/reprovar", {
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
                    alert(r.msg)
                    window.location.href="/evento/";
                }
                else{
                    alert(r.msg);
                }
            })
            .catch(e => {
                console.log(e);
            })
        } else {
            alert("Não foi possível obter o codigo do evento");
        }
    }

}