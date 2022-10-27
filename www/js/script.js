jQuery(document).ready(function ($) {

    $('#botão-desligar').on({
        'click': function () {
            $('#mudar-imagem').attr('src', 'img/luz_desligada.png');
        }
    });

    $('#botão-ligar').on({
        'click': function () {
            $('#mudar-imagem').attr('src', 'img/luz_acessa.png');
        }
    });

    $("mark").on("click", function () {
        $(this).hide();
    });

    $("#txt-exemplo02").on({
        mouseenter: function () {
            $(this).css("background-color", "red");
        },
        mouseleave: function () {
            $(this).css("background-color", "green");
        },
        click: function () {
            $(this).css("background-color", "blue");
        }
    });

    $("#txt-exemplo03").mouseenter(function () { 
        alert("Você passou o mouse em cima de mim!")
    });

});