(function ($) {
    "use strict";

    // Initiate the wowjs
    // new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);


document.getElementById('meuBotao').addEventListener('click', function() {
    alert('Cadastrado com sucesso!');
  });


  //MASCARA PARA VALOR
  function formatarMoeda(element) {
    // Obtém o valor atual do input
    let valor = element.value;
  
    // Remove tudo que não for dígito
    valor = valor.replace(/\D/g, '');
  
    // Formata o valor para o formato de moeda
    valor = (parseInt(valor) / 100).toFixed(2).replace(".", ",");
  
    // Adiciona o símbolo de moeda e exibe no input
    element.value = "R$" + valor;
}


//contate-nos

function validacao(){
    //nome
    var nome = document.getElementById("gname").value;
    nome = nome.trim();

    var valido=0;

    for(i=0;i<nome.length;i++)
    {
        if(nome[i] == ' ')
        {
            valido = 1;
        }
    }
    if(valido == 0)
    {
    
        alert("Nome Inválido");
        return;
    }

    //e-mail
    var email = document.getElementById("gmail").value;
    
    valido = 0;
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

    //assunto
    var assunto = document.getElementById("assunto").value;

    valido = 0;
    if(assunto > 0 && assunto < 4){
        valido = 1;
    }
    if(valido == 0){
        alert('Escolha um Assunto para a sua Mensagem!');
        return;
    }

    //mensagem
    var mensagem = document.getElementById("message").value;

    valido = 0;

    if(mensagem.length >= 10){
        valido = 1;
    }

    if(valido == 0)
    {
        alert("Insira uma Mensagem com mais de 10 caracteres!");
        return;
    }

    alert('Mensagem Enviada com Sucesso! Em breve retornaremos o seu contato.');

    document.getElementById("gname").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("assunto").selectedIndex = 0; 
    document.getElementById("message").value = "";
}

//validacao cartao
var botao = document.getElementById('botao');

var nomeCartaoInput = document.getElementById("nomeCartao");
var mesCartaoInput = document.getElementById("mesCartao");
var anoCartaoInput = document.getElementById("anoCartao");
var numeroCartaoInput = document.getElementById("numeroCartao");
var cvcCartaoInput = document.getElementById("cvcCartao");

nomeCartaoInput.style.border = 'solid 1px gray';
mesCartaoInput.style.border  = 'solid 1px gray';
anoCartaoInput.style.border  = 'solid 1px gray';
numeroCartaoInput.style.border  = 'solid 1px gray';
cvcCartaoInput.style.border  = 'solid 1px gray';

botao.addEventListener('click', function() {

    var nome = nomeCartaoInput.value;
    var mes = mesCartaoInput.value;
    var ano = anoCartaoInput.value;
    var numero = numeroCartaoInput.value;
    var cvc = cvcCartaoInput.value;

    //nome
    nome = nome.trim();

    var valido=0;

    for(i=0;i<nome.length;i++)
    {
        if(nome[i] == ' ')
        {
            valido = 1;
        }
    }
    if(valido == 0)
    {
        alert("Nome Inválido");
        nome.style.border = "solid 2px red";
        return;
    }

    // Mês
    mes = mes.replace(/\D/g, '');

    if (mes > 0 && mes <= 12) {
        
    } else {
        alert('Mês Inválido');
        return;
    }

    // Ano
    ano = ano.replace(/\D/g, '');
    if (ano >= new Date().getFullYear()) {

    } else {
        alert('Ano Inválido');
        return;
    }

    // Número do cartão
    numero = numero.replace(/\D/g, ''); 
    if (isNaN(numero) || numero.length !== 16) {
        alert('Número do Cartão Inválido');
        return;
    }

    // CVC
    cvc = cvc.replace(/\D/g, ''); 
    if (isNaN(cvc) || cvc.length !== 3) {
        alert('CVC Inválido');
        return;
    }


    if (valido == 0) {
        alert("Cartão Inválido!");
        return;
    }

    alert('Obrigada pela sua Doação!.');
    document.getElementById("nomeCartao").value = "";
    document.getElementById("mesCartao").value = "";
    document.getElementById("anoCartao").value = ""; 
    document.getElementById("numeroCartao").value = "";
    document.getElementById("cvcCartao").value = "";

    
    document.addEventListener("DOMContentLoaded", function() {
        const links = document.querySelectorAll('.nav-item.nav-link');
        
        links.forEach(link => {
            link.addEventListener('click', function() {
                // Remove a classe 'active' de todos os links
                links.forEach(l => l.classList.remove('active'));
                
                // Adiciona a classe 'active' apenas ao link clicado
                link.classList.add('active');
            });
        });
    });


});