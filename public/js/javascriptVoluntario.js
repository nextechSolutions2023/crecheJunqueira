const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = [...document.querySelectorAll(".step p")];
const progressCheck = [...document.querySelectorAll(".step .check")];
const bullet = [...document.querySelectorAll(".step .bullet")];

let max = 4;
let current = 1;

// 1 - Etapa do Formulário do Voluntário
nextBtnFirst.addEventListener("click", function(){

  // Nome
  var nomeVoluntario = document.getElementById("nome").value;

  if(nomeVoluntario.length < 5){
    alert("Nome Inválido");
    return;
  }

  // Sobrenome
  var sobrenomeVoluntario = document.getElementById("sobrenome").value;

  if(sobrenomeVoluntario.length < 5){
    alert("Sobrenome Inválido");
    return;
  }

  // Data de Nascimento 
  var dataNascimento = document.getElementById("nascimento").value;

  if(!dataNascimento){
    alert("Insira uma Data de Nascimento");
    return;
  }
  
  //rg
  var rg = document.getElementById("rg").value;

  if(rg.length < 10)
  {
    alert("RG inválido");
    return;
  }

  // cpf
  var cpf = document.getElementById("cpf").value;

  if(cpf.length !==14 )
  {
    alert ("CPF inválido");
    return;
  }
  


  // Gênero
  var genero = document.getElementById("genero").value;
 
  if(genero == ''){
      alert('Escolha um Gênero!');
      return;
  }
  
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  
});


//2 - Etapa do Formulário do Voluntário
nextBtnSec.addEventListener("click", function(){

  //cep
  var cepVoluntario = document.getElementById("cep").value;
  
  if(cepVoluntario == '')
  {
    alert('Informe o Cep');
    return;
  }

  //rua
  var numero = document.getElementById("numero").value;

  if(numero == '')
  {
    alert("Insira o Número da Residência");
    return;
  }

    slidePage.style.marginLeft = "-50%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  
});

//3 - Etapa do Formulário do Voluntário
nextBtnThird.addEventListener("click", function(){
  //e-mail
  var email = document.getElementById("email").value;
  var valido = 0;

  for(i=0;i<email.length;i++)
  {
      if(email[i] == '@')
      {
          valido = 1;
      }
  }
  if(valido == 0)
  {
      alert("E-mail Inválido");
      return;
  }

  //telefone
  var telefone = document.getElementById("telefone").value;

  if(telefone.length <= 12){
    alert('Digite um Número de Telefone Válido');
    return;
  }

  //contato
  var contatoVoluntario = document.getElementById("contVoluntario").value;

  if(contatoVoluntario == ''){
    alert('Escolha uma Preferência de Contato');
    return;
  }

  //disponibilidade
  var disponibilidade = document.getElementById("disponibilidade").value;

  if(disponibilidade == ''){
    alert('Escolha a sua Disponibilidade');
    return;
  }

  //periodo
  var periodo = document.getElementById('periodo').value;

  if(periodo == ''){
    alert('Escolha um Periodo');
    return;
  }
  
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  
});

submitBtn.addEventListener("click", function(){
  event.preventDefault();
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
 // setTimeout(function(){
  //  alert("Your Form Successfully Signed up");
 //   location.reload();
 // },800);
});

prevBtnSec.addEventListener("click", function(){
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function(){
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function(){
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});


//Mascara para o telefone
const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

//estilizando o alert
/*$("#btn2").click(function() {
  // Exibe um alerta de sucesso usando SweetAlert
  Swal.fire({
    text: 'Obrigada por se juntar a nós!!', 
    icon: 'success'
  }).then((result) => {
    // Após o usuário clicar em "OK", redireciona para index.html
    if (result.value) {
      window.location.href = 'index.html'; // Redireciona para index.html
    }
  });
});*/

/*
function mascara(i){
   
  var v = i.value;
  
  if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
     i.value = v.substring(0, v.length-1);
     return;
  }
  
  i.setAttribute("maxlength", "14");
  if (v.length == 3 || v.length == 7) i.value += ".";
  if (v.length == 11) i.value += "-";
}*/

//RG
function mascaraRG(i) {
  var v = i.value;
  // Remove caracteres não numéricos
  v = v.replace(/\D/g, '');
  // Aplica a máscara
  if (v.length <= 2) {
    i.value = v;
  } else if (v.length <= 5) {
    i.value = v.substring(0, 2) + '.' + v.substring(2);
  } else if (v.length <= 8) {
    i.value = v.substring(0, 2) + '.' + v.substring(2, 5) + '.' + v.substring(5);
  } else {
    i.value = v.substring(0, 2) + '.' + v.substring(2, 5) + '.' + v.substring(5, 8) + '-' + v.substring(8, 11);
  }
}

// CEP

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value=("");
  document.getElementById('bairro').value=("");
  document.getElementById('cidade').value=("");
  document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
  //Atualiza os campos com os valores.
  document.getElementById('rua').value=(conteudo.logradouro);
  document.getElementById('bairro').value=(conteudo.bairro);
  document.getElementById('cidade').value=(conteudo.localidade);
  document.getElementById('uf').value=(conteudo.uf);
} //end if.
else {
  //CEP não Encontrado.
  limpa_formulário_cep();
  alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

  //Expressão regular para validar o CEP.
  var validacep = /^[0-9]{8}$/;

  //Valida o formato do CEP.
  if(validacep.test(cep)) {

      document.getElementById('cep').value = cep.substring(0,5)
      +"-"
      +cep.substring(5);

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value="...";
      document.getElementById('bairro').value="...";
      document.getElementById('cidade').value="...";
      document.getElementById('uf').value="...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

  } //end if.
  else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
  }
} //end if.
else {
  //cep sem valor, limpa formulário.
  limpa_formulário_cep();
}
};






