//  ***FUNCOES PARA VALIDAR A TELA AREA RESTRITA****



document.addEventListener('DOMContentLoaded', function () {
    // Função para validar o formulário
    function validarFormulario() {
      // Obter os valores do e-mail e senha
      var email1 = document.getElementById('email1').value;
      var senha = document.getElementById('senha').value;
  
      // Valores esperados
      var emailEsperado = 'crechejunqueira@gmail.com';
      var senhaEsperada = 'senha123';
  
      // Verificar se os valores correspondem aos esperados
      if (email1 === emailEsperado && senha === senhaEsperada) {
        // Se correspondem, redirecione para a próxima página
        window.location.href = 'tabela_dinamica_voluntarios.html';
      } else {
        // Se não correspondem, exiba uma mensagem de erro específica
        if (email1 !== emailEsperado) {
          alert('E-mail incorreto. Verifique o e-mail e tente novamente.');
        } else {
          alert('Senha incorreta. Verifique a senha e tente novamente.');
        }
      }
    }  
    // Adicionar evento de clique ao botão de acessar
    document.getElementById('btn3').addEventListener('click', function ()
     {
      validarFormulario();
    });

     // Adicionar evento ao pressionar a tecla Enter no campo de senha
    document.getElementById('senha').addEventListener('keyup', function (event) 
    {
        // Se a tecla pressionada for Enter (código 13), chame a função validarFormulario
        if (event.keyCode === 13)
        {
          validarFormulario();
        }
    });
  });