
document.getElementById("btnAdm").addEventListener("click", function() {
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    if (login(nome, senha)) {
        window.location.href = "recursos";
    } else {
        alert("Login inválido. Por favor, tente novamente.");
    }
});

function login(nome, senha) {
    if (nome === "admin" && senha === "1234") {
        return true;
    } else {
        return false;
    }
}

