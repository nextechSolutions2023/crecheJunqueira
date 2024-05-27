
document.getElementById("btnLogin").addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (login(email, senha)) {
        window.location.href = "dashboard";

    } else {
        alert("Login inválido. Por favor, tente novamente.");
    }
});

function login(email, senha) {
    if (email === "admin" && senha === "1234") {
        return true;
    } else {
        return false;
    }
}

