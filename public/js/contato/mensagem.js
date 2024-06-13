document.addEventListener("DOMContentLoaded", function() {
    var btnEnviar = document.getElementById("btnEnviar");

    btnEnviar.addEventListener("click", function() {
        enviarMensagem();
    });
});

function enviarMensagem() {
    limparErros();

    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var assunto = document.getElementById("assunto");
    var mensagem = document.getElementById("mensagem");
    var arquivo = document.getElementById("arquivo").files;

    var listaErros = [];

    if (!nome.value.trim()) {
        listaErros.push({ id: "nome", mensagem: "O campo nome é obrigatório." });
    } else if (!nomeValido(nome.value)) {
        listaErros.push({ id: "nome", mensagem: "É necessário informar o nome completo." });
    } else if (nome.value.length > 40) {
        listaErros.push({ id: "nome", mensagem: "O nome não pode ter mais de 40 caracteres." });
    }

    if (!email.value.trim()) {
        listaErros.push({ id: "email", mensagem: "O campo email é obrigatório." });
    } else if (!emailValido(email.value)) {
        listaErros.push({ id: "email", mensagem: "O campo email deve ser um email válido." });
    } else if (email.value.length > 40) {
        listaErros.push({ id: "email", mensagem: "O email não pode ter mais de 40 caracteres." });
    }

    if (assunto.value === "0" || assunto.value === undefined || assunto.value === null) {
        listaErros.push({ id: "assunto", mensagem: "O campo assunto é obrigatório." });
    }

    if (mensagem.value === "" || mensagem.value === undefined || mensagem.value === null) {
        listaErros.push({ id: "mensagem", mensagem: "O campo mensagem é obrigatório." });
    } else if (mensagem.value.length > 200) {
        listaErros.push({ id: "mensagem", mensagem: "A mensagem não pode ter mais de 200 caracteres." });
    }

    if (listaErros.length === 0) {
        let formData = new FormData();

        formData.append("nome", nome.value);
        formData.append("email", email.value);
        formData.append("assunto", assunto.options[assunto.selectedIndex].text);
        formData.append("mensagem", mensagem.value);
        if (arquivo.length > 0) {
            formData.append("arquivo", arquivo[0]);
        }

        fetch('/contato/enviar', { 
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {          
            if (data.ok) {
                nome.value = "";
                email.value = "";
                assunto.value = "0";
                mensagem.value = "";
                
                document.getElementById("alertaSucesso").innerText = "Mensagem enviada com sucesso!";
                document.getElementById("alertaSucesso").style.display = "block";
            } else {
                document.getElementById("erros").innerText = "Erro ao enviar a mensagem!";
                document.getElementById("erros").style.display = "block";
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("erros").innerText = "Erro ao enviar a mensagem!";
            document.getElementById("erros").style.display = "block";
        });

    } else {
        mostrarErros(listaErros);
    }
}

function emailValido(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function nomeValido(nome) {
    var palavras = nome.trim().split(/\s+/);
    return palavras.length >= 2;
}

function mostrarErros(lista) {
    lista.forEach(erro => {
        let elemento = document.getElementById(erro.id);
        if (elemento) {
            elemento.style.border = "1px solid red";
            let erroSpan = document.createElement("span");
            erroSpan.className = "error-message";
            erroSpan.style.color = "red";
            erroSpan.innerText = erro.mensagem;
            elemento.parentNode.insertBefore(erroSpan, elemento.nextSibling);
        }
    });

    var erros = document.getElementById("erros");
    if (erros) {
        erros.innerText = "Preencha corretamente os campos abaixo:";
        erros.style.display = "block";
    }
}

function limparErros() {
    ["nome", "email", "assunto", "mensagem"].forEach(id => {
        let elemento = document.getElementById(id);
        if (elemento) {
            elemento.style.border = "";
            let erroSpan = elemento.nextSibling;
            if (erroSpan && erroSpan.className === "error-message") {
                erroSpan.remove();
            }
        }
    });

    document.getElementById("erros").style.display = "none";
    document.getElementById("alertaSucesso").style.display = "none";
}
