document.addEventListener('DOMContentLoaded', function() {
    function armazenarDados(event) {
        event.preventDefault(); // Impede a submissão imediata do formulário

        let voluntariosSelecionados = [];
        let patrimoniosQuantidades = [];

        const checkboxesVoluntarios = document.querySelectorAll('input[type="checkbox"]');
        checkboxesVoluntarios.forEach((checkbox) => {
            if (checkbox.checked) {
                voluntariosSelecionados.push({ codigo: checkbox.id.split("_")[1] });
            }
        });

        const inputsQuantidade = document.querySelectorAll('input[type="number"]');
        inputsQuantidade.forEach((input) => {
            const idPatrimonio = input.dataset.id;
            const quantidade = input.value;
            if (quantidade > 0) { // Verifica se a quantidade é maior que zero
                patrimoniosQuantidades.push({ id: idPatrimonio, quantidade: quantidade });
            }
        });

        if (voluntariosSelecionados.length > 0 || patrimoniosQuantidades.length > 0) {
            localStorage.setItem('voluntariosSelecionados', JSON.stringify(voluntariosSelecionados));
            localStorage.setItem('patrimoniosQuantidades', JSON.stringify(patrimoniosQuantidades));
            alterarBanco();
        } else {
            alert("Não há dados para enviar para o servidor!");
        }
    }

    function atualizarLocalStorage(idPatrimonio, quantidade) {
        let patrimoniosQuantidades = JSON.parse(localStorage.getItem('patrimoniosQuantidades'));
        patrimoniosQuantidades.forEach((item) => {
            if (item.id === idPatrimonio) {
                item.quantidade = quantidade;
            }
        });
        localStorage.setItem('patrimoniosQuantidades', JSON.stringify(patrimoniosQuantidades));
    }

    const btnDarSaida = document.getElementById('btnDarSaida');
    btnDarSaida.addEventListener('click', armazenarDados);

    const inputsQuantidade = document.querySelectorAll('input[type="number"]');
    inputsQuantidade.forEach((input) => {
        input.addEventListener('input', function() {
            const idPatrimonio = this.dataset.id;
            const quantidade = this.value;
            atualizarLocalStorage(idPatrimonio, quantidade);
        });
    });

    function alterarBanco() {
        const voluntariosSelecionados = JSON.parse(localStorage.getItem('voluntariosSelecionados'));
        const patrimoniosQuantidades = JSON.parse(localStorage.getItem('patrimoniosQuantidades'));

        if (patrimoniosQuantidades.length > 0 || voluntariosSelecionados.length > 0 ) {
            const data = {
                voluntariosSelecionados: voluntariosSelecionados,
                patrimoniosQuantidades: patrimoniosQuantidades
            };

            fetch("/saidaEvento/alterarBanco", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(r => r.json())
            .then(r => {
                if (r.ok) {
                    alert("Concluido!");
                    localStorage.removeItem('voluntariosSelecionados');
                    localStorage.removeItem('patrimoniosQuantidades');
                    window.location.href = "/saidaEvento";
                } else {
                    alert("Erro");
                }
            })
            .catch(e => {
                console.log(e);
                alert("Erro ao enviar dados para o servidor!");
            });
        } else {
            alert("Não há dados para enviar para o servidor!");
        }
    }
});
