document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("btnDeletar").addEventListener("click", deletar);

    function deletar() {
        let descricao = document.querySelector("#descricao").value;
        let codigo = document.querySelector("#codigo").value;
        
        let obj = {
            descricao: descricao,
            codigo: codigo
        }

        fetch("/atividades/deletar", {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert(r.msg);
                window.location.href="/atividades";
            }   
            else {
                alert(r.msg);
            }
        })
    }
})